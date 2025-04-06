"use client"

import { ArrowRight } from "lucide-react"
import Image from 'next/image'

export default function StatsSection() {
  return (
    <div className="flex w-4/5 lg:w-3/5  mx-auto font-montserrat flex-col bg-white items-center justify-center space-y-10 py-10 px-3 md:px-6 lg:px-8">
      {/* Stats Card */}
      <div className="relative md:w-full w-[90vw] max-w-6xl flex flex-col md:flex-row bg-[#C9E3FF] gap-4 md:gap-6 rounded-2xl px-5  py-8 border border-blue-400 
  transition-all duration-300 hover:shadow-lg 
  before:absolute before:bottom-[-25px] before:left-1/2 before:w-[90%] before:h-6 before:bg-[#0073E6] before:opacity-30 before:blur-lg before:-translate-x-1/2">



        {/* Left Section - Title & Description */}
        <div className="flex flex-col justify-center w-full xl:ml-5 md:w-1/3 text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl md:text-2xl text-[#333333] font-semibold">
            Your Success, By <br className="hidden md:block" /> The Numbers 🚀
          </h2>
          <p className="text-gray-600 text-sm mt-1 font-normal">
            We&apos;re helping dreamers become <br className="hidden md:block" /> doers—every single day.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid w-full md:w-2/3 grid-cols-2 gap-x-8 gap-y-4 text-gray-800">
          <div className="p-5 bg-[#C9E3FF] rounded-xl shadow-[8px_8px_16px rgba(0,0,0,0.25), -4px -4px 10px rgba(255,255,255,0.9)]">
            <p className="text-xl md:text-3xl font-bold">63%</p>
            <p className="text-xs md:text-sm font-semibold   text-gray-600">Job seekers hired within 30 days</p>
          </div>

          <div className="p-5 bg-[#C9E3FF] rounded-xl shadow-[8px_8px_16px rgba(0,0,0,0.25), -4px -4px 10px rgba(255,255,255,0.9)]">
            <p className="text-xl md:text-3xl font-bold">8.5K+</p>
            <p className="text-xs md:text-sm font-semibold text-gray-600">Impressions</p>
          </div>

          <div className="p-5 bg-[#C9E3FF] rounded-xl shadow-[8px_8px_16px rgba(0,0,0,0.25), -4px -4px 10px rgba(255,255,255,0.9)]">
            <p className="text-xl md:text-3xl font-bold">300+</p>
            <p className="text-xs md:text-sm font-semibold text-gray-600">Live Jobs Posted</p>
          </div>

          <div className="p-5 bg-[#C9E3FF] rounded-xl shadow-[8px_8px_16px rgba(0,0,0,0.25), -4px -4px 10px rgba(255,255,255,0.9)]">
            <p className="text-xl md:text-3xl font-bold flex items-center">
              4.8/5 <span className="ml-1 text-yellow-500">⭐</span>
            </p>
            <p className="text-xs md:text-sm font-semibold text-gray-600">Average satisfaction rating</p>
          </div>
        </div>
      </div>





      {/* CTA Section */}
      <div className="text-center py-16  w-full max-w-2xl px-4 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Your Future&apos;s Calling <br />
          <span className="text-gray-800">Are You Ready to Answer?</span>
        </h2>

        <p className="mt-2 text-blue-500 text-sm md:text-base">
          <span className="cursor-pointer hover:underline">Get matched.</span>{" "}
          <span className="cursor-pointer text-black hover:underline">Get mentored.</span>{" "}
          <span className="cursor-pointer hover:underline">Get hired.</span>
        </p>

        <div className="flex justify-between items-center w-4/5 md:w-2/3 mt-4">
          <Image
            src="/LandingPageImages/left.png"
            alt="Left Icon"
            width={56} // Approx for md:w-14 (14 * 4 = 56px)
            height={56}
            className="w-10 md:w-14"
          />
          <Image
            src="/LandingPageImages/right.png"
            alt="Right Icon"
            width={56}
            height={56}
            className="w-10 md:w-14"
          />
        </div>

        {/* Call to Action Button */}
        <button className="mt-[-5%] bg-blue-500  text-white px-6 py-3 rounded-full flex items-center gap-2 font-medium text-sm md:text-base hover:bg-blue-600 transition">
          Create Your Free Account & Start Today
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

