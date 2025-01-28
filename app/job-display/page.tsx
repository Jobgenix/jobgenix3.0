"use client";
import JobCard from "../components/Job-components";
import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";
import JobDetails from "../components/job-display-components/job-details";
import { useState, useEffect, useCallback, useMemo } from "react";
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
import { useSearchParams, useRouter } from "next/navigation";
import { prioritizeById } from "@/utils/setToFirst";


const mapStreamToDegreeType = (stream: string) => {
  const bachelorDegrees = ["btech", "be", "bsc", "bca"];
  const masterDegrees = ["mca", "mtech"];
  return bachelorDegrees.includes(stream.toLowerCase())
    ? degreeTypeSchema.Enum.bachelor
    : masterDegrees.includes(stream.toLowerCase())
      ? degreeTypeSchema.Enum.master
      : null;
};

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [passingYear, setPassingYear] = useState("all");
  const [stream, setStream] = useState("all");
  const [jobListings, setJobListings] = useState<JobCardProps[]>([]);
  const [jobDetails, setJobDetails] = useState<{ companies: CompanyType; opportunities: Opportunity }>({} as { companies: CompanyType; opportunities: Opportunity });
  const [isLoading, setIsLoading] = useState(true);

  const session = useSession();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");
  const router = useRouter();

  const passingYears = useMemo(() => [
    ...Array.from({ length: 10 }, (_, i) => {
      const year = 2024 + i;
      return { value: year.toString(), label: year.toString() };
    }),
    { value: "all", label: "All" },
  ], []);

  const streams = useMemo(() => [
    { value: "btech", label: "B.Tech" },
    { value: "be", label: "B.E." },
    { value: "bsc", label: "B.Sc" },
    { value: "bca", label: "BCA" },
    { value: "mca", label: "MCA" },
    { value: "mtech", label: "M.Tech" },
    { value: "all", label: "All" },
  ], []);

  const applyChange = useCallback(async (id: string) => {
    const userId = session.data?.user?.id;
    if (!userId) return;

    try {
      const res = await axios.post("/api/job/get-jobs", { userId, jobId: id });
      setJobDetails({
        companies: res.data.job.companies,
        opportunities: res.data.job.opportunities,
      });
    } catch (error) {
      console.error("Error fetching job details:", error);
      toast.error("E:4002 - error fetching job details");
    }
  }, [session.data?.user?.id]);

  useEffect(() => {
    if (session.status === "loading") return;
    if (session.status === "unauthenticated") return router.push('/auth/login');

    const userId = session.data?.user?.id;
    if (!userId) {
      toast.error("E:4001 - user id missing");
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
      .then(async (res) => {
        if (res.data.jobs.length) {
          const selectedJobId = jobId || res.data.jobs[0].jobId;
          await applyChange(selectedJobId);
          setJobListings(prioritizeById(res.data.jobs, selectedJobId));
        }
      })
      .catch((error) => {
        console.error("Error fetching job listings:", error);
      })
      .finally(() => setIsLoading(false));
  }, [searchQuery, passingYear, stream, session.status, jobId, applyChange, router, session.data?.user.id]);

  const memoizedJobListings = useMemo(() => (
    isLoading
      ? Array(5).fill(0).map((_, index) => <JobCardSkeleton key={index} />)
      : jobListings.map((job, i) => <JobCard key={i} job={job} onClick={() => applyChange(job.jobId)} />)
  ), [isLoading, jobListings, applyChange]);

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
          <JobDetails jobDetails={jobDetails} isLoadingDetails={isLoading} />
        </section>
      </section>
    </>
  );
}
