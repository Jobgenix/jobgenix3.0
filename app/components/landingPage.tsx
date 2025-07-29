import React from "react";
import Footer from "../components/Footer/Footer";
import Companies from "./LandingPage-New/companies";
import { Container } from "./LandingPage-New/Container";
import ExploreNow from "./LandingPage-New/Explore-now";
import Hero from "./LandingPage-New/hero";
import JobSearchHero from "./LandingPage-New/job-search-hero";
import Nav from "./LandingPage-New/nav";
import Slider from "./LandingPage-New/slider";
import StatsSection from "./LandingPage-New/statsSections";
import UsersWorkingAt from "./LandingPage-New/UsersWorkingAt";
// import Whyjobgenix from "./LandingPage-New/WhyJobgenix";

export function Landing({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <div className={`font-sora`}>
      <div className="min-h-screen overflow-x-hidden bg-[#F5F5F5]">
        <Nav onLoginClick={onLoginClick} />
        <Hero />
        <Companies />
        <ExploreNow />
        <UsersWorkingAt />
        {/* <div className="hidden sm:block">
          <Whyjobgenix />
          <Slider />
        </div> */}

        <Container />
        <JobSearchHero />
        <StatsSection />
        <Footer />
      </div>
    </div>
  );
}
