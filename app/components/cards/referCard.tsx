"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { IoLogoLinkedin } from "react-icons/io";
import { IoMail } from "react-icons/io5";

interface AccordionDataType {
  title: string;
  content: string;
}

export default function ReferCard({ data }: { data: AccordionDataType[] }) {
  // const imgUrl =
  //   "https://s3-alpha-sig.figma.com/img/38a2/4495/454e02789f38efe4cfb91abb19e84990?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jUWP8v11TTtkZukByIAnIcv6mib3QyCU6E9DAF5CMsELWxwaGXLMDRwMeOKIEC3gB4mqb5dnMJs9QCOUAnGp93rulqejMhmg2KZQ8n2x0kbYApUve8dRoLlSzDcEQkxK99IG48D6UGKy-BLp9DEvaqzZF0MlZ7GgPOTOXVgzOEiArLChY7VaACg1uMTWlGgJj07~iNHqbhoRnfjlprdH5mWkaWSzmJlhgiYoF5in4~3kq8xOFeh~jiT2BoU0IFm8CwLNXmQol4i~3fmv8Q7TdP-CjILjgHF78lTjXuX0baPsPeh2I~-iLXkZPEewwWydJEg0ktu8gY-nd-1tD~nH1w__";

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div
      className={`card-shadow font-sora font-normal w-[95%] lg:max-w-[610px] bg-white rounded-2xl py-9 px-7 space-y-4`}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/male.png"
            alt="Emily"
            height={78}
            width={78}
            className="w-[4.6rem] h-auto rounded-full object-cover"
          />
          <div className="">
            <h2 className="text-lg font-inter font-medium text-[#333333]">
              Emily
            </h2>
            <p className="font-inter font-normal text-[0.95rem] text-[#676767]">
              Product Designer at Google
            </p>
          </div>
        </div>
        <div className="hidden sm:block border border-[#333333] h-5 w-0 opacity-[30%]"></div>

        {/* Contact Row */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center font-inter font-normal text-xl text-[#1d69cd] space-x-1 leading-6">
            <IoLogoLinkedin />
            <span className="text-[#676767]  text-[0.95rem]">LinkedIn</span>
          </div>
          <div className="flex items-center font-inter font-normal text-[#2781f6] text-lg space-x-1">
            <IoMail />
            <span className="text-[#676767]  text-[0.95rem]">
              example@gmail.com
            </span>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-5 text-xs font-light">
        {data.map((item: AccordionDataType, index: number) => (
          <div
            key={index}
            className="bg-[#F5F5F5] border border-[#333333] rounded-2xl overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between py-[0.8rem] pr-[0.98rem] pl-[0.9rem] text-left text-base font-inter font-normal text-gray-800 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <ChevronDown
                className={`w-6 h-auto transform transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""
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
