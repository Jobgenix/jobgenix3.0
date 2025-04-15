"use client";
import React from "react";
import Footer from "../components/LandingPage-New/footerNew";
import Nav from "../components/LandingPage-New/nav";
import JobDisplay from "../components/job-display-new/job-dis";
import JobSearchInterface from "../components/job-display-new/latest-job";
import JobGenixPromo from "../components/job-display-new/side-card";

import { Sora } from "next/font/google";

const sora = Sora({ weight: "400", subsets: ["latin"] });

export default function JobDisplayNew() {
  return (
    <div className="" >
      <div className={sora.className}>
        <Nav />
      </div>

      <JobDisplay />
      <div className="absolute top-[50%] left-[4%]">
        <JobGenixPromo />
      </div>
      <h1 className="absolute top-[40%] left-[25%] text-2xl font-semibold">
        Featured Jobs
      </h1>

      <JobSearchInterface />

     
       <div className="mt-16">
       <Footer />
       </div>
     
    </div>
  );
}
4;
