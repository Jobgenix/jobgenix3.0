"use client"

import { useState } from "react"
import { CreditCard, Gauge, Trophy, Ban } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"

export default function StipendDetailsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [hideStipend, setHideStipend] = useState(false)

  const stipendTypes = [
    { id: "fixed", label: "Fixed", icon: <CreditCard className="w-4 h-4" /> },
    { id: "range", label: "Range", icon: <Gauge className="w-4 h-4" /> },
    { id: "fixed-incentive", label: "Fixed + Incentive", icon: <Trophy className="w-4 h-4" /> },
    { id: "unpaid", label: "Unpaid", icon: <Ban className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl p-6 bg-green-50 rounded-lg space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Stipend Details</h2>
          <p className="text-gray-600">
            Add compensation details to filter better candidates and speed up the sourcing process.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Stipend Types</h3>
          <div className="flex flex-wrap gap-3">
            {stipendTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors
                  ${
                    type.id === selectedType
                      ? "bg-emerald-200 text-emerald-800"
                      : "border border-dashed border-gray-300 hover:border-emerald-500 hover:text-emerald-600"
                  }`}
              >
                {type.icon}
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Stipend Figure</h3>
          <p className="text-gray-500 text-sm mb-4">Stipend on the internship page will be shown in months only.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select defaultValue="INR">
              <SelectTrigger className="w-full sm:w-[180px] bg-white">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">₹(INR)</SelectItem>
                <SelectItem value="USD">$(USD)</SelectItem>
                <SelectItem value="EUR">€(EUR)</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Input type="number" placeholder="Min" className="pl-12 bg-white" />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Min</span>
              </div>
              <div className="relative">
                <Input type="number" placeholder="Max" className="pl-12 bg-white" />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Max</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="hideStipend"
            checked={hideStipend}
            onCheckedChange={(checked) => setHideStipend(checked as boolean)}
          />
          <label
            htmlFor="hideStipend"
            className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Do not disclose the stipend to candidates
          </label>
        </div>
      </div>
    </div>
  )
}