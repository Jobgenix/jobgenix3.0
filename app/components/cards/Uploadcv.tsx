"use client";
import React from "react";
import { PencilLine, Trash2, Eye, FileDown, UploadCloud } from "lucide-react";
import { Sora } from "next/font/google";
import { useState } from "react";
import UserDetails from "@/types/userDetails";
import {useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});

export default function Activity({data}: {data: UserDetails}) {

  const { register, handleSubmit,reset ,formState:{isSubmitting} } = useForm();
  const [isEditable, setIsEditable] = useState(false);
  const [resumeFile, setResumeFile] = useState<{
    name: string;
    updatedDate: string;
  } | null>({
    name: "Surajit_Saha_UIUX_CV_2025.pdf",
    updatedDate: "Mar 30, 2025"
  }); // Initialize with null for no file

  useEffect(() => {
    reset({
      email: data.email,
      phone: data.phone,
      university: data.university,
      location: data.location,
      id: data.userId,
      userId: data.userId,
      name: data.name,
      profileImage: data.profileImage,
      summary: data.summary,
    });
  }, [data, reset]);


  const  onSubmit = async(data: any) => {
    try {
      console.log("Form data:", data); // Log the form data
      const response = await fetch("/api/profileInfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Profile updated successfully:", result);
      setIsEditable(false); // Disable editing after submission
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
      });
      
      setResumeFile({
        name: fileName,
        updatedDate: formattedDate
      });
    }
  };

  return (
    <div
      className={`${sorafont.className} md:w-[735px] mx-auto p-4 space-y-8 mt-25`}
    >
      {/* User Profile Section */}
      <form onSubmit={handleSubmit(onSubmit)} 
       className="bg-white flex flex-col items-center gap-10  [background:var(--Neutrals-White,#FFF)] shadow-[1px_1px_2px_0px_rgba(255,255,255,0.30)_inset,-1px_-1px_2px_0px_rgba(198,198,198,0.50)_inset,-4px_4px_8px_0px_rgba(198,198,198,0.20),4px_-4px_8px_0px_rgba(198,198,198,0.20),-4px_-4px_8px_0px_rgba(255,255,255,0.90),4px_4px_10px_0px_rgba(198,198,198,0.90)] pt-6 pb-[50px] px-11 rounded-[15px]">
        <div className="flex items-center md:gap-6 justify-center">
          <h2 className="text-lg">User Profile</h2>
          <button type="button" onClick={()=>setIsEditable(!isEditable)} className={`${isEditable && "bg-slate-200"} px-3 rounded-md py-2 cursor-pointer text-blue-600 flex items-center gap-2 text-sm font-medium`}>
            Edit <PencilLine size={14} />
          </button>
          <button type="submit" disabled={isSubmitting} className={`px-3 rounded-md py-2 cursor-pointer text-blue-600 flex items-center gap-2 text-sm font-medium`}>
            Submit
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
              {...register("location",{required:true})}
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
                <span className="text-gray-500 text-[10px] font-semibold">
                  (Updated on {resumeFile.updatedDate})
                </span>
              </div>
            </div>
            <div className="flex gap-3 ml-10 md:ml-0">
              <button className="text-gray-700 hover:text-black flex items-center gap-1">
                <Eye size={16} /> Preview
              </button>
              <button 
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
                onClick={() => setResumeFile(null)}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 space-y-3">
            <UploadCloud className="text-gray-400" size={24} />
            <p className="text-sm text-gray-500 text-center">
              Upload your CV/Resume (PDF, DOC, DOCX)
            </p>
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
              Select File
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}