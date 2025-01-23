"use client";
import { useState } from "react";
import { CldImage } from 'next-cloudinary';
import { CloudinaryUploadReturnObject } from "@/types/cloudinaryUpload";

const CloudinaryUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    async function fetchSignedUrl() {
        const res = await fetch("/api/job/get-upload-link");
        const signedUrl: CloudinaryUploadReturnObject = await res.json();
        return signedUrl;
    }


    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file.");
            return;
        }

        setUploading(true);
        setError(null);

        try {
            // Generate signed URL
            const signedUrl = await fetchSignedUrl();

            // Create FormData for upload
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", signedUrl.api_key);
            formData.append("timestamp", signedUrl.timestamp.toString());
            formData.append("signature", signedUrl.signature);
            formData.append("folder", signedUrl.folder);

            // Upload to Cloudinary
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${signedUrl.cloud_name}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            setImageUrl(data.secure_url); // Store uploaded image URL
        } catch (error) {
            setError("Upload failed. Please try again.");
            console.log(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border" />
            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
                {uploading ? "Uploading..." : "Upload Logo"}
            </button>
            {imageUrl && (
                <div className="mt-4">
                    <p>Uploaded Logo:</p>
                    <CldImage src={imageUrl} alt="Uploaded Logo" height={100} width={100} className="w-18 h-18 object-contain mt-2" crop={{ type: 'auto', source: true }} />
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default CloudinaryUpload;
