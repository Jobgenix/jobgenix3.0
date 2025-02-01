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
import { useEffect, useCallback, useState, useMemo } from "react";
import { Opportunity } from "@/types/opportunityType";
import AdvancedSettings from "../components/advanced-settings";
import { opportunitySchema } from "./jobFormValidator";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WorkplaceTypeSelector from "../components/workplace-type";
import { ROLE_IDS } from "@/constants/roles";
import { toast } from "sonner";
import { ZodError } from "zod";
import { parseZodError } from "@/utils/parseZodError";

export default function Page() {
  const [formData, setFormData] = useState<Partial<Opportunity>>({});
  const [advanced, setAdvanced] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const updateField = useCallback(<K extends keyof Opportunity>(
    field: K,
    value: Opportunity[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const submitForm = useCallback(async () => {
    try {
      if (status !== "authenticated" || session.user.role !== ROLE_IDS.EMPLOYER) return;

      const validatedFormData = opportunitySchema.parse(formData);
      const response = await axios.post("/api/job/create-job", {
        ...validatedFormData,
        userId: session.user.id,
      });

      if (response.status === 201) {
        router.push('/opportunities');
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = parseZodError(error);
        console.log(errorMessages);
        toast.error(
          <div>
            <p>Form Submission Errors:</p>
            <ul className="mt-2">
              {errorMessages.map((msg, index) => (
                <li key={index}>- {msg}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        console.log("An unexpected error occurred:", error);
        toast.error("Network Error");
      }
    }
  }, [formData, router, session, status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/login');
    }
    if (status === 'authenticated' && session.user.role !== ROLE_IDS.EMPLOYER) {
      router.push('/job-display');
    }
  }, [status, session, router]);

  const formComponents = useMemo(() => [
    { Component: CompanySelector, props: { setFormData: updateField } },
    { Component: TypeSelector, props: { setFormData: updateField } },
    { Component: WorkplaceTypeSelector, props: { setFormData: updateField } },
    { Component: LocationSelector, props: { setFormData: updateField } },
    { Component: CategorySelector, props: { setFormData: updateField } },
    { Component: SkillsRequired, props: { setFormData: updateField } },
    { Component: ExperienceSettings, props: { setFormData: updateField } },
    { Component: StipendDetailsPage, props: { setFormData: updateField } },
    { Component: DiversityBenefits, props: { setFormData: updateField } },
    { Component: OtherBenifits },
    { Component: InternshipDescription, props: { setFormData: updateField } },
  ], [updateField]);

  return (
    <section className="flex flex-col gap-4 px-8">
      <h2 className="w-full h-16 text-3xl font-bold flex justify-between bg-[#E2E2E2] text-[#27724A] items-center px-8 tracking-wide rounded-md shadow-md shadow-black/20 mt-4">
        Upload Your Job Opportunity
      </h2>
      <div className="flex gap-4">
        <div className="w-[70%] px-12 py-8 bg-gradient-to-b from-[#E5F7EB] via-[#E5F7EB] to-[#FFFCEF] rounded-md shadow-md shadow-black/20 flex flex-col gap-20">
          {formComponents.map(({ Component, props }, index) => (
            <Component key={index} {...props!} />
          ))}
          {!advanced ? (
            <button
              className="px-4 py-2 bg-emerald-500 text-white flex justify-center items-center w-32 rounded-full font-semibold tracking-wider"
              onClick={() => setAdvanced(true)}
            >
              Next
            </button>
          ) : (
            <AdvancedSettings
              setFormData={updateField}
              setAdvanced={setAdvanced}
              formSubmit={submitForm}
            />
          )}
        </div>
        <Infocard />
      </div>
    </section>
  );
}