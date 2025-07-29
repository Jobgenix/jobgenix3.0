"use client";
import {
  ArrowRight,
  // Award,
  // Briefcase,
  // Calendar,
  // ChevronRight,
  // Code,
  // GraduationCap,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import { useRouter } from "next/navigation";
import Footer from "../components/Footer/Footer";
import Nav from "../components/LandingPage-New/nav";
const customShadow =
  "shadow-[4px_4px_10px_#C6C6C6E5,_-4px_-4px_8px_#FFFFFFE5,_4px_-4px_8px_#C6C6C633,_-4px_4px_8px_#C6C6C633,_-1px_-1px_2px_#C6C6C680_inset,_1px_1px_2px_#FFFFFF4D_inset]";

export default function JobPostingForm() {
  const router = useRouter();
  return (
    <div className="font-sora  bg-[#F5F5F5] overflow-hidden min-h-screen ">
      <Nav onLoginClick={() => router.push("/login")} />
      {/* Main content area */}
      <div className="w-full mt-10 p-4 md:mt-5 mb-28 flex flex-col items-center">
        {/* Header section with images and title */}
        <section className="flex justify-center md:justify-between items-center gap-6 md:gap-8 w-full max-w-[89rem]">
          {/* Left image and icons */}
          <div className=" hidden md:relative flex-shrink-0 w-full md:w-1/4 md:flex justify-center">
            <Image
              src="host&opportunity/host&opportunity1.svg"
              alt="Man smiling"
              className="object-contain"
              width={384}
              height={384}
              sizes="(max-width: 768px) 144px, (max-width: 1024px) 240px, 384px"
              style={{ maxWidth: "100%", height: "auto" }}
              priority
            />
          </div>

          {/* Center text content */}
          <div className="text-center px-2">
            <h1 className="font-sora font-semibold text-2xl  md:text-[2.5rem] text-gray-800 mb-3 md:mb-4 leading-tight">
              Host an <span className="text-[#0073E6]">Opportunity</span>
            </h1>
            <p className="text-[#727272] font-montserrat font-semibold text-sm md:text-base">
              Choose your opportunity category from below
            </p>
          </div>

          {/* Right image and icons */}
          <div className="hidden md:relative flex-shrink-0 w-full md:w-[27%] md:flex justify-center">
            <Image
              src="host&opportunity/host&opportunity2.svg"
              alt="Woman smiling"
              className="object-contain"
              width={384}
              height={384}
              sizes="(max-width: 768px) 144px, (max-width: 1024px) 240px, 384px"
              style={{ maxWidth: "100%", height: "auto" }}
              priority
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="mt-12 w-[94%] md:w-[96%] max-w-[86rem]">
          <h2 className="font-montserrat font-bold text-[#0073E6] text-xl text-center mb-8">
            Anything you want to host
          </h2>
          <div className="bg-white  rounded-2xl shadow-lg mb-8">
            {/* Engaging your target audience */}
            <div className=" px-6 pt-6  md:pt-8 md:px-8">
              <h3 className="text-xl md:text-xl text-center font-bold text-[#1C4980] mb-6 ">
                For <span className="text-[#0073E6]">Engaging</span> your target
                audience
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Card 1: Case Competitions */}
                <CategoryCard
                  icon={
                    <Image
                      src="icons/competitions-icon.svg"
                      alt="icon"
                      className="object-contain md:h-[3.25rem] md:w-auto"
                      width={32}
                      height={32}
                    />
                  }
                  title="Case Competitions"
                  actionText="Create Competition"
                  onClick={() => router.push("../hostCenter")}
                />
                {/* Card 2: Contest */}
                <CategoryCard
                  icon={
                    <Image
                      src="icons/challenges-icon.svg"
                      alt="icon"
                      className="object-contain md:h-[3.25rem] md:w-auto"
                      width={32}
                      height={32}
                    />
                  }
                  title="Contest"
                  actionText="Create Contest"
                  onClick={() => router.push("../hostCenter")}
                />
                {/* Card 3: Quizzes */}
                <CategoryCard
                  icon={
                    <Image
                      src="/icons/quizzes-icon.svg"
                      alt="icon"
                      className="object-contain md:h-[3.25rem] md:w-auto"
                      width={32}
                      height={32}
                    />
                  }
                  title="Quizzes"
                  actionText="Create Quizzes"
                  onClick={() => router.push("../hostCenter")}
                />
                {/* Card 4: Coding Challenges */}
                <CategoryCard
                  icon={
                    <Image
                      src="/icons/hackathon-icon.svg"
                      alt="icon"
                      className="object-contain md:h-[3.25rem] md:w-auto"
                      width={32}
                      height={32}
                    />
                  }
                  title="Coding Challenges"
                  actionText="Create Challenges"
                  onClick={() => router.push("../hostCenter")}
                />
              </div>
            </div>

            {/* Webinars & Workshops, Cultural Events, Webiners */}
            <div className=" p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto sm:[90%] xl:w-[76%]">
                {/* Card 5: Webinars & Workshops */}
                <CategoryCard
                  icon={
                    <Image
                      src="/icons/workshops-icon.svg"
                      alt="icon"
                      className="object-contain md:h-[3.25rem] md:w-auto"
                      width={32}
                      height={32}
                    />
                  }
                  title="Webinars & Workshops"
                  actionText="Create Workshops"
                  onClick={() => router.push("../hostCenter")}
                />
                {/* Card 6: Cultural Events */}
                <CategoryCard
                  icon={
                    <Image
                      src="/icons/culturalEvents-icon.svg"
                      alt="icon"
                      className="object-contain md:h-[3.25rem] md:w-auto"
                      width={32}
                      height={32}
                    />
                  }
                  title="Cultural Events"
                  actionText="Create Events"
                  onClick={() => router.push("../hostCenter")}
                />
                {/* Card 7: Webiners */}
                <CategoryCard
                  icon={
                    <Image
                      src="/icons/conferences-icon.svg"
                      alt="icon"
                      className="object-contain md:h-[3.25rem] md:w-auto"
                      width={32}
                      height={32}
                    />
                  }
                  title="Webiners"
                  actionText="Create Conferences"
                  onClick={() => router.push("../hostCenter")}
                />
              </div>
            </div>
          </div>

          {/* For Hiring the right talent */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl md:text-xl text-center font-bold text-[#1C4980] mb-6 ">
              For <span className="text-[#0073E6]">Hiring</span> the right
              talent
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Card 8: Jobs */}
              <CategoryCard
                icon={
                  <Image
                    src="/icons/jobs-icon.svg"
                    alt="icon"
                    className="object-contain md:h-[3.25rem] md:w-auto"
                    width={32}
                    height={32}
                  />
                }
                title="Jobs"
                actionText="Create Jobs"
                onClick={() => router.push("../hostCenter")}
                // onClick={() => (window.location.href = "/host")}
              />
              {/* Card 9: Internships */}
              <CategoryCard
                icon={
                  <Image
                    src="/icons/internships-icon.svg"
                    alt="icon"
                    className="object-contain md:h-[3.25rem] md:w-auto"
                    width={32}
                    height={32}
                  />
                }
                title="Internships"
                actionText="Create Internships"
                onClick={() => router.push("../hostCenter")}
                // onClick={() => (window.location.href = "/host")}
              />
              {/* Card 10: Hiring Challenges */}
              <CategoryCard
                icon={
                  <Image
                    src="/icons/hiring-challenges-icon.svg"
                    alt="icon"
                    className="object-contain md:h-[3.25rem] md:w-auto"
                    width={32}
                    height={32}
                  />
                }
                title="Hiring Challenges"
                actionText="Create Challenges"
                onClick={() => router.push("../hostCenter")}
              />
              {/* Card 11: Coding Challenges */}
              <CategoryCard
                icon={
                  <Image
                    src="/icons/hackathon-icon.svg"
                    alt="icon"
                    className="object-contain md:h-[3.25rem] md:w-auto"
                    width={32}
                    height={32}
                  />
                }
                title="Coding Challenges"
                actionText="Create Hackathons"
                onClick={() => router.push("../hostCenter")}
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

// Reusable Category Card component
interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  actionText: string;
  onClick?: () => void;
}
const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  actionText,
  onClick,
}) => {
  return (
    // <div
    //   className={`bg-gray-50 p-6 rounded-[0.95rem] ${customShadow} border border-gray-200 flex flex-col justify-between items-start hover:shadow-md transition-shadow duration-200`}
    // >
    //   <div className="flex items-center mb-4">
    //     {icon}
    //     <h4 className="text-lg font-medium text-gray-700 ml-3">{title}</h4>
    //   </div>
    //   <div className="flex justify-between items-center w-full mt-auto">
    //     <a
    //       href="#"
    //       className="text-blue-600 hover:underline flex items-center text-sm"
    //       onClick={onClick}
    //     >
    //       {actionText} <ChevronRight className="ml-1" size={16} />
    //     </a>
    //     <button
    //       className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors duration-200"
    //       title="More info"
    //       onClick={() => console.log("Info clicked for", title)}
    //     >
    //       <HelpCircle size={18} />
    //     </button>
    //   </div>
    // </div>
    <div
      className={`bg-gray-50 py-5 pl-4 pr-3 rounded-[0.95rem] ${customShadow} border border-gray-200 flex items-center hover:shadow-md transition-shadow duration-200 `}
    >
      <div className="w-full flex gap-3 justify-start">
        {icon}
        <div className="flex flex-col justify-around">
          <h4 className="font-inter text-sm font-medium text-gray-700">
            {title}
          </h4>
          <a
            href="#"
            className="text-[#0073E6] text-xs font-normal hover:underline flex items-center"
            onClick={onClick}
          >
            {actionText} <ArrowRight className="ml-4" size={16} />
          </a>
        </div>
      </div>
      <button
        className="w-fit rounded-full text-[#1C4980] hover:text-[#1c4980b6] transition-colors duration-200 self-end -mb-1 mr-1"
        title="More info"
        onClick={() => console.log("Info clicked for", title)}
      >
        <HelpCircle size={18} />
      </button>
    </div>
  );
};
