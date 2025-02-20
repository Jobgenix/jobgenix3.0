import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

interface EducationSelectProps {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
}

export function EducationSelect({ label, value, onValueChange, options }: EducationSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-emerald-600 text-sm ">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[140px] h-[30px] bg-white text-sm shadow-sm border-none">
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

