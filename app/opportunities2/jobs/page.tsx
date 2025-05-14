"use client";
// import React,{useEffect} from "react";
import Footer from "../../components/LandingPage-New/footerNew";
import Nav from "../../components/LandingPage-New/nav";
import JobDisplay from "../../components/job-display-new/job-dis";
import JobSearchInterface from "../../components/job-display-new/latest-job";
import JobGenixPromo from "../../components/job-display-new/side-card";
import { Suspense } from 'react';

import { Sora } from "next/font/google";

const sora = Sora({ weight: "400", subsets: ["latin"] });

import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function JobDisplayNew() {
    const { status } = useSession();
    // const router = useRouter();
  
    // useEffect(() => {
    //   if (status === "unauthenticated") {
    //     router.replace("/login"); // Redirect to login if not authenticated
    //   }
    // }, [status, router]);
  
    if (status === "loading") {
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-lg font-medium">Loading...</p>
      </div>
    </div>;
  }
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className={sora.className} >
      <div className={sora.className}>
        <Nav />
      </div>

      <JobDisplay />
      <div className="absolute   xl:top-[50%] xl:left-[4%]">
        <JobGenixPromo />
      </div>

      <JobSearchInterface />

     
       <div className="mt-16">
       <Footer />
       </div>
     
    </div>
    </Suspense>
  );
};