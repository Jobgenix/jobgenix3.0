import Image from "next/image";
import Link from "next/link";
import React from "react";

const logo =
  "https://s3-alpha-sig.figma.com/img/b813/8220/21780452c44a98ce6c5430123d0fe7aa?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ixyNHs9q4rN-9WEecUmo8YRhKXKtsWZhFP6MhW7JTfxeHPdnLpQxRZ3WkG3dCUJh9B4kE-fU0UKb1woUPeejYowAbPzHp1pZeIjydYidpoK3ENYR4l9zvkDRoTAczb28rW66PBaajPlCZHZxf0W83tVqmR7r0aAC-QJ~3-aibEKedD1zvgUjOdnUj0dTLAO5MYnQIpzm-EOxG9tIdT8Lz0fFHuoXig7c0sJWcpBc5qqmM4LlZKF4ODwZ62fWpPgLY8cR1zkE6TWiq-zRsyhP1KRWv6GOPY7JSIWo6xMhBLbyuCfHC5EUnC4o9POVEJW4Zy7Ynb0nNslsyD9PCpw9bQ__";

const profile =
  "https://s3-alpha-sig.figma.com/img/11db/cb98/2f9ba115c7d5cc790cc48a457815fb67?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jjAhs4L0VdjnLepy81yKqL00IcWZrPaFNZZkciso~yp27LFSDnjY~7YF3VrHYWLZbGwi4aF6CfGw7Wc4kWnQTa48o-05XrwMBI~nDVjPBNYXZCRcpZKLMtA5QGQ9lFlRavhAdZ30jfCq5wY-r8zCOMaxXpwecmd6daF7Ea-Ri7-XuhOzfCDe54Q74wMRyv7OrkiAsy5nNI9bjlq06bCzSaJv7FBXZsEV-mBj5cNIkkRSav4qTQXbRkoXrvuoPnB0kEnllDP15Rd4jMez18WryrGHCvMqOpz~guaAK0zzXqMh4bYgHSdPGoQysg2m4hxeQ8ZQKPqWP7gu6svr7A~MDg__";

export default function Navbar() {
  return (
    <div className="w-full fixed  font-light top-0 z-10 bg-white">
      <div
        className={`font-sora bg-[#0073E6] text-[#FFFFFF] max-w-7xl text-center mx-auto rounded-bl-[90px] py-[1px] rounded-br-[90px] `}
      >
        🎉 Join 8000+ students & job seekers growing their careers with
        Jobgenix!
      </div>
      <nav
        className={`font-sora flex max-w-7xl justify-between items-center mx-auto pt-6`}
      >
        <div className="relative h-5 w-32 overflow-hidden">
          <Image src={logo} fill alt="logo"></Image>
        </div>
        <ul className="flex items-center gap-4">
          <li>Home</li>
          <li>About Us</li>
          <li>Internships</li>
          <li>Jobs</li>
          <li>Roadmaps</li>
          <li className="text-[#0073E6]">Get-Job-Ready</li>
        </ul>
        <div className="flex gap-3 items-center">
          <Link
            className="py-1 px-3 bg-[#333333] text-white rounded-md"
            href={"/"}
          >
            For business
          </Link>
          <Link
            className="py-1 px-3 text-[#333333] border-2 border-[#333333] rounded-md"
            href={"/"}
          >
            For business
          </Link>
          <Image
            src={profile}
            height={30}
            width={40}
            className="rounded-full"
            alt="profile"
          ></Image>
        </div>
      </nav>
    </div>
  );
}
