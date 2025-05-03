import React from "react";
import { Sora } from "next/font/google";

import ProfileCard from "../components/cards/profileCard";

import Image from "next/image";
import Link from "next/link";
import Nav from "../components/LandingPage-New/nav";
import Footer from "../components/LandingPage-New/footerNew";
import Activity from "../components/cards/activity";

const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {
  return (
    <>
   <Nav/>
    <div className="max-w-7xl mt-44 md:mt-5 mx-auto h-full md:flex justify-between" >
       
      <ProfileCard />
      <Activity />
      
    </div>
    <Link href={"/"} className="w-full flex justify-center mt-16">
      <Image src={"/images3/refer.png"} height={1080} width={1080} alt='logo' className='object-cover w-full md:w-7xl' ></Image>
    </Link>
    <Footer/>
    </>
  );
}
