import { createTransport } from "nodemailer";
import type { Transporter } from "nodemailer";

import { siteConfig } from "@/config/site";
import { formatBudget, type LeadFormValues } from "@/lib/validations/lead";

/**
 * SMTP transport for lead notifications.
 *
 * WHY SMTP AND NOT RESEND
 *
 * The previous transport sent from Resend's sandbox sender
 * `onboarding@resend.dev`, which may only deliver to the address the Resend
 * account is registered under. Commit fc01991 rewrote the hard-coded recipient
 * into `siteConfig.leadInbox` and changed the value in the same edit, so every
 * send afterwards came back 403 and every lead was lost until it was noticed.
 * Sending through the company's own mailbox removes that class of bug: there is
 * no sandbox, the recipient is unconstrained, and the domain is already
 * SPF/DKIM-signed by the mail host.
 *
 * ENVIRONMENT CONTRACT
 *
 *   SMTP_HOST                 optional, default smtp.hostinger.com
 *   SMTP_PORT                 optional, default 465
 *   SMTP_USER                 REQUIRED, no default (see below)
 *   SMTP_PASSWORD             REQUIRED, no default — mark Sensitive in Vercel
 *   LEAD_FROM_EMAIL           optional, default `Velex Infotech <SMTP_USER>`
 *   LEAD_INBOX                optional, default siteConfig.leadInbox
 *   LEAD_AUTOREPLY            optional, default OFF
 *   LEAD_MAIL_DISABLED        optional, default off — operator kill switch
 *   LEAD_MAX_SENDS_PER_HOUR   optional, default 20   (see lib/rate-limit.ts)
 *   LEAD_MAX_SENDS_PER_DAY    optional, default 40   (see lib/rate-limit.ts)
 *   SMTP_DEBUG                optional — ignored in production
 *
 * `SMTP_USER` deliberately has NO default even though the value is known. A
 * deploy with the password missing but the user defaulted would authenticate as
 * a real mailbox with a wrong password on every single request, which is
 * exactly how a mail host decides it is being brute-forced and locks the
 * account. Required-with-no-default turns half-configuration into a clean 503.
 *
 * Verify the whole contract against the live server with `npm run verify:smtp`.
 */

const DEFAULT_HOST = "smtp.hostinger.com";
const DEFAULT_PORT = 465;

export interface MailConfig {
  host: string;
  port: number;
  /**
   * Derived from the port, never configured independently. A mismatched
   * secure/port pair is the most common SMTP misconfiguration there is, and its
   * symptom is a HANG until the greeting timeout rather than an error — which
   * is indistinguishable from a network fault and sends you debugging the wrong
   * thing. One knob, one failure mode.
   */
  secure: boolean;
  user: string;
  password: string;
  from: string;
  to: string;
  autoReply: boolean;
}

export type MailConfigResult =
  | { ok: true; config: MailConfig }
  | { ok: false; missing: string[] };

function isOn(value: string | undefined): boolean {
  return value === "1" || value?.toLowerCase() === "true";
}

/** True when the operator has pulled the kill switch. */
export function mailDisabled(): boolean {
  return isOn(process.env.LEAD_MAIL_DISABLED);
}

/** Extract the bare address from a `Name <addr@host>` header value. */
export function bareAddress(value: string): string {
  return value.match(/<([^>]+)>/)?.[1]?.trim() ?? value.trim();
}

export function resolveMailConfig(env: NodeJS.ProcessEnv = process.env): MailConfigResult {
  const missing: string[] = [];
  const user = env.SMTP_USER?.trim();
  const password = env.SMTP_PASSWORD;

  if (!user) missing.push("SMTP_USER");
  if (!password) missing.push("SMTP_PASSWORD");
  if (!user || !password) return { ok: false, missing };

  const port = Number(env.SMTP_PORT) || DEFAULT_PORT;

  return {
    ok: true,
    config: {
      host: env.SMTP_HOST?.trim() || DEFAULT_HOST,
      port,
      secure: port === 465,
      user,
      password,
      from: env.LEAD_FROM_EMAIL?.trim() || `${siteConfig.name} <${user}>`,
      to: env.LEAD_INBOX?.trim() || siteConfig.leadInbox,
      autoReply: isOn(env.LEAD_AUTOREPLY),
    },
  };
}

