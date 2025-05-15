'use client';
import React, { useEffect, useState } from "react";
import { Sora } from "next/font/google";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

<div className={`${sorafont.className}`}>
  {/* Apply the font to this div or any other element */}
</div>

export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    async function fetchProfile() {
      if (status === "authenticated") {
        const response = await fetch("api/profileInfo");

        const data = await response.json();
        setUserDetails(data);
        console.log("USer Data"+data);
      }
    }
    fetchProfile();
  }, [status]);

  return (
    <div className={`${sorafont.className}`}>
      <Nav />
      <div className="max-w-7xl mt-10 md:mt-5 mx-auto h-full md:flex justify-between">
        {userDetails && <ProfileCard data={userDetails} />}
        {userDetails && <Activity data={userDetails} />}
      </div>
      <Link href={"/"} className="w-full flex justify-center mt-16">
        <Image
          src={"/images3/refer.png"}
          height={1080}
          width={1080}
          alt="logo"
          className="object-cover w-full md:w-7xl"
        />
      </Link>
      <Footer />
    </div>
  );
}
