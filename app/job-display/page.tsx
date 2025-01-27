/* eslint-disable*/
"use client";
import JobCard from "../components/Job-components";
import { Input } from "@/app/components/ui/input";

import { Search } from "lucide-react";

import JobDetails from "../components/job-display-components/job-details";
import { useState, useEffect } from "react";

import { EducationSelect } from "@/app/components/education-select";
import { TrustedCompanies } from "../components/LandingPageComponents/trusted-companies";
import axios from "axios";
import { useSession } from "next-auth/react";
import { degreeTypeSchema } from "@/constants/jobOpportunities";
import { JobCardProps } from "@/types/job";
import { CompanyType } from "@/types/companyType";
import { Opportunity } from "@/types/opportunityType";
import { Navbar } from "../components/LandingPageComponents/navbar";

import JobCardSkeleton from "@/app/components/skeletons/job-card-skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const passingYears = [
  ...Array.from({ length: 10 }, (_, i) => {
    const year = 2024 + i;
    return { value: year.toString(), label: year.toString() };
  }),
  { value: "all", label: "All" },
];

const streams = [
  { value: "btech", label: "B.Tech" },
  { value: "be", label: "B.E." },
  { value: "bsc", label: "B.Sc" },
  { value: "bca", label: "BCA" },
  { value: "mca", label: "MCA" },
  { value: "mtech", label: "M.Tech" },
  { value: "all", label: "All" },
];

function mapStreamToDegreeType(stream: string) {
  const bachelorDegrees = ["btech", "be", "bsc", "bca"];
  const masterDegrees = ["mca", "mtech"];
  if (bachelorDegrees.includes(stream.toLowerCase())) {
    return degreeTypeSchema.Enum.bachelor;
  } else if (masterDegrees.includes(stream.toLowerCase())) {
    return degreeTypeSchema.Enum.master;
  }
  return null; // If stream doesn't match, return null or handle accordingly
}

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [passingYear, setPassingYear] = useState("all");
  const [stream, setStream] = useState("all");

  const [jobListings, setJobListings] = useState<JobCardProps[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "loading") {
      return; // Wait until the session status is not "loading"
    }

    const userId = session.data?.user?.id;
    if (!userId) {
      console.error("User ID is missing in session data");
      toast.error("E:4001 - user id missing");
      // console.log(session);
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/job/get-jobs", {
        userId,
        name: searchQuery,
        passingYear: passingYear !== "all" ? passingYear : undefined,
        stream: stream !== "all" ? mapStreamToDegreeType(stream) : undefined,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.jobs.length) applyChange(res.data.jobs[0].jobId);

        setJobListings(res.data.jobs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job listings:", error);
        setIsLoading(false);
      });
  }, [searchQuery, passingYear, stream, session]);

  const applyChange = (id: string) => {
    router.push(`/job-display?id=${id}`);
  };

  return (
    <>
      <Navbar />
      <section className="px-16 ">
        <div className="flex ">
          <p className="text-2xl font-bold flex flex-col gap-1 w-64 justify-center">
            Get Hired in{"\n"}
            <span style={{ color: "green" }}>Dream Companies:</span>{" "}
          </p>

          <TrustedCompanies className="py-2" />
        </div>
        <section className="flex gap-4  justify-evenly items-center">
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
            <div className=" overflow-auto custom-scrollbar">
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => <JobCardSkeleton key={index} />)
                : jobListings.map((job, i) => (
                    <JobCard key={i} job={job} onClick={applyChange} />
                  ))}
            </div>
          </div>
          <JobDetails />
        </section>
        {/* <JobCard /> */}
      </section>
    </>
  );
}
