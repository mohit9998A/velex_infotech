import { createHash, randomBytes } from "node:crypto";

/**
 * In-memory abuse controls for the lead endpoint.
 *
 * WHY THIS EXISTS AT ALL
 *
 * `/api/contact` is an unauthenticated, public POST endpoint with no CAPTCHA.
 * While the transport was Resend, abusing it cost a vendor rate-limit error.
 * Now that the transport is the company's own Hostinger mailbox, abusing it
 * burns a shared daily quota and risks the mailbox being suspended — which
 * takes down the address the business actually reads its mail on, not just the
 * form. The failure mode changed from "the form breaks" to "the company cannot
 * read its email", so the endpoint needs controls it never needed before.
 *
 * WHAT THIS IS NOT
 *
 * This is per-instance state. Vercel runs many lambda instances, so a
 * "20 per hour" cap is really 20-per-hour *times the number of live instances*
 * — realistically 1-4 for this site's traffic, which keeps it comfortably under
 * Hostinger's ceiling, but a genuinely distributed attack defeats it by
 * arithmetic. It is the floor that travels with the code, not a guarantee.
 * The guarantee is a Vercel Firewall rate-limit rule on this path, which runs
 * at the edge before the function is ever invoked, plus the LEAD_MAIL_DISABLED
 * kill switch in lib/mail.ts.
 *
 * Deliberately zero-dependency. Reaching for Redis here would put an external
 * service in the critical path of the one endpoint whose availability actually
 * matters, to solve a problem the Firewall solves for free.
 */

export interface RateRule {
  /** Maximum number of hits allowed inside the window. */
  limit: number;
  windowMs: number;
}

export interface RateResult {
  ok: boolean;
  /** Seconds until the caller may retry. Feeds the `Retry-After` header. */
  retryAfter: number;
}

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/**
 * Hard ceiling on tracked keys.
 *
 * Without this, the limiter is itself a memory exhaustion vector: an attacker
 * cycling source addresses would grow the map unbounded until the instance
 * OOMs. When the cap is hit the least-recently-seen keys are evicted, which
 * degrades limiting for the coldest callers rather than killing the process.
 */
const MAX_KEYS = 10_000;

/** Timestamps of recent hits, newest last. */
const buckets = new Map<string, number[]>();

/**
 * Per-instance salt, regenerated on every cold start.
 *
 * Client IPs are personal data, and this codebase deliberately keeps visitor
 * PII out of platform logs (see the comment in app/api/contact/route.ts). The
 * limiter only ever needs equality, never the address itself, so the raw IP is
 * hashed on the way in and the salt is never persisted — nothing here can be
 * turned back into an address, including by whoever reads a heap dump.
 */
const SALT = randomBytes(16);

/** Opaque, non-reversible, stable for the life of the instance. */
export function clientKey(request: Request): string {
  // `x-forwarded-for` is a comma-separated chain; the leftmost entry is the
  // client as seen by the first proxy. On Vercel the platform overwrites this
  // header, so it cannot be spoofed by the caller in production. Locally there
  // may be no header at all, in which case every caller shares one bucket —
  // correct for `next dev`, where there is exactly one caller.
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";

  return createHash("sha256").update(SALT).update(ip).digest("base64url").slice(0, 22);
}

/** Drop timestamps that have aged out of the longest window we care about. */
function prune(hits: number[], now: number, horizonMs: number): number[] {
  const cutoff = now - horizonMs;
  // Timestamps are appended in order, so the survivors are always a suffix.
  let i = 0;
  while (i < hits.length && (hits[i] ?? 0) <= cutoff) i++;
  return i === 0 ? hits : hits.slice(i);
}

function evictIfFull(): void {
  if (buckets.size < MAX_KEYS) return;
  // Map iterates in insertion order and `record` re-inserts on write, so the
  // first keys out are the least recently written.
  const overflow = buckets.size - MAX_KEYS + 1;
  let dropped = 0;
  for (const key of buckets.keys()) {
    buckets.delete(key);
    if (++dropped >= overflow) break;
  }
}

/**
 * Test `key` against every rule WITHOUT consuming a hit.
 *
 * Rejection deliberately does not record. Recording on rejection would let a
 * hammering client extend its own lockout indefinitely, which is
 * indistinguishable from a permanent ban for a legitimate visitor sharing a
 * NAT or a corporate egress IP with a bot.
 */
export function check(key: string, rules: RateRule[], now = Date.now()): RateResult {
  const hits = buckets.get(key);
  if (!hits || hits.length === 0) return { ok: true, retryAfter: 0 };

  for (const rule of rules) {
    const cutoff = now - rule.windowMs;
    let count = 0;
    for (let i = hits.length - 1; i >= 0 && (hits[i] ?? 0) > cutoff; i--) count++;

    if (count >= rule.limit) {
      // The oldest hit still inside the window is the one whose expiry frees a
      // slot, so that is the honest retry time.
      const oldestInWindow = hits[hits.length - count] ?? now;
      const retryAfter = Math.max(1, Math.ceil((oldestInWindow + rule.windowMs - now) / 1000));
      return { ok: false, retryAfter };
    }
  }

  return { ok: true, retryAfter: 0 };
}

/** Consume one hit against `key`. Call only after `check` has passed. */
export function record(key: string, horizonMs: number, now = Date.now()): void {
  const existing = buckets.get(key);
  const hits = existing ? prune(existing, now, horizonMs) : [];
  hits.push(now);

  // Delete-then-set so the key moves to the end of the insertion order, which
  // is what makes the eviction above least-recently-used rather than arbitrary.
  buckets.delete(key);
  evictIfFull();
  buckets.set(key, hits);
}

/** `check` and, when it passes, `record` — the common case. */
export function consume(key: string, rules: RateRule[], now = Date.now()): RateResult {
  const result = check(key, rules, now);
  if (!result.ok) return result;

  const horizon = Math.max(...rules.map((r) => r.windowMs));
  record(key, horizon, now);
  return result;
}

// --------------------------------------------------------------- send budget
//
// Separate from the per-IP limits, and the more important of the two.
//
// Per-IP limiting does nothing against a botnet with ten thousand addresses:
// every request is the first from its source. The send budget caps how many
// emails ONE INSTANCE will emit per hour and per day regardless of who asks,
// which is what actually stands between an attack and a suspended mailbox.

const SEND_BUDGET_KEY = "global:send-budget";

function positiveInt(raw: string | undefined, fallback: number): number {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

export function sendBudgetRules(): RateRule[] {
  return [
    { limit: positiveInt(process.env.LEAD_MAX_SENDS_PER_HOUR, 20), windowMs: HOUR },
    { limit: positiveInt(process.env.LEAD_MAX_SENDS_PER_DAY, 40), windowMs: DAY },
  ];
}

/**
 * Reserve `count` sends against the instance budget.
 *
 * `count` is 2 when the auto-reply is enabled, so the accounting stays honest
 * rather than quietly emitting twice what the budget claims.
 */
export function reserveSends(count: number, now = Date.now()): RateResult {
  const rules = sendBudgetRules();

  // Check against a limit reduced by count-1 so that reserving 2 cannot step
  // over a boundary that reserving 1 would have stopped at.
  const headroom = rules.map((r) => ({ ...r, limit: Math.max(0, r.limit - (count - 1)) }));
  const result = check(SEND_BUDGET_KEY, headroom, now);
  if (!result.ok) return result;

  for (let i = 0; i < count; i++) record(SEND_BUDGET_KEY, DAY, now);
  return result;
}

/** Test-only. Production never needs to clear state; instances are ephemeral. */
export function __resetForTests(): void {
  buckets.clear();
}
