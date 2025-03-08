import { NextResponse } from "next/server";
import { generateSignedCvUrl } from "@/utils/CloudinaryCvUploads"; 

export async function GET() {
    try {
        const signedUrlData = generateSignedCvUrl();
        return NextResponse.json(signedUrlData);
    } catch (error) {
        console.error("Error generating signed URL:", error);
        return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 });
    }
}
