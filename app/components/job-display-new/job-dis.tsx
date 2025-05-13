"use client";
import Image from "next/image";



export default function JobDisplay() {
  return (
    <div className="hidden xl:block">
      <div className="rectangle h-40 w-full bg-[#021C2D] mt-12 flex items-center justify-center relative">
        <Image
          src="/images2/Group 28.svg"
          alt="circle svg"
          width={70}
          height={70}
          className="  object-contain"
        />
        <h1 className=" p-6 mt-4 text-2xl text-white">Unlock Your Potential: Find Your Dream Job Today</h1>
        <Image  src="/images2/straight-line.svg"
          
          width={100}
          height={60}
          alt="straigh-line svg"
          className="absolute top-[65%] left-[42%]"
          />
        <Image
        
          src="/images2/Group 27.svg"
          alt="circle svg"
          width={70}
          height={70}
          className="object-contain "
        />
      </div>
    </div>
  );
}
