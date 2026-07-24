import { NextResponse } from "next/server";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await readContent(), { headers: { "Cache-Control": "no-store" } });
}
