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
