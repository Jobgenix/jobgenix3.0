"use client";
import InternshipForm from "@/app/components/internship-form";
import Footer from "./components/footer";
import StatsSection from "./components/stats-section";
import ReferAndWin from "./components/refer";
import InternshipDescription from "./components/Internship-desc";
// import InternshipDescription from "./components/Internship-desc";
import DiversityBenefits from "./components/diversity";
import StipendDetails from "./components/stipend-details";
import ExperienceSettings from "./components/ExperienceSettings";
import SkillsRequired from "./components/skills-required";
export default function Page() {
  return (
    <>
      <InternshipForm />
      <Footer />
      <StatsSection />
      <ReferAndWin />
      <InternshipDescription/>
      <DiversityBenefits/>
      <StipendDetails/>
      <ExperienceSettings/>
      <SkillsRequired/>
    </>
  );
}
