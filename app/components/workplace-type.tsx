/* eslint-disable */
import { workplaceTypeSchema } from "@/constants/jobOpportunities";
import { Monitor, Briefcase, FileText } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { formSectionProps } from "@/types/formSectionProps";
import { WorkplaceType } from "@/types/opportunityType";
import { useEffect, useState } from "react";

export default function WorkplaceTypeSelector({
  setFormData,
}: formSectionProps) {
  const [type, setType] = useState<WorkplaceType>(
    workplaceTypeSchema.Enum.remote
  );

  useEffect(() => {
    if (type.length) setFormData("workplaceType", type);
  }, [type]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-2xl text-[#2F8E5B]">
          Title/Role <span className="text-red-500">*</span>
        </Label>
      </div>
      <WorkplaceTypeFunc value={type} onChange={setType} />
    </div>
  );
}

interface WorkplaceTypeProps {
  value: WorkplaceType;
  onChange: (value: WorkplaceType) => void;
}

function WorkplaceTypeFunc({ value, onChange }: WorkplaceTypeProps) {
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
            value === "remote"
              ? "bg-emerald-200 text-emerald-800"
              : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
          }`}
        >
          <RadioGroupItem
            value={workplaceTypeSchema.Enum.remote}
            id="Remote"
            className="sr-only"
          />
          <Briefcase className="h-4 w-4" />
          <Label htmlFor="Remote" className="cursor-pointer text-lg">
            Remote
          </Label>
        </div>

        <div
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
            value === "office"
              ? "bg-emerald-200 text-emerald-800"
              : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
          }`}
        >
          <RadioGroupItem
            value={workplaceTypeSchema.Enum.office}
            id="Office"
            className="sr-only"
          />
          <Monitor className="h-4 w-4" />
          <Label htmlFor="Office" className="cursor-pointer text-lg">
            Office
          </Label>
        </div>

        <div
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
            value === "hybrid"
              ? "bg-emerald-200 text-emerald-800"
              : "border border-dashed  hover:border-emerald-500 hover:text-emerald-600 bg-white border-emerald-500"
          }`}
        >
          <RadioGroupItem
            value={workplaceTypeSchema.Enum.hybrid}
            id="Hybrid"
            className="sr-only"
          />
          <FileText className="h-4 w-4" />
          <Label htmlFor="Hybrid" className="cursor-pointer text-lg">
            Hybrid
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

