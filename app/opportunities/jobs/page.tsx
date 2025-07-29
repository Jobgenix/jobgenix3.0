"use client";
// import React,{useEffect} from "react";

import Footer from "../../components/Footer/Footer";
import JobDisplay from "../../components/job-display-new/job-dis";
import LatestJobs from "../../components/latest-jobs/latestJobs";
// import JobGenixPromo from "../../components/job-display-new/side-card";
import Nav from "../../components/LandingPage-New/nav";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function JobDisplayNew() {
  const { status } = useSession();
  const router = useRouter();

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
    <div className="font-sora  bg-[#F5F5F5] overflow-hidden">
      <div className="font-sora">
        <Nav onLoginClick={() => router.push("/login")} />
      </div>

      {/* blue */}
      <div
        className="hidden sm:block "
        style={{
          boxShadow: `
    0px 40px 87px 0px #0D6EDA26,
    0px 158px 158px 0px #0D6EDA21,
    0px 356px 214px 0px #0D6EDA14,
    0px 634px 250px 0px #0D6EDA05,
    0px 990px 250px 0px #0D6EDA00
  `,
        }}
      >
        <JobDisplay />
      </div>

      {/* jobs  */}
      <LatestJobs />

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
