"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { PiBagBold } from "react-icons/pi";
import { capitalizeWords } from "@/utils/stringUtility";
import { MdOutlineHome } from "react-icons/md";
import Link from "next/link";
import { CompanyType } from "@/types/companyType";
import { Opportunity } from "@/types/opportunityType";
import { Navbar } from "@/app/components/LandingPageComponents/navbar";

export default function JobDetailsMobile() {
    const router = useRouter();
    const params = useParams();
    const jobId = params.id;
    const { data: session } = useSession();

    const [job, setJob] = useState<{ companies: CompanyType; opportunities: Opportunity; } | null>(null);

    useEffect(() => {
        if (!jobId) return;

        const fetchJobDetails = async () => {
            try {
                const response = await axios.post("/api/job/get-jobs", {
                    userId: session?.user?.id,
                    jobId: jobId,
                });

                if (response.data.job) {
                    setJob(response.data.job);
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
                toast.error("Failed to load job details");
            }
        };

        fetchJobDetails();
    }, [jobId, session?.user?.id]);

    if (!job) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }


    return (
        <div className="fixed inset-0 flex flex-col bg-white z-20">
            <Navbar />

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-20">
                {/* Header */}
                <div className="flex justify-between items-center py-4">
                    <MdKeyboardArrowLeft
                        size={32}
                        className="cursor-pointer"
                        onClick={() => router.back()}
                    />
                    <h1 className="text-2xl font-semibold">Details</h1>
                    <button
                        onClick={() => {
                            const jobUrl = `${window.location.href}`;
                            const textArea = document.createElement("textarea");
                            textArea.value = jobUrl;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand("copy"); // ✅ Works on older browsers too
                            document.body.removeChild(textArea);
                            toast.success("Copied to clipboard!");
                        }}
                    >
                        <IoShareSocialOutline size={28} />
                    </button>

                </div>

                {/* Company Info */}
                <div className="relative flex flex-col items-center mt-6">
                    <div className="bg-[#01a768] w-68 h-20 p-2 rounded-full flex items-center justify-center">
                        <h1 className="text-white text-xl font-semibold">{job.companies.name}</h1>
                    </div>
                    <div className="absolute top-14 flex items-center justify-center bg-white w-16 h-16 rounded-full shadow-lg border-4 border-white">
                        <img
                            src={job.companies.logo || "/placeholder.svg"}
                            alt={`${job.companies.name} logo`}
                            className="w-10 h-10 object-contain"
                        />
                    </div>
                </div>

                {/* Job Details */}
                <div className="text-center mt-12">
                    <h1 className="text-2xl font-semibold">{job.opportunities.title}</h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <CiLocationOn size={24} />
                        <p className="text-lg font-medium text-gray-600">{capitalizeWords(job.opportunities.location)}</p>
                    </div>
                </div>

                {/* Job Type & Location */}
                <div className="flex justify-center gap-4 mt-6">
                    <div className="border rounded-xl p-4 w-40 text-center">
                        <div className="bg-green-200 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                            <PiBagBold size={24} />
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Job Type</p>
                        <h1 className="text-lg font-semibold">{job.opportunities.type}</h1>
                    </div>

                    <div className="border rounded-xl p-4 w-40 text-center">
                        <div className="bg-green-200 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                            <MdOutlineHome size={24} />
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Job Location</p>
                        <h1 className="text-lg font-semibold">{capitalizeWords(job.opportunities.location)}</h1>
                    </div>
                </div>

                {/* About the Job */}
                <div className="mt-8">
                    <h1 className="text-2xl font-semibold">About the job</h1>
                    <div
                        className="space-y-4"
                        dangerouslySetInnerHTML={{ __html: job.opportunities.description }}
                    />
                </div>
            </div>

            {/* Bottom Buttons - Fixed at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex justify-center gap-4 shadow-md">
                <button className="h-12 w-36 sm:w-40 rounded-lg bg-gray-200 text-black font-medium">
                    1157+ Applicants
                </button>
                <Link href={job.opportunities.jobLink || "#"} passHref legacyBehavior>
                    <a target="_blank">
                        <button className="h-12 w-36 sm:w-40 rounded-lg bg-[#01a768] text-white font-medium flex items-center justify-center gap-2">
                            Apply Now <MdKeyboardArrowRight size={20} />
                        </button>
                    </a>
                </Link>
            </div>
        </div>
    );
}
