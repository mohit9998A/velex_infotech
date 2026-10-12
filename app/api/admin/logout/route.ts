import { NextResponse } from "next/server";
import { clearAdminCookie, getAdminSession } from "@/lib/auth";

export async function POST() {
  await clearAdminCookie();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const session = await getAdminSession();
  return NextResponse.json({ authenticated: !!session, session });
}
