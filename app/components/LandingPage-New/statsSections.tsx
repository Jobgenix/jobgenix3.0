"use client";
import Image from "next/image";

import { ArrowRightCircle } from "lucide-react";

export default function StatsSection() {
  return (
    <div className="flex mx-auto font-montserrat flex-col bg-[#F5F5F5] items-center justify-center sm:space-y-10 md:space-y-44 md:mt-32 mb-20 sm:mb-0 sm:py-10 px-3 md:px-6 lg:px-8">
      {/* Stats Card */}
      <div
        className="hidden relative md:w-full w-[90vw]  max-w-[74.8rem] sm:flex flex-col md:flex-row bg-[#C9E3FF] md:gap-6 rounded-2xl px-5  py-8 border border-blue-400
  transition-all duration-300 hover:shadow-lg 
  before:absolute before:bottom-[-25px] before:left-1/2 before:w-[90%] before:h-6 before:bg-[#0073E6] before:opacity-30 before:blur-lg before:-translate-x-1/2"
      >
        {/* Left Section - Title & Description */}
        <div className="flex flex-col justify-center w-full xl:ml-5 md:w-[40%] text-center md:text-left mb-4 md:mb-0 lg:space-y-5">
          <h2 className="text-2xl lg:text-[2.5rem] text-[#333333] font-sora font-[550]">
            Your Success, By{" "}
            <p className="md:mt-4 inline md:block">
              The Numbers{" "}
              <span className="text-lg md:text-xl lg:text-[2rem]"> 🚀</span>
            </p>
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-xl mt-1 font-normal">
            We are helping dreamers become <br className="hidden md:block" />{" "}
            doers—every single day.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid w-full md:w-[60%] grid-cols-2 gap-x-8 md:gap-y-4 text-gray-800">
          <div className="p-5 bg-[#C9E3FF] rounded-xl shadow-[8px_8px_16px rgba(0,0,0,0.25), -4px -4px 10px rgba(255,255,255,0.9)]">
            <p className="text-2xl md:text-3xl lg:text-[3.5rem] lg:leading-[64px] font-sora font-bold">
              63%
            </p>
            <p className="text-xs md:text-sm lg:text-xl font-semibold w-3/5   text-gray-600">
              Job seekers hired within 30 days
            </p>
          </div>

          <div className="p-5 bg-[#C9E3FF] rounded-xl shadow-[8px_8px_16px rgba(0,0,0,0.25), -4px -4px 10px rgba(255,255,255,0.9)]">
            <p className="text-2xl md:text-3xl lg:text-[3.5rem] lg:leading-[64px] font-sora font-bold">
              18K+
            </p>
            <p className="text-xs md:text-sm lg:text-xl font-semibold text-gray-600">
              Impressions
            </p>
          </div>

          <div className="p-5 bg-[#C9E3FF] rounded-xl shadow-[8px_8px_16px rgba(0,0,0,0.25), -4px -4px 10px rgba(255,255,255,0.9)]">
            <p className="text-2xl md:text-3xl lg:text-[3.5rem] lg:leading-[64px] font-sora font-bold">
              300+
            </p>
            <p className="text-xs md:text-sm lg:text-xl font-semibold text-gray-600">
              Live Jobs Posted
            </p>
          </div>

          <div className="p-5 bg-[#C9E3FF] rounded-xl shadow-[8px_8px_16px rgba(0,0,0,0.25), -4px -4px 10px rgba(255,255,255,0.9)]">
            <p className="text-2xl md:text-3xl lg:text-[3.5rem] lg:leading-[64px] font-sora font-bold flex items-center">
              4.8/5 <span className="ml-1 text-yellow-500">⭐</span>
            </p>
            <p className="text-xs md:text-sm lg:text-xl w-3/5 font-semibold text-gray-600">
              Average satisfaction rating
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}

      <div className="text-center sm:py-16 m-0 w-full flex flex-col items-center">
        <h2 className="text-xl md:text-3xl lg:text-[3.6rem] lg:leading-[4rem] font-sora font-bold text-gray-900">
          Your Future&apos;s Calling <br />
          <span className="text-gray-800">Are You Ready to Answer?</span>
        </h2>
        <div className="flex sm:gap-5 justify-center lg:gap-[3.4rem] w-full mt-4">
          <Image
            src="/LandingPageImages/left.png"
            alt=""
            width={200}
            height={200}
            className="w-6 md:w-14 max-w-[56px] md:max-w-[56px] h-auto"
          />

          <p className=" text-blue-500 text-sm md:text-base ">
            <span className="cursor-pointer hover:underline">Get matched.</span>{" "}
            <span className="cursor-pointer text-black hover:underline">
              Get mentored.
            </span>{" "}
            <span className="cursor-pointer hover:underline">Get hired.</span>
          </p>
          <Image
            src="/LandingPageImages/right.png"
            alt=""
            width={200}
            height={200}
            className="w-6 md:w-14 max-w-[56px] md:max-w-[56px] h-auto"
          />
        </div>
        {/* Call to Action Button */}
        <button className=" bg-[#0073E6] px-2 py-2 text-white xl:px-6 xl:py-3 rounded-full flex items-center justify-center gap-1 font-bold text-[0.83rem] md:text-base lg:text-xl leading-7 hover:bg-blue-600 transition">
          Create Your Free Account & Start Today
          <ArrowRightCircle size={20} />
        </button>
      </div>
    </div>
  );
}
