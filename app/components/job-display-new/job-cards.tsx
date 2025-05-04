// 'use client';
// import { useState, useEffect } from "react";
// import { ArrowRight, MapPin, Clock, Users } from "lucide-react";
// import Image from "next/image";
// import { Montserrat } from "next/font/google";
// import Link from "next/link";
// import { useSession } from "next-auth/react";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   display: "swap",
// });

// interface JobType {
//   companyName: string;
//   companyLogo: string;
//   jobTitle: string;
//   jobId: string;
//   jobLocation: string[];
//   jobType: "office" | "remote" | "hybrid";
//   jobLink: string;
//   jobgenixSuggestion: boolean;
//   requireskils: string;
//   matchPercentage?: number;
//   postedDaysAgo?: number;
//   applicantsCount?: number;
// }

// function JobCard(props: JobType) {
//   const {
//     companyName = "Company",
//     companyLogo = "/placeholder.svg",
//     jobTitle = "Job Title",
//     jobId,
//     jobLocation = ["Remote"],
//     jobType = "remote",
//     jobLink = "",
//     jobgenixSuggestion = false,
//     matchPercentage = 95,
//     postedDaysAgo = 1,
//     applicantsCount = 5,
//   } = props;

//   return (
//     <div className="relative w-full bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition duration-200 ease-in-out mb-4">
//       {jobgenixSuggestion && (
//         <div
//           className="absolute top-0 right-0 w-auto -translate-y-1/2 bg-transparent pl-8 pr-4 py-1 mt-3 shadow-sm flex justify-end items-center gap-1 text-xs font-medium"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='26' viewBox='0 0 256 26' fill='none'%3E%3Cpath d='M46.7862 0C69.7379 0 256 0 256 0V26H0C0 26 23.8345 0 46.7862 0Z' fill='%23C0E0FF'/%3E%3C/svg%3E")`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//           }}
//         >
//           <Image
//             src="/images2/JobGenix Logo.png"
//             alt="JobGenix logo"
//             width={60}
//             height={60}
//           />
//           <span
//             className={`${montserrat.className} font-bold text-[12px] leading-[18px] align-middle`}
//           >
//             AI Recommended
//           </span>
//           <Image
//             src={"/images2/verify.png"}
//             alt="verify icon"
//             width={20}
//             height={20}
//           />
//         </div>
//       )}

//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-shrink-0 w-10 h-10 relative overflow-hidden rounded">
//           <Image
//             src={companyLogo || "/placeholder.svg"}
//             alt={`${companyName} logo`}
//             fill
//             className="object-cover"
//           />
//         </div>

//         <div className="flex-grow">
//           <div className="flex flex-col md:flex-row justify-between">
//             <div>
//               <h3 className="text-gray-900 font-bold text-base leading-[22px]">
//                 {jobTitle}
//               </h3>
//               <div
//                 className="flex items-center gap-1 mt-1"
//                 style={{ height: "20px", gap: "5px" }}
//               >
//                 <span className="text-gray-700">{companyName}</span>
//                 <span className="text-gray-400">•</span>
//                 <div className="flex items-center gap-1">
//                   <MapPin size={14} className="text-gray-500" />
//                   <span className="text-gray-600">
//                     {Array.isArray(jobLocation) ? jobLocation.join(', ') : jobLocation}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="flex items-center justify-center gap-1 mt-2 md:mt-0"
//               style={{
//                 width: "135px",
//                 height: "28px",
//                 borderRadius: "15px",
//                 padding: "4px 9px",
//                 background: "#eff6ff",
//                 marginTop: "20px",
//               }}
//             >
//               <span className="text-blue-500 text-sm font-light">
//                 {matchPercentage}% Match
//               </span>
//               <span className="text-yellow-300">⚡</span>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2 mt-3">
//             <span className={`px-3 py-1 rounded-full text-xs bg-[#eff6ff]`}>
//               {jobType}
//             </span>
//           </div>

//           <div className="border-t border-gray-200 my-3"></div>

//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div className="flex flex-col md:flex-row gap-3 md:items-center">
//               <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
//                 <Clock size={16} />
//                 <span>Posted {postedDaysAgo} day{postedDaysAgo !== 1 ? 's' : ''} ago</span>
//               </div>
//               <div className="flex items-center gap-1 text-gray-500 text-sm">
//                 <Users size={16} />
//                 <span>{applicantsCount} Applicant{applicantsCount !== 1 ? 's' : ''}</span>
//               </div>
//             </div>

//             <Link
//               href={jobLink || `/job/${jobId}`}
//               className="flex items-center gap-1 text-[#0073E6] mt-2 md:mt-0 text-sm"
//             >
//               <span>View Details</span>
//               <ArrowRight size={16} />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Home() {
//   const [jobs, setJobs] = useState<JobType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   const { data: session } = useSession();
//   const userId = session?.user?.id;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       if (!userId) return;
      
//       try {
//         console.log("Fetching jobs for user:", userId);
        
