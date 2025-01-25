"use client"

// import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { CheckCircle, ArrowUpRight } from "lucide-react"
import Image from "next/image"

// Types for our job listing
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

// Dummy data to simulate database
const jobListings: JobListing[] = [
  {
    id: "1",
    title: "Software Development",
    company: "Coinbase",
    location: "Bengaluru, Karnataka, India",
    workplaceType: "On-site",
    logoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DQUKIhGB5HdZEme2wQniV9bb1XHayc.png",
    isVerified: true,
    applyUrl: "#",
  },
  // Add more dummy data as needed
]

interface JobCardProps {
  job?: JobListing
}

export default function JobCard({
  job = {
    id: "",
    title: "Job Title",
    company: "Company Name",
    location: "Location",
    workplaceType: "Remote",
    logoUrl: "/placeholder.svg",
    isVerified: false,
    applyUrl: "#",
  },
}: JobCardProps) {
  if (!job) {
    return null
  }
  return (
    <Card className="w-[615px] h-[203px] p-6 bg-gradient-to-r from-[#ECFAF0] to-white hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Image
            src={job.logoUrl || "/placeholder.svg"}
            alt={`${job.company} logo`}
            width={56}
            height={56}
            className="rounded-lg"
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

