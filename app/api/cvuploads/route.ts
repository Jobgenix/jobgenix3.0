import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db"; // Import drizzle instance
import { users } from "@/lib/schema"; // Import user schema
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const userId = formData.get("userId") as string; // Get userId from form

        if (!file || !userId) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(base64File, {
            folder: "resumes",
            resource_type: "auto",
        });

        if (!uploadResponse.secure_url) {
            return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
        }

        // Update user resume URL in database
        await db.update(users)
            .set({ resumeUrl: uploadResponse.secure_url })
            .where(eq(users.id, userId));

        return NextResponse.json({
            message: "File uploaded successfully",
            fileUrl: uploadResponse.secure_url,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
