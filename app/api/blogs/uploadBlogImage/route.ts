import { NextRequest, NextResponse } from "next/server";
import { generateSignedUrl } from "@/utils/CloudinaryCvUploads";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const authorId = session.user.id;

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
    const { fileType } = await req.json();
    if (!fileType) {
      return NextResponse.json({ success: false, error: "File type is required" }, { status: 400 });
    }
    // Generate signed URL and credentials for Cloudinary upload (blog-featured-images folder)
    const uploadCredentials = generateSignedUrl("blog-featured-images");
    return NextResponse.json({
      success: true,
      ...uploadCredentials
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
} 