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

    return NextResponse.json({ success: true, message: "Resume Updated Successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ success: false, message: "Failed to update profile." }, { status: 500 });
  }
}

// Delete resume
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Ensure user ID is provided
    if (!id) {
      return NextResponse.json({ success: false, message: "User ID is required." }, { status: 400 });
    }

    // Set the resumeUrl field to null in the database
    await db
      .update(users)
      .set({ resumeUrl: null })
      .where(eq(users.id, id));

    return NextResponse.json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json({ success: false, message: "Failed to delete resume." }, { status: 500 });
  }
}