/**
 * Build a transport for a single request.
 *
 * NOT a module-scope singleton, for two independent reasons. Module scope is
 * evaluated during `next build` page-data collection, so anything that reads or
 * validates credentials there makes the build depend on runtime secrets — the
 * bug the Resend client was already restructured to avoid. And a serverless
 * instance is frozen between invocations, so a pooled connection is a socket
 * that the far end has long since closed; reusing it produces intermittent
 * ECONNRESET for no measurable saving, since `pool: false` opens a fresh
 * connection per `sendMail` anyway.
 */
export function createMailTransport(config: MailConfig): Transporter {
  return createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
    // Without explicit timeouts a stalled handshake holds the socket open until
    // the platform kills the function, burning the entire maxDuration budget on
    // one request and returning nothing useful to the visitor.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    // Never in production: this writes the full SMTP conversation, including
    // the recipient address, to the platform log.
    logger: process.env.NODE_ENV !== "production" && isOn(process.env.SMTP_DEBUG),
    debug: process.env.NODE_ENV !== "production" && isOn(process.env.SMTP_DEBUG),
  });
}

/**
 * Lead values land inside an HTML email. `company`, `source` and `message`
 * accept arbitrary text up to 2000 characters, so without escaping this is HTML
 * injection into an inbox — at best a mangled email, at worst a convincing
 * phishing link rendered as legitimate content in your own mail client.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ------------------------------------------------------------ error taxonomy

export interface MailFailure {
  /** Single-line, safe to log. Never contains lead PII. */
  log: string;
  /** True when retrying this exact send could plausibly succeed later. */
  transient: boolean;
}

interface SmtpErrorish {
  code?: string;
  responseCode?: number;
  command?: string;
  message?: string;
  name?: string;
}

/**
 * Flatten a nodemailer error into one diagnostic line.
 *
 * The predecessor of this function was written for Resend's plain-object
 * ErrorResponse and did `console.error(prefix, obj)`, which the platform log
 * renders as `[object Object]` — that is how a 403 stating the exact problem
 * became weeks of an unexplained 500. Nodemailer throws real Errors carrying
 * `code`, `responseCode` and `command`; those three fields are the entire
 * diagnosis, so they are named explicitly rather than hoped for.
 */
export function describeMailError(error: unknown): MailFailure {
  const e = (error ?? {}) as SmtpErrorish;
  const code = e.code ?? e.name ?? "UNKNOWN";
  const status = e.responseCode;
  const detail = [
    code,
    status ? `SMTP ${status}` : null,
    e.command ? `at ${e.command}` : null,
    e.message,
  ]
    .filter(Boolean)
    .join(" | ");

  let hint: string;
  let transient = false;

  switch (code) {
    case "EAUTH":
      // The password is the overwhelmingly likely cause, and there is a
      // specific trap worth naming: Next expands `$VAR` inside .env files
      // (escape as \$) while the Vercel dashboard stores `$` literally. Pasting
      // the escaped form into Vercel authenticates locally and fails forever in
      // production, with the same value visible in both UIs. The length and the
      // backslash flag identify that instantly and leak nothing usable.
      hint =
        `check SMTP_USER / SMTP_PASSWORD — password length=` +
        `${process.env.SMTP_PASSWORD?.length ?? 0} ` +
        `containsBackslash=${process.env.SMTP_PASSWORD?.includes("\\") ?? false} ` +
        `(a backslash here usually means the .env-escaped form was pasted into Vercel)`;
      break;
    case "ECONNECTION":
    case "ESOCKET":
      hint = "check SMTP_HOST / SMTP_PORT, and that 465 is not blocked outbound";
      transient = true;
      break;
    case "ETIMEDOUT":
    case "EDNS":
      hint = "network or host unreachable";
      transient = true;
      break;
    case "EENVELOPE":
      hint =
        status === 550 || status === 553
          ? "sender rejected — LEAD_FROM_EMAIL must be the authenticated mailbox (SMTP_USER)"
          : "recipient or sender rejected — check LEAD_INBOX";
      break;
    default:
      if (status === 421 || status === 450 || status === 451) {
        hint = "mail host is throttling — sending quota may be exhausted";
        transient = true;
      } else if (status === 535) {
        hint = "authentication rejected — check SMTP_PASSWORD";
      } else {
        hint = "unclassified SMTP failure";
      }
  }

  return { log: `${detail} — ${hint}`, transient };
}

