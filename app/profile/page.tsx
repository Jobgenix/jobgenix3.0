"use client"



import React from 'react';
import { Navbar } from '../components/LandingPageComponents/navbar';
import UploadCv from '../components/profilePage/uploadcv';
import {Footer} from "@/app/components/LandingPageComponents/Footer";
import Courses from '../components/profilePage/courses';
import ApplicationTracker from '../components/profilePage/Applicationtracker';
import Mentorship from '../components/profilePage/mentorship';
import Practice from '../components/profilePage/practiceAssesments';
import Events from '../components/profilePage/events';
import Name from '../components/profilePage/name';

export default function ProfilePage() {
  return (
    <div className="h-auto w-full bg-[#c6f7d5]">
      <Navbar />
      <Name />
      <UploadCv />
      {/* <Courses /> */}
      {/* <ApplicationTracker /> */}
      {/* <Mentorship /> */}
      <Practice />
      {/* <Events /> */}
      <Footer/>
    </div>
  );
}
