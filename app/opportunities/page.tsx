"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { toast } from "sonner";

import type { JobCardProps } from "@/types/job";
import type { CompanyType } from "@/types/companyType";
import type { Opportunity } from "@/types/opportunityType";
import { prioritizeById } from "@/utils/setToFirst";

import { Input } from "@/app/components/ui/input";
import { EducationSelect } from "@/app/components/education-select";
import JobCardSkeleton from "@/app/components/skeletons/job-card-skeleton";
import JobCard from "../components/Job-components";
import JobDetails from "../components/job-display-components/job-details";
import { TrustedCompanies } from "../components/LandingPageComponents/trusted-companies";
import { Navbar } from "../components/LandingPageComponents/navbar";
import CompanyPreparation from "../components/company-prep";
import { PostSection } from "../components/LandingPageComponents/post-section";
import { Footer } from "../components/LandingPageComponents/Footer";
import MentorBanner from "../components/mentors-banner";
import InfiniteScroll from "react-infinite-scroll-component";



const generatePassingYears = () => {
  const currentYear = 2019;
  return [
    ...Array.from({ length: 10 }, (_, i) => ({
      value: (currentYear + i).toString(),
      label: (currentYear + i).toString(),
    })),
    { value: "all", label: "All" },
  ];
};

export default function JobsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  const filter_type = searchParams.get("type") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [passingYear, setPassingYear] = useState("all");
  const [stream, setStream] = useState("1");
  const [type, setType] = useState(filter_type);

  //state to update the jobs
  const [jobListings, setJobListings] = useState<JobCardProps[]>([]);

  //state to update the specific job details
  const [jobDetails, setJobDetails] = useState<{
    companies: CompanyType;
    opportunities: Opportunity;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  //state to toggle the infinite scroll
  const [hasMore, setHasMore] = useState(true);

  const abortControllerRef = useRef<AbortController>(null);

  // div to trigger paginated api call for jobs
  // const bottomRef = useRef<HTMLDivElement | null>(null);

  const [streams, setStreams] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await axios.get("/api/job/get-degree");
        console.log(response.data);
        setStreams([...response.data]);
      } catch (error) {
        console.log("Error While Fetching Degrees: ", error);
      }
    };

    fetchDegrees();
  }, []);

  const types = useMemo(
    () => [
      { value: "contracts", label: "Contracts" },
      { value: "jobs", label: "Jobs" },
      { value: "internships", label: "Internships" },
      { value: "all", label: "All" },
    ],
    []
  );

  const passingYears = useMemo(generatePassingYears, []);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchJobListings = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const response = await axios.post(
          "/api/job/get-jobs",
          {
            userId: session?.user?.id,
            name: debouncedQuery,
            passingYear: passingYear !== "all" ? passingYear : undefined,
            stream: stream,
            type: type !== "all" ? type : undefined,
          },
          { signal }
        );
        setHasMore(response.data.hasMore);

        return response.data.jobs as JobCardProps[];
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching job listings:", error);
          toast.error("Failed to load job listings");
        }
        return [];
      }
    },
    [session?.user?.id, debouncedQuery, passingYear, stream, type]
  );

  const fetchJobDetails = useCallback(
    async (jobId: string, signal?: AbortSignal) => {
      try {
        setIsDetailsLoading(true);
        const response = await axios.post(
          "/api/job/get-jobs",
          {
            userId: session?.user?.id,
            jobId,
          },
          { signal }
        );

        return response.data.job;
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching job details:", error);
          toast.error("Failed to load job details");
        }
        return null;
      } finally {
        setIsDetailsLoading(false);
      }
    },
    [session?.user?.id]
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      if (jobId) {
        const callbackUrl = `/opportunities?id=${jobId}`;
        toast.error("You need to login first");
        router.push(`/auth/login?callback=${encodeURI(callbackUrl)}`);
      } else router.push("/auth/login");
      return;
    }

    if (status !== "authenticated") return;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const loadJobs = async () => {
      setIsLoading(true);
      try {
        const jobs = await fetchJobListings(controller.signal);

        if (jobs.length === 0) {
          setJobListings([]);
          setJobDetails(null);
          return;
        }

        const selectedJobId = jobId || jobs[0]?.jobId;
        const prioritizedJobs = prioritizeById(jobs, selectedJobId);

        if (selectedJobId) {
          const details = await fetchJobDetails(
            selectedJobId,
            controller.signal
          );
          if (details) setJobDetails(details);
        }

        setJobListings(prioritizedJobs);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();

    return () => controller.abort();
  }, [status, jobId, fetchJobListings, fetchJobDetails, router]);

  const handleJobCardClick = useCallback(
    async (jobId: string) => {
      const details = await fetchJobDetails(jobId);
      if (details) {
        setJobDetails(details);
      }
    },
    [fetchJobDetails]
  );

  // function to fetch jobs when scroll hits bottom
  const fetchMoreJobs = useCallback(
    async (lastJobId: string) => {
      try {
        console.log("fetching more jobs");
        setIsLoading(true);
        const response = await axios.post("/api/job/get-jobs", {
          userId: session?.user?.id,
          lastJobId,
          name: debouncedQuery,
          passingYear: passingYear !== "all" ? passingYear : undefined,
          stream,
          type: type !== "all" ? type : undefined,
        });
        // console.log(response.data.jobs);
        setHasMore(response.data.hasMore);
        setJobListings((prevJobs) => [...prevJobs, ...response.data.jobs]);
        setIsLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching more jobs:", error);
          //creative pop up
          toast.error("Wait for more opportinuty");
        }
        setIsLoading(false);
      }
    },
    [session?.user?.id, debouncedQuery, passingYear, stream, type]
  );

  const memoizedJobListings = useMemo(
    () =>
      isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))
        : jobListings.map((job) => (
            <JobCard
              key={job.jobId}
              job={job}
              onClick={() => handleJobCardClick(job.jobId)}
            />
          )),
    [isLoading, jobListings, handleJobCardClick]
  );

  if (status === "loading") return null;

  return (
    <>
      <Navbar />

      <TrustedCompanies className="py-2" />

      <section className="md:px-16  pb-6">
        <section className="flex gap-4  justify-evenly items-center">
          <div className="flex flex-col gap-4 h-screen  bg-gradient-to-b from-[#E5F7EB] via-[#E5F7EB] to-[#FFFCEF] w-[96%] md:w-[60%] lg:w-[30%] shadow-lg shadow-black/20 rounded-md">
            <section className="p-4 flex flex-col gap-4 ">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search Opportunities"
                  className="w-full lg:w-full pl-10 text-[#646A66] rounded-3xl border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>
              <div className="flex gap-8 flex-wrap">
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
                <EducationSelect
                  label="Type"
                  value={type}
                  onValueChange={setType}
                  options={types}
                />
              </div>
            </section>
            <div className="overflow-auto custom-scrollbar" id="scrollableDiv">
              <InfiniteScroll
                dataLength={jobListings.length}
                hasMore={hasMore}
                next={() => {
                  console.log("triggered", hasMore);
                  fetchMoreJobs(jobListings[jobListings.length - 1].jobId);
                }}
                loader={<JobCardSkeleton />}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                scrollableTarget="scrollableDiv"
              >
                {memoizedJobListings}
              </InfiniteScroll>

              {/* <div ref={bottomRef} style={{ height: "300px" }}></div> */}
            </div>
          </div>
          <JobDetails
            jobDetails={jobDetails!}
            isLoadingDetails={isDetailsLoading}
          />
        </section>
      </section>
      <CompanyPreparation />  
      <MentorBanner />
      <PostSection />
      <Footer />
    </>
  );
}
