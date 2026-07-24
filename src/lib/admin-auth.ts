import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "th_scet_admin";
const sessionHours = 12;
const attempts = new Map<string, { count: number; resetAt: number }>();

function secret() { return process.env.ADMIN_SESSION_SECRET ?? ""; }
function password() { return process.env.ADMIN_PASSWORD ?? ""; }
function digest(value: string) { return createHash("sha256").update(value).digest(); }

export function isAdminConfigured() { return Boolean(password() && secret()); }

export function passwordIsValid(value: string) {
  if (!isAdminConfigured()) return false;
  return timingSafeEqual(digest(value), digest(password()));
}

export function clientAllowed(key: string) {
  const now = Date.now();
  const state = attempts.get(key);
  if (!state || state.resetAt < now) { attempts.set(key, { count: 0, resetAt: now + 15 * 60 * 1000 }); return true; }
  return state.count < 5;
}

export function registerFailedAttempt(key: string) {
  const state = attempts.get(key) ?? { count: 0, resetAt: Date.now() + 15 * 60 * 1000 };
  state.count += 1;
  attempts.set(key, state);
}

export function clearAttempts(key: string) { attempts.delete(key); }

export function sessionToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + sessionHours * 60 * 60 * 1000 })).toString("base64url");
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function validSession(token?: string) {
  if (!token || !isAdminConfigured()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try { return Number(JSON.parse(Buffer.from(payload, "base64url").toString("utf8")).exp) > Date.now(); } catch { return false; }
}

export async function hasAdminSession() { return validSession((await cookies()).get(cookieName)?.value); }
export const adminCookieName = cookieName;
export const adminCookieOptions = { httpOnly: true, sameSite: "strict" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: sessionHours * 60 * 60 };
