"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { JobCardProps } from "@/types/job";
import { capitalizeWords } from "@/utils/stringUtility";
// import { CheckCircle, ArrowUpRight } from "lucide-react";
import Image from "next/image";
// import {

//   Users,

// } from "lucide-react";


import { Badge } from "@/app/components/ui/badge";
import { CardContent } from "@/app/components/ui/card"

import { useRouter } from "next/navigation"; // ✅ Correct usage inside the component

interface JobCardElementProps {
  job?: JobCardProps;
  onClick: (id: string) => void;
}

export default function JobCard({ job, onClick }: JobCardElementProps) {

  const router = useRouter(); // ✅ Moved inside the component




  if (!job) {
    return null;
  }

  const handleApplyClick = () => {
    if (job?.jobId) {
      router.push(`/opportunities?id=${job.jobId}`);
    }
  };


  return (
    // <>
    //   <Card className="w-full p-6 bg-transparent hover:shadow-lg transition-all border-b-black/20 rounded-none border-t-black/20 select-none cursor-pointer hover:bg-blue-400/20">
    //     <div className="flex gap-4">
    //       <div className="flex-shrink-0">
    //         <Image
    //           src={job.companyLogo || "/placeholder.svg"}
    //           alt={`${job.companyName} logo`}
    //           width={70}
    //           height={70}
    //           draggable={false}
    //           className="rounded-lg border border-gray-200 bg-white p-1 flex justify-center items-center"
    //         />
    //       </div>
    //       <div className="flex-1 space-y-2">
    //         <div>
    //           <div className="flex items-center gap-2">
    //             <h2 className="text-xl font-semibold text-black/60">
    //               {job.jobTitle}
    //             </h2>
    //             {true && <CheckCircle className="w-5 h-5 text-blue-500" />}
    //           </div>
    //           <p className="text-black font-semibold">{job.companyName}</p>
    //         </div>
    //         <div className="space-y-1">
    //           <p className="text-gray-600 font-bold">
    //             {capitalizeWords(job.jobLocation)} ({capitalizeWords(job.jobType)})
    //           </p>
    //         </div>

    // {/* Apply Button for Large Screens */}
    // <Button
    //   asChild
    //   variant="outline"
    //   className="rounded-full hover:bg-blue-600 hover:text-white shadow-md shadow-black/30 hidden lg:inline-flex"
    //   onClick={() => onClick(job.jobId)}
    // >
    //   <a className="flex items-center gap-2 text-blue-600 sm:font-bold sm:!text-base">
    //     Apply
    //     <ArrowUpRight className="w-4 h-4 sm:font-bold" />
    //   </a>
    // </Button>

    // {/* Apply Button for Mobile */}
    // <Button
    //   variant="outline"
    //   className="rounded-full hover:bg-blue-600 hover:text-white shadow-md shadow-black/30 lg:hidden"
    //   onClick={handleApplyClick} // ✅ Navigates to /opportunity/jobId
    // >
    //   <a className="flex items-center gap-2 hover:text-white text-blue-600 sm:font-bold sm:!text-base">
    //     Apply
    //     <ArrowUpRight className="w-4 h-4 sm:font-bold" />
    //   </a>
    // </Button>
    //       </div>
    //     </div>
    //   </Card>
    // </>
    <>
      <Card className="w-[94%] lg:w-full mt-4  bg-[#FEFFE1] 
  cursor-pointer hover:bg-[#C6F7D5] border-none 
  shadow-[4px_4px_4px_#c4c4c4] 
  hover:shadow-[6px_6px_10px_#b0b0b0] 
  transition-all rounded-xl">


        <CardContent className="p-4">
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-lg">{job.jobTitle}</h3>
                  {/* {title === "Software Engineer" && <CheckCircle className="h-4 w-4 text-gray-500" />} */}
                  <img src="/images/tick.png" className=" mr-1" alt="" />
                </div>
                <p className="text-sm text-gray-600">{capitalizeWords(job.jobLocation)}</p>
              </div>

              <Badge variant="outline" className="bg-[#2F8E5B]   hover:bg-[#1E7045] text-white border-none px-2 py-1 text-xs">
                {job.jobType}
              </Badge>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={job.companyLogo || "/placeholder.svg?height=32&width=32"}
                    alt={`${job.companyName} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{job.companyName}</span>
              </div>

              <div className="flex items-center gap-4">

                {/* Desktop */}
                <Button className="bg-[#2F8E5B] hidden lg:inline-flex  hover:bg-[#1E7045] text-white rounded-full px-6" onClick={() => onClick(job.jobId)}>
                  Apply
                </Button>

                {/* Mobile */}

                <Button className="bg-[#2F8E5B] lg:hidden  hover:bg-[#1E7045] text-white rounded-full px-6" onClick={handleApplyClick}>
                  Apply
                </Button>




                {/* {resumeMatch !== undefined && (
                <div className="text-sm font-medium text-gray-700">{resumeMatch}% Resume match</div>
              )} */}
                {/* <Button
                  variant="outline"
                  className="flex items-center hover:text-white text-sm font-medium gap-2 bg-white border border-[#01A768] text-[#01A768] hover:bg-green-600 rounded-full   px-2 shadow-md shadow-black/30"
                >

                  Referral Person
                  <Users className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
