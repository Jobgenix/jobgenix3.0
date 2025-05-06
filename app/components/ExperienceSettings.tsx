"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/app/components/ui/switch";
import { ExperienceType } from "@/types/opportunityType";
import { experienceTypeSchema } from "@/constants/jobOpportunities";
import { formSectionProps } from "@/types/formSectionProps";

export default function ExperienceSettings({ setFormData }: formSectionProps) {
  const [experienceType, setExperienceType] = useState<ExperienceType>("fresher");
  const [specificOrg, setSpecificOrg] = useState(false);
  const [specificNationalities, setSpecificNationalities] = useState(false);

  useEffect(()=>{
    setFormData('experience',experienceType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[experienceType])

  return (
    <div className="flex flex-col gap-6">
      {/* Experience Required Section */}
      <div className="bg-[#FFFDF7] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <h3 className="text-[17px] font-medium text-gray-800 mb-4 ">
          Experienced Required:
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setExperienceType(experienceTypeSchema.Enum.fresher)}
            className={`px-6 py-2 rounded-full transition-colors  text-[15px]
              ${
                experienceType === "fresher"
                  ? "border-[#4CAF50] bg-[#4CAF50] text-white border-2"
                  : "border-dashed border-2 border-gray-400 text-gray-600 hover:border-[#4CAF50]"
              }`}
          >
            Freshers
          </button>
          <button
            onClick={() => setExperienceType(experienceTypeSchema.Enum.experienced)}
            className={`px-6 py-2 rounded-full transition-colors  text-[15px]
              ${
                experienceType === "experienced"
                  ? "border-[#4CAF50] bg-[#4CAF50] text-white border-2"
                  : "border-dashed border-2 border-gray-400 text-gray-600 hover:border-[#4CAF50]"
              }`}
          >
            Experienced
          </button>
        </div>
      </div>

      {/* Specific Organization Section */}
      <div className="bg-[#FFFDF7] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-medium text-gray-800 ">
            Any Specific Organization(s)
          </h3>
          <Switch
            checked={specificOrg}
            onCheckedChange={setSpecificOrg}
            className="data-[state=checked]:bg-[#4CAF50] data-[state=unchecked]:bg-gray-300"
          />
        </div>
      </div>

      {/* Specific Nationalities Section */}
      <div className="bg-[#FFFDF7] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-medium text-gray-800 ">
            Any Specific nationalities
          </h3>
          <Switch
            checked={specificNationalities}
            onCheckedChange={setSpecificNationalities}
            className="data-[state=checked]:bg-[#4CAF50] data-[state=unchecked]:bg-gray-300"
          />
        </div>
      </div>
    </div>
  );
}