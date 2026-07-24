import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, adminCookieOptions, clearAttempts, clientAllowed, isAdminConfigured, passwordIsValid, registerFailedAttempt, sessionToken } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!isAdminConfigured()) return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503 });
  if (!clientAllowed(client)) return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.password !== "string" || !passwordIsValid(body.password)) {
    registerFailedAttempt(client);
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
  clearAttempts(client);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, sessionToken(), adminCookieOptions);
  return response;
}
