#!/usr/bin/env node
/**
 * SMTP delivery preflight.
 *
 * The lead form's worst failure mode is a silent one: the route runs,
 * validation passes, the visitor sees a spinner, and the mail server refuses
 * the send for a reason visible only in a platform log nobody reads. That is
 * exactly what happened under the previous Resend transport — fc01991 changed
 * the recipient to an address the sandbox sender was not allowed to reach, and
 * every lead was rejected with a 403 until it was found by hand.
 *
 * This script exists so "will a lead actually arrive?" has a one-command
 * answer. It resolves configuration the same way lib/mail.ts does, so what it
 * reports is what production will do.
 *
 * Usage:
 *   npm run verify:smtp              # resolve config + handshake with the server
 *   npm run verify:smtp -- --send    # also deliver a real test email
 *
 * Run it with the values from the Vercel dashboard to check production, or
 * against .env.local to check your machine.
 *
 * Parsed with regex rather than imported, matching scripts/verify-content.mjs:
 * this must run without a TypeScript toolchain on a clean checkout.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { createTransport } from "nodemailer";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// `next dev` loads .env.local automatically; a bare node script does not. Read
// it here so the preflight and the running app agree about configuration
// instead of disagreeing for an invisible reason.
const envFile = join(root, ".env.local");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!match) continue;
    let [, key, value] = match;
    value = value.trim();
    // Strip one layer of matching quotes, mirroring dotenv.
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
      (value.startsWith("'") && value.endsWith("'") && value.length > 1)
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
  console.log("  (loaded .env.local)");
}

const siteSource = readFileSync(join(root, "config/site.ts"), "utf8");
const field = (name) =>
  siteSource.match(new RegExp(`^\\s*${name}:\\s*"([^"]*)"`, "m"))?.[1];

const siteName = field("name");
const leadInbox = field("leadInbox");

if (!leadInbox || !siteName) {
  console.error(" ERROR  could not parse `name` / `leadInbox` from config/site.ts");
  process.exit(1);
}

const errors = [];
const warnings = [];

// ------------------------------------------------------------------ resolve
// Kept byte-for-byte in step with resolveMailConfig() in lib/mail.ts. If the
// two drift, this script starts certifying a configuration the route does not
// use, which is worse than having no preflight at all.
const user = process.env.SMTP_USER?.trim();
const password = process.env.SMTP_PASSWORD;
const host = process.env.SMTP_HOST?.trim() || "smtp.hostinger.com";
const port = Number(process.env.SMTP_PORT) || 465;
const secure = port === 465;
const from = process.env.LEAD_FROM_EMAIL?.trim() || `${siteName} <${user ?? "?"}>`;
const to = process.env.LEAD_INBOX?.trim() || leadInbox;
const autoReply = process.env.LEAD_AUTOREPLY === "1" || process.env.LEAD_AUTOREPLY === "true";

const bare = (v) => v.match(/<([^>]+)>/)?.[1]?.trim() ?? v.trim();

console.log("SMTP lead delivery preflight");
console.log("----------------------------");
console.log(`  host        ${host}:${port}  (secure=${secure})`);
console.log(`  user        ${user ?? "(unset)"}`);
console.log(`  from        ${from}${process.env.LEAD_FROM_EMAIL ? "  (LEAD_FROM_EMAIL)" : "  (default)"}`);
console.log(`  to          ${to}${process.env.LEAD_INBOX ? "  (LEAD_INBOX)" : "  (config/site.ts leadInbox)"}`);
console.log(`  auto-reply  ${autoReply ? "ENABLED" : "off"}`);
if (process.env.LEAD_MAIL_DISABLED === "1" || process.env.LEAD_MAIL_DISABLED === "true") {
  console.log("  kill switch LEAD_MAIL_DISABLED IS SET — the route refuses all sends");
}
console.log("");

if (!user || !password) {
  const missing = [!user && "SMTP_USER", !password && "SMTP_PASSWORD"].filter(Boolean);
  console.error(` ERROR  ${missing.join(" and ")} not set in this shell.`);
  console.error("        In production this makes the route return 503 and the form fall");
  console.error("        back to WhatsApp. Set them in .env.local, or copy from the Vercel");
  console.error("        dashboard (Settings > Environment Variables) and re-run.");
  process.exit(1);
}

// The single most likely misconfiguration in the whole migration. Most SMTP
// hosts, Hostinger included, reject a MAIL FROM that is not the authenticated
// mailbox with a 550/553 — and nothing about the previous Resend setup, where
// the sender and the API key were unrelated, prepares you for it.
if (bare(from) !== user) {
  errors.push(
    `LEAD_FROM_EMAIL sends as "${bare(from)}" but authenticates as "${user}". ` +
      "Most SMTP hosts reject this with 550/553. Either unset LEAD_FROM_EMAIL " +
      "or make its address match SMTP_USER exactly.",
  );
}

// Next expands $VAR inside .env files (escape as \$) while the Vercel dashboard
// stores $ literally. A value that still carries a backslash almost always
// means the .env-escaped form was pasted into the dashboard, which
// authenticates in one environment and fails forever in the other with the
// same string visible in both UIs.
if (password.includes("\\")) {
  warnings.push(
    "SMTP_PASSWORD contains a backslash. If it was escaped for a .env file " +
      "(\\$), the Vercel dashboard needs the UNESCAPED form. Simplest fix: " +
      "regenerate the mailbox password in hPanel as 24 alphanumeric characters " +
      "and delete this whole class of problem.",
  );
}

if (port !== 465 && port !== 587) {
  warnings.push(`SMTP_PORT is ${port}; Hostinger expects 465 (SSL) or 587 (TLS).`);
}

// ---------------------------------------------------------------- handshake
const transporter = createTransport({
  host,
  port,
  secure,
  auth: { user, pass: password },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
});

console.log(`  connecting to ${host}:${port} ...`);
try {
  await transporter.verify();
  console.log("    OK    server accepted the connection and credentials");
} catch (error) {
  const code = error?.code ?? error?.name ?? "UNKNOWN";
  const status = error?.responseCode ? ` SMTP ${error.responseCode}` : "";
  errors.push(`Handshake FAILED (${code}${status}): ${error?.message ?? error}`);

  if (code === "EAUTH" || error?.responseCode === 535) {
    errors.push(
      "Authentication was rejected. Use the MAILBOX password for " +
        `${user}, not the Hostinger control-panel password.`,
    );
  }
  if (code === "ECONNECTION" || code === "ETIMEDOUT" || code === "ESOCKET") {
    errors.push(
      `Could not reach ${host}:${port}. Check the host and port, and that ` +
        "outbound 465 is not blocked on this network.",
    );
  }
}
console.log("");

// --------------------------------------------------------------- send check
if (process.argv.includes("--send") && errors.length === 0) {
  console.log(`  sending a test email to ${to} ...`);
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject: "Velex lead form — delivery preflight",
      html:
        "<p>This is <strong>verify:smtp</strong> confirming the lead form can " +
        "deliver.</p><p>If you are reading this in the inbox that should receive " +
        "enquiries, the configuration is correct.</p>",
    });
    console.log(`    OK    accepted by ${host} (id ${info.messageId ?? "unknown"})`);
    console.log(`          Now CHECK ${to} — including spam — that it arrived.`);
  } catch (error) {
    errors.push(
      `Test send REJECTED (${error?.code ?? "UNKNOWN"}` +
        `${error?.responseCode ? ` SMTP ${error.responseCode}` : ""}): ${error?.message ?? error}`,
    );
  }
  console.log("");
} else if (!process.argv.includes("--send")) {
  console.log("  (re-run with `-- --send` to deliver a real test email)");
  console.log("");
}

transporter.close();

// ------------------------------------------------------------------ report
for (const w of warnings) console.warn(`  warn  ${w}\n`);
for (const e of errors) console.error(` ERROR  ${e}\n`);

if (errors.length > 0) {
  console.error(`verify:smtp failed — ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(`verify:smtp passed — ${warnings.length} warning(s).`);
