"use client";

import { useEffect, useState } from "react";

import { Switch } from "@/app/components/ui/switch";
import { DiversityType } from "@/types/opportunityType";
import { diversityTypeSchema } from "@/constants/jobOpportunities";
import { formSectionProps } from "@/types/formSectionProps";

export default function DiversityBenefits({ setFormData }: formSectionProps) {
  const diversityOptions = [
    { id: undefined, label: "All" },
    { id: diversityTypeSchema.Enum.male, label: "Male" },
    { id: diversityTypeSchema.Enum.female, label: "Female" },
    { id: diversityTypeSchema.Enum.transgender, label: "Transgender" },
    { id: diversityTypeSchema.Enum.intersex, label: "Intersex" },
    { id: diversityTypeSchema.Enum["non-binary"], label: "Non-Binary" },
    { id: diversityTypeSchema.Enum.other, label: "Others" },
  ];

  const [selectedOption, setSelectedOption] = useState<DiversityType|undefined>(undefined);

  useEffect(()=>{
    setFormData("diversityType", selectedOption!);
  },[selectedOption])

  return (
    <div className="p-6 bg-[#FFFCEF] rounded-lg space-y-4 shadow-black/40 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-800">Diversity Hiring:</h2>
        <Switch />
      </div>
      <hr />

      <div className="flex flex-wrap gap-3">
        {diversityOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => setSelectedOption(option.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors
              ${
                option.id === selectedOption
                  ? "bg-emerald-200 text-emerald-800"
                  : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
