"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { JobCardProps } from "@/types/job";
import { capitalizeWords } from "@/utils/stringUtility";
import { CheckCircle, ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
      router.push(`/opportunity/${job.jobId}`);
    }
  };

  return (
    <>
      <Card className="w-full p-6 bg-transparent hover:shadow-lg transition-all border-b-black/20 rounded-none border-t-black/20 select-none cursor-pointer hover:bg-blue-400/20">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Image
              src={job.companyLogo || "/placeholder.svg"}
              alt={`${job.companyName} logo`}
              width={70}
              height={70}
              draggable={false}
              className="rounded-lg border border-gray-200 bg-white p-1 flex justify-center items-center"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-black/60">
                  {job.jobTitle}
                </h2>
                {true && <CheckCircle className="w-5 h-5 text-blue-500" />}
              </div>
              <p className="text-black font-semibold">{job.companyName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 font-bold">
                {capitalizeWords(job.jobLocation)} ({capitalizeWords(job.jobType)})
              </p>
            </div>

            {/* Apply Button for Large Screens */}
            <Button
              asChild
              variant="outline"
              className="rounded-full hover:bg-blue-600 hover:text-white shadow-md shadow-black/30 hidden lg:inline-flex"
              onClick={() => onClick(job.jobId)}
            >
              <a className="flex items-center gap-2 text-blue-600 sm:font-bold sm:!text-base">
                Apply
                <ArrowUpRight className="w-4 h-4 sm:font-bold" />
              </a>
            </Button>

            {/* Apply Button for Mobile */}
            <Button
              variant="outline"
              className="rounded-full hover:bg-blue-600 hover:text-white shadow-md shadow-black/30 lg:hidden"
              onClick={handleApplyClick} // ✅ Navigates to /opportunity/jobId
            >
              <a className="flex items-center gap-2 hover:text-white text-blue-600 sm:font-bold sm:!text-base">
                Apply
                <ArrowUpRight className="w-4 h-4 sm:font-bold" />
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
