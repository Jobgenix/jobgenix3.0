/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Combobox } from "@/app/components/combo-box";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CollegeCourses from "./CollageCourses";
import ToggleSwitch from "./ToggleSwitch";

export default function MainForm({ onChange }: { onChange?: (data: any) => void }) {
  const [jobType, setJobType] = useState("Job");
  const [locationType, setLocationType] = useState("Onsite");
  const [openForCollegeStudents, setOpenForCollegeStudents] = useState(true);
  const [specificCourseYear, setSpecificCourseYear] = useState(true);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("Google LLC");
  const [category, setCategory] = useState("");
  const [workLocation, setWorkLocation] = useState("Kharagpur, West Bengal");
  const [logo, setLogo] = useState<string>("/brand/google.png");
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [stipendType, setStipendType] = useState<string | undefined>("fixed");
  const [experience, setExperience] = useState<string | undefined>("fresher");
  const [jobLink, setJobLink] = useState<string | undefined>("undefined");
  const [deadline, setDeadline] = useState<string | undefined>(undefined);
  const [postedAt, setPostedAt] = useState<string | undefined>(undefined);
  const [degree, setDegree] = useState<string[]>([]);
  const [passoutYear, setPassoutYear] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange?.({
      companyId,
      title,
      // Map UI values to backend enums
      type: jobType === "Internship" ? "internships" : jobType === "Job" ? "jobs" : undefined,
      workplaceType:
        locationType === "Remote"
          ? "remote"
          : locationType === "Hybrid"
            ? "hybrid"
            : locationType === "Onsite"
              ? "office"
              : undefined,
      stipendType,
      experience,
      jobLink,
      category: category ? [category] : [],
      deadline: deadline ? new Date(deadline).toISOString().slice(0, 10) : undefined,
      postedAt: postedAt ? new Date(postedAt).toISOString().slice(0, 10) : undefined,
      location: workLocation ? [workLocation] : [],
      logo,
      openForCollegeStudents,
      specificCourseYear,
      degree,
      passoutYear,
    });
  }, [
    companyId,
    title,
    jobType,
    locationType,
    stipendType,
    experience,
    jobLink,
    category,
    deadline,
    postedAt,
    workLocation,
    logo,
    openForCollegeStudents,
    specificCourseYear,
    degree,
    passoutYear,
    onChange,
  ]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
      // If you want to upload to backend, do it here.
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8 font-montserrat text-[#333333]">
        {/* Company */}
        <div className="max-w-[30.7rem] w-full">
          <label className="block text-base sm:text-xl font-medium mb-2 md:ml-6">
            Company you are hiring for. <span className="text-red-500">*</span>
            <button
              type="button"
              className="sm:ml-4 text-[#0073E6] text-sm font-normal underline"
              onClick={() => fileInputRef.current?.click()}
            >
              Change Logo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </label>
          {/* Company Selector Dropdown */}
          <div className="flex items-center border border-[#0073E6] sm:text-xl font-normal rounded-[3.2rem] p-2 sm:py-4 sm:px-5 bg-white">
            <Combobox
              setFormData={(field: string, value: any) => {
                if (field === "companyId") setCompanyId(value);
              }}
            />
          </div>
        </div>
        <div className="self-end flex flex-col justify-around items-start sm:h-[5.1rem] max-sm:h-auto max-sm:gap-4">
          {/* Job Type */}
          <div className="flex items-center gap-1 sm:gap-8 flex-wrap">
            <label className="text-sm sm:text-xl font-medium ml-1 md:ml-6">
              Job Type <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3 sm:gap-6">
              {["Job", "Internship"].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-800 scale-100 sm:scale-125"
                    checked={jobType === type}
                    onChange={() => setJobType(type)}
                  />
                  <span className="text-xs sm:text-sm font-montserrat font-medium">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center gap-1 sm:gap-8">
            <label className="text-sm sm:text-xl font-medium ml-1 md:ml-6">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3 sm:gap-6 ml-1">
              {["Onsite", "Remote", "Hybrid"].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-800 scale-100 sm:scale-125"
                    checked={locationType === type}
                    onChange={() => setLocationType(type)}
                  />
                  <span className="text-xs sm:text-sm font-montserrat font-medium">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* Internship Title */}
        <div className="max-w-[30.7rem] w-full">
          <label className="block text-base sm:text-xl font-medium mb-2 md:ml-6">
            Internships Title/Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Start Typing"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-[#0073E6] sm:text-xl font-normal w-full rounded-[3.2rem] sm:py-[1.63rem] sm:px-5 py-2 px-3 text-[#333333] opacity-[70%] placeholder:text-[#605f5f] focus:ring-2 focus:ring-blue-300"
          />
        </div>
        {/* Category */}
        <div className="max-w-[30.7rem] w-full">
          <label className="block text-base sm:text-xl font-medium mb-2 md:ml-6">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative py-2 px-3 sm:py-[1.63rem] sm:px-5 pr-8 bg-white border border-[#0073E6] rounded-[3.2rem]">
            <select
              className="block w-full bg-white sm:text-xl font-normal text-[#333333] opacity-[70%]   rounded-[3.2rem]"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Science">Science</option>
            </select>
          </div>
        </div>
        {/* Work Location */}
        <div className="max-w-[30.7rem] w-full">
          <label className="block text-base sm:text-xl font-medium mb-2 md:ml-6">
            Work Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={workLocation}
            onChange={e => setWorkLocation(e.target.value)}
            className="border border-[#0073E6] sm:text-xl font-normal w-full rounded-[3.2rem] sm:py-[1.63rem] sm:px-5 py-2 px-3 text-[#333333] opacity-[70%] focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      {/* Toggles */}
      <div className="max-w-[53rem] w-full">
        <div className="space-y-6 my-10 hidden sm:block">
          <ToggleSwitch
            label="Open for college students (currently studying)"
            initialState={openForCollegeStudents}
            onChange={setOpenForCollegeStudents}
            className="mt-0 card-shadow px-5 sm:px-7 py-4 h-auto sm:h-[4.7rem] rounded-2xl text-base font-montserrat sm:text-xl font-medium gap-2"
          />
          <ToggleSwitch
            label="Any specific course/specialization/graduating year"
            initialState={specificCourseYear}
            onChange={setSpecificCourseYear}
            className="mt-0 card-shadow px-5 sm:px-7 py-4 h-auto sm:h-[4.7rem] rounded-2xl text-base font-montserrat sm:text-xl font-medium gap-2"
          />
        </div>
        <div className="space-y-6 my-10 sm:hidden">
          <ToggleSwitch
            label="Open for college students"
            initialState={openForCollegeStudents}
            onChange={setOpenForCollegeStudents}
            className="py-2 h-auto sm:h-[4.7rem] text-base font-montserrat"
          />
          <ToggleSwitch
            label="Any specific"
            initialState={specificCourseYear}
            onChange={setSpecificCourseYear}
            className="py-2 h-auto sm:h-[4.7rem] text-base font-montserrat font-medium gap-2"
          />
        </div>
        <CollegeCourses onChange={({ degree, passoutYear }) => {
          if (degree) setDegree(degree);
          if (passoutYear) setPassoutYear(passoutYear);
        }} />
      </div>
    </>
  );
}
