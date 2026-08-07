#!/usr/bin/env node
/**
 * Resend delivery preflight.
 *
 * The lead form's failure mode is uniquely bad: the API key is valid, the
 * route runs, validation passes, and Resend still refuses the send — because
 * the sandbox sender `onboarding@resend.dev` may only deliver to the address
 * the Resend ACCOUNT is registered under. Nothing about that is visible from
 * the outside. The visitor sees "Something went wrong", the enquiry is gone,
 * and the only evidence is a line in the platform logs nobody reads.
 *
 * That exact bug shipped in fc01991 and destroyed every lead until it was
 * found. This script exists so the question "will a lead actually arrive?"
 * has a one-command answer instead of an inference from git history.
 *
 * Usage:
 *   RESEND_API_KEY=re_xxx npm run verify:resend           # inspect config
 *   RESEND_API_KEY=re_xxx npm run verify:resend -- --send # also send a test
 *
 * Reads the same env vars the route reads, so what it reports is what
 * production does. Run it with the values from the Vercel dashboard.
 *
 * Parsed with regex rather than imported, matching scripts/verify-content.mjs:
 * this must run without a TypeScript toolchain on a clean checkout.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteSource = readFileSync(join(root, "config/site.ts"), "utf8");

const field = (name) =>
  siteSource.match(new RegExp(`^\\s*${name}:\\s*"([^"]*)"`, "m"))?.[1];

const siteName = field("name");
const leadInbox = field("leadInbox");

if (!leadInbox) {
  console.error(" ERROR  could not parse `leadInbox` from config/site.ts");
  process.exit(1);
}

const SANDBOX_FROM = `${siteName} <onboarding@resend.dev>`;
const from = process.env.LEAD_FROM_EMAIL || SANDBOX_FROM;
const to = process.env.LEAD_INBOX || leadInbox;

/** Pull the bare address out of a `Name <addr@host>` header value. */
const bareAddress = (v) => v.match(/<([^>]+)>/)?.[1] ?? v.trim();

const usingSandbox = bareAddress(from).endsWith("@resend.dev");

console.log("Resend lead delivery preflight");
console.log("------------------------------");
console.log(`  from        ${from}${process.env.LEAD_FROM_EMAIL ? "  (LEAD_FROM_EMAIL)" : "  (default)"}`);
console.log(`  to          ${to}${process.env.LEAD_INBOX ? "  (LEAD_INBOX)" : "  (config/site.ts leadInbox)"}`);
console.log("");

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error(" ERROR  RESEND_API_KEY is not set in this shell.");
  console.error("        In production a missing key makes the route return 503 and the");
  console.error("        form fall back to WhatsApp. Copy the value from the Vercel");
  console.error("        dashboard (Settings > Environment Variables) and re-run.");
  process.exit(1);
}

const api = async (path) => {
  const res = await fetch(`https://api.resend.com${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return { status: res.status, body: await res.json().catch(() => null) };
};

const errors = [];
const warnings = [];

// ------------------------------------------------------------- domain check
const domains = await api("/domains");

if (domains.status === 401 || domains.status === 403) {
  console.error(" ERROR  Resend rejected the API key (HTTP " + domains.status + ").");
  console.error("        The key is wrong, revoked, or from a different account.");
  process.exit(1);
}

const list = domains.body?.data ?? [];
if (list.length === 0) {
  console.log("  domains     none verified on this account");
} else {
  console.log("  domains");
  for (const d of list) {
    const ok = d.status === "verified";
    console.log(`    ${ok ? "OK  " : "----"}  ${d.name}  (${d.status})`);
  }
}
console.log("");

const senderDomain = bareAddress(from).split("@")[1];
const senderVerified = list.some(
  (d) => d.name === senderDomain && d.status === "verified",
);

if (usingSandbox) {
  warnings.push(
    "Sender is Resend's sandbox `onboarding@resend.dev`. It can ONLY deliver to " +
      "the address this Resend account is registered under. If `to` above is not " +
      "that exact address, every lead is rejected with a 403 and lost.",
  );
  const verified = list.filter((d) => d.status === "verified").map((d) => d.name);
  if (verified.length > 0) {
    warnings.push(
      `This account already has a verified domain (${verified.join(", ")}). Set ` +
        `LEAD_FROM_EMAIL to an address on it — e.g. "${siteName} <leads@${verified[0]}>" ` +
        "— and the recipient restriction disappears entirely.",
    );
  }
} else if (!senderVerified) {
  errors.push(
    `LEAD_FROM_EMAIL sends from "${senderDomain}", which is NOT a verified domain ` +
      "on this account. Resend will reject every send. Verify the domain (SPF + " +
      "DKIM) or unset LEAD_FROM_EMAIL to fall back to the sandbox sender.",
  );
}

// --------------------------------------------------------------- send check
if (process.argv.includes("--send")) {
  console.log(`  sending a test email to ${to} ...`);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Velex lead form — delivery preflight",
      html:
        "<p>This is <strong>verify:resend</strong> confirming the lead form can " +
        "deliver.</p><p>If you are reading this in the inbox that should receive " +
        "enquiries, the configuration is correct.</p>",
    }),
  });
  const body = await res.json().catch(() => null);

  if (res.ok) {
    console.log(`    OK    accepted by Resend (id ${body?.id ?? "unknown"})`);
    console.log(`          Now CHECK ${to} — including spam — that it arrived.`);
  } else {
    errors.push(
      `Test send REJECTED (HTTP ${res.status}): ${body?.message ?? JSON.stringify(body)}`,
    );
  }
  console.log("");
} else {
  console.log("  (re-run with `-- --send` to send a real test email)");
  console.log("");
}

// ------------------------------------------------------------------ report
for (const w of warnings) console.warn(`  warn  ${w}\n`);
for (const e of errors) console.error(` ERROR  ${e}\n`);

if (errors.length > 0) {
  console.error(`verify:resend failed — ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(`verify:resend passed — ${warnings.length} warning(s).`);
