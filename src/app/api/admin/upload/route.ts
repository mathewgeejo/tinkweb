import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

const acceptedTypes: Record<string, string> = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif" };
const maxBytes = 5 * 1024 * 1024;

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || !acceptedTypes[file.type] || file.size === 0 || file.size > maxBytes) {
    return NextResponse.json({ error: "Use a JPG, PNG, WEBP, or GIF image under 5 MB." }, { status: 400 });
  }
  const filename = `${randomUUID()}${acceptedTypes[file.type]}`;
  const destination = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(destination, { recursive: true });
  await fs.writeFile(path.join(destination, filename), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${filename}` });
}
