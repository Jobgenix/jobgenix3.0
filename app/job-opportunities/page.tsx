"use client";



import JobSearchPage from "../components/job-display-new/job-dis";
import Footer from "../components/LandingPage-New/footerNew";
import Nav from "../components/LandingPage-New/nav";

export default function JobOpportunitiesPage() {
           return(
                  <div>
                    <Nav />
                    <JobSearchPage />
                    <Footer />
                    
                  </div>
           );
}