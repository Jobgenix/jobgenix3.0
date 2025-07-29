"use client";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import Footer from "../components/LandingPage-New/footerNew";
import Activity from "../components/cards/activity";
import ProfileCard from "../components/cards/profileCard";
import Footer from "../components/Footer/Footer";
import Nav from "../components/LandingPage-New/nav";
import YourJourneyBanner from "../components/YourJourneyBanner";

{
  /* <div className={`${sorafont.className}`}>
  {/* Apply the font to this div or any other element 
</div>; */
}

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
        console.log("USer Data" + data);
      }
    }
    fetchProfile();
  }, [status]);

  return (
    <div className={`font-sora overflow-x-hidden bg-[#F5F5F5] h-fit`}>
      <Nav onLoginClick={() => router.push("/login")} />
      <div className="w-full h-fit mt-16 lg:mt-28 mx-auto p-4 flex justify-center">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row  justify-center items-center gap-5 sm:px-6 mb-16 sm:mb-24 lg:m-0">
          {userDetails && <ProfileCard data={userDetails} />}
          {userDetails && <Activity data={userDetails} />}
        </div>
      </div>
      <div className="hidden my-28 lg:flex justify-center">
        <YourJourneyBanner />
      </div>

      <Footer />
    </div>
  );
}