// ----------------------------------------------------------------- send paths

function row(label: string, value: string): string {
  return `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`;
}

/**
 * The notification to the business. This is the send the 200 asserts, so the
 * caller must await it and let its outcome decide the status code.
 */
export async function sendLeadNotification(
  transporter: Transporter,
  config: MailConfig,
  lead: LeadFormValues,
): Promise<void> {
  await transporter.sendMail({
    from: config.from,
    to: config.to,
    // Replying to the notification reaches the lead rather than the mailbox
    // talking to itself.
    replyTo: lead.email,
    subject: `New Lead: ${lead.name} (${lead.service})`,
    html: `
        <h2>New Consultation Request</h2>
        ${row("Name", lead.name)}
        ${row("Email", lead.email)}
        ${row("Phone", lead.phone)}
        ${row("Service of Interest", lead.service)}
        ${row("Budget", formatBudget(lead.budget, lead.currency))}
        ${row("Company", lead.company || "Not provided")}
        ${row("Source", lead.source || "Not provided")}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(lead.message || "Not provided").replace(/\n/g, "<br />")}</p>
        <hr />
        <p><small>Received at: ${new Date().toISOString()}</small></p>
      `,
  });
}

/**
 * Courtesy acknowledgement to the visitor. Disabled unless LEAD_AUTOREPLY is
 * set, and it should stay disabled until an edge rate-limit rule is in place.
 *
 * This send is far more dangerous than the notification, because the recipient
 * is chosen by whoever posted the form. It emits SPF-passing, DKIM-signed mail
 * from velexinfotech.com to an arbitrary address, so an unguarded version turns
 * the endpoint into a spam reflector and converts a mailbox-quota problem into
 * a domain-reputation problem. A suspended mailbox is a support ticket; a
 * blacklisted sending domain degrades every email the company sends for months.
 *
 * Hence: only the name is echoed, never the message. `name` is constrained by
 * leadFormSchema to letters, spaces, hyphens and apostrophes with a maximum of
 * 80 characters, which leaves no room for a usable payload — whereas `message`
 * accepts 2000 arbitrary characters and would deliver an attacker's text
 * verbatim, signed by this domain, to a victim of their choosing. It is escaped
 * regardless, so the guarantee survives the regex ever being loosened.
 */
export async function sendLeadAutoReply(
  transporter: Transporter,
  config: MailConfig,
  lead: LeadFormValues,
): Promise<void> {
  await transporter.sendMail({
    from: config.from,
    to: lead.email,
    subject: `Thank you for contacting ${siteConfig.name}`,
    // RFC 3834. Without these, a submitted address whose own mailbox
    // auto-replies bounces messages back and forth with this one until a
    // provider suspends one of them. It is trivially triggerable and there is
    // no signal that it is happening until the mailbox is gone.
    headers: {
      "Auto-Submitted": "auto-replied",
      "X-Auto-Response-Suppress": "All",
      Precedence: "auto_reply",
    },
    html: `
        <h2>Thank you, ${escapeHtml(lead.name)}</h2>
        <p>We have received your consultation request and the ${escapeHtml(
          siteConfig.name,
        )} team will respond within one business day.</p>
        <p>If it is urgent, message us on WhatsApp: <a href="${siteConfig.whatsapp}">${
          siteConfig.phoneDisplay
        }</a>.</p>
        <hr />
        <p><small>This is an automated acknowledgement — please do not reply to it.
        To reach us, write to ${escapeHtml(siteConfig.email)}.</small></p>
      `,
  });
}
