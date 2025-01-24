// /*eslint-disable*/
"use client";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

import { Combobox } from "./combo-box";

export default function InternshipForm() {
  const [selectedDuration, setSelectedDuration] = useState<{
    type: "weeks" | "months";
    value: number;
  } | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-[2fr,1fr]">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Company Selection */}
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="company">
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
            <Combobox />
          </div>

          {/* Internship Title */}
          <div className="space-y-2">
            <Label>
              Internship Title/Role <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Choose position from the suggestions to pre-fill details"
              className="max-w-sm"
            />
          </div>

          {/* Internship Type */}
          <div className="space-y-2">
            <Label>
              Internship Type <span className="text-red-500">*</span>
            </Label>
            <RadioGroup defaultValue="internship" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="job" id="job" />
                <Label htmlFor="job">Jobs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="internship" id="internship" />
                <Label htmlFor="internship">Internships</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contracts" id="contracts" />
                <Label htmlFor="contracts">Contracts</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Duration Selection */}
          <div className="space-y-2">
            <Label>
              Internship Duration <span className="text-red-500">*</span>
            </Label>
            <Tabs defaultValue="weeks" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="weeks">Weeks</TabsTrigger>
                <TabsTrigger value="months">Months</TabsTrigger>
              </TabsList>
              <TabsContent value="weeks" className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((week) => (
                  <Button
                    key={`week-${week}`}
                    variant={
                      selectedDuration?.type === "weeks" &&
                      selectedDuration.value === week
                        ? "default"
                        : "outline"
                    }
                    className="rounded-full hover:bg-green-50"
                    onClick={() =>
                      setSelectedDuration({ type: "weeks", value: week })
                    }
                  >
                    {week} weeks
                  </Button>
                ))}
              </TabsContent>
              <TabsContent value="months" className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                  <Button
                    key={`month-${month}`}
                    variant={
                      selectedDuration?.type === "months" &&
                      selectedDuration.value === month
                        ? "default"
                        : "outline"
                    }
                    className="rounded-full hover:bg-green-50"
                    onClick={() =>
                      setSelectedDuration({ type: "months", value: month })
                    }
                  >
                    {month} months
                  </Button>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Guidelines Section */}
      </div>
    </div>
  );
}
