import Image from "next/image";
import { BsGlobe2 } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";

export default function Section() {
  return (
    <div className="relative w-full py-8 overflow-hidden overflow-x-hidden font-[sora]">
      {/* for small size */}
      <div className="w-11/12 text-left block md:hidden ml-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-left">
          We bridge the gap between <br className="hidden md:block" />
        </h1>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-left">
          ambition and <span className="text-[#0073E6]">opportunity</span>.
        </h1>
        <p className="font-semibold text-left text-xs md:text-base mt-2 mb-[10px]">
          Wanna know how ?
        </p>
      </div>
      <div className="w-11/12 flex justify-between ml-auto">
        <div className="w-2/3 sm:w-3/4 flex flex-col justify-between align-top">
          {/* for md and larg size */}
          <div className="text-left hidden md:block">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left">
              We bridge the gap between <br className="hidden md:block" />
            </h1>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left">
              ambition and <span className="text-[#0073E6]">opportunity</span>.
            </h1>
            <p className="font-semibold text-center md:text-left text-xs md:text-base mt-2 mb-[9px]">
              Wanna know how ?
            </p>
          </div>

          {/* buttons  */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-2">
            <button className="flex items-center justify-center self-baseline gap-2 rounded-lg bg-[#004080] p-2 font-medium text-white text-xs md:text-base">
              Talk to one of our cool mentors! <IoCallOutline />
            </button>

            <p className="p-1 font-semibold hidden sm:block">Or</p>

            <button
              className="flex items-center justify-center self-baseline gap-2 rounded-lg bg-[#004080] p-2 text-white text-xs md:text-base"
              onClick={() => (window.location.href = "Opportunities/jobs")}
            >
              Explore Now <BsGlobe2 />
            </button>
          </div>

          <div className="flex justify-center md:justify-start">
            <Image
              src="/images2/boy-illustration.svg"
              className="mt-8 md:ml-12 w-[200px] xl:w-[500px] ml-[-25%] xl:ml-[5%]"
              alt="hero"
              width={400}
              height={400}
            />
          </div>
        </div>
        {/* <!-- image section  --> */}
        <div className="w-2/6 sm:w-1/4 flex justify-end items-baseline">
          <Image
            src="/graphic/jobgenix-orbit.svg"
            alt="hero"
            width={500}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
