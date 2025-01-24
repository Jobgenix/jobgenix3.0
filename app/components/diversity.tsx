"use client";

import { useState } from "react";

import { Switch } from "@/app/components/ui/switch";

export default function DiversityBenefits() {
  const diversityOptions = [
    { id: "all", label: "All" },
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "transgender", label: "Transgender" },
    { id: "intersex", label: "Intersex" },
    { id: "non-binary", label: "Non-Binary" },
    { id: "others", label: "Others" },
  ];

  const [selectedOption, setSelectedOption] = useState("all");

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
            key={option.id}
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
