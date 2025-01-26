//import { Card } from "../LandingPageComponents/ui/card";
import Image from "next/image";
import heroImage from "../../Images/heroSection.png";

export function HeaderSection() {
  return (
    <div className="w-full h-full lg:h-[90vh] flex flex-col md:flex-row bg-[#F3F9F3]">
      {/* Left Side - Image */}
      <div className="flex-1 flex justify-center items-center p-4 lg:p-0">
        <Image
          src={heroImage}
          alt="Student with study materials"
          width={510}
          height={475}
          className="object-contain"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-start px-6 text-center lg:text-left">
        <h1 className="font-semibold text-3xl lg:text-5xl leading-[22px] lg:leading-[52px] mb-4">
          <span className="text-[#2F8E5B]">Empowering</span> Growth
        </h1>
        <h1 className="font-semibold text-3xl lg:text-5xl leading-[22px] lg:leading-[52px] mb-4">
          Through Career
        </h1>
        <h1 className="font-semibold text-3xl lg:text-5xl leading-[22px] lg:leading-[52px] mb-8">
          Innovation
        </h1>
        <p className="text-[#5D5D5D] text-sm lg:text-base leading-6 max-w-xl">
          Amplify your skills, enrich your CV, and make your dream job a reality
          with global connections.
        </p>
      </div>
    </div>
  );
}
