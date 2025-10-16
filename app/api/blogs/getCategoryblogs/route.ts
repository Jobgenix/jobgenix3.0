import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blog, users } from "@/lib/schema";
import { desc, eq, and, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);
    const offset = (page - 1) * limit;
    console.log("category:", category);

    // Get total count of blogs
    const totalBlogs = await db.select().from(blog);
    const totalCount = totalBlogs.length;

    // Build where conditions dynamically
    const conditions = [];

    if (category) {
      conditions.push(
        sql`LOWER(TRIM(${blog.category})) = ${category.trim().toLowerCase()}`
      );
    }

    if (subcategory && subcategory !== "undefined") {
      conditions.push(
        eq(
          sql`LOWER(TRIM(${blog.subcategory}))`,
          subcategory.toLowerCase().trim()
        )
      );
    }

    const query = db
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
      .leftJoin(users, eq(blog.authorId, users.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(blog.createdAt))
      .limit(limit)
      .offset(offset);
    const blogs = await query;

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
