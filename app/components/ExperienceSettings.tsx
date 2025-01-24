"use client"

import { useState } from "react"
import { Switch } from "@/app/components/ui/switch"

export default function ExperienceSettings() {
  const [experienceType, setExperienceType] = useState<"fresher" | "experienced">("fresher")
  const [specificOrg, setSpecificOrg] = useState(false)
  const [specificNationalities, setSpecificNationalities] = useState(false)

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4 bg-[#F3FFF4]">
      {/* Experience Required Section */}
      <div className="bg-[#FFFDF7] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <h3 className="text-[17px] font-medium text-gray-800 mb-4 font-['Inter']">Experienced Required:</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setExperienceType("fresher")}
            className={`px-6 py-2 rounded-full transition-colors font-['Inter'] text-[15px]
              ${
                experienceType === "fresher"
                  ? "border-[#4CAF50] bg-[#4CAF50] text-white border-2"
                  : "border-dashed border-2 border-gray-400 text-gray-600 hover:border-[#4CAF50]"
              }`}
          >
            Freshers
          </button>
          <button
            onClick={() => setExperienceType("experienced")}
            className={`px-6 py-2 rounded-full transition-colors font-['Inter'] text-[15px]
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
          <h3 className="text-[17px] font-medium text-gray-800 font-['Inter']">Any Specific Organization(s)</h3>
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
          <h3 className="text-[17px] font-medium text-gray-800 font-['Inter']">Any Specific nationalities</h3>
          <Switch
            checked={specificNationalities}
            onCheckedChange={setSpecificNationalities}
            className="data-[state=checked]:bg-[#4CAF50] data-[state=unchecked]:bg-gray-300"
          />
        </div>
      </div>
    </div>
  )
}

