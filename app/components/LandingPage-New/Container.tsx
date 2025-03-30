'use client';

export function Container() {
    return (
        <div className="w-full bg-[#021C2D] text-white py-8 md:py-16 px-4 md:px-8 lg:px-16 rounded-lg">
            <div className="max-w-6xl mx-auto">
                {/* Heading Section */}
                <div className="text-center md:mb-12">
                    <div className="text-lg sm:text-2xl md:text-4xl lg:text-5xl italic  flex items-center justify-around md:justify-center md:gap-4 mb-4">
                        <span className="font-semitbold">See Why</span> <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold">
                            <img src="/company-logos/JobGenix Logo.png" alt="JobGenix Logo" className="w-[80px] md:w-full" />
                        </span> <span className="font-bold">is Built Different</span>
                    </div>
                    <p className="text-center text-xs font-montserrat font-thin  md:text-base  mx-auto text-gray-100">
                        While others leave you guessing, we bring clarity, confidence, <br /> and career wins —{' '}
                        <span className="font-semibold">JobGenix</span> is your unfair advantage.
                    </p>
                </div>

                {/* Features Section */}
                <div className="flex flex-col gap-1 md:gap-4 p-6 md:p-0">
                    {/* Top Row */}
                    <div className="flex gap-4 justify-center">
                        <a href="#" className="block rounded-xl overflow-hidden h-16 sm:h-20 md:h-24 relative">
                            <img src="/LandingPageImages/cv.png" alt="CV Match Score" className="w-full h-full object-contain" />
                        </a>
                        <a href="#" className="block rounded-xl overflow-hidden h-16 sm:h-20 md:h-24 relative">
                            <img src="/LandingPageImages/job.png" alt="Tailored Job Matches" className="w-full h-full object-contain" />
                        </a>
                    </div>

                    {/* Middle Row */}
                    <div className="flex gap-10 justify-center items-center">
                        <a href="#" className="block md:hidden rounded-xl overflow-hidden w-full relative">
                            <img src="/LandingPageImages/middle.png" alt="middle image" className="w-full h-full object-contain" />
                        </a>
                        <a href="#" className="md:block hidden rounded-xl overflow-hidden h-48 sm:h-56 md:h-64 relative">
                            <img src="/LandingPageImages/vertical.png" alt="Vertical Feature" className="w-full h-full object-contain" />
                        </a>
                        <a href="#" className="md:block hidden rounded-xl overflow-hidden h-48 sm:h-56 md:h-64 relative">
                            <img src="/LandingPageImages/seamless.png" alt="Seamless Platform" className="w-full h-full object-contain" />
                        </a>
                        <a href="#" className="md:block hidden rounded-xl overflow-hidden h-48 sm:h-56 md:h-64 relative">
                            <img src="/LandingPageImages/verticalBlack.png" alt="Vertical Feature Black" className="w-full h-full object-contain" />
                        </a>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex gap-4 justify-center">
                        <a href="#" className="flex block rounded-xl overflow-hidden h-16 sm:h-20 md:h-24 relative">
                            <img src="/LandingPageImages/winning.png" alt="Winning Resume Tools" className="w-full h-full object-contain" />
                        </a>
                        <a href="#" className="flex block rounded-xl overflow-hidden h-16 sm:h-20 md:h-24 relative">
                            <img src="/LandingPageImages/expert.png" alt="Expert Mentorship" className="w-full h-full object-contain" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
