import { NextResponse } from "next/server";

import { leadFormSchema } from "@/lib/validations/lead";

/**
 * Lead capture endpoint (Phase 1 stub).
 *
 * Re-validates the payload server-side with the SAME Zod schema used on the
 * client, then logs the lead. Wiring to Supabase + Resend + WhatsApp API is a
 * later phase — see plan §7. No secrets are required for this stub.
 */
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

  // TODO(phase-2): persist to Supabase, notify team via Resend, ping CEO on WhatsApp.
  console.info("[velex:lead]", {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    service: lead.service,
    budget: lead.budget,
    company: lead.company || "—",
    source: lead.source || "—",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
