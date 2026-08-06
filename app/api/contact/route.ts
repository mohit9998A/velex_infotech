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

  try {
    const { data, error } = await resend.emails.send({
      // TODO(velex): switch to `leads@velexinfotech.com` once SPF + DKIM are
      // set up for the domain. `onboarding@resend.dev` is Resend's sandbox
      // sender and can only deliver to the account owner's own address, which
      // makes the recipient below load-bearing — any change to it fails
      // silently. Git history shows the verified domain worked before
      // (4b63f58) and was reverted for expediency (67d1aba).
      from: `${siteConfig.name} <onboarding@resend.dev>`,
      to: [siteConfig.leadInbox],
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

    if (error) {
      console.error("[velex:email-error]", error);
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    // Deliberately no console.info of the lead object. It carries name, email
    // and phone, and platform logs are a third-party sink — you cannot publish
    // a GDPR posture on one page while writing visitor phone numbers to it.
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("[velex:email-error]", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
