import Image from "next/image"

export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Main content wrapper */}
      <div className="flex flex-col lg:flex-row">
        {/* Left side content */}
        <div className="w-full lg:w-1/2">
          {/* Mentored badge */}
          <div className="relative bg-[#F6F6F7] rounded-lg shadow-2xl p-2 w-52 mx-auto lg:ml-48 lg:mx-0 mb-6 lg:mt-32">
            <div className="absolute top-1/2 -translate-y-1/2 left-2 w-3 h-3 bg-[#FEA400] rounded-full"></div>
            <p className="ml-6">Mentored 200+ students</p>
          </div>

          {/* Main heading */}
          <div className="text-center lg:text-left lg:ml-24 mt-6 lg:mt-4">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold">Your Career,</h1>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0073e6] mt-2 lg:mt-4">Supercharged</h1>

            <button className="h-10 w-36 mt-6 text-xl font-semibold border-[#FFD17F] border-4 rounded-3xl">Jobs</button>

            <p className="text-xs text-[#A6A6A6] mt-4 lg:mt-2">
              From Campus to Career - We Help You <br />
              Land Your Dream Job Faster
            </p>

            <button className="h-8 w-28 mt-4 lg:mt-3 bg-[#0073E6] rounded-lg text-white">Get started</button>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
          <div className="space-y-6 max-w-sm mx-auto lg:ml-auto lg:mt-[10%]">
            {/* Testimonial 1 */}
            <div className="h-auto w-full lg:w-44 lg:ml-36 bg-[#F5F5F5] rounded-3xl border border-[#71b0ef] opacity-50 p-3">
              <div className="flex items-start">
                <Image
                  src="/images/hero/emily.png"
                  alt="profile-logo"
                  width={40}
                  height={40}
                  className="rounded-full h-10 w-10 object-cover"
                />
                <div className="ml-3">
                  <h1 className="text-xs font-semibold">Emily Watson</h1>
                  <p className="text-xs text-gray-400">UI/UX Designer</p>
                </div>
              </div>
              <p className="text-xs mt-2 text-center">"Landed my dream in weeks! jobgenix = lifesaver"</p>
            </div>

            {/* Testimonial 2 */}
            <div className="h-auto w-full lg:w-56 bg-[#F5F5F5] rounded-3xl p-3">
              <div className="flex items-start">
                <Image
                  src="/images/hero/emily.png"
                  alt="profile-logo"
                  width={40}
                  height={40}
                  className="rounded-full h-10 w-10 object-cover"
                />
                <div className="ml-3">
                  <h1 className="text-xs font-semibold">David Johnson</h1>
                  <p className="text-xs text-gray-300">Associate SDE at Microsoft</p>
                </div>
              </div>
              <p className="text-xs mt-2 text-center">"From lost to hired-thanks to jobgenix mentors"</p>
            </div>

            {/* Testimonial 3 */}
            <div className="h-auto w-full lg:w-52 lg:ml-36 bg-[#F5F5F5] rounded-3xl opacity-50 p-3">
              <div className="flex items-start">
                <Image
                  src="/images/hero/emily.png"
                  alt="profile-logo"
                  width={40}
                  height={40}
                  className="rounded-full h-10 w-10 object-cover"
                />
                <div className="ml-3">
                  <h1 className="text-xs font-semibold">Samaria Grace</h1>
                  <p className="text-xs text-gray-300">Data Analyst at Oracle</p>
                </div>
              </div>
              <p className="text-xs mt-2 text-center">"The AI nailed it perfect job match"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

