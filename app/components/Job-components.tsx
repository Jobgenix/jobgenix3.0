"use client";

// import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { JobCardProps } from "@/types/job";
import { CheckCircle, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Types for our job listing

// Dummy data to simulate database
// const jobListings: JobListing[] = [
//   {
//     id: "1",
//     title: "Software Development",
//     company: "Coinbase",
//     location: "Bengaluru, Karnataka, India",
//     workplaceType: "On-site",
//     logoUrl:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DQUKIhGB5HdZEme2wQniV9bb1XHayc.png",
//     isVerified: true,
//     applyUrl: "#",
//   },
//   // Add more dummy data as needed
// ];

interface JobCardElementProps {
  job?: JobCardProps;
  onClick: (id: string) => void;
}

export default function JobCard({
  job = {
    jobId: "",
    jobTitle: "Job Title",
    companyName: "Company Name",
    jobLocation: "Location",
    jobType: "remote",
    companyLogo: "/placeholder.svg",
  },
  onClick,
}: JobCardElementProps) {
  if (!job) {
    return null;
  }
  return (
    <Card className="w-full p-6 bg-transparent hover:shadow-lg transition-all border-b-black/20 rounded-none border-t-black/20 select-none cursor-pointer hover:bg-blue-400/20 ">
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
          <div className="">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-black/60">
                {job.jobTitle}
              </h2>
              {true && (
                <CheckCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <p className="text-black font-semibold">{job.companyName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-600 font-bold">
              {job.jobLocation} ({job.jobType})
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full hover:bg-blue-600 hover:text-white shadow-md shadow-black/30"
            onClick={() => onClick(job.jobId)}
          >
            <a
              className="flex items-center gap-2 text-blue-600 sm:font-bold sm:!text-base"
            >
              Apply
              <ArrowUpRight className="w-4 h-4 sm:font-bold" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
