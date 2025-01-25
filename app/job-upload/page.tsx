"use client";
import LocationSelector from "@/app/components/location-selector";
import CategorySelector from "@/app/components/category-selector";
import SkillsRequired from "../components/skills-required";
import ExperienceSettings from "../components/ExperienceSettings";
import { Infocard } from "../components/info-card";
import StipendDetailsPage from "../components/stipend-details";
import DiversityBenefits from "../components/diversity";
import CompanySelector from "../components/company-selector";
import InternshipDescription from "../components/Internship-desc";
import OtherBenifits from "../components/other-benifits";
import { TypeSelector } from "../components/type-selector";
import { useEffect, useState } from "react";
import { Opportunity } from "@/types/opportunityType";
import AdvancedSettings from "../components/advanced-settings";

export default function Page() {
  const [formData, setFormData] = useState<Partial<Opportunity>>({});

  const [advanced, setAdvanced] = useState(false);

  const updateField = <K extends keyof Opportunity>(
    field: K,
    value: Opportunity[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <section className=" flex flex-col gap-4 px-8">
        <h2 className="w-full h-16 text-3xl font-bold flex justify-between bg-[#E2E2E2] text-[#27724A] items-center px-8 tracking-wide rounded-md shadow-md shadow-black/20 mt-4 ">
          Upload Your Job Opportunity
        </h2>
        <div className=" flex gap-4">
          <div className="w-[70%] px-12 py-8 bg-gradient-to-b from-[#E5F7EB] via-[#E5F7EB] to-[#FFFCEF] rounded-md shadow-md shadow-black/20 flex flex-col gap-20">
            <CompanySelector />
            {/* <InternshipForm /> */}
            <TypeSelector setFormData={updateField} />
            <LocationSelector setFormData={updateField} />
            <CategorySelector setFormData={updateField} />
            <SkillsRequired setFormData={updateField} />
            <ExperienceSettings setFormData={updateField} />
            <StipendDetailsPage setFormData={updateField} />
            <DiversityBenefits setFormData={updateField} />
            <OtherBenifits />
            <InternshipDescription setFormData={updateField} />
            <button
              className="px-4 py-2 bg-emerald-500 text-white flex justify-center items-center w-32 rounded-full font-semibold tracking-wider"
              onClick={() => setAdvanced(!advanced)}
            >
              Next
            </button>
            {advanced && <AdvancedSettings />}
          </div>
          <div>
            <Infocard />
          </div>
        </div>
      </section>
      {/*  */}
    </>
  );
}
