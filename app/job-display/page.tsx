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
import { degreeTypeSchema } from "@/constants/jobOpportunities";
import { prioritizeById } from "@/utils/setToFirst";

import { Input } from "@/app/components/ui/input";
import { EducationSelect } from "@/app/components/education-select";
import JobCardSkeleton from "@/app/components/skeletons/job-card-skeleton";
import JobCard from "../components/Job-components";
import JobDetails from "../components/job-display-components/job-details";
import { TrustedCompanies } from "../components/LandingPageComponents/trusted-companies";
import { Navbar } from "../components/LandingPageComponents/navbar";

const DEGREE_TYPE_MAP = {
  bachelor: ["btech", "be", "bsc", "bca"],
  master: ["mca", "mtech"]
} as const;

// Create union types for streams
type BachelorStream = typeof DEGREE_TYPE_MAP.bachelor[number];
type MasterStream = typeof DEGREE_TYPE_MAP.master[number];
type StreamType = BachelorStream | MasterStream;

// Create type guard for stream validation
const isStreamType = (stream: string): stream is StreamType => {
  return ([...DEGREE_TYPE_MAP.bachelor, ...DEGREE_TYPE_MAP.master] as string[]).includes(stream);
};

// Create type guard for bachelor streams
const isBachelorStream = (stream: StreamType): stream is BachelorStream => {
  return DEGREE_TYPE_MAP.bachelor.includes(stream as BachelorStream);
};

const mapStreamToDegreeType = (stream: string) => {
  const normalizedStream = stream.toLowerCase();

  if (!isStreamType(normalizedStream)) {
    return null;
  }

  return isBachelorStream(normalizedStream)
    ? degreeTypeSchema.Enum.bachelor
    : degreeTypeSchema.Enum.master;
};

const generatePassingYears = () => {
  const currentYear = new Date().getFullYear();
  return [
    ...Array.from({ length: 10 }, (_, i) => ({
      value: (currentYear + i).toString(),
      label: (currentYear + i).toString()
    })),
    { value: "all", label: "All" }
  ];
};

export default function JobsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [passingYear, setPassingYear] = useState("all");
  const [stream, setStream] = useState("all");
  const [jobListings, setJobListings] = useState<JobCardProps[]>([]);
  const [jobDetails, setJobDetails] = useState<{ companies: CompanyType; opportunities: Opportunity } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const abortControllerRef = useRef<AbortController>(null);

  const streams = useMemo(() => [
    { value: "btech", label: "B.Tech" },
    { value: "be", label: "B.E." },
    { value: "bsc", label: "B.Sc" },
    { value: "bca", label: "BCA" },
    { value: "mca", label: "MCA" },
    { value: "mtech", label: "M.Tech" },
    { value: "all", label: "All" },
  ], []);

  const passingYears = useMemo(generatePassingYears, []);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchJobListings = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await axios.post("/api/job/get-jobs", {
        userId: session?.user?.id,
        name: debouncedQuery,
        passingYear: passingYear !== "all" ? passingYear : undefined,
        stream: stream !== "all" ? mapStreamToDegreeType(stream) : undefined,
      }, { signal });

      return response.data.jobs as JobCardProps[];
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching job listings:", error);
        toast.error("Failed to load job listings");
      }
      return [];
    }
  }, [session?.user?.id, debouncedQuery, passingYear, stream]);

  const fetchJobDetails = useCallback(async (jobId: string, signal?: AbortSignal) => {
    try {
      setIsDetailsLoading(true);
      const response = await axios.post("/api/job/get-jobs", {
        userId: session?.user?.id,
        jobId,
      }, { signal });

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
  }, [session?.user?.id]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/login');
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
          const details = await fetchJobDetails(selectedJobId, controller.signal);
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

  const handleJobCardClick = useCallback(async (jobId: string) => {
    const details = await fetchJobDetails(jobId);
    if (details) {
      setJobDetails(details);
      router.replace(`/job-display?id=${jobId}`, { scroll: false });
    }
  }, [fetchJobDetails, router]);

  const memoizedJobListings = useMemo(() => (
    isLoading
      ? Array.from({ length: 5 }).map((_, index) => <JobCardSkeleton key={index} />)
      : jobListings.map((job) => (
        <JobCard
          key={job.jobId}
          job={job}
          onClick={() => handleJobCardClick(job.jobId)}
        />
      ))
  ), [isLoading, jobListings, handleJobCardClick]);

  if (status === "loading") return null;

  return (
    <>
      <Navbar />
      <div className="flex px-6 py-0">
        <p className="text-lg font-bold flex flex-col gap-1 w-64 justify-center">
          Get Hired in{" "}
          <span style={{ color: "green" }}>Dream Companies:</span>
        </p>
        <TrustedCompanies className="py-2" />
      </div>
      <section className="px-16">
        <section className="flex gap-4 justify-evenly items-center">
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
              <div className="flex gap-8">
                <EducationSelect label="Passing Year" value={passingYear} onValueChange={setPassingYear} options={passingYears} />
                <EducationSelect label="Stream" value={stream} onValueChange={setStream} options={streams} />
              </div>
            </section>
            <div className="overflow-auto custom-scrollbar">
              {memoizedJobListings}
            </div>
          </div>
          <JobDetails jobDetails={jobDetails!} isLoadingDetails={isDetailsLoading} />
        </section>
      </section>
    </>
  );
}
