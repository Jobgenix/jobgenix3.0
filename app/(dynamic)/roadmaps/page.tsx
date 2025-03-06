"use client"

import {Footer} from "@/app/components/LandingPageComponents/Footer";
import { Navbar } from "@/app/components/LandingPageComponents/navbar";
import Cards from "@/app/components/roadmap-components/cards";
import Hero from "@/app/components/roadmap-components/hero";


export default function RoadmapsPage() {
  return (
    <div className="bg-[#c8f7d5]">
       <Navbar />
      <Hero />
      <Cards />
      <Footer />
    </div>
  );
}
