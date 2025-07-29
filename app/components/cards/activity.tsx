"use client";
import UserDetails from "@/types/userDetails";
import { CircleX, Eye, PencilLine, Trash2, UploadCloud } from "lucide-react";
// import { signOut } from "next-auth/react";
import { Span } from "next/dist/trace";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LearningActivity from "./LearningActivity";

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
  message?: string;
}

interface UploadResponse {
  secure_url: string;
  error?: { message: string };
}

// interface ExtractResult {
//   text: string;
//   error?: string;
// }

export default function Activity({ data }: { data: UserDetails }) {
  //   const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   setValue,
  //   getValues,
  //   formState: { isSubmitting },
  // } = useForm<FormData>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const [isEditable, setIsEditable] = useState(false);
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserDetails>(data);

  useEffect(() => {
    console.log("Data received in Activity component:", userData);

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

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update profile");

      setUserData((prev) => ({ ...prev, ...formData }));
      toast.success("Profile updated successfully");
      setIsEditable(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving profile:", error);
        toast.error(error.message || "Failed to update profile");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
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
    const file = e.target.files?.[0] as File;
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
        throw new Error(
          signedData.message || "Failed to get upload credentials"
        );
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

      const saveResult = await saveResponse.json();
      if (!saveResponse.ok) {
        throw new Error(saveResult.message || "Failed to save resume URL");
      }

      setUserData((prevData) => ({
        ...prevData,
        resumeUrl: uploadData.secure_url,
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Upload Error:", error);
        toast.error(error.message || "Failed to upload resume");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete resume");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to delete resume");
      }

      setResumeFile(null);
      setUserData((prevData) => ({
        ...prevData,
        resumeUrl: null,
      }));

      toast.success("Resume deleted successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting resume:", error);
        toast.error(error.message || "Failed to delete resume");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`font-sora w-full lg:w-[67%] flex lg:flex-col flex-col-reverse gap-5`}
    >
      <div className="w-full flex flex-col gap-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-shadow bg-white flex flex-col items-center gap-10 [background:var(--Neutrals-White,#FFF)] pt-6 pb-[50px] px-11 rounded-[15px]"
        >
          <div className="flex items-center gap-[0.4rem] md:gap-6 justify-center">
            <h2 className="text-2xl leading-[2.8rem] font-sora font-normal">
              User Profile
            </h2>
            <button
              type="button"
              onClick={() => setIsEditable(!isEditable)}
              className={`px-3 rounded-md py-2 cursor-pointer text-blue-600 flex items-center gap-2 text-sm font-medium`}
            >
              {(isEditable && <span>Save</span>) || <span>Edit</span>}{" "}
              <PencilLine size={14} />
            </button>
            {/* <button
              type="submit"
              disabled={isSubmitting || loading}
              className="px-3 rounded-md py-2 cursor-pointer text-blue-600 flex items-center gap-2 text-sm font-medium"
            >
              {isSubmitting || loading ? "Saving..." : "Save"}
            </button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <div>
              <div className="relative mt-1 w-full">
                <label className="text-[0.7rem] font-roboto text-gray-500 bg-white absolute left-3 -top-[7px] px-2 font-medium">
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="surajit.saha@example.com"
                  readOnly={!isEditable}
                  className="w-full min-h-14 border rounded-sm pl-4 pr-10 py-2 font-normal font-roboto text-lg text-[#1D1B20] outline outline-[#333333] outline-1 focus:outline-none"
                />
                {isEditable && (
                  <CircleX
                    size={20}
                    className="absolute top-[30%] right-[5%] md:right-[6%] cursor-pointer"
                    onClick={() => setValue("email", "")}
                  />
                )}
                <span className="text-xs font-normal font-roboto text-gray-500 absolute -bottom-6 left-0 pl-4 pb-1">
                  * Required
                </span>
              </div>
            </div>
            <div>
              <div className="relative mt-1 w-full">
                <label className="text-[0.7rem] font-roboto text-gray-500 bg-white absolute left-3 -top-[7px] px-2 font-medium">
                  Phone Number
                </label>
                <input
                  {...register("phone", { required: true })}
                  type="text"
                  placeholder="(+91) 9456XXXXXX"
                  readOnly={!isEditable}
                  className="w-full min-h-14 border rounded-sm pl-4 pr-10 py-2 font-normal font-roboto text-lg text-[#1D1B20] outline outline-[#333333] outline-1 focus:outline-none"
                />
                {isEditable && (
                  <CircleX
                    size={20}
                    className="absolute top-[30%] right-[5%] md:right-[6%] cursor-pointer"
                    onClick={() => setValue("phone", "")}
                  />
                )}
                <span className="text-xs font-normal font-roboto text-gray-500 absolute -bottom-6 left-0 pl-4 pb-1">
                  * Required
                </span>
              </div>
            </div>
            <div>
              <div className="relative mt-1 w-full">
                <label className="text-[0.7rem] font-roboto text-gray-500 bg-white absolute left-3 -top-[7px] px-2 font-medium">
                  College/University
                </label>
                <input
                  {...register("university", { required: true })}
                  type="text"
                  placeholder="Example Institute of Technology"
                  readOnly={!isEditable}
                  className="w-full min-h-14 border rounded-sm pl-4 pr-10 py-2 font-normal font-roboto text-lg text-[#1D1B20] outline outline-[#333333] outline-1 focus:outline-none"
                />
                {isEditable && (
                  <CircleX
                    size={20}
                    className="absolute top-[30%] right-[5%] md:right-[6%] cursor-pointer"
                    onClick={() => setValue("university", "")}
                  />
                )}
                <span className="text-xs font-normal font-roboto text-gray-500 absolute -bottom-6 left-0 pl-4 pb-1">
                  * Required
                </span>
              </div>
            </div>
            <div>
              <div className="relative mt-1 w-full">
                <label className="text-xs font-roboto text-gray-500 bg-white absolute left-3 -top-[7px] px-2 font-medium">
                  Location
                </label>
                <input
                  {...register("location", { required: true })}
                  type="text"
                  placeholder="City, State"
                  readOnly={!isEditable}
                  className="w-full min-h-14 border rounded-sm pl-4 pr-10 py-2 font-normal font-roboto text-lg text-[#1D1B20] outline outline-[#333333] outline-1 focus:outline-none placeholder:text-[#333333]"
                />
                {isEditable && (
                  <CircleX
                    size={20}
                    className="absolute top-[30%] right-[5%] md:right-[6%] cursor-pointer"
                    onClick={() => setValue("location", "")}
                  />
                )}
              </div>
            </div>
          </div>
        </form>

        {/* file upload  */}
        <div className="card-shadow bg-white rounded-2xl py-8 px-7 text-center">
          <h2 className="hidden sm:block text-2xl leading-[2.8rem] font-sora font-normal">
            CV/Resume Management
          </h2>
          <h2 className="sm:hidden text-2xl leading-[2.8rem] font-sora font-normal">
            CV Management
          </h2>

          {resumeFile ? (
            <div className="md:flex items-center justify-between border border-[#79747E] rounded-sm py-4 px-5 text-sm">
              <div className="flex items-center gap-2">
                <Image
                  src="icons/file_icon.svg"
                  alt="Resume"
                  width={24}
                  height={24}
                />
                <div className="flex flex-col gap-0 justify-center pl-2 text-left">
                  <span className="text-sm text-black font-montserrat font-normal ">
                    {resumeFile.name}
                  </span>
                  {resumeFile.updatedDate && (
                    <span className="text-[#606060] font-bold text-xs leading-[1.2rem]">
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
        {/* lerning activity */}
        <LearningActivity />
      </div>
      <div className="card-shadow hidden sm:flex flex-col items-center gap-3 [background:var(--Neutrals-White,#FFF)] px-[66px] py-[20.5px] rounded-[15px]">
        <h1 className="self-stretch text-[color:var(--Neutrals-Dark-Grey,#333)] text-center [font-family:Sora] text-2xl font-normal leading-[44px]">
          My Badges
        </h1>
        <div className="flex justify-center items-center gap-4 ">
          <div
            className="bg-[#E6B80080] size-24 lg:size-[8.8rem]"
            style={{
              clipPath:
                "polygon(50% 2.45%, 67.5% 30.94%, 100% 38.77%, 76.77% 63.72%, 80.9% 97.55%, 50% 83.16%, 19.1% 97.55%, 23.23% 63.72%, 0% 38.77%, 29.84% 30.94%)",
            }}
          ></div>
          <div
            className=" bg-[#0035D880] size-24 lg:size-[8.8rem]"
            style={{
              clipPath:
                "polygon(50% 2.45%, 67.5% 30.94%, 100% 38.77%, 76.77% 63.72%, 80.9% 97.55%, 50% 83.16%, 19.1% 97.55%, 23.23% 63.72%, 0% 38.77%, 29.84% 30.94%)",
            }}
          ></div>
          <div
            className=" bg-[#0073E6] size-24 lg:size-[8.8rem]"
            style={{
              clipPath:
                "polygon(50% 2.45%, 67.5% 30.94%, 100% 38.77%, 76.77% 63.72%, 80.9% 97.55%, 50% 83.16%, 19.1% 97.55%, 23.23% 63.72%, 0% 38.77%, 29.84% 30.94%)",
            }}
          ></div>
        </div>
      </div>

      {/* Logout button  */}

      {/* <button
        onClick={() => signOut({ callbackUrl: "/", redirect: true })}
        className="bg-red-500 hover:bg-red-600 mb-6 ml-[42%] lg:ml-[48%] sm:ml-[46%] text-white px-4 py-2 rounded"
      >
        Logout
      </button> */}
    </div>
  );
}
