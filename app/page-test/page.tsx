import Home from "../components/LandingPage-New/nav";
import Hero from "../components/LandingPage-New/hero";
import Companies from "../components/LandingPage-New/companies";
import ExploreNow from "../components/LandingPage-New/Explore-now";
import Whyjobgenix from "../components/LandingPage-New/why-jobgenix";
import Slider from "../components/LandingPage-New/slider";
import { Container } from "../components/LandingPage-New/Container";
import JobSearchHero from "../components/LandingPage-New/job-search-hero";
import StatsSection from "../components/LandingPage-New/statsSections";
import Footer from "../components/LandingPage-New/footerNew";
export default function PageTest() {
    return (
        <div>
              <Home />
              <Hero/>
              <Companies/>
              <ExploreNow/>
              <Whyjobgenix/>
              <Slider/>
              <Container/>
              <JobSearchHero/>
              <StatsSection/>
              <Footer/>
        </div>
    );
}