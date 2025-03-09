"use client";
/*eslint-disable*/
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { useSearchParams } from "next/navigation";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { PiBagBold } from "react-icons/pi";
import { useRouter } from "next/navigation";

import { MdOutlineHome } from "react-icons/md";
import {
  MoreHorizontal,
  Share2,
  ShieldCheck,
  Users,
  Briefcase,
  Home,
  ArrowLeftRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { capitalizeWords } from "@/utils/stringUtility";
import JobDetailsSkeleton from "../skeletons/job-details-skeleton";
import { toast } from "sonner";
import { CompanyType } from "@/types/companyType";
import { Opportunity } from "@/types/opportunityType";
import { Navbar } from "../LandingPageComponents/navbar";
import router from "next/router";

type JobDetailsProps = {
  jobDetails:
  | {
    companies: CompanyType;
    opportunities: Opportunity;
  }
  | undefined;
  isLoadingDetails: boolean;
};

export default function JobDetails({
  jobDetails,
  isLoadingDetails,
}: JobDetailsProps) {
  if (isLoadingDetails || !jobDetails) {
    return <JobDetailsSkeleton />;
  }

  const router = useRouter(); // Correct import

  const searchParams = useSearchParams();
  const jobIdUrl = searchParams.get("id");

  // console.log("Jobid : ", jobIdUrl);

  if (jobDetails && Object.keys(jobDetails!).length) {


    const { name, logo } = jobDetails.companies;

    const {
      title,
      location,
      workplaceType,
      type,
      postedAt,
      status,
      jobLink,
      description,
      id,
    } = jobDetails.opportunities;
    const isVerified = status === "active";

    const formatTimeAgo = (datestring: string) => {
      // In a real app, implement proper time ago formatting
      return "2 Hours ago";
    };



    return (
      <>
        <Card className={`w-[67%] hidden lg:block mx-auto h-screen bg-[#E5F7EB] overflow-auto custom-scrollbar shadow-lg shadow-black/20 rounded-md ${jobIdUrl ? 'hidden' : 'lg:block'}`}>
          <CardHeader className="space-y-4">
            <div className="flex justify-between items-start">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${name} logo`}
                width={52}
                height={52}
                className="object-contain"
              />

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${typeof window !== "undefined"
                        ? window.location.origin
                        : ""
                      }/opportunities/?id=${id}`
                    );
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Share2 className="h-8 w-8" />
                </Button>
                <Button variant="ghost">
                  <MoreHorizontal className="h-32 w-32" />
                </Button>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-wide text-black/60 flex items-center gap-2">
              {title}
              {isVerified && <ShieldCheck className="h-9 w-9 text-blue-500" />}
            </h1>
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-base font-bold text-muted-foreground">
                <span>{capitalizeWords(location)}</span>
                <span className="text-emerald-600">
                  • {formatTimeAgo(postedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {/* update this with actual count */}
                  {35} people clicked apply
                </span>
              </div>

              <div className="flex flex-wrap gap-2 font-bold text-black/60">
                {workplaceType === "office" && <Briefcase className="h-6 w-6" />}
                {workplaceType === "remote" && <Home className="h-6 w-6" />}
                {workplaceType === "hybrid" && (
                  <ArrowLeftRight className="h-6 w-6" />
                )}
                <Badge
                  variant="secondary"
                  className="bg-[#AAFEC4] text-black/50 hover:bg-emerald-100 rounded-none px-3 text-base tracking-wide capitalize"
                >
                  {capitalizeWords(workplaceType)}
                </Badge>
                • {type}
              </div>
            </div>

            <div className="flex gap-5 mt-8">
              <Link href={jobLink} passHref legacyBehavior>
                <a target="_blank">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full  text-lg font-medium px-6 shadow-md shadow-black/30">
                    Apply
                  </Button>
                </a>
              </Link>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white border border-[#01A768] text-[#01A768] hover:bg-emerald-700 rounded-full  text-lg font-medium px-6 shadow-md shadow-black/30"
              >

                Referral Person (Coming Soon)
                <Users className="h-4 w-4" />
              </Button>

            </div>

            {/* <div className="flex items-center justify-between bg-green-100 text-green-700 rounded-full p-2 w-full max-w-md shadow-md">
            <span className="font-semibold text-sm ml-4">Your resume is matching the required qualifications</span>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full">
              Get Started
            </button>
          </div> */}

          </CardHeader>

          <CardContent className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-xl font-medium">About the job</h2>

              <div
                className="space-y-4"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </section>
          </CardContent>
        </Card>

        <div className={`fixed inset-0 flex flex-col bg-white z-20  ${jobIdUrl ? 'lg:hidden' : 'hidden'}`}>

          <Navbar />
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center py-4">
              <MdKeyboardArrowLeft
                size={32}
                className="cursor-pointer"
                onClick={() => router.push('/opportunities?type=internships')}
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
              <div className="bg-[#01a768] text-center w-72 h-20 p-2 rounded-full flex items-center justify-center">
                <h1 className="text-white  text-xl font-semibold">{name}</h1>
              </div>
              <div className="absolute top-14 flex items-center justify-center bg-white w-16 h-16 rounded-full shadow-lg border-4 border-white">
                <img
                  src={logo || "/placeholder.svg"}
                  alt={`${name} logo`}
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>

            {/* Job Details */}
            <div className="text-center mt-12">
              <h1 className="text-2xl font-semibold">{title}</h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <CiLocationOn size={24} />
                <p className="text-lg font-medium text-gray-600">{capitalizeWords(location)}</p>
              </div>
            </div>

            {/* Job Type & Location */}
            <div className="flex justify-center gap-4 mt-6">
              <div className="border rounded-xl p-4 w-40 text-center">
                <div className="bg-green-200 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                  <PiBagBold size={24} />
                </div>
                <p className="text-gray-500 text-sm mt-2">Job Type</p>
                <h1 className="text-lg font-semibold">{type}</h1>
              </div>

              <div className="border rounded-xl p-4 w-40 text-center">
                <div className="bg-green-200 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                  <MdOutlineHome size={24} />
                </div>
                <p className="text-gray-500 text-sm mt-2">Job Location</p>
                <h1 className="text-lg font-semibold">{capitalizeWords(location)}</h1>
              </div>
            </div>

            {/* About the Job */}
            <div className="mt-8">
              <h1 className="text-2xl font-semibold">About the job</h1>
              <div
                className="space-y-4"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>

          {/* Bottom Buttons - Fixed at Bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex justify-center gap-4 shadow-md">
            <button className="h-12 w-36 sm:w-40 rounded-lg bg-gray-200 text-black font-medium">
              1157+ Applicants
            </button>
            <Link href={jobLink || "#"} passHref legacyBehavior>
              <a target="_blank">
                <button className="h-12 w-36 sm:w-40 rounded-lg bg-[#01a768] text-white font-medium flex items-center justify-center gap-2">
                  Apply Now <MdKeyboardArrowRight size={20} />
                </button>
              </a>
            </Link>
          </div>
        </div>

      </>


    );
  }
}
