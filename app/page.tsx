"use client";
import InternshipForm from "@/app/components/internship-form";
<<<<<<< HEAD
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
=======
import { ROLE_IDS } from "@/constants/roles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

  const session = useSession();
  const router = useRouter();

  useEffect(() => {

    if (session.status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (session.data?.user.role !== ROLE_IDS.EMPLOYER && session.status === 'authenticated') {
      router.push('/home');
    }
  }, [session, router]);

  return (
    <>
      <InternshipForm />

>>>>>>> 1594c0c8bf3cf969d32d0a737b3b898efb48ac17
    </>
  );
}
