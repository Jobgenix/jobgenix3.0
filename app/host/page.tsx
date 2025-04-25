"use client";
import React, { useState } from "react";
import SwitchToggle from "@/components/buttons/toggle";
import { Montserrat } from "next/font/google";
import { Sora } from "next/font/google";
import HostCard1 from "@/components/cards/hostCard1";
import HostCard3 from "@/components/cards/hostCard3";


const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function page() {

  return (
    <div
      className={`w-full px-10 mx-auto mt-30  bg-[#F5F5F5] rounded-[15px] ${montserrat.className}`}
    >
      <div className={`${sorafont.className} flex flex-col pt-4  items-center `}>
        <h1 className="text-[#333333] text-4xl font-semibold">Host Center</h1>
      </div>

      <form action="" className="w-[1196px] border rounded-md p-10 mx-auto mt-10 space-y-15">
        {/* top section  */}
        <HostCard1 />
        <HostCard3 heading="Job / Internship Description " />
      </form>
    </div>
  );
}
