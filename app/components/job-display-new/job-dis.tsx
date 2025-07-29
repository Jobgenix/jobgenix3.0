"use client";
import Image from "next/image";

export default function JobDisplay() {
  return (
    <div className="bg-[#021C2D] mt-12 relative h-[11.5rem]">
      {/* <div className="rectangle h-40 w-full bg-[#021C2D] mt-12 flex items-center justify-center relative">
        <Image
          src="/images2/Group 28.svg"
          alt="circle svg"
          width={70}
          height={70}
          className="  object-contain"
        />
        <h1 className=" p-6 mt-4  md:text-2xl lg:text-3xl text-white">
          Unlock Your Potential: Find Your Dream Job Today
        </h1>
        <Image
          src="/images2/straight-line.svg"
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
      </div> */}
      <div className="rectangle h-full w-[95%] md:w-9/12 flex items-center justify-between mx-auto">
        <Image
          src="/images2/Group 28.svg"
          alt="circle svg"
          width={70}
          height={70}
          className="  object-contain"
        />
        <span className="font-sora font-bold p-6 mt-4 text-3xl xl:text-4xl text-white flex flex-wrap justify-center items-center">
          Unlock Your
          <span className="flex flex-col mx-3">
            Potential:
            <Image
              src="/images2/straight-line.svg"
              width={100}
              height={60}
              alt="straigh-line svg"
              className=" w-[4rem] md:w-[5rem] lg:w-[8rem]"
            />
          </span>
          Find Your Dream Job Today
        </span>

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
