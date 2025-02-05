import Image from "next/image";
import { Button } from "@/app/components/ui/button";
// import img1 from "././../Images/image1.png";
// import img2 from "../../Images/image2.png";

export function ForSection() {
  return (
    <section className="px-4 hidden md:flex py-12 md:px-6 lg:px-8 bg-[linear-gradient(90.05deg,#FFF8DF_0.05%,#C6F7D5_100.93%)]">
      <div className="container mx-auto grid gap-6 md:grid-cols-2">
        {/* For Employees Section */}
        <div className="rounded-3xl bg-[#E0DCF2] flex justify-center items-center p-8 shadow-lg transition-transform hover:scale-105">
          <div>
            <h2 className="mb-4 text-4xl font-semibold text-gray-800">
              For Employees
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Find professionals from around the country and across all skills.
            </p>
            <Button className="rounded-full bg-[#2E7D32] text-white px-8 py-6 text-lg font-medium hover:bg-[#1B5E20]">
              Post jobs for Free
            </Button>
          </div>
          <div className="mt-6 hidden xl:flex">
            <Image
              src="/LandingPageImages/image2.png"
              alt="For Employees"
              width={500}
              height={500}
              className="rounded-lg "
            />
          </div>
        </div>

        {/* For Candidates Section */}
        <div className="rounded-3xl flex justify-center items-center bg-[#F8DBDC] p-8 shadow-lg transition-transform hover:scale-105">
          <div>
            <h2 className="mb-4 text-4xl font-semibold text-gray-800">
              For Candidates
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Build your professional profile, find new opportunities.
            </p>
            <Button className="rounded-full bg-[#2E7D32] text-white px-8 py-6 text-lg font-medium hover:bg-[#1B5E20]">
              Upload Your CV
            </Button>
          </div>
          <div className="mt-6 hidden xl:flex">
            <Image
              src="/LandingPageImages/image1.png"
              alt="For Employees"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
