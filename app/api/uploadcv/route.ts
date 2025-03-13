import { NextRequest, NextResponse } from "next/server";
import { generateSignedUrl } from "@/utils/CloudinaryCvUploads";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { fileType } = await req.json();

    if (!fileType) {
      return NextResponse.json({ success: false, error: "File type is required" }, { status: 400 });
    }

    // Generate signed URL and credentials for Cloudinary upload
    const uploadCredentials = generateSignedUrl();

    return NextResponse.json({
      success: true,
      ...uploadCredentials
    });

  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}


//update resume link
export async function PUT(req: Request) {
  try {
    const { id, resumeUrl } = await req.json();

    // Ensure user ID is provided
    if (!id) {
      return NextResponse.json({ success: false, message: "User ID is required." }, { status: 400 });
    }

    await db
      .update(users)
      .set({ resumeUrl: resumeUrl })
      .where(eq(users.id, id));

    return NextResponse.json({ success: true, message: "Resume Update Succesfully" });
  }catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ success: false, message: "Failed to update profile." }, { status: 500 });
  }

}