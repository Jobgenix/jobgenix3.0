/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import AdvancedSetting from "../components/HostOpportunity/AdvanceSetting";
import JobDescription from "../components/HostOpportunity/JobDescription";
import MainForm from "../components/HostOpportunity/MainForm";
import Nav from "../components/LandingPage-New/nav";

export default function HostCenter() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Only show page if user has role "2"
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || session.user.role !== "2") {
      router.replace("/"); // or redirect to login or another page
    }
  }, [session, status, router]);

  // State to collect all form data
  const [mainForm, setMainForm] = useState<any>({});
  const [jobDescription, setJobDescription] = useState<string>("");
  const [advancedSettings, setAdvancedSettings] = useState<any>({});
  const [additionalSettings, setAdditionalSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Handler for the final submit
  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      // Merge advancedSettings into mainForm for required fields
      const mergedForm = {
        ...mainForm,
        ...advancedSettings,
      };

      const requiredFields = [
        "companyId",
        "title",
        "type",
        "workplaceType",
        "stipendType",
        "experience",
        "jobLink",
        "category",
        "deadline",
        "postedAt",
      ];

      for (const field of requiredFields) {
        if (
          !mergedForm[field] ||
          (Array.isArray(mergedForm[field]) && mergedForm[field].length === 0)
        ) {
          alert(`Please fill the required field: ${field}`);
          setLoading(false);
          return;
        }
      }
      if (!jobDescription) {
        alert("Please fill the job description.");
        setLoading(false);
        return;
      }

      const payload = {
        companyId: mergedForm.companyId,
        title: mergedForm.title,
        description: jobDescription,
        location: mergedForm.location,
        type: mergedForm.type,
        workplaceType: mergedForm.workplaceType,
        stipendType: mergedForm.stipendType,
        experience: mergedForm.experience,
        jobLink: mergedForm.jobLink,
        category: mergedForm.category,
        deadline: mergedForm.deadline,
        postedAt: mergedForm.postedAt,
        degree: mergedForm.degree,           // <-- add this
        passoutYear: mergedForm.passoutYear,
        advancedSettings,
        additionalSettings,
      };

      const res = await fetch("/api/job/create-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create job");
      alert("Job/Internship posted!");
    } catch (err) {
      alert("Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  // Don't render until session is loaded and checked
  if (status === "loading" || !session?.user || session.user.role !== "2") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] ">
      <Nav onLoginClick={() => router.push("/login")} />
      {/* Header */}
      <div className="flex flex-col items-center justify-center mt-20 relative font-montserrat p-3 md:p-4">
        <h1 className="text-[2.5rem] leading-[3rem] font-semibold text-[#333333] font-sora text-center">
          Host Center
        </h1>
        <p className="text-[#333333] text-lg sm:text-xl font-normal mt-1 mb-9 sm:mb-14 font-montserrat">
          Where Opportunities Take Flight 🚀
        </p>

        <div className=" w-full max-w-[1196px] ">
          {/* section 1 */}
          <div className="bg-white rounded-xl card-shadow p-6 sm:p-8 lg:p-10 mb-12">
            <MainForm onChange={setMainForm} />
            <JobDescription onChange={setJobDescription} />
          </div>
          {/* section 2 */}
          <div>
            <AdvancedSetting
              onChange={setAdvancedSettings}
              onAdditionalChange={setAdditionalSettings}
              onFinish={handleFinalSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
