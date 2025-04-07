import Image from "next/image"
import { IoCallOutline } from "react-icons/io5"
import { BsGlobe2 } from "react-icons/bs"

export default function Section() {
  return (
    <div className="relative w-full py-8 px-4 overflow-hidden overflow-x-hidden font-[sora]">
      <div className="max-w-[1200px] mx-4 sm:mx-8 md:mx-16 lg:mx-36">
        <div className="w-full md:w-[80%] lg:w-[60%]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl p-3 md:p-7 font-semibold text-center md:text-left">
            We bridge the gap between <br className="hidden md:block" />
            ambition and <span className="text-[#0073E6]">opportunity</span>
          </h1>
          <p className="text-gray-400 text-center md:text-left md:ml-8">Wanna know how ?</p>
          <div className="btn flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-0">
            <button className="btn1 text-white bg-[#0073E6] p-2 rounded-lg flex items-center justify-center gap-2 mt-5 xl:w-full w-64 sm:w-auto sm:ml-8">
              Talk to one of our cool mentors! <IoCallOutline />
            </button>
            <p className="p-1 mt-2 sm:mt-6 sm:ml-3 font-semibold hidden xl:block">Or</p>
            <button className="btn2 text-white bg-[#0073E6]   xl:p-2 p-3 rounded-lg  justify-center  xl:items-center text-center gap-2 mt-2 sm:mt-5 sm:ml-8 w-36 xl:w-full hidden  sm:w-auto  xl:block">
              Explore Now <BsGlobe2 />
            </button>
          </div>
          <div className="flex justify-center md:justify-start">
            <Image src="/images2/boy-illustration.svg" className="mt-8 md:ml-12 w-[200px] xl:w-[400px] ml-[-25%] xl:ml-[25%]" alt="hero" width={400} height={400} />
          </div>
        </div>
      </div>

      {/* Image fixed to viewport right corner */}
      <div className="absolute right-0 top-[500px] sm:top-96 transform -translate-y-1/2 max-w-[200px] mt-[-25%] xl:mt-[10%] sm:max-w-[300px] md:max-w-[400px]">
        <Image src="/images2/orbit-illustration.svg" alt="hero" width={400} height={400} className="w-full h-auto" />
      </div>
    </div>
  )
}

