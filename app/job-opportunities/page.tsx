import JobCard from "../components/job-display-new/test";
import JobSearchPage from "../components/job-display-new/job-dis";

import Nav from "../components/LandingPage-New/nav";

export default function JobOpportunitiesPage() {
           return(
                  <div>
                    <Nav />
                    <JobSearchPage />
                    <JobCard />
                    
                  </div>
           );
}