//         const response = await fetch("/api/job/getJobs", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: userId,
//             userSkills: ["JavaScript", "React", "Node.js", "Java", "C", "C++", "Python", "C#", "Git", "SQL", "NoSQL", "Microservices"],
//             stream: "1",
            
//             type: "jobs",
//           }),
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`API error: ${response.status} - ${response.statusText}. Details: ${errorText}`);
//         }
        
//         const data = await response.json();
//         console.log("Jobs fetched successfully:", data);
        
//         if (data && data.jobs && Array.isArray(data.jobs)) {
//           setJobs(data.jobs);
//         } else {
//           console.error("Invalid job data format received:", data);
//           setError("Invalid data format received from API");
//         }
//       } catch (error) {
//         console.error("Failed to fetch jobs:", error);
//         setError(error instanceof Error ? error.message : "Unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, [userId]);

//   // Mock data for testing if needed
//   const mockJobs: JobType[] = [
//     {
//       companyName: "Example Company",
//       companyLogo: "/placeholder.svg",
//       jobTitle: "Software Engineer",
//       jobId: "job-123",
//       jobLocation: ["San Francisco, CA"],
//       jobType: "remote",
//       jobLink: "/job/job-123",
//       jobgenixSuggestion: true,
//       requireskils: "JavaScript, React, TypeScript",
//       matchPercentage: 95,
//       postedDaysAgo: 2,
//       applicantsCount: 10
//     },
//     // Add more mock jobs if needed
//   ];

//   // Uncomment to use mock data for testing
//   // useEffect(() => {
//   //   setJobs(mockJobs);
//   //   setLoading(false);
//   // }, []);

//   return (
//     <main
//       className={`flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-50 ${montserrat.className}`}
//     >
//       <div className="w-full max-w-3xl space-y-8">
//         {loading ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500">Loading jobs...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-12">
//             <p className="text-red-500">Error: {error}</p>
//           </div>
//         ) : jobs.length > 0 ? (
//           jobs
//             .slice(0, 5)
//             .map((job, index) => (
//               <JobCard 
//                 key={`job-${job.jobId || index}`} 
//                 {...job} 
//               />
//             ))
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-500">No jobs available</p>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

'use client';
import { useState, useEffect } from "react";
import { ArrowRight, MapPin, Clock, Users } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

interface JobType {
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  jobId: string;
  jobLocation: string[];
  jobType: "office" | "remote" | "hybrid";
  jobLink: string;
  jobgenixSuggestion: boolean;
  requireskils: string;
<<<<<<< HEAD
  matchPercentage?: number;
  postedDaysAgo?: number;
  applicantsCount?: number;
=======
  match:string
>>>>>>> 65b786af432730df54eff5773d9c283e573e7ec9
}

function JobCard(props: JobType) {
  // ... (keep the same JobCard implementation)
}

<<<<<<< HEAD
interface HomeProps {
  filteredJobs?: JobType[];
}

