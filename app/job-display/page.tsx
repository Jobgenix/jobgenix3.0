import JobCard from "../components/Job-components";
<<<<<<< HEAD
import { Navbar } from "../components/LandingPageComponents/navbar";
import JobCardList from "../components/demo-job-components";
export default function page() {
    return (
        <>
        <Navbar/>
        <JobCard/>
        <JobCardList/>
        </>
    )
}
=======

import JobDetails from "../components/job-display-components/job-details";

export default function page() {
  const jobListings = [
    {
      id: "1",
      title: "Software Development",
      company: "Coinbase",
      location: "Bengaluru, Karnataka, India",
      workplaceType: "On-site",
      logoUrl: "/company-logos/coinbase.svg",
      isVerified: true,
      applyUrl: "#",
    },
    {
      id: "2",
      title: "UX Designer",
      company: "Google",
      location: "San Francisco, CA, USA",
      workplaceType: "Hybrid",
      logoUrl: "/company-logos/google.svg",
      isVerified: true,
      applyUrl: "#",
    },
    {
      id: "3",
      title: "Data Scientist",
      company: "Amazon",
      location: "Seattle, WA, USA",
      workplaceType: "Remote",
      logoUrl: "/company-logos/amazon.svg",
      isVerified: false,
      applyUrl: "#",
    },
  ];
  return (
    <>
      <section className="flex gap-4 px-16 py-8 justify-evenly items-center">
        <div className="flex flex-col gap-4 h-screen bg-gradient-to-b from-[#E5F7EB] via-[#E5F7EB] to-[#FFFCEF] w-[30%]">
          {jobListings.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <JobDetails
          id="1"
          duration="6 months"
          stipendType="Fixed"
          deadline="2021-10-10T10:00:00Z"
          experience="Fresher"
          yearsOfExperience="0"
          jobLink="link"
          category={["Software Development"]}
          status="active"
          title="Software Development Intern"
          companyName="Google"
          location={["Bangalore"]}
          postedAt="2021-10-10T10:00:00Z"
          workplaceType="remote"
          type="Full-time"
          description="Google is hiring software engineers to work on the next generation of search algorithms."
          isVerified={true}
          logo="/company-logos/google.svg"
        />
      </section>
      {/* <JobCard /> */}
    </>
  );
}
>>>>>>> 32e4fbcbcf02b11886821c4b90bb126037024afb
