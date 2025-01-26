/* eslint-disable*/
"use client";

import { useEffect, useState } from "react";
// import { InternshipType } from "./internship-type"
// import { InternshipDuration } from "./internship-duration"
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Input } from "@/app/components/ui/input";

import { Monitor, Briefcase, FileText } from "lucide-react";
import { formSectionProps } from "@/types/formSectionProps";
import { jobTypeSchema } from "@/constants/jobOpportunities";
import { JobType } from "@/types/opportunityType";

export function TypeSelector({ setFormData }: formSectionProps) {
  const [type, setType] = useState<JobType>(jobTypeSchema.Enum.internships);
  const [unit, setUnit] = useState<"weeks" | "months">("months");
  const [duration, setDuration] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  
  useEffect(() => {
    if(duration.length) setFormData('duration', duration);
    if(jobTitle.length) setFormData("title", jobTitle);
    if(type.length) setFormData("type", type);
  }, [duration, jobTitle, type]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-2xl text-[#2F8E5B]">
          Title/Role <span className="text-red-500">*</span>
        </Label>
        <Input
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder=""
          className="w-full justify-between h-16 sm:text-xl md:text-xl text-gray-600 bg-[#FFFCEF] border-none rounded-lg shadow-lg shadow-black/20 "
        />
      </div>
      <InternshipType value={type} onChange={setType} />
      {type === "internships" && (
        <InternshipDuration
          unit={unit}
          duration={duration}
          onUnitChange={setUnit}
          onDurationChange={setDuration}
        />
      )}
    </div>
  );
}

interface InternshipTypeProps {
  value: JobType;
  onChange: (value: JobType) => void;
}

function InternshipType({ value, onChange }: InternshipTypeProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        <h2 className="text-base font-medium">Internships Type</h2>
        <span className="text-red-500">*</span>
      </div>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-wrap gap-4"
      >
        <div
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
            value === "jobs"
              ? "bg-emerald-200 text-emerald-800"
              : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
          }`}
        >
          <RadioGroupItem value={jobTypeSchema.Enum.jobs} id="jobs" className="sr-only" />
          <Briefcase className="h-4 w-4" />
          <Label htmlFor="jobs" className="cursor-pointer text-lg">
            Jobs
          </Label>
        </div>

        <div
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
            value === "internships"
              ? "bg-emerald-200 text-emerald-800"
              : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
          }`}
        >
          <RadioGroupItem
            value={jobTypeSchema.Enum.internships}
            id="internships"
            className="sr-only"
          />
          <Monitor className="h-4 w-4" />
          <Label htmlFor="internships" className="cursor-pointer text-lg">
            Internships
          </Label>
        </div>

        <div
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
            value === "contracts"
              ? "bg-emerald-200 text-emerald-800"
              : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
          }`}
        >
          <RadioGroupItem
            value={jobTypeSchema.Enum.contracts}
            id="contracts"
            className="sr-only"
          />
          <FileText className="h-4 w-4" />
          <Label htmlFor="contracts" className="cursor-pointer text-lg">
            Contracts
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

interface InternshipDurationProps {
  unit: "weeks" | "months";
  duration: string;
  onUnitChange: (value: "weeks" | "months") => void;
  onDurationChange: (value: string) => void;
}

function InternshipDuration({
  unit,
  duration,
  onUnitChange,
  onDurationChange,
}: InternshipDurationProps) {
  const durations = Array.from({ length: 12 }, (_, i) => `${i + 1} ${unit}`);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        <h2 className="text-base font-medium">Internships Duration</h2>
        <span className="text-red-500">*</span>
      </div>

      <RadioGroup
        value={unit}
        onValueChange={(value) => onUnitChange(value as "weeks" | "months")}
        className="flex gap-4"
      >
        <div
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors text-lg ${
            unit === "weeks"
              ? "bg-emerald-200 text-emerald-800"
              : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
          }`}
        >
          <RadioGroupItem value="weeks" id="weeks" className="sr-only" />
          <Label htmlFor="weeks" className="cursor-pointer text-lg">
            In Weeks
          </Label>
        </div>

        <div
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors  text-lg  ${
            unit === "months"
              ? "bg-emerald-200 text-emerald-800"
              : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
          }`}
        >
          <RadioGroupItem value="months" id="months" className="sr-only" />
          <Label htmlFor="months" className="cursor-pointer text-lg">
            In months
          </Label>
        </div>
      </RadioGroup>

      <RadioGroup
        value={duration}
        onValueChange={onDurationChange}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6"
      >
        {durations.map((value) => (
          <div
            key={value}
            className={`flex cursor-pointer items-center justify-center rounded-full border px-4 py-2 transition-colors ${
              duration === value
                ? "bg-emerald-200 text-emerald-800"
                : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
            }`}
          >
            <RadioGroupItem value={value} id={value} className="sr-only" />
            <Label htmlFor={value} className="cursor-pointer text-base">
              {value}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
