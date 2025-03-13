"use client"; // Required for App Router in Next.js

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// API Endpoints
const API_UPLOAD_CV = "/api/uploadcv";
const API_PROFILE_INFO = "/api/profileInfo/";

export default function UploadCv() {
    const { data: session, status } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const userId = session?.user?.id;

    // Fetch User CV on Component Mount
    useEffect(() => {
        if (status === "authenticated" && userId) {
            fetchUserCV();
        }
    }, [status, userId]);

    // Fetch Resume from Profile API
    const fetchUserCV = async () => {
        try {
            if (!userId) return;

            const response = await fetch(API_PROFILE_INFO);
            if (!response.ok) throw new Error("Failed to fetch user CV");

            const data = await response.json();
            if (data.resume_url) {
                setFileUrl(data.resume_url);
                setFileName(data.resume_url.split("/").pop() || "Uploaded CV");
            }
        } catch (error) {
            console.error("Error fetching CV:", error);
        }
    };

    // Trigger File Input
    const upload = () => {
        fileInputRef.current?.click();
    };

    // Handle File Selection
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            await uploadFileToBackend(file);
        }
    };

    // Save Resume URL to Database
    const handleSave = async (resumeUrl: string) => {
        try {
            const response = await fetch(API_UPLOAD_CV, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userId, resumeUrl }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update profile.");

            toast.success(result.message);
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    // Upload File to Cloudinary & Save URL
    const uploadFileToBackend = async (file: File) => {
        setLoading(true);

        try {
            const signedResponse = await fetch(API_UPLOAD_CV, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileType: file.type }),
            });

            if (!signedResponse.ok) throw new Error("Failed to get signed URL");

            const signedData = await signedResponse.json();
            if (!signedData.success) throw new Error("Failed to get upload credentials");

            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", signedData.api_key);
            formData.append("timestamp", signedData.timestamp);
            formData.append("signature", signedData.signature);
            formData.append("folder", signedData.folder);

            const response = await fetch("https://api.cloudinary.com/v1_1/dxrcsss4k/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || "Upload failed");

            handleSave(data.secure_url);
            setFileUrl(data.secure_url);
            return data.secure_url;

        } catch (error) {
            console.error("Upload Error:", error);
            toast.error("Failed to upload file. Please try again.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sm:mt-5 ml-6 xl:mt-[-5%] xl:ml-20 w-[90%] bg-[#e6f6ec] rounded-lg p-4 my-6">
            {/* Header Section */}
            <div className="header flex flex-col sm:flex-row sm:h-10 items-center gap-2 sm:gap-0">
                <h1 className="font-semibold text-lg sm:text-xl ml-0 sm:ml-5 text-center sm:text-left">
                    CV/Resume Management
                </h1>
                <button
                    className="bg-[#01a768] p-2 w-full sm:w-40 sm:ml-auto sm:mr-5 rounded-lg text-white"
                    onClick={upload}
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "↑ Upload your CV"}
                </button>
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            
            {/* Uploaded File Section */}
            <div className="cv h-auto sm:h-16 w-full sm:w-[95%] mx-auto sm:ml-5 mt-5 border border-black flex flex-col sm:flex-row items-center gap-3 p-2">
                {fileUrl ? (
                    <>
                        <Image src="/images2/pdf.png" height={30} width={30} alt="file icon" />
                        <span className="text-lg text-center sm:text-left">{fileName}</span>
                        <a href={fileUrl} target="_blank" rel="noreferrer">
                            <Image src="/images2/view.png" height={25} width={25} alt="view icon" />
                        </a>
                    </>
                ) : (
                    <span className="text-gray-500 text-center">No file selected</span>
                )}
            </div>
        </div>
    );
}
