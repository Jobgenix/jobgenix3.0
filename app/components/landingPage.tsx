import React from 'react'
import Hero from './LandingPage-New/hero'
import Companies from './LandingPage-New/companies'
import ExploreNow from './LandingPage-New/Explore-now'
import Whyjobgenix from './LandingPage-New/why-jobgenix'
import Slider from './LandingPage-New/slider'
import { Container } from './LandingPage-New/Container'
import JobSearchHero from './LandingPage-New/job-search-hero'
import StatsSection from './LandingPage-New/statsSections'
import Footer from './LandingPage-New/footerNew'
import Nav from './LandingPage-New/nav'

import { Sora } from 'next/font/google'

const soraFont = Sora({
  subsets: ['latin'],
  weight: ['400', '700'],
}); 


export function Landing() {
    return (
      <div className={` ${soraFont.className}`}>
        <div className="min-h-screen overflow-x-hidden">
                        <Nav/>
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
      </div>
        
    )
}