"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent } from "@/app/components/ui/card";


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
  match: string,
  description: string;
}

interface CompanyCardProps extends JobType {
  no: number;
}

const CompanyCard = ({ companyLogo, companyName, description,jobId ,no }: CompanyCardProps) => {
  return (
    <Card className="w-52 mt-4 rounded-3xl  h-[250px] max-w-[200px] ml-8 bg-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 sm:max-w-[250px]">
      <CardContent className="p-0 h-full w-full ">
        <div
          className={`p-6 h-full flex flex-col items-center justify-center rounded-xl relative text-xl 
            ${no === 0
              ? "bg-[#1DB954]"
              : no === 1
              ? "bg-[#e23744]"
              : no === 3
              ? "bg-[#ff5a5f]"
              : no === 4
              ? "bg-[#1DB954]"
              :"bg-[#1DB954]"
            }`}
        >
          <Image src={companyLogo || "/placeholder.svg"} alt={`${name} logo`} width={50} height={50} className="m-auto rounded-full" />
          <h6 className="text-white text-center text-sm sm:text-base">{companyName}</h6>
          <div className="flex items-center mt-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-300 text-xs sm:text-sm">★</span>
              ))}
            </div>
            {/* <span className="text-white text-xs ml-1 sm:text-sm">
              ({rating}) {totalRatings} + Jobs
            </span> */}
          </div>
          <p className="text-white italic text-center text-xs sm:text-sm leading-tight min-h-[40px]">{description.replace(/<[^>]*>/g, '').split(' ').slice(0, 5).join(' ')}</p>
          <Link href={`/jobdescription/${jobId}`}  className="mt-3 w-24 rounded-full text-xs font-medium sm:w-28 sm:text-sm bg-white text-black py-2 px-3">
            Apply Now
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default function JobSearchHero() {
  const jobListRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [jobs, setJobs] = useState<JobType[]>()

  const handleScroll = () => {
    if (jobListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = jobListRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScrollLeft = () => {
    if (jobListRef.current) {
      jobListRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (jobListRef.current) {
      jobListRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const currentRef = jobListRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

useEffect(()=>{
  try {
    async function fetchJobs() {
    const response = await fetch("/api/job/getJobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit:"4",
            stream: "1",
            type: "jobs",
          }),
        });
    const data = await response.json();
    setJobs(data.jobs); // Set the jobs in state
    }
    fetchJobs();
  } catch (error) {
    console.error("Error fetching jobs:", error); 
    
  }
},[])

  return (
    <div className="max-w-screen mx-auto px-4 mt-10 py-20 bg-white font-montserrat ">
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-3xl font-bold mb-6">
          Type It. <span className="text-blue-500">Upload It.</span> Get Hired.
        </h1>

        <div className="relative max-w-xl mx-auto mb-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Dream job? Type it in ✨"
            className="pl-4 pr-10 py-4 sm:py-6 rounded-full bg-[#EAEAEA] border-[#9DCEFF] focus:outline-none"
          />
          <Link href={`/opportunities2/jobs?name=${name}`}>
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </Link>
        </div>
      </div>

      <div className="mt-12 relative">
        <h2 className="text-xl sm:text-2xl font-normal text-center mb-2">Top Companies Actively Hiring</h2>
        <p className="text-xs sm:text-sm text-gray-600 justify-center flex-wrap flex gap-2 mb-6">Upload your CV and find your perfect match</p>

        <div className="relative flex items-center">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <ChevronLeft className="text-gray-500" size={20} />
            </button>
          )}

          {/* Scrollable Job List - Fixed margin on mobile */}
          <div
            ref={jobListRef}
            className="flex flex-row gap-4 overflow-x-hidden scroll-y-hidden scroll-smooth scrollbar-hide mx-4 sm:mx-8 sm:ml-20 md:ml-40 lg:ml-52 "
          >
            {jobs && jobs.map((company, index) => (
              <CompanyCard key={index} no={index} {...company} />
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={handleScrollRight}
              className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <ChevronRight className="text-gray-500" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
