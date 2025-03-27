import Image from "next/image";

export default function Hero() {
  
  return (
    <div>
      <div className="head h-10 w-52 ml-48 bg-[#F6F6F7] rounded-lg shadow-2xl mt-32">
        <div className="w-3 h-3 bg-[#FEA400] rounded-full absolute top-64 ml-2 mt-[-0.1%]"></div>
        <p className="p-2 ml-4">Mentored 200+ students</p>
      </div>
      <div className="largehead ml-24">
        <h1 className="xl:text-6xl text-4xl font-bold mt-4 ml-24">Your Career,</h1>
        <h1 className="xl:text-6xl text-4xl font-bold text-[#0073e6] mt-4 ml-24">
          Supercharged
        </h1>
        <button className="h-10 w-36 mt-4 ml-24 text-xl font-semibold border-[#FFD17F] border-4 rounded-3xl ">
          Jobs
        </button>
        <p className="text-xs text-[#A6A6A6] mt-2 ml-24">
          From Campus to Career - We Help You <br />
          Land Your Dream Job Faster
        </p>
        <button className="h-8 w-28 mt-3 ml-28 bg-[#0073E6] rounded-lg text-white">
          Get started
        </button>
      </div>
      {/* testimonials */}
      <div className="testimonials space-y-8 ml-[55%] mt-[-21%]">
        <div className="testimonial1 xl:h-24 h-14 w-44 ml-36 bg-[#F5F5F5] rounded-3xl border border-[#71b0ef] opacity-50">
              <div className="profile">
                  <Image src="/images/hero/emily.png" alt="profile-logo"  width={20} height={20} className="rounded-full h-10 w-10 ml-2 mt-2 p-3" />
                  <h1 className="text-xs font-semibold ml-16 pt-2 mt-[-22%]">Emily watson</h1>
                  <p className="text-xs ml-16 mt-1 text-gray-400">Ui/Ux Designer</p>
                  <p className="text-[8px] mt-2 ml-5">"Landed my dream in weeks! jobgenix = lifesaver"</p>
              </div>
        </div>
        <div className="testimonial2 h-28 w-56 bg-[#F5F5F5] rounded-3xl">
        <div className="profile p-2">
                  <Image src="/images/hero/emily.png" alt="profile-logo"  width={20} height={20} className="rounded-full h-10 w-10 ml-2 mt-2 p-3" />
                  <h1 className="text-xs font-semibold  ml-16 pt-2 mt-[-22%]">David Johnson</h1>
                  <p className="text-xs ml-16 mt-1 text-gray-300">Associate SDE at Microsoft</p>
                  <p className="text-[12px] mt-2 ml-8">"From lost to hired-thanks to jobgenix mentors"</p>
              </div>
        </div>
        <div className="testimonial3 h-24 w-52 ml-36  bg-[#F5F5F5] rounded-3xl opacity-50">
        <div className="profile p-2">
                  <Image src="/images/hero/emily.png" alt="profile-logo"  width={20} height={20} className="rounded-full h-10 w-10 ml-2 mt-2 p-3" />
                  <h1 className="text-xs font-semibold  ml-16 pt-2 mt-[-22%]">Samaria Grace</h1>
                  <p className="text-xs ml-16 mt-1 text-gray-300">Data Analyst at Oracle</p>
                  <p className="text-[9px] mt-3 ml-8">"The Ai nailed it perfect job match"</p>
              </div>
        </div>
      </div>
    </div>
  );
}
