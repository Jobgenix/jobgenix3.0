"use client";
import { useJobStore } from "@/app/_store/oppJobStore";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface JobType {
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  jobId: string;
  jobLocation: string[];
  jobType: "office" | "remote" | "hybrid"; // Adjust if needed
  jobLink: string;
  jobgenixSuggestion: boolean;
  requireskils: string;
  match: string;
}

function JobCard({
  companyName,
  companyLogo,
  jobTitle,
  jobId,
  jobLocation,
  jobType, // Adjust if needed
  match,
  jobgenixSuggestion,
}: JobType) {
  return (
    <div className="relative w-full   ">
      {jobgenixSuggestion && (
        <div className="flex items-end justify-end w-full">
          <div
            className="w-auto bg-transparent pl-8 pr-4 py-1 shadow-sm flex justify-end items-center gap-1 text-xs font-medium"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='26' viewBox='0 0 256 26' fill='none'%3E%3Cpath d='M46.7862 0C69.7379 0 256 0 256 0V26H0C0 26 23.8345 0 46.7862 0Z' fill='%23C0E0FF'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <Image
              src="/images2/JobGenix Logo.png"
              alt="JobGenix logo"
              width={60}
              height={60}
            />
            <span
              className={`font-montserrat font-bold text-[12px] leading-[18px] align-middle`}
            >
              AI Recommended
            </span>
            <Image
              src={"/images2/verify.png"}
              alt="verify icon"
              width={20}
              height={20}
            ></Image>
          </div>
        </div>
      )}
      {/* large screen  */}
      <div className="bg-white hidden md:flex flex-col md:p-4 rounded-l-2xl rounded-br-2xl shadow-sm border border-gray-100">
        <div className="flex gap-4 ">
          <div className="flex-shrink-0 w-10 h-10 relative overflow-hidden rounded">
            <Image
              src={companyLogo || "/placeholder.svg"}
              alt={`${companyName} logo`}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-grow">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-gray-900 font-bold text-base leading-[22px]">
                  {jobTitle}
                </h3>
                <div
                  className="flex items-center gap-1 mt-1"
                  style={{ height: "20px", gap: "5px" }}
                >
                  <span className="text-gray-700">{companyName}</span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-gray-500" />
                    <span className="text-gray-600">{jobLocation[0]}</span>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center justify-center gap-1 mt-2 md:mt-0"
                style={{
                  width: "135px",
                  height: "28px",
                  borderRadius: "15px",
                  padding: "4px 9px",
                  background: "#eff6ff",
                  marginTop: "20px",
                }}
              >
                <span className="text-blue-500 text-sm font-light ">
                  {match} Match
                </span>
                <span className="text-yellow-300">⚡</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-3 py-1 rounded-full text-xs`}>
                {jobType}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 my-3"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
              <Clock size={16} />
              <span>Posted {Math.floor(Math.random() * 5) + 1} days ago</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Users size={16} />
              <span>{Math.floor(Math.random() * 10) + 1} Applicants</span>
            </div>
          </div>

          <Link
            href={`/jobdescription/${jobId}`}
            className="flex items-center gap-1 text-[#0073E6] mt-2 md:mt-0 text-sm"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* small screen  */}
      <Link href={`/jobdescription/${jobId}`} className="md:hidden">
        <div className="bg-white px-3 pt-4 pb-3 rounded-l-2xl rounded-br-2xl shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 relative overflow-hidden rounded">
              <Image
                src={companyLogo || "/placeholder.svg"}
                alt={`${companyName} logo`}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-grow">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div>
                  <h3 className="text-gray-900 font-bold text-base leading-[22px]">
                    {jobTitle}
                  </h3>
                  <div className="flex flex-col items-start">
                    <span className="text-gray-700">{companyName}</span>
                    <div className="flex justify-between gap-1 w-full">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-gray-500" />
                        <span className="text-gray-600">{jobLocation[0]}</span>
                      </div>
                      <div
                        className="flex items-center justify-center gap-1"
                        style={{
                          width: "135px",
                          height: "28px",
                          borderRadius: "15px",
                          padding: "4px 9px",
                          background: "#eff6ff",
                        }}
                      >
                        <span className="text-blue-500 text-sm font-light ">
                          {match} Match
                        </span>
                        <span className="text-yellow-300">⚡</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 my-3"></div>

          <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
            <Clock size={16} />
            <span>Posted {Math.floor(Math.random() * 5) + 1} days ago</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home2() {
  const pathname = usePathname();
  const slug = pathname.split("Opportunities/").pop();

  const { data: session } = useSession(); // Get user session data
  const userId = session?.user?.id;
  const addJobs = useJobStore((state) => state.addJobs);

  interface JobType {
    companyName: string;
    companyLogo: string;
    jobTitle: string;
    jobId: string;
    jobLocation: string[];
    jobType: "office" | "remote" | "hybrid"; // Adjust if needed
    jobLink: string;
    jobgenixSuggestion: boolean;
    requireskils: string;
    match: string;
  }

  useEffect(
    () => {
      const fetchJobs = async () => {
        try {
          const response = await fetch("/api/job/getJobs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId?.toString(),
              userSkills: ["JavaScript", "React", "Node.js"],
              stream: "1",
              type: slug?.toString(),
            }),
          });

          const data = await response.json();
          addJobs(data.jobs); // Add jobs to global state
          // console.log(data.jobs); // Log the jobs to the console
        } catch (error) {
          console.error("Failed to fetch jobs:", error);
        }
      };

      fetchJobs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  ); // Fetch jobs when userId changes

  const jobs = useJobStore((state) => state.jobs);
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <main
      className={`flex flex-col items-center justify-between  font-montserrat`}
    >
      <div className="w-full max-w-7xl space-y-4">
        {jobs &&
          jobs
            .slice(0, visibleCount)
            .map((job: JobType, index: number) => (
              <JobCard key={index} {...job} />
            ))}
        {jobs && visibleCount < jobs.length && (
          <div className="flex justify-center w-full">
            <button
              onClick={handleLoadMore}
              className="xl:relative right-[17%] px-6 py-2 mt-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition"
            >
              Load more...
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
