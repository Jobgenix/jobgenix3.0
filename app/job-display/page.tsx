import JobCard from "../components/Job-components";
import { Input } from "@/app/components/ui/input";

import { Search } from "lucide-react";

import JobDetails from "../components/job-display-components/job-details";


const passingYears = Array.from({ length: 10 }, (_, i) => {
  const year = 2024 + i
  return { value: year.toString(), label: year.toString() }
})

const streams = [
  { value: "btech", label: "B.Tech" },
  { value: "be", label: "B.E." },
  { value: "bsc", label: "B.Sc" },
  { value: "bca", label: "BCA" },
  { value: "mca", label: "MCA" },
  { value: "mtech", label: "M.Tech" },
]

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
          <section className="p-4">
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search Opportunities"
                className="w-[250px] pl-10 text-[#646A66] rounded-3xl border-gray-300"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
            
          </section>

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
