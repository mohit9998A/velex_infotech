import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";
import { signAdminToken, setAdminCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const defaultEmail = process.env.ADMIN_EMAIL || "velexinfotech@gmail.com";
    const defaultPassword = process.env.ADMIN_PASSWORD || "MohitPrabh26";

    let isValid = false;

    // Check DB first if available
    try {
      const db = await getDb();
      if (db) {
        const user = await db.collection("users").findOne({ email });
        if (user && user.passwordHash) {
          isValid = await bcrypt.compare(password, user.passwordHash);
        }
      }
    } catch (dbErr) {
      console.warn("MongoDB connection failed during login, falling back to env credentials:", dbErr);
    }

    // Fallback to env / default credentials
    if (!isValid && email.toLowerCase() === defaultEmail.toLowerCase()) {
      if (password === defaultPassword) {
        isValid = true;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signAdminToken({ email });
    await setAdminCookie(token);

    return NextResponse.json({ ok: true, email });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
