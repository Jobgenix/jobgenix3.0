/*eslint-disable*/
import { CloudinaryUploadReturnObject } from "@/types/cloudinaryUpload";
import { generateSignedUrl } from "@/utils/cloudinaryUpload";
import { NextRequest, NextResponse } from "next/server";

async function getUploadLink(req: NextRequest) {
    try {
        const signedUrl: CloudinaryUploadReturnObject = generateSignedUrl("logos");
        return new NextResponse(JSON.stringify(signedUrl), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "server_error", message: error }), { status: 500 });
    }
}

export { getUploadLink as GET };