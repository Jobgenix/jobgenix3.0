import Image from "next/image";
import { IoCallOutline } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";

export default function Section() {
  return (
    <div className="relative w-full py-8 px-4 overflow-hidden overflow-x-hidden">
      <div className="max-w-[1200px] mx-36">
        <div className="w-[60%]">
          <h1 className="text-4xl p-7 font-semibold">
            We bridge the gap between <br />
            ambition and <span className="text-[#0073E6]">opportunity</span>
          </h1>
          <p className="text-gray-400 ml-8">Wanna know how ?</p>
          <div className="btn flex">
            <button className="btn1 text-white bg-[#0073E6] p-2 rounded-lg flex items-center gap-2 ml-8 mt-5">
              Talk to one of our cool mentors! <IoCallOutline />
            </button>
            <p className="p-1 mt-6 ml-3 font-semibold">Or</p>
            <button className="btn2 text-white bg-[#0073E6] p-2 rounded-lg flex items-center gap-2 ml-8 mt-5">
              Explore Now <BsGlobe2 />
            </button>
          </div>
          <Image
            src="/images2/boy-illustration.svg"
            className="ml-12"
            alt="hero"
            width={400}
            height={400}
          />
        </div>
      </div>

      {/* Image fixed to viewport right corner */}
      <div className="absolute  right-0 top-96 transform -translate-y-1/2">
        <Image
          src="/images2/orbit-illustration.svg"
          alt="hero"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
