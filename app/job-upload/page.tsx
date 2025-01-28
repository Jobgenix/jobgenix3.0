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
import { opportunitySchema } from "./jobFormValidator";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WorkplaceTypeSelector from "../components/workplace-type";
import { ROLE_IDS } from "@/constants/roles";

export default function Page() {
  const [formData, setFormData] = useState<Partial<Opportunity>>({});

  const [advanced, setAdvanced] = useState(false);
  const session = useSession();
  const router = useRouter();

  const updateField = <K extends keyof Opportunity>(
    field: K,
    value: Opportunity[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitForm = async () => {
    try {
      if (session.status === "unauthenticated" || session.status === "loading")
        return;
      //if(session.data?.user.role !== "EMPLOYER") return;
      const validatedFormData = opportunitySchema.parse(formData);
      const res = await axios.post("/api/job/create-job", {
        ...validatedFormData,
        userId: session.data?.user.id,
      });

      if (res.statusText === "Created") {
        router.push('/job-display');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push('/auth/login');
    }
    if(session.data?.user.role !== ROLE_IDS.EMPLOYER && session.status === 'authenticated'){
      router.push('/job-display');
    }
    console.log(formData);
  }, [session, router, formData]);

  return (
    <>
      <section className=" flex flex-col gap-4 px-8">
        <h2 className="w-full h-16 text-3xl font-bold flex justify-between bg-[#E2E2E2] text-[#27724A] items-center px-8 tracking-wide rounded-md shadow-md shadow-black/20 mt-4 ">
          Upload Your Job Opportunity
        </h2>
        <div className=" flex gap-4">
          <div className="w-[70%] px-12 py-8 bg-gradient-to-b from-[#E5F7EB] via-[#E5F7EB] to-[#FFFCEF] rounded-md shadow-md shadow-black/20 flex flex-col gap-20">
            <CompanySelector setFormData={updateField} />
            {/* <InternshipForm /> */}
            <TypeSelector setFormData={updateField} />
            <WorkplaceTypeSelector setFormData={updateField} />
            <LocationSelector setFormData={updateField} />
            <CategorySelector setFormData={updateField} />
            <SkillsRequired setFormData={updateField} />
            <ExperienceSettings setFormData={updateField} />
            <StipendDetailsPage setFormData={updateField} />
            <DiversityBenefits setFormData={updateField} />
            <OtherBenifits />
            <InternshipDescription setFormData={updateField} />
            {!advanced && (
              <button
                className="px-4 py-2 bg-emerald-500 text-white flex justify-center items-center w-32 rounded-full font-semibold tracking-wider"
                onClick={() => setAdvanced(!advanced)}
              >
                Next
              </button>
            )}
            {advanced && (
              <AdvancedSettings
                setFormData={updateField}
                setAdvanced={setAdvanced}
                formSubmit={submitForm}
              />
            )}
          </div>
          <div>
            <Infocard />
          </div>
          {/* <JobCard/> */}
        </div>
      </section>
      {/*  */}
    </>
  );
}
