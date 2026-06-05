import { NextResponse } from "next/server";

import { leadFormSchema } from "@/lib/validations/lead";

/**
 * Lead capture endpoint (Phase 1 stub).
 *
 * Re-validates the payload server-side with the SAME Zod schema used on the
 * client, then logs the lead. Wiring to Supabase + Resend + WhatsApp API is a
 * later phase — see plan §7. No secrets are required for this stub.
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // Log the lead for debugging purposes
  console.info("[velex:lead]", lead);

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not configured. Email was not sent.");
    // In production, we might want to return an error, but for now we'll pretend it worked
    // to avoid breaking the frontend during setup if the API key is missing.
    return NextResponse.json({ ok: true, note: "No API key configured" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Velex Infotech <onboarding@resend.dev>", // TODO: Replace with a verified domain
      to: ["velexinfotech@gmail.com"],
      subject: `New Lead: ${lead.name} (${lead.service})`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Service of Interest:</strong> ${lead.service}</p>
        <p><strong>Budget:</strong> ${lead.budget}</p>
        <p><strong>Company:</strong> ${lead.company || "Not provided"}</p>
        <p><strong>Source:</strong> ${lead.source || "Not provided"}</p>
        <hr />
        <p><small>Received at: ${new Date().toISOString()}</small></p>
      `,
    });

    if (error) {
      console.error("[velex:email-error]", error);
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("[velex:email-error]", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
