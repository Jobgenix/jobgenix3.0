"use client";
import React from "react";
import ReferCard from "../components/cards/referCard";
import Image from "next/image";
import Link from "next/link";

import { Sora } from "next/font/google";
import Nav from "../components/LandingPage-New/nav";
import Footer from "../components/LandingPage-New/footerNew";

const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});

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
    <div>
      <Nav />
      <div className="max-w-7xl mt-44 md:mt-30 mx-auto h-full md:flex justify-between">
        <ReferCard data={accordionData} />
        <ReferCard data={accordionData} />
      </div>
 <div
      className={`${sorafont.className} w-full flex flex-col items-center justify-center py-6 bg-gradient-to-r from-white via-[#f8fafd] to-white mt-30 px-5 md:px-0`}
    >
      
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Left speed lines */}
          <Image
            src={"/graphic/referLeft.png"}
            height={100}
            width={100}
            alt="graphic"
          />

          {/* Center text */}
          <h2 className="text-lg md:text-3xl font-semibold text-gray-800 text-center">
            Tap In, Get Referred, Glow Up.
          </h2>

          {/* Right speed lines */}
          <Image
            src={"/graphic/referRight.png"}
            height={100}
            width={100}
            alt="graphic"
          />
        </div>
      </div>

      {/* Content Section */}
      <Link href={"/"} className="w-full flex flex-col items-center justify-center gap-8 mt-10">
        <ReferCard data={accordionData} />
        <ReferCard data={accordionData} />
        <Image
          src={"/images3/refer.png"}
          height={500}
          width={500}
          alt="logo"
          className="object-cover md:w-[80%]"
        />
      </Link>
    </div>
    <Footer/>
    </div>
    
   
  );
}
