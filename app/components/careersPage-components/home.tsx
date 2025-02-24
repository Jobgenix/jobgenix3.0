import React from "react";
import { Navbar } from "@/app/components/LandingPageComponents/navbar";
import Image from "next/image";
import LifeJobgenix from "./life-jobgenix";
import OppourtunitesAtJobgenix from "./oppurtunites-at-jobgenix";
import Positions from "./positions";
import Footer from "../footer";

export default function Home() {
    return (
      <div className="overflow-x-hidden">
        <Navbar />
        <div className="main1 h-screen bg-[#e5f7eb] overflow-x-hidden relative">
         
          <Image
            src="/images2/women-removebg-preview.png"
            className="absolute right-36 top-36 z-0"
            alt="image"
            height={400}
            width={400}
          />
  
       
          <Image
            src="/images2/pop-up.png"
            className="absolute right-16 top-[60%] z-10"
            alt="image"
            height={230}
            width={230}
          />
  
          <div className="offers space-y-2 p-2 absolute top-40 right-96">
            <div className="o1 h-8 w-28 shadow-md rounded-lg bg-[#EBE7FD] p-1 text-center">
              <p className="mt-1 text-xs">SDE Intern</p>
            </div>
            <div className="o2 h-8 w-36 shadow-md rounded-lg bg-[#FFF8DE] p-1 text-center">
              <p className="mt-1 text-xs">Business Associate</p>
            </div>
            <div className="o3 h-8 w-32 shadow-md rounded-lg bg-[#fdebe5] p-1 text-center">
              <p className="mt-1 text-xs">Product Manager</p>
            </div>
            <div className="o4 h-8 w-20 shadow-md rounded-lg bg-[#bedbf8] p-0.5 text-center">
              <p className="mt-1 text-xs">Video Editor</p>
            </div>
          </div>
  
         
          <div className="text p-52 mt-[-2%]">
            <h1 className="text-4xl font-bold">
              Careers at <span className="text-[#018e59]">Jobgenix</span>
            </h1>
            <div className="h-1 w-56 ml-2 mt-3 bg-yellow-400"></div>
            <p className="w-[35%] mt-5">
              Amplify your skills, enrich your CV, and make your dream job a
              reality with global connections.
            </p>
            <button className="bg-[#018e59] text-white p-2 mt-6 rounded-lg">
              Apply Now
            </button>
          </div>
        </div>
  
        
        <div className="main2 h-auto bg-[#e5f7eb] overflow-x-hidden">
          <LifeJobgenix />
          <OppourtunitesAtJobgenix />
          <button className="bg-[#018e59] w-56 text-white p-2 rounded-3xl mt-12 mx-auto block">
            Current Openings
          </button>
          <Positions />
  
          <div className="flex h-28 w-[45%] mx-auto mb-56 bg-[#C6F7D5] mt-20 rounded-2xl">
            <Image
              src="/images2/women-laptop.png"
              alt="image"
              height={150}
              width={150}
              className="ml-10"
            />
            <div className="text block">
            <h1 className="text-2xl mt-2">Don&apos;t see any relevant openings?</h1>

              <p className="text-xs mt-3">
                Mail us at careers@jobgenix.co.in with the profile name as the
                subject. (Example: Applying for SDE Intern role.)
              </p>
            </div>
          </div>
  
          <Footer />
        </div>
      </div>
    );
  }
  
  