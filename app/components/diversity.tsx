"use client"

import { useState } from "react"
import { Laptop, FileText, FileCheck, AmbulanceIcon as FirstAid } from "lucide-react"
import { Switch } from "@/app/components/ui/switch"
import Link from "next/link"

export default function DiversityBenefits() {
  const diversityOptions = [
    { id: "all", label: "All" },
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
    { id: "transgender", label: "Transgender" },
    { id: "intersex", label: "Intersex" },
    { id: "non-binary", label: "Non-Binary" },
    { id: "others", label: "Others" },
  ]

  const benefits = [
    { icon: <Laptop className="w-8 h-8" />, title: "Job Offer" },
    { icon: <FileText className="w-8 h-8" />, title: "Certificate of Completion" },
    { icon: <FileCheck className="w-8 h-8" />, title: "Letter of Recommendation" },
    { icon: <FirstAid className="w-8 h-8" />, title: "Medical Insurance" },
  ]

  const [selectedOption, setSelectedOption] = useState("all")

  return (
    <div className="p-6 bg-green-50 rounded-lg space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-800">Diversity Hiring:</h2>
        <Switch />
      </div>

      <div className="flex flex-wrap gap-3">
        {diversityOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors
              ${
                option.id === selectedOption
                  ? "bg-emerald-200 text-emerald-800"
                  : "border border-dashed border-gray-300 hover:border-emerald-500 hover:text-emerald-600"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-medium text-emerald-700 mb-6">Other Benefits:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-lg space-y-4 hover:border-emerald-500 transition-colors bg-white"
            >
              {benefit.icon}
              <span className="text-center text-sm font-medium">{benefit.title}</span>
            </div>
          ))}
        </div>
      </div>

      <Link href="#" className="inline-block text-blue-600 hover:text-blue-700 hover:underline text-sm">
        + View more
      </Link>
    </div>
  )
}

