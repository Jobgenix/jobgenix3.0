import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blog, users } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);
    const offset = (page - 1) * limit;

    // Get total count of blogs
    const totalBlogs = await db.select().from(blog);
    const totalCount = totalBlogs.length;

    // Fetch blogs with author details (JOIN)
    const blogs = await db
      .select({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        featuredImage: blog.featuredImage,
        createdAt: blog.createdAt,
        authorId: blog.authorId,
        authorName: users.name,
        authorImage: users.image,
      })
      .from(blog)
      .leftJoin(users, eq(blog.authorId, users.id)) // LEFT JOIN to get author details
      .orderBy(desc(blog.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      success: true,
      data: blogs,
      total: totalCount,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
