/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import AdditionalSetting from "./AdditionalSetting";
import ToggleSwitch from "./ToggleSwitch";

export default function AdvancedSettings({
  onChange,
  onAdditionalChange,
  onFinish,
  loading,
}: {
  onChange?: (settings: any) => void;
  onAdditionalChange?: (settings: any) => void;
  onFinish?: () => void;
  loading?: boolean;
}) {
  const [advancedSettingsEnabled, setAdvancedSettingsEnabled] = useState(false);
  const [
    takeApplicationsOnAnotherPlatform,
    setTakeApplicationsOnAnotherPlatform,
  ] = useState(false);
  const [applicationPlatform, setApplicationPlatform] = useState<
    "Website URL" | "By Email"
  >("Website URL");
  const [applicationViaInvitationsOnly, setApplicationViaInvitationsOnly] =
    useState(false);
  const [autoCloseJob, setAutoCloseJob] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [applicationUrl, setApplicationUrl] = useState("");

  // Call onChange whenever settings change
  React.useEffect(() => {
    onChange?.({
      advancedSettingsEnabled,
      takeApplicationsOnAnotherPlatform,
      applicationPlatform,
      applicationViaInvitationsOnly,
      autoCloseJob,
    });
  }, [
    advancedSettingsEnabled,
    takeApplicationsOnAnotherPlatform,
    applicationPlatform,
    applicationViaInvitationsOnly,
    autoCloseJob,
    onChange,
  ]);

  // Ensure deadline, postedAt, and jobLink are always sent as strings
  useEffect(() => {
    if (onChange) {
      const updatedFields: any = {};
      if (startDate instanceof Date && !isNaN(startDate.getTime())) {
        updatedFields.postedAt = startDate.toISOString().slice(0, 10);
      }
      if (endDate instanceof Date && !isNaN(endDate.getTime())) {
        updatedFields.deadline = endDate.toISOString().slice(0, 10);
      }
      if (applicationUrl && typeof applicationUrl === 'string' && applicationUrl.length) {
        updatedFields.jobLink = applicationUrl;
      }
      if (Object.keys(updatedFields).length > 0) {
        onChange(updatedFields);
      }
    }
  }, [startDate, endDate, applicationUrl, onChange]);

  return (
    <>
      <div className="font-bold font-sora text-[#333333] text-xl md:text-2xl lg:text-4xl w-full max-w-[16rem] md:max-w-[19rem] lg:max-w-md">
        <ToggleSwitch
          label="Advanced Settings"
          initialState={advancedSettingsEnabled}
          onChange={setAdvancedSettingsEnabled}
          className="font-montserrat"
        />
      </div>

      {advancedSettingsEnabled && (
        <div className="mt-4 border-t pt-4 border-gray-200 bg-white rounded-xl card-shadow no-shadow-mobile p-6 sm:p-8 lg:p-10 mb-12 space-y-4 sm:space-y-10">
          {/* Take applications on another platform */}
          <ToggleSwitch
            label="Take applications on another Platform"
            onChange={setTakeApplicationsOnAnotherPlatform}
            initialState={takeApplicationsOnAnotherPlatform}
            className="my-0 card-shadow no-shadow-mobile sm:px-7 max-w-[53rem] h-auto sm:h-[4.7rem] rounded-2xl font-montserrat text-base sm:text-xl font-medium gap-2"
          />

          <div>
            <div className="flex mb-4 space-x-4">
              {["Website URL", "By Email"].map((platform) => (
                <button
                  key={platform}
                  className={`px-2 py-3 sm:px-3 sm:py-4 min-w-[8.3rem] border rounded-[3.1rem] text-sm sm:text-xl font-inter font-medium  ${applicationPlatform === platform
                    ? "bg-blue-100 border-blue-600"
                    : "bg-transparent border border-dashed border-black"
                    } ${!takeApplicationsOnAnotherPlatform
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                    }`}
                  onClick={() =>
                    takeApplicationsOnAnotherPlatform &&
                    setApplicationPlatform(
                      platform as "Website URL" | "By Email"
                    )
                  }
                  disabled={!takeApplicationsOnAnotherPlatform}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-base sm:text-xl font-medium font-montserrat mb-3 sm:mb-7">
              Application URL <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              className={`card-shadow no-shadow-mobile my-0 sm:px-7 py-2 max-w-[53rem] h-auto sm:h-[4.7rem] rounded-2xl font-montserrat font-medium appearance-none  w-full  text-gray-700 text-base sm:text-xl leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 ${!takeApplicationsOnAnotherPlatform
                ? "opacity-60 cursor-not-allowed"
                : ""
                }`}
              value={applicationUrl}
              onChange={e => setApplicationUrl(e.target.value)}
              disabled={!takeApplicationsOnAnotherPlatform}
            />
          </div>

          {/* Application via invitations only */}
          <ToggleSwitch
            label="Application via invitations only (Not visible Publicly on Jobgenix)"
            description="Make this only accessible by invitation (won't be visible publicly on Jobgenix, can be accessed via link)"
            onChange={setApplicationViaInvitationsOnly}
            initialState={applicationViaInvitationsOnly}
            className="hidden sm:flex card-shadow my-0 sm:px-7 py-4 max-w-[53rem] sm:min-h-[4.7rem] rounded-2xl font-inter text-xl font-medium gap-2"
          />
          <ToggleSwitch
            label="Application via invitations only (Not visible Publicly on Jobgenix)"
            onChange={setApplicationViaInvitationsOnly}
            initialState={applicationViaInvitationsOnly}
            className="sm:hidden my-0 py-4 max-w-[53rem] h-auto font-inter text-base font-medium gap-3"
          />

          {/* Auto-close job */}
          <div className="space-y-4">
            <h1 className="text-base sm:text-xl sm:leading-4 font-medium opacity-[85%]">
              Auto-close this job
            </h1>
            <h2 className="font-montserrat font-medium text-sm sm:text-base text-[#5D5D5D]">
              Select the triggers below to auto-close the application process
              for this listing
            </h2>
            <button
              className={` px-6 py-4 rounded-full text-sm sm:text-base font-montserrat font-medium border mb-4 ${autoCloseJob
                ? "bg-blue-100 border-blue-500"
                : "bg-transparent border border-dashed border-[#333333]"
                }`}
              onClick={() => setAutoCloseJob((prev) => !prev)}
            >
              After Specific Date
            </button>
          </div>

          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 font-montserrat sm:mb-0 mb-12">
              {["Start Date & Time", "End Date & Time"].map((label, idx) => (
                <div key={label} className="space-y-4">
                  <label className="block text-gray-700 text-sm md:text-lg font-semibold">
                    {label}
                  </label>
                  <div className="relative card-shadow no-shadow-mobile border border-[#333333] sm:border-none rounded-[0.98rem] px-7 py-5 ">
                    <input
                      type="datetime-local"
                      className={`appearance-none w-full text-gray-700 text-base sm:text-xl leading-tight border-none ${!autoCloseJob ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                      value={
                        idx === 0
                          ? startDate
                            ? new Date(startDate).toISOString().slice(0, 16)
                            : ""
                          : endDate
                            ? new Date(endDate).toISOString().slice(0, 16)
                            : ""
                      }
                      onChange={e => {
                        const val = e.target.value;
                        if (val) {
                          if (idx === 0) setStartDate(new Date(val));
                          else setEndDate(new Date(val));
                        } else {
                          if (idx === 0) setStartDate(null);
                          else setEndDate(null);
                        }
                      }}
                      disabled={!autoCloseJob}
                    />
                    {/* <CalendarDays
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      size={20}
                    /> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AdditionalSetting onChange={onAdditionalChange} />
          <div>
            <button
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 focus:outline focus:outline-1 focus:outline-slate-300 focus:bg-white focus:text-blue-700  transition-all duration-200"
              onClick={onFinish}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Finish"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