export default function Home({ filteredJobs }: HomeProps) {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;
=======
function JobCard({
  companyName,
  companyLogo,
  jobTitle,
  jobId,
  jobLocation,
  jobType, // Adjust if needed
  jobLink,
  match,
  jobgenixSuggestion,
}: JobType) {
  return (
    <div className="relative w-full bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition duration-200 ease-in-out mb-4">
      {jobgenixSuggestion && (
        <div
          className="absolute top-0 right-0 w-auto -translate-y-1/2 bg-transparent pl-8 pr-4 py-1 mt-3 shadow-sm flex justify-end items-center gap-1 text-xs font-medium"
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
                <span>Posted {1} day ago</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Users size={16} />
                <span>{5} Applicants</span>
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
  // const jobs: JobCardProps[] = [
  //   {
  //     companyLogo: "/images/Adobe.png?height=40&width=40",
  //     jobTitle: "Software Engineer (Backend)",
  //     companyName: "Adobe",
  //     location: "Los Gatos, CA",
  //     jobTypes: [
  //       { label: "Full Time", type: "fullTime" },
  //       { label: "Remote", type: "remote" },
  //       {
  //         label: "Software Development",
  //         type: "other",
  //         category: "development",
  //       },
  //     ],
  //     matchPercentage: 95,
  //     postedDaysAgo: 2,
  //     applicantsCount: 42,
  //     aiRecommendedJob: true,
  //     onViewDetails: () => console.log("View details for Adobe job"),
  //   },
  //   {
  //     companyLogo: "/images/Amazon.png?height=40&width=40",
  //     jobTitle: "Creative Director",
  //     companyName: "RazorPay",
  //     location: "San Francisco, CA",
  //     jobTypes: [
  //       { label: "Full Time", type: "fullTime" },
  //       { label: "Hybrid", type: "hybrid" },
  //       { label: "Design & Creatives", type: "other", category: "design" },
  //     ],
  //     matchPercentage: 92,
  //     postedDaysAgo: 3,
  //     applicantsCount: 37,
  //     aiRecommendedJob: false,
  //     onViewDetails: () => console.log("View details for RazorPay job"),
  //   },
  //   {
  //     companyLogo: "/images/Google.png?height=40&width=40",
  //     jobTitle: "Product Manager",
  //     companyName: "Google",
  //     location: "Mountain View, CA",
  //     jobTypes: [
  //       { label: "Onsite", type: "onsite" },
  //       { label: "Full Time", type: "fullTime" },
  //     ],
  //     matchPercentage: 90,
  //     postedDaysAgo: 1,
  //     applicantsCount: 58,
  //     aiRecommendedJob: false,
  //     onViewDetails: () => console.log("View details for Google job"),
  //   },
  //   {
  //     companyLogo: "/images/Facebook.png?height=40&width=40",
  //     jobTitle: "UI/UX Designer",
  //     companyName: "Facebook",
  //     location: "Menlo Park, CA",
  //     jobTypes: [
  //       { label: "Hybrid", type: "hybrid" },
  //       { label: "Part Time", type: "other", category: "design" },
  //     ],
  //     matchPercentage: 88,
  //     postedDaysAgo: 4,
  //     applicantsCount: 21,
  //     aiRecommendedJob: false,
  //     onViewDetails: () => console.log("View details for Facebook job"),
  //   },
  //   {
  //     companyLogo: "/images/Apple.png?height=40&width=40",
  //     jobTitle: "iOS Developer",
  //     companyName: "Apple",
  //     location: "Cupertino, CA",
  //     jobTypes: [
  //       { label: "Onsite", type: "onsite" },
  //       { label: "Contract", type: "other", category: "development" },
  //     ],
  //     matchPercentage: 91,
  //     postedDaysAgo: 5,
  //     applicantsCount: 34,
  //     aiRecommendedJob: false,
  //     onViewDetails: () => console.log("View details for Apple job"),
  //   },
  //   {
  //     companyLogo: "/images/Microsoft.png?height=40&width=40",
  //     jobTitle: "Cloud Solutions Architect",
  //     companyName: "Microsoft",
  //     location: "Redmond, WA",
  //     jobTypes: [
  //       { label: "Remote", type: "remote" },
  //       { label: "Full Time", type: "fullTime" },
  //       { label: "Cloud & DevOps", type: "other", category: "infrastructure" },
  //     ],
  //     matchPercentage: 93,
  //     postedDaysAgo: 1,
  //     applicantsCount: 47,
  //     aiRecommendedJob: true,
  //     onViewDetails: () => console.log("View details for Microsoft job"),
  //   },
  // ];
  
  const pathname = usePathname(); 
  const slug = pathname.split("opportunities2/").pop(); 
  
  console.log(slug)
  const { data: session } = useSession(); // Get user session data
  const userId = session?.user?.id; // Get user ID from session
  const addJobs = useJobStore((state) => state.addJobs);
>>>>>>> 65b786af432730df54eff5773d9c283e573e7ec9

  useEffect(() => {
    // If filtered jobs are provided from parent, use those
    if (filteredJobs && filteredJobs.length > 0) {
      setJobs(filteredJobs);
      setLoading(false);
      return;
    }

    // Otherwise fetch default jobs
    const fetchJobs = async () => {
      if (!userId) return;
      
      try {
        const response = await fetch("/api/job/getJobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
<<<<<<< HEAD
            userId: userId,
            userSkills: ["JavaScript", "React", "Node.js", "Java", "C", "C++", "Python", "C#", "Git", "SQL", "NoSQL", "Microservices"],
=======
            userId: userId?.toString(),
            userSkills: ["JavaScript", "React", "Node.js"],
>>>>>>> 65b786af432730df54eff5773d9c283e573e7ec9
            stream: "1",
            type: slug?.toString(),
          }),
        });

<<<<<<< HEAD
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API error: ${response.status} - ${response.statusText}. Details: ${errorText}`);
        }
        
        const data = await response.json();
        
        if (data && data.jobs && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          console.error("Invalid job data format received:", data);
          setError("Invalid data format received from API");
        }
=======

        const data = await response.json();
        addJobs(data.jobs); // Add jobs to global state
        // console.log(data.jobs)
>>>>>>> 65b786af432730df54eff5773d9c283e573e7ec9
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
<<<<<<< HEAD
  }, [userId, filteredJobs]);
=======
  }
  , [userId]); // Fetch jobs when userId changes

  const jobs = useJobStore((state) => state.jobs); // Global state
  // console.log(jobs); // Log the jobs data
>>>>>>> 65b786af432730df54eff5773d9c283e573e7ec9

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-50 ${montserrat.className}`}
    >
      <div className="w-full max-w-3xl space-y-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : jobs.length > 0 ? (
          jobs
            .slice(0, 5)
            .map((job, index) => (
              <JobCard 
                key={`job-${job.jobId || index}`} 
                {...job} 
              />
            ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs available. Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}