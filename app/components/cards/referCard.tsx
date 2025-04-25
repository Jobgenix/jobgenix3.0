"use client";
import React from "react";
import { useState } from "react";
import { Sora } from "next/font/google";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { IoLogoLinkedin } from "react-icons/io";
import { IoMail } from "react-icons/io5";

const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});

export default function ReferCard({ data }:any) {
  interface AccordionDataType {
    title: string;
    content: string;
  }
  

  const imgUrl =
    "https://s3-alpha-sig.figma.com/img/38a2/4495/454e02789f38efe4cfb91abb19e84990?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jUWP8v11TTtkZukByIAnIcv6mib3QyCU6E9DAF5CMsELWxwaGXLMDRwMeOKIEC3gB4mqb5dnMJs9QCOUAnGp93rulqejMhmg2KZQ8n2x0kbYApUve8dRoLlSzDcEQkxK99IG48D6UGKy-BLp9DEvaqzZF0MlZ7GgPOTOXVgzOEiArLChY7VaACg1uMTWlGgJj07~iNHqbhoRnfjlprdH5mWkaWSzmJlhgiYoF5in4~3kq8xOFeh~jiT2BoU0IFm8CwLNXmQol4i~3fmv8Q7TdP-CjILjgHF78lTjXuX0baPsPeh2I~-iLXkZPEewwWydJEg0ktu8gY-nd-1tD~nH1w__";

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div
      className={`${sorafont.className} w-[95%] lg:max-w-[460px] bg-white rounded-2xl shadow-lg p-6 space-y-4`}
    >
      <div className="flex gap-4 items-center">
        <div className="flex items-center space-x-4">
          <Image
            src={imgUrl}
            alt="Emily"
            height={50}
            width={50}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Emily</h2>
            <p className="text-xs text-gray-500">Product Designer at Google</p>
          </div>
        </div>

        {/* Contact Row */}
        <div className="flex flex-col">
          <div className="flex  text-xs text-gray-600 space-x-1">
            <IoLogoLinkedin />
            <span>LinkedIn</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 space-x-1">
            <IoMail />
            <span>example@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-5 text-xs font-light">
        {data.map((item: AccordionDataType, index: number) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-left  text-gray-800 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-3 text-sm text-gray-600">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
