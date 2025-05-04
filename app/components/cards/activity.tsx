"use client";
import React, { useState, useEffect, useRef } from "react";
// import { PencilLine, Trash2, Eye, FileDown, UploadCloud } from "lucide-react";
import { Sora } from "next/font/google";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import UserDetails from "@/types/userDetails";

const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});

interface FormData {
  email: string;
  phone: string;
  university: string;
  location: string;
  id: string;
  userId: string;
  name: string;
  profileImage: string;
  summary: string;
  rurl: string;
}

interface ResumeFile {
  name: string;
  updatedDate: string;
  url: string;
}

interface SignedResponse {
  success: boolean;
  api_key: string;
  timestamp: string;
  signature: string;
  folder: string;
  cloud_name: string;
}

interface UploadResponse {
  secure_url: string;
  error?: { message: string };
}

interface SaveResponse {
  success: boolean;
  message?: string;
}

// interface ExtractResult {
//   text: string;
//   error?: string;
// }

export default function Activity({ data }: { data: UserDetails }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>();
  const [isEditable, setIsEditable] = useState(false);
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserDetails>(data);

  useEffect(() => {
    reset({
      email: userData.email,
      phone: userData.phone,
      university: userData.university,
      location: userData.location,
      id: userData.userId,
      userId: userData.userId,
      name: userData.name,
      profileImage: userData.profileImage,
      summary: userData.summary,
      rurl: userData.resume_url,
    });

    if (userData.resume_url) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      const fileName = userData.resume_url.split("/").pop() || "Resume.pdf";

      setResumeFile({
        name: fileName,
        updatedDate: formattedDate,
        url: userData.resume_url,
      });
    } else {
      setResumeFile(null);
    }
  }, [userData, reset]);

  const onSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const response = await fetch("/api/profileInfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result: SaveResponse = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update profile");

      setUserData((prev) => ({ ...prev, ...formData }));
      toast.success("Profile updated successfully");
      setIsEditable(false);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const signedResponse = await fetch("/api/uploadcv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileType: file.type,
          userId: userData.userId,
        }),
      });

      const signedData: SignedResponse = await signedResponse.json();
      if (!signedResponse.ok || !signedData.success) {
        throw new Error(signedData.message || "Failed to get upload credentials");
      }

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("api_key", signedData.api_key);
      uploadFormData.append("timestamp", signedData.timestamp);
      uploadFormData.append("signature", signedData.signature);
      uploadFormData.append("folder", signedData.folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signedData.cloud_name}/upload`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      const uploadData: UploadResponse = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error?.message || "Upload failed");
      }

      const saveResponse = await fetch("/api/uploadcv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userData.userId,
          resumeUrl: uploadData.secure_url,
        }),
      });

      const saveResult: SaveResponse = await saveResponse.json();
      if (!saveResponse.ok) {
        throw new Error(saveResult.message || "Failed to save resume URL");
      }

      setUserData((prevData) => ({
        ...prevData,
        resume_url: uploadData.secure_url,
      }));

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      setResumeFile({
        name: file.name,
        updatedDate: formattedDate,
        url: uploadData.secure_url,
      });

      toast.success("Resume uploaded successfully!");
    } catch (error: any) {
      console.error("Upload Error:", error);
      toast.error(error.message || "Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  const updateSkills = async (userId: string, skills: string) => {
    try {
      const response = await fetch("/api/extractskils", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, skills }),
      });

      const result: SaveResponse = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update skills.");
      toast.success("Skills extracted and updated successfully");
    } catch (error: any) {
      console.error("Error updating skills:", error);
      toast.error(error.message || "Failed to update skills");
    }
  };

  const handleDeleteResume = async () => {
    if (!resumeFile) return;

    setLoading(true);

    try {
      const response = await fetch("/api/uploadcv", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userData.userId,
        }),
      });

      const result: SaveResponse = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete resume");
      }

      setResumeFile(null);
      setUserData((prevData) => ({
        ...prevData,
        resume_url: null,
      }));

      toast.success("Resume deleted successfully");
    } catch (error: any) {
      console.error("Error deleting resume:", error);
      toast.error(error.message || "Failed to delete resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${sorafont.className} md:w-[735px] mx-auto p-4 space-y-8 mt-25`}>
      {/* Render the rest of the component */}
    </div>
  );
}