import { NextResponse, after } from "next/server";

import { siteConfig } from "@/config/site";
import { leadFormSchema } from "@/lib/validations/lead";
import {
  bareAddress,
  createMailTransport,
  describeMailError,
  mailDisabled,
  resolveMailConfig,
  sendLeadAutoReply,
  sendLeadNotification,
} from "@/lib/mail";
import {
  DAY,
  MINUTE,
  clientKey,
  consume,
  record,
  reserveSends,
  type RateRule,
} from "@/lib/rate-limit";

/**
 * Lead capture endpoint.
 *
 * Re-validates the payload server-side with the SAME Zod schema used on the
 * client, then mails it through the company's own SMTP mailbox (see
 * lib/mail.ts for the environment contract and the history behind the switch).
 *
 * The layer ordering below is deliberate and cheap-to-expensive: everything
 * that can reject a request without parsing a body runs before the parse, and
 * nothing touches the mail transport until the payload is known to be a real,
 * validated, rate-limited lead.
 */

// Nodemailer opens a raw TLS socket, which the Edge runtime cannot do at all —
// it has no socket primitive and disallows `require`. Node is already the
// default; stating it keeps the route's hard dependency legible at the top of
// the file rather than discovered as a runtime crash.
export const runtime = "nodejs";

// An SMTP handshake against a slow or half-open host can sit for tens of
// seconds. The transport timeouts in lib/mail.ts are set to fail inside this
// budget so the visitor gets a real answer rather than a platform timeout.
export const maxDuration = 30;

/** Largest body worth reading. A real lead is well under 3 KB. */
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Pre-parse flood control. Generous, because it is counted against every
 * request including the ones that turn out to be malformed.
 */
const REQUEST_RULES: RateRule[] = [{ limit: 20, windowMs: 10 * MINUTE }];

/**
 * Post-validation submission control. Counted only once a payload has passed
 * Zod, so a visitor who fixes a validation error and resubmits is never
 * punished for it — which is why this is a second tier rather than a tighter
 * value on the rule above.
 */
const SUBMIT_RULES: RateRule[] = [
  { limit: 3, windowMs: 10 * MINUTE },
  { limit: 10, windowMs: DAY },
];

function tooMany(retryAfter: number) {
  return NextResponse.json(
    { ok: false, error: "Too many requests" },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

/**
 * Same-origin hygiene, not security.
 *
 * A browser always sends `Origin` on a cross-origin POST, so this stops the
 * cheapest form of third-party form spam. A missing `Origin` is allowed
 * through: curl omits it, so do some in-app webviews, and rejecting it would
 * break real submissions to stop an attacker who need only add a header.
 */
function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    return (
      originHost === request.headers.get("host") ||
      originHost === new URL(siteConfig.url).host
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // 0 — Operator kill switch. If the mailbox is under attack this stops all
  // outbound mail from the Vercel dashboard in under a minute, with no build,
  // no deploy and no git operation. The form then falls back to WhatsApp,
  // which is degraded but leaves the business inbox intact.
  if (mailDisabled()) {
    console.warn("[velex:lead] LEAD_MAIL_DISABLED is set — refusing all sends");
    return NextResponse.json(
      { ok: false, error: "Mail transport unavailable" },
      { status: 503 },
    );
  }

  // 1 — Body size. Without this the platform will happily buffer megabytes
  // before Zod ever gets to enforce a field length.
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  // 2 — Origin.
  if (!originAllowed(request)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  // 3 — Per-IP request rate, before any parsing.
  const key = clientKey(request);
  const requestRate = consume(`req:${key}`, REQUEST_RULES);
  if (!requestRate.ok) return tooMany(requestRate.retryAfter);

  // 4 — Read and parse. `content-length` is caller-supplied and may lie, so the
  // real length is checked too.
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // 5 — Validation.
  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // 6 — Honeypot. A real user never sees this field, so anything in it is a
  // bot. Return 200 so the bot believes it succeeded and does not retry, but
  // send nothing — and charge it a submission, so a bot that keeps posting
  // exhausts its own budget instead of probing for free.
  if (lead.website) {
    record(`submit:${key}`, DAY);
    return NextResponse.json({ ok: true });
  }

  // 7 — Per-IP submission rate.
  const submitRate = consume(`submit:${key}`, SUBMIT_RULES);
  if (!submitRate.ok) return tooMany(submitRate.retryAfter);

  // 8 — Mail configuration.
  const resolved = resolveMailConfig();
  if (!resolved.ok) {
    // This previously returned { ok: true }, so the client saw res.ok and
    // showed "Request received — we'll respond within 24 hours." The lead
    // evaporated and the visitor was told the opposite. Fail loudly in
    // production so the form falls back to WhatsApp/email; stay permissive in
    // development so local work is not blocked, but make the state visible.
    const missing = resolved.missing.join(", ");
    if (process.env.NODE_ENV === "production") {
      console.error(`[velex:lead] SMTP config incomplete (missing: ${missing}) — lead NOT delivered`);
      return NextResponse.json(
        { ok: false, error: "Mail transport unavailable" },
        { status: 503 },
      );
    }
    console.warn(`[velex:lead] SMTP config incomplete (missing: ${missing}) — email skipped (dev)`);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const config = resolved.config;

  // Hostinger rejects a MAIL FROM that is not the authenticated mailbox with a
  // 550/553, and nothing in the Resend mental model prepares you for that —
  // there, sender and credential were unrelated. Warn rather than fail: the
  // send may still be legitimate if the host permits an alias.
  if (bareAddress(config.from) !== config.user) {
    console.warn(
      `[velex:lead] LEAD_FROM_EMAIL (${bareAddress(config.from)}) is not SMTP_USER ` +
        `(${config.user}) — most SMTP hosts reject this with 550/553`,
    );
  }

  // 9 — Instance send budget. Per-IP limits do nothing against a botnet where
  // every request is the first from its source; this is the control that
  // actually stands between an attack and a suspended mailbox.
  const sends = config.autoReply ? 2 : 1;
  const budget = reserveSends(sends);
  if (!budget.ok) {
    console.error(
      `[velex:abuse] instance send budget exhausted — lead NOT delivered. ` +
        `Raise LEAD_MAX_SENDS_PER_HOUR/DAY, or set LEAD_MAIL_DISABLED and investigate.`,
    );
    return NextResponse.json(
      { ok: false, error: "Mail transport unavailable" },
      { status: 503 },
    );
  }

  const transporter = createMailTransport(config);

  try {
    await sendLeadNotification(transporter, config, lead);
  } catch (error) {
    const failure = describeMailError(error);
    console.error(`[velex:email-error] notification failed: ${failure.log}`);
    return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
  }

  // The acknowledgement is a courtesy, so it runs after the response: a slow or
  // failing auto-reply must never delay or downgrade the answer the visitor
  // gets. The notification above is the opposite — it is what the 200 asserts,
  // so it is awaited and its failure is the visitor's failure. Note that
  // after() shares maxDuration; it does not buy extra time.
  if (config.autoReply) {
    after(async () => {
      try {
        await sendLeadAutoReply(transporter, config, lead);
      } catch (error) {
        console.warn(`[velex:autoreply] failed: ${describeMailError(error).log}`);
      }
    });
  }

  // Deliberately no console.info of the lead object. It carries name, email and
  // phone, and platform logs are a third-party sink — you cannot publish a GDPR
  // posture on one page while writing visitor phone numbers to it.
  return NextResponse.json({ ok: true });
}
