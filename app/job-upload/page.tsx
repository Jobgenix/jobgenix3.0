import InternshipForm from "@/app/components/internship-form";
import LocationSelector from "@/app/components/location-selector";
import CategorySelector from "@/app/components/category-selector";
import { Infocard } from "../components/info-card";
// import JobCard from "../components/Job-components";

export default function page() {
  return (
    <>
      <section className=" flex flex-col gap-4 px-8">
        <h2 className="w-full h-16 text-3xl font-bold flex justify-between bg-[#E2E2E2] text-[#27724A] items-center px-8 tracking-wide rounded-md shadow-md shadow-black/20 mt-4 ">
          Upload Your Job Opportunity
        </h2>
        <div className=" flex gap-4">
          <div className="w-[70%] px-12 py-8 bg-gradient-to-b from-[#E5F7EB] to-[#FFFCEF] rounded-md shadow-md shadow-black/20 flex flex-col gap-20">
            <InternshipForm />
            <LocationSelector />
            <CategorySelector />
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
