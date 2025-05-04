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
  matchPercentage?: number;
  postedDaysAgo?: number;
  applicantsCount?: number;
}

function JobCard(props: JobType) {
  // ... (keep the same JobCard implementation)
}

interface HomeProps {
  filteredJobs?: JobType[];
}

export default function Home({ filteredJobs }: HomeProps) {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

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
            userId: userId,
            userSkills: ["JavaScript", "React", "Node.js", "Java", "C", "C++", "Python", "C#", "Git", "SQL", "NoSQL", "Microservices"],
            stream: "1",
            type: "jobs",
          }),
        });

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
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userId, filteredJobs]);

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