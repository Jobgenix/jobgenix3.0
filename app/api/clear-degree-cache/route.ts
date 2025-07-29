import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  await redis.del("degressUploadFormat");
  return NextResponse.json({ success: true });
}
