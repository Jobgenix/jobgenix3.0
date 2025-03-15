
import { NextResponse } from "next/server";

export async function POST(req : Request) {
  console.log("Received request at /api/cvextract");
  return NextResponse.json({ message: "API is working!" });
}
