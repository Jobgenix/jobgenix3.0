"use client";
import InternshipForm from "@/app/components/internship-form";
import Footer from "./components/footer";
import StatsSection from "./components/stats-section";
import ReferAndWin from "./components/refer";
import InternshipDescription from "./components/Internship-desc";
// import InternshipDescription from "./components/Internship-desc";
export default function Page() {
  return (
    <>
      <InternshipForm />
      <Footer />
      <StatsSection />
      <ReferAndWin />
      <InternshipDescription/>
    </>
  );
}
