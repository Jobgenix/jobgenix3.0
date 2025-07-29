"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReferCard from "../components/cards/referCard";
import YourJourneyBanner from "../components/YourJourneyBanner";

import Footer from "../components/Footer/Footer";
import Nav from "../components/LandingPage-New/nav";

const accordionData = [
  {
    title: "Connection Request Tips",
    content:
      "Keep your message short, specific, and personalized. Mention shared interests or goals.",
  },
  {
    title: "Email to HR",
    content:
      "Hi [HR Name], I'm excited about the opportunity at [Company]. Please find my resume attached. Looking forward to connecting.",
  },
  {
    title: "Follow-Up Mail",
    content:
      "Just checking in regarding the role I applied for last week. I remain very interested and look forward to any updates!",
  },
];

export default function Page() {
  return (
    <div className="bg-[#F5F5F5] w-full">
      <Nav onLoginClick={() => (window.location.href = "/login")} />

      <div
        className={`font-sora w-full flex flex-col items-center justify-center py-6 px-5 md:px-0 mx-auto`}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center sm:gap-4 mt-11 mb-8  sm:my-12 md:my-20 w-full">
          <div className="flex items-center justify-center space-x-1 sm:space-x-4">
            {/* Left speed lines */}
            <Image
              src={"/graphic/referLeft.png"}
              height={100}
              width={100}
              alt="graphic"
              className="h-auto lg:h-11 w-12 sm:w-24 md:w-32 lg:w-auto"
            />

            {/* Center text */}
            <h2 className="text-[0.91rem] sm:text-lg md:text-2xl lg:text-[2.5rem] font-semibold text-gray-800 text-center ">
              Tap In, Get Referred, Glow Up.
            </h2>

            {/* Right speed lines */}
            <Image
              src={"/graphic/referRight.png"}
              height={100}
              width={100}
              alt="graphic"
              className="h-auto lg:h-11 w-12 sm:w-24 md:w-32 lg:w-auto"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-[610px] h-[55.1rem] overflow-y-auto mb-12 scrollbar-track-none scrollbar-thumb-black scrollbar-w-5">
          <Link
            href={"/"}
            className="w-full flex flex-col items-center justify-center gap-16 mx-auto"
          >
            <ReferCard data={accordionData} />
            <ReferCard data={accordionData} />
            <ReferCard data={accordionData} />
            <ReferCard data={accordionData} />
            <ReferCard data={accordionData} />
            <ReferCard data={accordionData} />
          </Link>
        </div>
        <YourJourneyBanner />
      </div>
      <div className="mt-14">
        {" "}
        <Footer />
      </div>
    </div>
  );
}
