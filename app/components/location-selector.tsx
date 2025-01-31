/* eslint-disable*/
//@ts-nocheck
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { formSectionProps } from "@/types/formSectionProps";

const cities = [
  { value: "bangalore", label: "Bangalore" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "chennai", label: "Chennai" },
  { value: "pune", label: "Pune" },
  { value: "kolkata", label: "Kolkata" },
  { value: "ahmedabad", label: "Ahmedabad" },
  { value: "jaipur", label: "Jaipur" },
  { value: "surat", label: "Surat" },
  { value: "lucknow", label: "Lucknow" },
  { value: "kanpur", label: "Kanpur" },
  { value: "nagpur", label: "Nagpur" },
  { value: "patna", label: "Patna" },
  { value: "indore", label: "Indore" },
  { value: "thane", label: "Thane" },
  { value: "bhopal", label: "Bhopal" },
  { value: "visakhapatnam", label: "Visakhapatnam" },
  { value: "vadodara", label: "Vadodara" },
  { value: "firozabad", label: "Firozabad" },
  { value: "ludhiana", label: "Ludhiana" },
  
  { value: "agra", label: "Agra" },
  { value: "nashik", label: "Nashik" },
  { value: "faridabad", label: "Faridabad" },
  { value: "meerut", label: "Meerut" },
  { value: "raipur", label: "Raipur" },
  { value: "allahabad", label: "Allahabad" },
  { value: "bhilai", label: "Bhilai" },
  { value: "jamshedpur", label: "Jamshedpur" },
  { value: "bhubaneswar", label: "Bhubaneswar" },
  { value: "ahmednagar", label: "Ahmednagar" },
  { value: "bhavnagar", label: "Bhavnagar" },
  { value: "kochi", label: "Kochi" },
  { value: "jalgaon", label: "Jalgaon" },
  { value: "bikaner", label: "Bikaner" },
  { value: "kollam", label: "Kollam" },
  { value: "nizamabad", label: "Nizamabad" },
  { value: "parbhani", label: "Parbhani" },
  { value: "tumkur", label: "Tumkur" },
  { value: "khammam", label: "Khammam" },
  { value: "ojhar", label: "Ojhar" },
  { value: "bhiwandi", label: "Bhiwandi" },
  { value: "panvel", label: "Panvel" },
  { value: "kalyan", label: "Kalyan" },
  { value: "noida", label: "Noida" },
  { value: "gurgaon", label: "Gurgaon" },
  { value: "gandhinagar", label: "Gandhinagar" },
  { value: "ghaziabad", label: "Ghaziabad" },
  { value: "rajkot", label: "Rajkot" },
  { value: "vapi", label: "Vapi" },
  { value: "vellore", label: "Vellore" },
  { value: "tiruvannamalai", label: "Tiruvannamalai" },
  { value: "tirupati", label: "Tirupati" },
  { value: "tirunelveli", label: "Tirunelveli" },
  { value: "tiruchirappalli", label: "Tiruchirappalli" },
  { value: "thoothukudi", label: "Thoothukudi" },
  { value: "thanjavur", label: "Thanjavur" },
  { value: "tenkasi", label: "Tenkasi" },
  { value: "salem", label: "Salem" },
  { value: "sivakasi", label: "Sivakasi" },
  { value: "singrauli", label: "Singrauli" },
  { value: "shimla", label: "Shimla" },
  { value: "satna", label: "Satna" },
  { value: "sagar", label: "Sagar" },
  { value: "roorkee", label: "Roorkee" },
  { value: "rishikesh", label: "Rishikesh" },
  { value: "rewa", label: "Rewa" },
  { value: "ratlam", label: "Ratlam" },
  { value: "rajnandgaon", label: "Rajnandgaon" },
  { value: "raigarh", label: "Raigarh" },
  { value: "pithampur", label: "Pithampur" },
  { value: "phagwara", label: "Phagwara" },
  { value: "pali", label: "Pali" },
  { value: "palanpur", label: "Palanpur" },
  { value: "nadiad", label: "Nadiad" },
  { value: "morbi", label: "Morbi" },
  { value: "mehsana", label: "Mehsana" },
  { value: "mandsaur", label: "Mandsaur" },
  { value: "lonavala", label: "Lonavala" },
  { value: "latur", label: "Latur" },
  { value: "kota", label: "Kota" },
  { value: "kolar", label: "Kolar" },
  { value: "khandwa", label: "Khandwa" },
  { value: "khambhat", label: "Khambhat" },
  { value: "kadi", label: "Kadi" },
  { value: "jodhpur", label: "Jodhpur" },
  { value: "jamnagar", label: "Jamnagar" },
  { value: "jaisalmer", label: "Jaisalmer" },
  { value: "jamalpur", label: "Jamalpur" },
  { value: "jagadhri", label: "Jagadhri" },
  { value: "haldwani", label: "Haldwani" },
  {value: "karnataka", label: "Karnataka"},
  {value: "maharastra", label: "Maharastra"},
  {value: "tamilnadu", label: "Tamilnadu"},
  {value: "telangana", label: "Telangana"},
  {value: "uttarpradesh", label: "Uttar Pradesh"},
  {value: "gujarat", label: "Gujarat"},
  {value: "rajasthan", label: "Rajasthan"},
  {value: "madhyapradesh", label: "Madhya Pradesh"},
  {value: "bihar", label: "Bihar"},
  {value: "westbengal", label: "West Bengal"},
  {value: "andhrapradesh", label: "Andhra Pradesh"},
  {value: "haryana", label: "Haryana"},
  {value: "punjab", label: "Punjab"},
  {value: "uttarakhand", label: "Uttarakhand"},
  {value: "himachalpradesh", label: "Himachal Pradesh"},
  {value: "chhattisgarh", label: "Chhattisgarh"},
  {value: "jharkhand", label: "Jharkhand"},
  {value: "odisha", label: "Odisha"},
  {value: "kerala", label: "Kerala"},
  {value: "maharashtra", label: "Maharashtra"},
  {value: "goa", label: "Goa"},
  {value: "sikkim", label: "Sikkim"},
];



export default function LocationSelector({ setFormData }: formSectionProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCities, setSelectedCities] = React.useState<typeof cities>([]);
  React.useEffect(() => {
    setFormData("location", selectedCities.map((city) => city.value));
  }, [selectedCities]);

  const handleSelect = (currentValue: string) => {
    const selected = cities.find((city) => city.value === currentValue);
    if (
      selected &&
      !selectedCities.some((city) => city.value === currentValue)
    ) {
      setSelectedCities((prev) => [...prev, selected]);
    }
    setOpen(false);
  };

  const handleRemove = (valueToRemove: string) => {
    setSelectedCities((prev) =>
      prev.filter((city) => city.value !== valueToRemove)
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-8">
        <label className="text-xl font-medium">
          Work Location: <span className="text-red-500">*</span>
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-16 text-xl text-gray-600 bg-[#FFFCEF] border-none rounded-lg shadow-lg shadow-black/20 tracking-wide"
            >
              City
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search cities..." />
              <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      key={city.value}
                      value={city.value}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCities.some((c) => c.value === city.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {city.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedCities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCities.map((city) => (
            <div
              key={city.value}
              className="flex items-center gap-1 rounded-full bg-[#FFFFFFB2] px-3 py-1 text-sm border border-[#96999C] text-md tracking-wide"
            >
              <span className="text-base text-[#2F8E5B]  tracking-wider">
                {city.label}
              </span>
              <button
                onClick={() => handleRemove(city.value)}
                className="ml-1 rounded-full p-0.5  hover:bg-primary/20"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {city.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
