import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function UploadCv({ userId }: { userId: string }) {
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserCV();
    }, []);

    const fetchUserCV = async () => {
        try {
            const response = await fetch(`/api/profileInfo/${userId}`);
            const data = await response.json();
            if (data.resume_url) {
                setFileUrl(data.resume_url);
                setFileName(data.resume_url.split("/").pop() || "Uploaded CV");
            }
        } catch (error) {
            console.error("Error fetching CV:", error);
        }
    };

    const upload = async () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".pdf,.doc,.docx";
        fileInput.onchange = async (event) => {
            const target = event.target as HTMLInputElement | null;
            const file = target?.files?.[0];

            if (file) {
                setFileName(file.name);
                await uploadFileToBackend(file);
            }
        };

        fileInput.click();
    };

    const uploadFileToBackend = async (file: File) => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", userId);

            const response = await fetch("/api/cvuploads", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setFileUrl(data.fileUrl);
            } else {
                alert("Upload failed: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Upload Error:", error);
            alert("Failed to upload file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-auto sm:mt-5 ml-6 xl:mt-[-5%] xl:ml-20 w-[90%] bg-[#e6f6ec] rounded-lg p-4 my-6">
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
