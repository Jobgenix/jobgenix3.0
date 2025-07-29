import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blog, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const { title, content, tags,featuredImage,category } = await req.json();
    const authorId = session.user.id;

    // Validate input
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Optional: Ensure content is valid JSON
    if (typeof content !== "object") {
      return NextResponse.json(
        { error: "Content must be a valid JSON object" },
        { status: 400 }
      );
    }
    // Check if author exists and has roleId = 4
    const userRole = await db
      .select({ roleId: users.roleId })
      .from(users)
      .where(eq(users.id, authorId));

    if (!userRole || userRole.length === 0) {
      return NextResponse.json(
        { error: "User not found!" },
        { status: 404 }
      );
    }

    if (userRole[0].roleId !== "4") {
      return NextResponse.json(
        { error: "User does not have permission" },
        { status: 403 }
      );
    }

    // Insert blog
    const newBlog = await db
      .insert(blog)
      .values({
        title,
        content,
        tags: tags || [], // optional tags
        authorId,
        featuredImage,
        category
      })
      .returning();

    return NextResponse.json({ success: true, data: newBlog[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}


