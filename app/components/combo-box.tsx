"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";

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

const companies = [
  {
    value: "google",
    label: "Google",
    logo: "/company-logos/google.svg",
  },
  {
    value: "amazon",
    label: "Amazon",
    logo: "/company-logos/amazon.svg",
  },
  {
    value: "microsoft",
    label: "Microsoft",
    logo: "/company-logos/microsoft.svg",
  },
  {
    value: "accenture",
    label: "Accenture",
    logo: "/company-logos/accenture.svg",
  },
  {
    value: "deloitte",
    label: "Deloitte",
    logo: "/company-logos/deloitte.svg",
  },
  {
    value: "capgemini",
    label: "Capgemini",
    logo: "/company-logos/capgemini.svg",
  },
  {
    value: "coinbase",
    label: "Coinbase",
    logo: "/company-logos/coinbase.svg",
  },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectedCompany = companies.find((company) => company.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full bg-[#FFFCEF] justify-between h-16 text-xl"
        >
          <div className="flex items-center gap-2 w-full">
            {selectedCompany ? (
              <>
                <div className="relative h-6 w-6 shrink-0">
                  <Image
                    src={selectedCompany.logo || "/placeholder.svg"}
                    alt={selectedCompany.label}
                    className="rounded-sm object-contain"
                    fill
                    sizes="24px"
                  />
                </div>
                <span>{selectedCompany.label}</span>
              </>
            ) : (
              "Select company..."
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 scale-150 mt-20 p-0">
        <Command>
          <CommandInput placeholder="Search company..." className="h-9" />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup className="flex flex-col gap-2 grp">
              {companies.map((company) => (
                <CommandItem
                  key={company.value}
                  value={company.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    setOpen(false);
                    const selectedCompany = companies.find(
                      (company) => company.value === newValue
                    );
                    // onValueChange?.(newValue, selectedCompany);
                  }}
                  className={cn(
                    "flex items-center relative justify-center gap-2 test bg-[#FFFCEF] text-black",
                    value === company.value && "bg-[#FFEFAA] "
                  )}
                >
                  <div className=" h-6 w-6 flex justify-center  gap-4">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={company.label}
                      className="rounded-sm object-contain !relative -left-4"
                      fill
                      sizes="24px"
                    />
                    <span>{company.label}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 absolute right-4 ",
                      value === company.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
