"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Calendar as CalendarComponent } from "@/app/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Opportunity } from "@/types/opportunityType";

export default function AdvancedSettings({
  setAdvanced,
  setFormData,
}: {
  setAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: <K extends keyof Opportunity>(field: K, value: Opportunity[K]) => void;
}) {
  const [externalPlatform, setExternalPlatform] = useState(false);
  const [invitationOnly, setInvitationOnly] = useState(false);
  const [applicationType, setApplicationType] = useState<"url" | "email">(
    "url"
  );
  const [startDate, setStartDate] = useState<Date | undefined>(new Date);
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    if (startDate && endDate) {
      setFormData('postedAt', startDate.toDateString())
      setFormData('deadline', endDate.toDateString())
    }
  }, [startDate, endDate,])

  return (
    <div className="flex flex-col gap-4">
      <h2 className="w-full h-16 text-3xl font-bold flex justify-between bg-[#E2E2E2] text-[#27724A] items-center px-8 tracking-wide rounded-md shadow-md shadow-black/20 mt-4 ">
        Advanced settings
      </h2>
      <div className="w-full mx-auto space-y-8">
        <div className="space-y-4 mt-4">
          <p className="text-base  ">
            Open the registrations on Jobgenix to host playable rounds like
            Quiz, Code Contest and Submission.
          </p>
          <div className="flex items-center justify-between  w-full h-16 sm:text-xl md:text-xl text-gray-600 bg-white border-none rounded-lg shadow-lg shadow-black/20 px-4">
            <div className="space-y-0.5">
              <h3 className="text-lg font-medium">
                Take applications on another platform
              </h3>
            </div>
            <Switch
              checked={externalPlatform}
              onCheckedChange={setExternalPlatform}
            />
          </div>

          {externalPlatform && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={applicationType === "url" ? "default" : "outline"}
                  onClick={() => setApplicationType("url")}
                  className="bg-green-50 hover:bg-green-100 text-green-700"
                >
                  Website URL
                </Button>
                <Button
                  variant={applicationType === "email" ? "default" : "outline"}
                  onClick={() => setApplicationType("email")}
                  className="border-dashed"
                >
                  By Email
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-green-700">
                  Application URL
                </label>
                <Input
                  placeholder="https://iboards.greenhouse.ioigleanwork/jobs!45D6504005"
                  className="bg-[#FDF8F3]"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-4  w-full sm:text-xl md:text-xl text-gray-600 bg-white border-none rounded-lg shadow-lg shadow-black/20 px-4">
            <div className="space-y-0.5 ">
              <h3 className="text-lg font-medium">
                Application via invitations only (Not visible Publicly on
                Jobgenix)
              </h3>
              <p className="text-sm text-muted-foreground">
                Make this only accessible by invitation (won&apos;t be visible
                publicly on Jongenix, can be accessed via link)
              </p>
            </div>
            <Switch
              checked={invitationOnly}
              onCheckedChange={setInvitationOnly}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold  text-[#27724A]">
              Auto-close this job
            </h3>
            <p className="text-sm text-muted-foreground">
              Select the triggers below to auto-close the application process
              for this listing
            </p>
          </div>

          <Button variant="outline" className="border-dashed">
            After Specific Date
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date & Time</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    {startDate
                      ? startDate.toLocaleDateString()
                      : "12/12/24 00:00:00"}
                    <Calendar className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Date & Time</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    {endDate
                      ? endDate.toLocaleDateString()
                      : "11/01/25 00:00:00"}
                    <Calendar className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            className="bg-green-50 hover:bg-green-100 text-green-700"
            onClick={() => setAdvanced(false)}
          >
            Back
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">Finish</Button>
        </div>
      </div>
    </div>
  );
}
