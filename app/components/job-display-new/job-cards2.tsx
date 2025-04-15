"use client"

import { ArrowRight, MapPin, Clock, Users } from "lucide-react"
import Image from "next/image"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    display: "swap",
})

type JobType = "fullTime" | "remote" | "hybrid" | "onsite" | "other"

interface JobCardProps {
    companyLogo: string
    jobTitle: string
    companyName: string
    location: string
    jobTypes: Array<{
        label: string
        type: JobType
        category?: string
    }>
    matchPercentage: number
    postedDaysAgo: number
    applicantsCount: number
    onViewDetails: () => void
    aiRecommendedJob?: boolean
}

function JobCard({
    companyLogo,
    jobTitle,
    companyName,
    location,
    jobTypes,
    matchPercentage,
    postedDaysAgo,
    applicantsCount,
    onViewDetails,
    aiRecommendedJob = false,
}: JobCardProps) {
    const getJobTypeBackground = (type: JobType) => {
        switch (type) {
            case "fullTime":
                return "bg-[#eff6ff] text-blue-500"
            case "remote":
                return "bg-[#ecfdf5] text-[#319d84]"
            case "hybrid":
                return "bg-[#ecfdf5] text-[#319d84]"
            case "onsite":
                return "bg-[#ecfdf5] text-[#319d84]"
            default:
                return "bg-purple-100 text-purple-800"
        }
    }

    return (
        
        <div className="relative w-full bg-white rounded-md shadow-sm border border-gray-100 p-4">
         
            {aiRecommendedJob && (
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
                            <h3 className="text-gray-900 font-bold text-base leading-[22px]">{jobTitle}</h3>
                            <div className="flex items-center gap-1 mt-1" style={{ height: "20px", gap: "5px" }}>
                                <span className="text-gray-700">{companyName}</span>
                                <span className="text-gray-400">•</span>
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} className="text-gray-500" />
                                    <span className="text-gray-600">{location}</span>
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
                            <span className="text-blue-500 text-sm font-light ">{matchPercentage}% Match</span>
                            <span className="text-yellow-300">⚡</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {jobTypes.map((jobType, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-xs ${getJobTypeBackground(jobType.type)}`}
                            >
                                {jobType.label}
                            </span>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 my-3"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex flex-col md:flex-row gap-3 md:items-center">
                            <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                                <Clock size={16} />
                                <span>Posted {postedDaysAgo} days ago</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <Users size={16} />
                                <span>{applicantsCount} Applicants</span>
                            </div>
                        </div>

                        <button
                            onClick={onViewDetails}
                            className="flex items-center gap-1 text-[#0073E6] mt-2 md:mt-0 text-sm"
                        >
                            <span>View Details</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default function Home2() {
    const jobs: JobCardProps[] = [
        {
            companyLogo: "/images/Adobe.png?height=40&width=40",
            jobTitle: "Software Engineer (Backend)",
            companyName: "Adobe",
            location: "Los Gatos, CA",
            jobTypes: [
                { label: "Full Time", type: "fullTime" },
                { label: "Remote", type: "remote" },
                { label: "Software Development", type: "other", category: "development" },
            ],
            matchPercentage: 95,
            postedDaysAgo: 2,
            applicantsCount: 42,
            aiRecommendedJob: true,
            onViewDetails: () => console.log("View details for Adobe job"),
        },
        {
            companyLogo: "/images/Amazon.png?height=40&width=40",
            jobTitle: "Creative Director",
            companyName: "RazorPay",
            location: "San Francisco, CA",
            jobTypes: [
                { label: "Full Time", type: "fullTime" },
                { label: "Hybrid", type: "hybrid" },
                { label: "Design & Creatives", type: "other", category: "design" },
            ],
            matchPercentage: 92,
            postedDaysAgo: 3,
            applicantsCount: 37,
            aiRecommendedJob: false,
            onViewDetails: () => console.log("View details for RazorPay job"),
        },
        {
            companyLogo: "/images/Google.png?height=40&width=40",
            jobTitle: "Product Manager",
            companyName: "Google",
            location: "Mountain View, CA",
            jobTypes: [
                { label: "Onsite", type: "onsite" },
                { label: "Full Time", type: "fullTime" },
            ],
            matchPercentage: 90,
            postedDaysAgo: 1,
            applicantsCount: 58,
            aiRecommendedJob: false,
            onViewDetails: () => console.log("View details for Google job"),
        },
        {
            companyLogo: "/images/Facebook.png?height=40&width=40",
            jobTitle: "UI/UX Designer",
            companyName: "Facebook",
            location: "Menlo Park, CA",
            jobTypes: [
                { label: "Hybrid", type: "hybrid" },
                { label: "Part Time", type: "other", category: "design" },
            ],
            matchPercentage: 88,
            postedDaysAgo: 4,
            applicantsCount: 21,
            aiRecommendedJob: false,
            onViewDetails: () => console.log("View details for Facebook job"),
        },
        {
            companyLogo: "/images/Apple.png?height=40&width=40",
            jobTitle: "iOS Developer",
            companyName: "Apple",
            location: "Cupertino, CA",
            jobTypes: [
                { label: "Onsite", type: "onsite" },
                { label: "Contract", type: "other", category: "development" },
            ],
            matchPercentage: 91,
            postedDaysAgo: 5,
            applicantsCount: 34,
            aiRecommendedJob: false,
            onViewDetails: () => console.log("View details for Apple job"),
        },
        {
            companyLogo: "/images/Microsoft.png?height=40&width=40",
            jobTitle: "Cloud Solutions Architect",
            companyName: "Microsoft",
            location: "Redmond, WA",
            jobTypes: [
                { label: "Remote", type: "remote" },
                { label: "Full Time", type: "fullTime" },
                { label: "Cloud & DevOps", type: "other", category: "infrastructure" },
            ],
            matchPercentage: 93,
            postedDaysAgo: 1,
            applicantsCount: 47,
            aiRecommendedJob: true,
            onViewDetails: () => console.log("View details for Microsoft job"),
        },
    ]

    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-50 ${montserrat.className}`}>
            <div className="w-full max-w-3xl space-y-8">
                {jobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
        </main>
    )
}