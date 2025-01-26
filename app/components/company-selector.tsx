import { formSectionProps } from "@/types/formSectionProps";
import { Combobox } from "./combo-box";
import { Label } from "@/app/components/ui/label";

export default function CompanySelector({ setFormData }: formSectionProps){
    return(
        <div className="space-y-2 flex flex-col">
            <Label htmlFor="company" className="text-xl text-[#2F8E5B]">
              Company you are hiring for <span style={{ color: "red" }}>*</span>
            </Label>

            {/* <div className="flex items-center gap-2 w-full max-w-sm border rounded-lg p-2 bg-white">
              <Input
                type="text"
                id="company"
                placeholder="Enter company name"
                className="border-0 p-0 focus-visible:ring-0"
                />
                </div> */}
            <Combobox setFormData={setFormData} />
          </div>
    )
}