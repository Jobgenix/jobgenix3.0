import InternshipForm from "@/app/components/internship-form";
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

export default function page() {
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
            <TypeSelector />
            <LocationSelector />
            <CategorySelector />
            <SkillsRequired />
            <ExperienceSettings />
            <StipendDetailsPage />
            <DiversityBenefits />
            <OtherBenifits />
            <InternshipDescription />
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
