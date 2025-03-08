import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

interface EducationSelectProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
}

export function EducationSelect({ label, value, onValueChange, options }: EducationSelectProps) {
  if (label === "Type") return null;
  return (
    <div className="space-y-2 ">
      <label className="text-emerald-600 text-sm ">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[140px] h-[30px] bg-[#2F8E5B]   hover:bg-[#1E7045] text-white text-sm shadow-sm border-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

