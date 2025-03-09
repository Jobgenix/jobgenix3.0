import { v2 as cloudinary } from "cloudinary";

/**
 * Generate a signed URL for uploading a CV to Cloudinary
 */
export const generateSignedCvUrl = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "cv-uploads";

    const paramsToSign = {
        timestamp,
        folder,
        resource_type: "raw", // Allow DOCX, PDF, etc.
    };

    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET!
    );

    return {
        signature,
        api_key: process.env.CLOUDINARY_API_KEY!,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET!,
        timestamp,
        folder,
    };
};
