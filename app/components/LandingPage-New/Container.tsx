"use client";
import Image from "next/image";

export function Container() {
  const images = [
    "/jobgenixAdv/jobMatches.svg",
    "/jobgenixAdv/cvMatchScore.svg",
    "/jobgenixAdv/winningResume.svg",
    "/jobgenixAdv/expertMentor.svg",
  ];
  return (
    <div className="relative w-full bg-[#021C2D] text-white py-8 md:py-16 px-4 md:px-8 lg:px-16 ">
      <div className="max-w-6xl mx-auto">
        {/* Heading Section */}
        <div className="text-center md:mb-12">
          <div className="text-base sm:text-2xl md:text-4xl lg:text-5xl italic flex items-center justify-center gap-1 md:gap-4 mb-4">
            <span className="font-light whitespace-nowrap">See Why</span>
            <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold flex items-center">
              <Image
                width={500}
                height={500}
                src="/images2/JobGenix Logo.png"
                alt="JobGenix Logo"
                className="w-[80px] min-w-24 md:w-full h-auto"
              />
            </span>
            <span className="font-bold whitespace-nowrap">
              is Built Different
            </span>
          </div>
          <p className="text-center text-xs font-montserrat font-thin md:text-base mx-auto text-gray-100">
            While others leave you guessing, we bring clarity, confidence,{" "}
            <span className="inline sm:block">
              and career wins —{" "}
              <span className="font-semibold italic">JobGenix</span> is your
              unfair advantage.
            </span>
          </p>
        </div>
        {/* Features Section mobile */}
        <div className="md:hidden flex flex-col items-center gap-5 w-full max-w-2xl mx-auto mt-5">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Image ${index + 1}`}
              width={100}
              height={100}
              className="rounded-xl w-[93%] h-auto"
            />
          ))}
        </div>

        {/* Features Section laptop */}
        <div className="md:flex hidden flex-col gap-1 md:gap-4 md:p-6">
          {/* Top Row */}
          <div className="flex gap-4 justify-center mt-10 md:mt-0">
            <a
              href="#"
              className="block rounded-xl overflow-hidden h-16 sm:h-20 md:h-24 relative group transition-all duration-300 hover:h-32 sm:hover:h-40 md:hover:h-48"
            >
              {/* Default Image */}
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/cv.png"
                alt="CV Match Score"
                className="w-full h-full object-contain transition-all duration-500 ease-in"
              />
              {/* Hover Image */}
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/expertA.jpeg"
                alt="Expert Mentorship on Hover"
                className="absolute top-0 left-0 w-full h-full object-fit opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in"
              />
            </a>
            <a
              href="#"
              className="block rounded-xl overflow-hidden h-16 sm:h-20 md:h-24 relative group transition-all duration-300 hover:h-32 sm:hover:h-40 md:hover:h-48"
            >
              {/* Default Image */}
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/job.png"
                alt="Tailored Job Matches"
                className="w-full h-full object-contain transition-all duration-300 ease-in-out"
              />
              {/* Hover Image */}
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/expertA.jpeg"
                alt="Expert Mentorship on Hover"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              />
            </a>
          </div>

          {/* Middle Row */}
          <div className="flex gap-5 justify-around md:justify-center items-center">
            <a
              href="#"
              className="block rounded-xl overflow-hidden h-40 sm:h-56 md:h-64 relative transition-all duration-300 hover:h-64 sm:hover:h-80 md:hover:h-96"
            >
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/vertical.png"
                alt="Vertical Feature"
                className="w-full h-full object-cover md:object-contain"
              />
            </a>
            <a
              href="#"
              className="block w-[70%] md:w-[50%] rounded-xl overflow-hidden h-40 sm:h-56 md:h-64 relative transition-all duration-300 hover:h-64 sm:hover:h-80 md:hover:h-96"
            >
              <video
                src="/LandingPageImages/seamlessVideo.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              ></video>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-sm sm:text-2xl md:text-3xl font-semibold italic">
                  Seamless All-in-One Platform
                </h2>
                <p className="text-center text-xs font-normal text-gray-100 mt-2">
                  Everything you need in one smooth experience
                </p>
              </div>
            </a>
            <a
              href="#"
              className="block rounded-xl overflow-hidden h-40 sm:h-56 md:h-64 relative transition-all duration-300 hover:h-64 sm:hover:h-80 md:hover:h-96"
            >
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/verticalBlack.png"
                alt="Vertical Feature Black"
                className="w-full h-full object-cover md:object-contain"
              />
            </a>
          </div>

          {/* Bottom Row */}
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="flex  rounded-xl overflow-hidden h-16 sm:h-20 md:h-24 relative group transition-all duration-300 hover:h-32 sm:hover:h-40 md:hover:h-48"
            >
              {/* Default Image */}
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/winning.png"
                alt="Winning Resume Tools"
                className="w-full h-full object-contain transition-all duration-500 ease-in"
              />
              {/* Hover Image */}
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/expertA.jpeg"
                alt="Expert Mentorship on Hover"
                className="absolute top-0 left-0 w-full h-full object-fit opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in"
              />
            </a>
            <a
              href="#"
              className="flex  rounded-xl overflow-hidden h-16 sm:h-20 md:h-24 relative group transition-all duration-300 hover:h-32 sm:hover:h-40 md:hover:h-48"
            >
              {/* Default Image */}
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/expert.png"
                alt="Expert Mentorship"
                className="w-full h-full object-cover transition-all duration-500 ease-in"
              />
              {/* Hover Image */}
              <Image
                width={500}
                height={500}
                src="/LandingPageImages/expertA.jpeg"
                alt="Expert Mentorship on Hover"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-[-80px] left-1/2 w-screen h-[80px] bg-[#0073E6] opacity-20 blur-lg lg:blur-xl rounded-b-full -translate-x-1/2"></div>
    </div>
  );
}
