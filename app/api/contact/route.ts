import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import { formatBudget, leadFormSchema } from "@/lib/validations/lead";

/**
 * Lead capture endpoint.
 *
 * Re-validates the payload server-side with the SAME Zod schema used on the
 * client, then emails it.
 *
 * The Resend client is constructed per-request, not at module scope. Its
 * constructor throws when the key is absent, and module-scope evaluation
 * happens during `next build` page-data collection — so a missing
 * RESEND_API_KEY failed the whole build before the guard below could run.
 * Builds must not depend on runtime secrets being present.
 */

/**
 * Sender and recipient, both overridable at runtime.
 *
 * Env indirection is used HERE and nowhere else in this codebase for a
 * specific reason: these two strings are the difference between a lead
 * arriving and a lead being destroyed, and getting them wrong is invisible
 * until someone reads the platform logs. Making them settable in the Vercel
 * dashboard means verifying the domain in Resend is a DNS change plus two env
 * vars, rather than a code edit by whoever is available.
 *
 * The defaults are the pair that is known to work today.
 */
const SANDBOX_FROM = `${siteConfig.name} <onboarding@resend.dev>`;

/**
 * The last-resort pair. `onboarding@resend.dev` needs no domain verification
 * and `siteConfig.leadInbox` is the Resend account owner, so this combination
 * works on a brand-new account with nothing configured. It is what the retry
 * below falls back to when the primary send fails.
 */
const KNOWN_GOOD = { from: SANDBOX_FROM, to: siteConfig.leadInbox };

const PRIMARY = {
  from: process.env.LEAD_FROM_EMAIL || SANDBOX_FROM,
  to: process.env.LEAD_INBOX || siteConfig.leadInbox,
};

/** True when the primary pair is already the fallback — nothing to retry. */
const PRIMARY_IS_KNOWN_GOOD =
  PRIMARY.from === KNOWN_GOOD.from && PRIMARY.to === KNOWN_GOOD.to;

/**
 * Resend's ErrorResponse is a plain object, and `console.error(prefix, obj)`
 * on Vercel can render it as `[object Object]` — which is how a 403 saying
 * exactly what is wrong turns into an unreadable log line and a bug that
 * survives for weeks. Flatten it to a single string instead.
 */
function describeError(error: unknown): string {
  if (error && typeof error === "object") {
    const e = error as { name?: string; message?: string; statusCode?: number | null };
    if (e.message) {
      return `${e.name ?? "error"} (${e.statusCode ?? "no status"}): ${e.message}`;
    }
  }
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  return String(error);
}

/**
 * Lead values land inside an HTML email. `company`, `source` and `message`
 * accept arbitrary text up to 2000 characters, so without escaping this is
 * HTML injection into an inbox — at best a mangled email, at worst a
 * convincing phishing link rendered as legitimate content in your own mail
 * client.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // Honeypot: a real user never sees this field, so anything in it is a bot.
  // Return 200 so the bot believes it succeeded and doesn't retry, but send
  // nothing.
  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  if (!process.env.RESEND_API_KEY) {
    // Previously this returned { ok: true }, so the client saw res.ok and
    // showed "Request received — we'll respond within 24 hours." The lead
    // evaporated and the user was told the opposite. Fail loudly in
    // production so the form falls back to WhatsApp/email; stay permissive in
    // development so local work isn't blocked, but make the state visible.
    if (process.env.NODE_ENV === "production") {
      console.error("[velex:lead] RESEND_API_KEY missing — lead NOT delivered");
      return NextResponse.json(
        { ok: false, error: "Mail transport unavailable" },
        { status: 503 },
      );
    }
    console.warn("[velex:lead] RESEND_API_KEY missing — email skipped (dev)");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const row = (label: string, value: string) =>
    `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`;

  const html = `
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
      `;

  const send = (route: { from: string; to: string }) =>
    resend.emails.send({
      from: route.from,
      to: [route.to],
      replyTo: lead.email,
      subject: `New Lead: ${lead.name} (${lead.service})`,
      html,
    });

  try {
    const { data, error } = await send(PRIMARY);

    if (!error) {
      // Deliberately no console.info of the lead object. It carries name, email
      // and phone, and platform logs are a third-party sink — you cannot publish
      // a GDPR posture on one page while writing visitor phone numbers to it.
      return NextResponse.json({ ok: true, data });
    }

    console.error(
      `[velex:email-error] primary send failed (${PRIMARY.from} -> ${PRIMARY.to}): ` +
        describeError(error),
    );

    // A misconfigured sender or recipient must not cost a real enquiry. Retry
    // once on the pair that needs no domain verification. This is why the
    // recipient is not read from env alone: an env var typo would otherwise
    // silently destroy every lead until someone noticed.
    if (PRIMARY_IS_KNOWN_GOOD) {
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    const retry = await send(KNOWN_GOOD);
    if (retry.error) {
      console.error(
        `[velex:email-error] fallback send ALSO failed (${KNOWN_GOOD.from} -> ` +
          `${KNOWN_GOOD.to}): ${describeError(retry.error)}`,
      );
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    console.warn(
      "[velex:lead] primary route rejected; lead delivered via fallback inbox. " +
        "Fix LEAD_FROM_EMAIL / LEAD_INBOX — run `npm run verify:resend`.",
    );
    return NextResponse.json({ ok: true, data: retry.data, viaFallback: true });
  } catch (error) {
    console.error(`[velex:email-error] transport threw: ${describeError(error)}`);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
