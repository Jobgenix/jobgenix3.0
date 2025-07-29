import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blog } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }
    const result = await db.select().from(blog).where(eq(blog.id, id));
    if (!result.length) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
