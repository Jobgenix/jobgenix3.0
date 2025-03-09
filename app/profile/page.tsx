"use client"
// import React from 'react';
import { Navbar } from '../components/LandingPageComponents/navbar';
// import UploadCv from '../components/profilePage/uploadcv';
import { Footer } from "@/app/components/LandingPageComponents/Footer";
// import Courses from '../components/profilePage/courses';
// import ApplicationTracker from '../components/profilePage/Applicationtracker';
// import Mentorship from '../components/profilePage/mentorship';
import Practice from '../components/profilePage/practiceAssesments';
// import Events from '../components/profilePage/events';
import Name from '../components/profilePage/name';
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { useEffect } from "react";





export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You need to login first");
      router.push("/auth/login");
    }
  }, [status, router]);

  return (
    <div className="h-auto w-full bg-[#c6f7d5] ">
      <Navbar />
      <Name />
      {/* <UploadCv /> */}
      {/* <Practice /> */}
      {/* <Events /> */}
      <Footer />
    </div>
  );
}
