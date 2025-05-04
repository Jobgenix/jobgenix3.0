"use client";
import React from "react";
import { PencilLine, Trash2, Eye, FileDown, UploadCloud } from "lucide-react";
import { Sora } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import UserDetails from "@/types/userDetails";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});

export default function Activity({ data }: { data: UserDetails }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const [isEditable, setIsEditable] = useState(false);
  const [resumeFile, setResumeFile] = useState<{
    name: string;
    updatedDate: string;
    url: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserDetails>(data);

  // Initialize form and resume data when component mounts or userData changes
  useEffect(() => {
    console.log("Data received in Activity component:", userData);
    
    // Set form data
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
    });

    // Initialize resume file if exists in data
    if (userData.resumeUrl) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

      // Extract filename from URL - get the part after the last slash
      const fileName = userData.resumeUrl.split("/").pop() || "Resume.pdf";
      
      setResumeFile({
        name: fileName,
        updatedDate: formattedDate,
        url: userData.resumeUrl
      });
    } else {
      // Ensure resumeFile is null if no resumeUrl in data
      setResumeFile(null);
    }
  }, [userData, reset]);

  // Handle profile form submission
  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);
      const response = await fetch("/api/profileInfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update profile");

      // Update local userData with the new information
      setUserData(prev => ({...prev, ...formData}));
      
      toast.success("Profile updated successfully");
      setIsEditable(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file upload process
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      // 1. Get signed URL from our API
      const signedResponse = await fetch("/api/uploadcv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileType: file.type,
          userId: userData.userId
        }),
      });

      if (!signedResponse.ok) {
        throw new Error(await signedResponse.text() || "Failed to get signed URL");
      }

      const signedData = await signedResponse.json();
      if (!signedData.success) {
        throw new Error(signedData.message || "Failed to get upload credentials");
      }
      

      // 2. Upload to Cloudinary
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

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error?.message || "Upload failed");
      }

      // 3. Save the resume URL to our database
      const saveResponse = await fetch("/api/uploadcv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userData.userId,
          resumeUrl: uploadData.secure_url
        }),
      });

      const saveResult = await saveResponse.json();
      if (!saveResponse.ok) {
        throw new Error(saveResult.message || "Failed to save resume URL");
      }
      
      // Update our local userData object with new resumeUrl
      setUserData(prevData => ({
        ...prevData,
        resumeUrl: uploadData.secure_url
      }));

      // 4. Now extract skills from the uploaded CV
      try {
        // Create a new FormData to send the file for skills extraction
        const extractFormData = new FormData();
        extractFormData.append("file", file);
        extractFormData.append("userId", userData.userId);
        
        const extractResponse = await fetch("/api/extractskils", {
          method: "POST",
          body: extractFormData,
        });

        const extractResult = await extractResponse.json();
        if (!extractResponse.ok) {
          throw new Error(extractResult.error || "Failed to extract skills");
        }

        // If skills were successfully extracted, update them in database
        if (extractResult.text) {
          await updateSkills(userData.userId, extractResult.text);
        }
      } catch (error: any) {
        console.error("Error extracting skills:", error);
        toast.error("Resume uploaded but skills extraction failed");
      }

      // Update local state with the ORIGINAL file name (not stored in DB)
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

      // Set the resumeFile state to ensure the UI is updated correctly
      setResumeFile({
        name: file.name, // Keep the original filename
        updatedDate: formattedDate,
        url: uploadData.secure_url
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

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update skills.");
      toast.success("Skills extracted and updated successfully");
    } catch (error: any) {
      console.error("Error updating skills:", error);
      toast.error(error.message || "Failed to update skills");
    }
  };

  // Handle resume deletion
  const handleDeleteResume = async () => {
    if (!resumeFile) return;

    setLoading(true);

    try {
      const response = await fetch("/api/uploadcv", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userData.userId
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete resume");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to delete resume");
      }

      // Update both state and userData object
      setResumeFile(null);
      setUserData(prevData => ({
        ...prevData,
        resumeUrl: null
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
      {/* User Profile Section */}
      <form onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col items-center gap-10 [background:var(--Neutrals-White,#FFF)] shadow-[1px_1px_2px_0px_rgba(255,255,255,0.30)_inset,-1px_-1px_2px_0px_rgba(198,198,198,0.50)_inset,-4px_4px_8px_0px_rgba(198,198,198,0.20),4px_-4px_8px_0px_rgba(198,198,198,0.20),-4px_-4px_8px_0px_rgba(255,255,255,0.90),4px_4px_10px_0px_rgba(198,198,198,0.90)] pt-6 pb-[50px] px-11 rounded-[15px]">
        <div className="flex items-center md:gap-6 justify-center">
          <h2 className="text-lg">User Profile</h2>
          <button
            type="button"
            onClick={() => setIsEditable(!isEditable)}
            className={`${isEditable && "bg-slate-200"} px-3 rounded-md py-2 cursor-pointer text-blue-600 flex items-center gap-2 text-sm font-medium`}
          >
            Edit <PencilLine size={14} />
          </button>
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="px-3 rounded-md py-2 cursor-pointer text-blue-600 flex items-center gap-2 text-sm font-medium"
          >
            {isSubmitting || loading ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div>
            <div className="relative mt-1 w-full">
              <label className="text-xs bg-white absolute left-3 -top-[7px] px-[2px] font-medium">
                Email Address
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="surajit.saha@example.com"
                readOnly={!isEditable}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0 pl-4 pb-1">
                * Required
              </span>
            </div>
          </div>
          <div>
            <div className="relative mt-1 w-full">
              <label className="text-xs bg-white absolute left-3 -top-[7px] px-[2px] font-medium">
                Phone Number
              </label>
              <input
                {...register("phone", { required: true })}
                type="text"
                placeholder="(+91) 9456XXXXXX"
                readOnly={!isEditable}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0 pl-4 pb-1">
                * Required
              </span>
            </div>
          </div>
          <div>
            <div className="relative mt-1 w-full">
              <label className="text-xs bg-white absolute left-3 -top-[7px] px-[2px] font-medium">
                College/University
              </label>
              <input
                {...register("university", { required: true })}
                type="text"
                placeholder="Example Institute of Technology"
                readOnly={!isEditable}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0 pl-4 pb-1">
                * Required
              </span>
            </div>
          </div>
          <div>
            <div className="relative mt-1 w-full">
              <label className="text-xs bg-white absolute left-3 -top-[7px] px-[2px] font-medium">
                Location
              </label>
              <input
                {...register("location", { required: true })}
                type="text"
                placeholder="City, State"
                readOnly={!isEditable}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0 pl-4 pb-1">
                * Required
              </span>
            </div>
          </div>
        </div>
      </form>

      {/* Resume Section */}
      <div className="bg-white rounded-2xl p-6 space-y-4 shadow-[1px_1px_2px_0px_rgba(255,255,255,0.30)_inset,-1px_-1px_2px_0px_rgba(198,198,198,0.50)_inset,-4px_4px_8px_0px_rgba(198,198,198,0.20),4px_-4px_8px_0px_rgba(198,198,198,0.20),-4px_-4px_8px_0px_rgba(255,255,255,0.90),4px_4px_10px_0px_rgba(198,198,198,0.90)]">
        <h2 className="text-center text-[color:var(--Neutrals-Dark-Grey,#333)] [font-family:Sora] text-2xl font-normal leading-[var(--Display-Small-Line-Height,44px)] tracking-[var(--Display-Medium-Tracking,0px)]">
          CV/Resume Management
        </h2>

        {resumeFile ? (
          <div className="md:flex items-center justify-between bg-gray-100 rounded-xl p-3 text-sm">
            <div className="flex items-center gap-2">
              <FileDown className="text-red-600" />
              <div className="flex flex-col gap-0 justify-center pl-2">
                <span className="text-xs">{resumeFile.name}</span>
                {/* Date is shown only if we have a valid date */}
                {resumeFile.updatedDate && (
                  <span className="text-gray-500 text-[10px] font-semibold">
                    {resumeFile.updatedDate}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-3 ml-10 md:ml-0 mt-2 md:mt-0">
              <a
                href={resumeFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black flex items-center gap-1"
              >
                <Eye size={16} /> Preview
              </a>
              <button
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
                onClick={handleDeleteResume}
                disabled={loading}
              >
                <Trash2 size={16} /> {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 space-y-3">
            <UploadCloud className="text-gray-400" size={24} />
            <p className="text-sm text-gray-500 text-center">
              Upload your CV/Resume (PDF, DOC, DOCX)
            </p>
            <button
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              onClick={triggerFileInput}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Select File"}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
          </div>
        )}
      </div>
    </div>
  );
}