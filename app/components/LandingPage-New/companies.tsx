import Image from "next/image";
import Marquee from "react-fast-marquee";
import { twMerge } from "tailwind-merge";

const brands = [
  "https://d8it4huxumps7.cloudfront.net/images/partners/partners125/6267c59c0bd2b_Optum-logo-ora-RGB.png?d=206x60",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/607e6ca5ed02c_hul.png?d=120x120",
  "https://d8it4huxumps7.cloudfront.net/images/partners/partners125/5c7d1507d36da_New_Project__1_.png?d=152x100",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/60ad0f7d5e8a5_unnamed.jpg?d=130x130",
  "https://d8it4huxumps7.cloudfront.net/images/partners/partners125/5c7a83fcaf7f9_tata-group.png?d=120x120",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/6329759f75453_listing-logo.jpg?d=110x110",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/63634d98de3ee_swiss_re_2013_logo.svg__1_.png?d=110x24",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/5f71b31560f72_Acc_Logo_Black_Purple_RGB.png?d=220x58",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/5e895eb520e7b_hero_motocorp.png?d=188x62",
  "https://d8it4huxumps7.cloudfront.net/images/partners/partners125/5c7a7bebf06cc_aditya.png?d=168x96",
  "https://d8it4huxumps7.cloudfront.net/images/partners/partners75/5c77b3e35903f_KPMG.png?d=175x72",
  "https://d8it4huxumps7.cloudfront.net/images/partners/partners125/60d5e91b93542_PepsiCo_logo.png?d=120x34",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/63dcfec0b7c7a_agoda_new.png?d=220x112",
  "https://d8it4huxumps7.cloudfront.net/images/partners/partners75/5c7d0d3c318e3_Airtel.png?d=175x58",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/63e0f796d74c0_uber.png?d=120x120",
  "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/633d3fe0b3536_challenge_logo.jpg?d=110x110",
  "https://d8it4huxumps7.cloudfront.net/images/partners/partners125/60d5e91b93542_PepsiCo_logo.png?d=120x34",
  "https://d8it4huxumps7.cloudfront.net/images/partners/partners125/5c7d138408595_image__15_.png?d=200x200",
];

export default function Companies({ className }: { className?: string }) {
  return (
    <div className=" hidden md:block w-full sm:w-[85%] xl:mx-auto mt-12 rounded-lg font-[sora] m-auto">
      <div className="flex items-center justify-center gap-2 sm:gap-4 text-[9px] sm:text-xs text-gray-400 mx-auto">
        {/* The 'flex-grow' class makes this div take up available space */}
        {/* We use a border-t to create a visible line */}
        <div className="flex-grow border-t border-gray-300"></div>
        <p className="flex-shrink-0">
          Featured Job Listings – Explore Opportunities from Top Hiring
          Companies
        </p>
        {/* The 'flex-grow' class makes this div take up available space */}
        {/* We use a border-t to create a visible line */}
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-10 w-full bg-[linear-gradient(to_right,#F6F6F7_0%,transparent_20%,transparent_80%,#F6F6F7_100%)]  opacity-8" />
        <Marquee
          className={twMerge(
            `bg-transparent px-2 sm:px-4 py-4 sm:py-8`,
            className
          )}
        >
          <div className="flex items-center justify-around gap-4 sm:gap-8 min-w-max">
            {brands.map((brand, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  width={45}
                  height={25}
                  draggable={false}
                  className="object-contain sm:w-14 md:w-16"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
