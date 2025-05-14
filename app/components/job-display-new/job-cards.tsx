'use client';
import { ArrowRight, MapPin, Clock, Users } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useJobStore } from '@/app/_store/oppJobStore';
import { useEffect ,useState} from "react";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import UserDetails from '@/types/userDetails';
import { useSearchParams } from 'next/navigation';


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// type JobType = "fullTime" | "remote" | "hybrid" | "onsite" | "other";

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
  match: string
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
    <div className="relative w-full bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition duration-200 ease-in-out mb-4">
      {jobgenixSuggestion && (
        <div
          className="absolute top-0 right-0 w-auto -translate-y-1/2 bg-transparent pl-8 pr-4 py-1 shadow-sm flex justify-end items-center gap-1 text-xs font-medium"
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
            className={`${montserrat.className} font-bold text-[12px] leading-[18px] align-middle`}
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
      )}

      <div className="flex flex-col md:flex-row  gap-4">
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
                  <span className="text-gray-600">{jobLocation && jobLocation[0]}</span>
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
            <span className={`px-3 py-1 rounded-full text-xs bg-[#eff6ff]`}>
              {jobType}
            </span>
          </div>

          <div className="border-t border-gray-200 my-3"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                <Clock size={16} />
                <span>Posted {Math.floor(Math.random() * 5) + 1} day ago</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Users size={16} />
                <span>{Math.floor(Math.random() * 100) + 32} Applicants</span>
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
      </div>
    </div>
  );
}

export default function Home() {

  const [userDetails, setUserDetails] = useState<UserDetails>();
  const pathname = usePathname();
  const slug = pathname.split("opportunities2/").pop();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  console.log(slug)
  const { data: session } = useSession(); // Get user session data
  const userId = session?.user?.id; // Get user ID from session
  const addJobs = useJobStore((state) => state.addJobs);
  const { status } = useSession();
  

  useEffect(() => {
    const fetchJobs = async () => {
      
      try {

        if (status === "authenticated") {
          const response = await fetch("/api/profileInfo");
          const data = await response.json();
          setUserDetails(data);
        }

        const response = await fetch("/api/job/getJobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId?.toString(),
            userSkills: userDetails ? userDetails?.skills.split(","):[],
            stream: "1",
            type: slug?.toString(),
            name:name?.toString()
          }),
        });


        const data = await response.json();
        addJobs(data.jobs); // Add jobs to global state
        // console.log(data.jobs)
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [userId]); // Fetch jobs when userId changes

  const jobs = useJobStore((state) => state.jobs); // Global state
  // console.log(jobs); // Log the jobs data

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 md:p-24 bg-gray-50 ${montserrat.className}`}
    >
      
      <h2 className="font-semibold text-2xl mt-10 md:-mt-10 lg:mt-0 translate md:-translate-x-[290px] -translate-x-[100px] text-left">Featured Jobs</h2>
      <div className="w-full max-w-3xl  space-y-8">
        {jobs &&
          jobs
            .filter(
              (job: JobType, index: number) => 
                index < 5
            )
            .map((job: JobType, index: number) => <JobCard key={index} {...job} />)}
      </div>
    </main>
  );
}