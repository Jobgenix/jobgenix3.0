"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const jobsRef = useRef(null);
  const internshipRef = useRef(null);

  useEffect(() => {
    if (jobsRef.current && internshipRef.current) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      tl.to(jobsRef.current, { y: -20, opacity: 0, duration: 0.5 })
        .to(internshipRef.current, { y: 0, opacity: 1, duration: 0.5 }, "-=0.4")
        .to(internshipRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 1,
        })
        .to(jobsRef.current, { y: 0, opacity: 1, duration: 0.5 }, "-=0.4");
    }
  }, []);

  return (
    <div
      className={`w-[90%] sm:w-[85%] mx-auto px-4 py-8 sm:py-12 md:mt-16 font-sora`}
    >
      {/* Main content wrapper */}
      <div className="w-full 2xl:w-[96%] lg:ml-auto flex flex-col justify-center">
        {/* image and text  */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          {/* text  */}
          <div className="w-full flex flex-col sm:gap-2 md:gap-4 items-center sm:items-start mt-[1.13rem]">
            <div className=" flex gap-3 mb-6 md:mb-0 text-xs md:text-sm font-montserrat">
              <div className="flex items-center bg-[#F6F6F7] rounded-[11px] card-shadow px-[0.6rem] py-[0.66rem]">
                <div className="w-3 h-3 bg-[#FFA500]  rounded-full shadow-[0_0_10px_#EBB44C]"></div>
                <p className="ml-2">Mentored 200+ students</p>
              </div>
              <div className="flex items-center bg-[#F6F6F7] rounded-[11px] card-shadow px-[0.6rem] py-[0.66rem]">
                <div className="w-3 h-3 bg-[#0073e6] rounded-full shadow-[0_0_10px_#0073e6]"></div>
                <p className="ml-2">Beta</p>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-7xl leading-[42px] md:leading-normal font-bold">
              Your Career,
            </h1>
            <h1 className="text-4xl lg:text-5xl xl:text-7xl font-extrabold text-[#0073e6] ">
              Supercharged
            </h1>
            <button className=" h-12 w-36 md:h-[4.1rem] md:w-56 text-xl md:text-3xl font-normal border-[#FFD17F] border-[5px] rounded-3xl md:rounded-[3.7rem] overflow-hidden relative hidden sm:flex items-center justify-center">
              <span ref={jobsRef} className="absolute">
                Jobs
              </span>
              <span ref={internshipRef} className="opacity-0">
                Internship
              </span>
            </button>
            <p className="font-montserrat font-medium text-sm sm:text-base text-center sm:text-left text-black opacity-[70%] w-full mt-2 md:mt-0">
              From Campus to Career - We Help You <br />
              Land Your Dream Job Faster
            </p>
            <div>
              <button
                className="hidden md:block h-8 w-28 md:size-fit md:py-3 md:px-7 bg-[#004080] rounded-xl text-white text-xs md:text-sm font-medium leading-5"
                onClick={() =>
                  (window.location.href = "Opportunities/internships")
                }
              >
                Get started
              </button>
            </div>
          </div>

          {/* image  */}
          <div className="flex items-baseline max-w-[25rem] max-h-[30rem] xl:max-h-none xl:max-w-[41rem] xl:w-[41rem]">
            <Image
              src="/images2/rocket.svg"
              alt="mobile-png"
              className="w-full md:w-auto sm:mt-4"
              height={400}
              width={400}
            />
          </div>
        </div>
        <button
          className="sm:hidden py-3 px-7 mb-6 mt-14 mx-auto max-w-[10.5rem] align-middle bg-[#004080] rounded-xl text-white text-xs font-medium leading-5"
          onClick={() => (window.location.href = "Opportunities/internships")}
        >
          Get started
        </button>
      </div>
      {/* jobGenix insights  */}
      <div className="py-[0.67rem] px-[0.95rem] align-middle hidden bg-white rounded-xl text-sm font-bold font-montserrat sm:flex items-center justify-center gap-1 ml-auto -mr-8 xl:-mr-20 card-shadow w-fit">
        <div className="w-2 h-2 bg-[#0073e6] rounded-full shadow-[0_0_10px_#0073e6] mt-[1px] mr-1"></div>
        <Image
          src="/brand/jobGenix-black-blue.svg"
          alt="mobile-png"
          className="w-[5rem] h-auto"
          height={24}
          width={24}
        />
        Insights
        <Image
          src="/icons/Flash.svg"
          alt="mobile-png"
          className="w-5 h-5 -mb-[2] "
          height={24}
          width={24}
        />
      </div>
    </div>
  );
}
