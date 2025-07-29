import Image from "next/image";
import Marquee from "react-fast-marquee";
import { twMerge } from "tailwind-merge";

const brands = [
  "/company-logos/accenture.svg",
  "/company-logos/amazon.svg",
  "/company-logos/capgemini.svg",
  "/company-logos/coinbase.svg",
  "/company-logos/deloitte.svg",
  "/company-logos/google.svg",
  "/company-logos/accenture.svg",
  "/company-logos/microsoft.svg",
  "/company-logos/coinbase.svg",
  "/company-logos/capgemini.svg",
];

export default function UsersWorkingAt({ className }: { className?: string }) {
  return (
    <div className="w-full sm:w-[85%] xl:mx-auto mt-12 rounded-lg font-[sora] m-auto mb-10 md:mb-16">
      <div className="flex flex-col items-center justify-center gap-2 mx-auto">
        <p
          className="flex-shrink-0 font-montserrat font-medium text-sm md:text-base text-[#415279]
        "
        >
          Real People. Real Stories. Real Wins.
        </p>
        <h1 className="font-sora font-semibold text-xl md:text-[2.5rem] md:leading-[3rem]">
          <Image
            width={500}
            height={500}
            src="/images2/JobGenix Logo.png"
            alt="JobGenix Logo"
            className="w-[7.6rem] md:w-[11.9rem] h-auto inline -mt-1 md:-mt-2 mr-3"
          />
          Users Works At
        </h1>
      </div>
      {/* for larg screen  */}
      <div className="items-center justify-around gap-4 sm:gap-8 px-2 sm:px-4 py-4 sm:py-8 w-[90%] mx-auto hidden lg:flex">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white h-[3.9rem] items-center rounded-sm border border-[#DEDEDE]"
          >
            <Image
              src={brand}
              alt={`Brand ${index + 1}`}
              width={62}
              height={62}
              draggable={false}
              className="object-contain w-[3.9rem] h-auto"
            />
          </div>
        ))}
      </div>
      {/* for small screen */}
      <div className="relative overflow-hidden block lg:hidden">
        {/* Fading edges overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 w-full bg-[linear-gradient(to_right,#F6F6F7_0%,transparent_20%,transparent_80%,#F6F6F7_100%)]  opacity-8" />

        <Marquee
          className={twMerge(
            `bg-transparent px-2 sm:px-4 py-4 sm:py-8 space-x-4 `,
            className
          )}
        >
          <div className="flex items-center justify-around gap-4 sm:gap-8 min-w-max">
            {brands.map((brand, index) => (
              <div key={index} className="flex-shrink-0 bg-white">
                <Image
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  width={62}
                  height={62}
                  draggable={false}
                  className="object-contain w-9 sm:w-11 md:w-[3.9rem] h-auto"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
