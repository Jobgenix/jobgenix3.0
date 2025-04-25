import React from "react";
import { Sora } from "next/font/google";

import ProfileCard from "../components/cards/profileCard";
import Activity from "../components/cards/activity";
import Image from "next/image";
import Link from "next/link";
import Nav from "../components/LandingPage-New/nav";

const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {
  return (
    <>
   <Nav/>
    <div className="max-w-7xl mt-44 md:mt-30 mx-auto h-full md:flex justify-between" >
       
      <ProfileCard />
      <Activity />
    </div>
    <Link href={"/"} className="w-full flex justify-center mt-16">
      <Image src={"/images/refer.png"} height={1080} width={1080} alt='logo' className='object-cover w-full md:w-7xl' ></Image>
    </Link>
    </>
  );
}
