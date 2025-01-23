"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Button } from "@/app/components/ui/button";
import { Lightbulb } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

export default function InternshipForm() {
  const [selectedDuration, setSelectedDuration] = useState<{
    type: "weeks" | "months";
    value: number;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-[2fr,1fr]">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Company Selection */}
          <div className="space-y-2">
            <Label htmlFor="company">
              Company you are hiring for <span style={{ color: "red" }}>*</span>
            </Label>
            <div className="flex items-center gap-2 w-full max-w-sm border rounded-lg p-2 bg-white">
              <Input
                type="text"
                id="company"
                placeholder="Enter company name"
                className="border-0 p-0 focus-visible:ring-0"
              />
            </div>
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
        <div className="space-y-6">
          <Card className="bg-green-100 border-none">
            <CardHeader className="flex flex-row items-start space-x-2">
              <Lightbulb className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold">Guidelines</h3>
                <p className="text-sm text-muted-foreground">
                  Adhere to these guidelines for quicker approval:
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  • Choose a suitable role from the suggestions to automatically
                  fill in other fields.
                </li>
                <li className="flex items-start gap-2">
                  • Clearly define the minimum requirements to receive relevant
                  applications.
                </li>
                <li className="flex items-start gap-2">
                  • Avoid matching applicants based on caste, religion, or other
                  discriminatory factors.
                </li>
                <li className="flex items-start gap-2">
                  • Do not charge any application fees.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-green-100 border-none">
            <CardHeader className="flex flex-row items-start space-x-2">
              <Lightbulb className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold">Shortlist Faster & accurately</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-medium">
                Include screening questions and define the stages in the next
                step:
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  • Incorporate an assessment round, such as a quiz or code
                  contest.
                </li>
                <li className="flex items-start gap-2">
                  • Accept submissions in various formats, including PPT, DOC,
                  PDF, CSV, Excel, and others.
                </li>
                <li className="flex items-start gap-2">
                  • Include personal interview rounds for final selection.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
