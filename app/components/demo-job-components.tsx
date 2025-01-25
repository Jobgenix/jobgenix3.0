"use client"

// import { Badge } from "@/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { CheckCircle, ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface JobListing {
  id: string
  title: string
  company: string
  location: string
  workplaceType: string
  logoUrl: string
  isVerified: boolean
  applyUrl: string
}

const jobListings: JobListing[] = [
  {
    id: "1",
    title: "Software Development",
    company: "Coinbase",
    location: "Bengaluru, Karnataka, India",
    workplaceType: "On-site",
    logoUrl: "",
    isVerified: true,
    applyUrl: "#",
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Google",
    location: "San Francisco, CA, USA",
    workplaceType: "Hybrid",
    logoUrl: "",
    isVerified: true,
    applyUrl: "#",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Amazon",
    location: "Seattle, WA, USA",
    workplaceType: "Remote",
    logoUrl: "",
    isVerified: false,
    applyUrl: "#",
  },
]

interface JobCardProps {
  job: JobListing
}

function JobCard({ job }: JobCardProps) {
  return (
    <Card className="w-[615px] h-[203px] p-6 bg-gradient-to-r from-[#ECFAF0] to-white hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Image
            src={job.logoUrl || "/placeholder.svg"}
            alt={`${job.company} logo`}
            width={56}
            height={56}
            className="rounded-lg object-contain"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            {job.isVerified && <CheckCircle className="w-5 h-5 text-blue-500" />}
          </div>
          <div className="space-y-1">
            <p className="text-gray-900">{job.company}</p>
            <p className="text-gray-600">
              {job.location} ({job.workplaceType})
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full hover:bg-gray-100">
            <a href={job.applyUrl} className="flex items-center gap-2">
              Apply
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default function JobCardList() {
  return (
    <div className="space-y-4">
      {jobListings.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

