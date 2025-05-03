import React from "react";
import { PencilLine, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserDetails from '@/types/userDetails';

import { Sora } from "next/font/google";
const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});




export default function ProfileCard({data}: {data: UserDetails}) {
  return (
    <div className=" md:w-[442px]">
      <div
        className={`${sorafont.className} h-fit bg-white rounded-2xl p-6 text-center space-y-4 mt-25 shadow-[1px_1px_2px_0px_rgba(255,255,255,0.30)_inset,-1px_-1px_2px_0px_rgba(198,198,198,0.50)_inset,-4px_4px_8px_0px_rgba(198,198,198,0.20),4px_-4px_8px_0px_rgba(198,198,198,0.20),-4px_-4px_8px_0px_rgba(255,255,255,0.90),4px_4px_10px_0px_rgba(198,198,198,0.90)]`}
      >
        <Image
          src={data.profileImage}
          height={50}
          width={50}
          alt="Surajit Saha"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold">{data.name}</h2>
          <p className="text-sm font-semibold text-gray-500">UI/UX Designer</p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <MapPin size={14} /> {data.location}
          </p>
        </div>

        <div className="bg-gray-100 text-sm text-[#333333] font-bold py-1 px-3 rounded-full w-max mx-auto shadow-lg">
          Member's Id : 9798789
        </div>

        <div className="bg-gray-100 py-2 px-4 rounded-full w-fit mx-auto shadow-lg font-medium">
          Opportunities Applied : <span className="">204</span>
        </div>

        {/* seperator */}
        <Image
          src={"/images3/separator.png"}
          width={300}
          height={300}
          alt="sep"
          className="mx-auto"
        />
        <div className="text-left space-y-3 w-fit mx-auto">
          <div className="flex items-center gap-8">
            <span className="font-light text-sm text-[#333333]">
              LinkedIn Profile
            </span>
            <Link
              href="https://www.linkedin.com/in/"
              className="text-blue-600 underline text-sm flex items-center gap-1"
              target="_blank"
            >
              www.linkedin.com/in/ <PencilLine size={14} />
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <span className=" font-light text-sm text-[#333333]">
              Portfolio
            </span>
            <Link
              href="https://www.portfolio.com/in/"
              className="text-blue-600 underline text-sm flex items-center gap-1"
              target="_blank"
            >
              www.portfolio.com/in/ <PencilLine size={14} />
            </Link>
          </div>
        </div>
        <Image
          src={"/images3/separator.png"}
          width={300}
          height={300}
          alt="sep"
          className="mx-auto"
        />

        {/* skills */}
        <div className="">
          <p className="font-medium text-left text-[#333333] flex justify-center">
            Skill(s)
          </p>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {[
              "User-Centered Design",
              "Wireframing",
              "User Research",
              "Interaction Design",
              "Prototyping",
            ].map((skill, index) => (
              <span
                key={index}
                className="flex  text-white text-xs items-center gap-2.5 [background:var(--Azure-Blue,#0073E6)] shadow-[1px_1px_2px_0px_rgba(255,255,255,0.30)_inset,-1px_-1px_2px_0px_rgba(200,200,200,0.50)_inset,-6px_6px_12px_0px_rgba(200,200,200,0.20),6px_-6px_12px_0px_rgba(200,200,200,0.20),-6px_-6px_12px_0px_rgba(255,255,255,0.90),6px_6px_15px_0px_rgba(200,200,200,0.90)] px-[15px] py-[11px] rounded-3xl"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Refer Card  */}
      <div className="flex flex-col mt-6 items-center gap-3 [background:var(--Neutrals-White,#FFF)] shadow-[1px_1px_2px_0px_rgba(255,255,255,0.30)_inset,-1px_-1px_2px_0px_rgba(198,198,198,0.50)_inset,-4px_4px_8px_0px_rgba(198,198,198,0.20),4px_-4px_8px_0px_rgba(198,198,198,0.20),-4px_-4px_8px_0px_rgba(255,255,255,0.90),4px_4px_10px_0px_rgba(198,198,198,0.90)] px-[66px] py-[20.5px] rounded-[15px]">
        <h1 className="self-stretch text-[color:var(--Neutrals-Dark-Grey,#333)] text-center [font-family:Sora] text-2xl font-bold leading-[44px]">Refer your Friends</h1>
        <div className="flex gap-4">
        <Image src={"/brand/whatsapp.png"} height={900} width={900} alt='whatsapp' className='w-20' />  
        <Image src={"/brand/instagram.png"} height={900} width={900} alt='instagram' className='w-20' />  
        <Image src={"/brand/telegram.png"} height={900} width={900} alt='telegram' className='w-20' />  
        </div>
      </div>
    </div>
  );
}
