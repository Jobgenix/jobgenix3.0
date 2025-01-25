"use client";
import JobCard from "../components/Job-components";
import { Input } from "@/app/components/ui/input";

import { Search } from "lucide-react";

import JobDetails from "../components/job-display-components/job-details";
import { useState, useEffect } from "react";

import { EducationSelect } from "@/app/components/education-select";

import axios from "axios";
import { useSession } from "next-auth/react";

const passingYears = Array.from({ length: 10 }, (_, i) => {
  const year = 2024 + i;
  return { value: year.toString(), label: year.toString() };
});

const streams = [
  { value: "btech", label: "B.Tech" },
  { value: "be", label: "B.E." },
  { value: "bsc", label: "B.Sc" },
  { value: "bca", label: "BCA" },
  { value: "mca", label: "MCA" },
  { value: "mtech", label: "M.Tech" },
];

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [passingYear, setPassingYear] = useState("2025");
  const [stream, setStream] = useState("btech");

  const [jobListings, setJobListings] = useState([]);

  const session = useSession();
  // const [jobDetails, setJobDetails] = useState({});

  // const jobListings = [
  //   {
  //     id: "1",
  //     title: "Software Development",
  //     company: "Coinbase",
  //     location: "Bengaluru, Karnataka, India",
  //     workplaceType: "On-site",
  //     logoUrl: "/company-logos/coinbase.svg",
  //     isVerified: true,
  //     applyUrl: "#",
  //   },
  //   {
  //     id: "2",
  //     title: "UX Designer",
  //     company: "Google",
  //     location: "San Francisco, CA, USA",
  //     workplaceType: "Hybrid",
  //     logoUrl: "/company-logos/google.svg",
  //     isVerified: true,
  //     applyUrl: "#",
  //   },
  //   {
  //     id: "3",
  //     title: "Data Scientist",
  //     company: "Amazon",
  //     location: "Seattle, WA, USA",
  //     workplaceType: "Remote",
  //     logoUrl: "/company-logos/amazon.svg",
  //     isVerified: false,
  //     applyUrl: "#",
  //   },
  // ];
  useEffect(() => {
    if (session.status === "loading") {
      return; // Wait until the session status is not "loading"
    }

    const userId = session.data?.user?.id;
    if (!userId) {
      console.error("User ID is missing in session data");
      // console.log(session);
      return;
    }

    axios
      .post("/api/job/get-jobs", {
        userId,
        name: searchQuery,
        passingYear: passingYear,
        stream: stream,
      })
      .then((res) => {
        console.log(res.data);
        // setJobListings(res.data.jobs);
      });
  }, [searchQuery, passingYear, stream, session]);

  const applyChange = (id) => {
    if (session.status === "loading") {
      return; // Wait until the session status is not "loading"
    }

    const userId = session.data?.user?.id;
    if (!userId) {
      console.error("User ID is missing in session data");
      // console.log(session);
      return;
    }

    axios
      .post("/api/job/get-jobs", {
        userId,
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        // setJobListings(res.data.jobs);
      });
  };

  return (
    <>
      <section className="flex gap-4 px-16 py-8 justify-evenly items-center">
        <div className="flex flex-col gap-4 h-screen bg-gradient-to-b from-[#E5F7EB] via-[#E5F7EB] to-[#FFFCEF] w-[30%]">
          <section className="p-4 flex flex-col gap-4">
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search Opportunities"
                className="w-full pl-10 text-[#646A66] rounded-3xl border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
            <div className=" flex gap-8">
              <EducationSelect
                label="Passing Year"
                value={passingYear}
                onValueChange={setPassingYear}
                options={passingYears}
              />
              <EducationSelect
                label="Stream"
                value={stream}
                onValueChange={setStream}
                options={streams}
              />
            </div>
          </section>

          {jobListings.map((job, i) => (
            <JobCard key={i} job={job} applyChange={applyChange} />
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
