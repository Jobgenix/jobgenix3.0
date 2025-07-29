"use client";

import { useJobStore } from "@/app/_store/oppJobStore";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface CompanyCardProps {
  companyLogo: string;
  jobTitle: string;
  rating?: number;
  totalRatings?: number;
  description?: string;
  jobLink: string;
  index: number;
  jobId: string;
}

const CompanyCard = ({
  companyLogo,
  jobTitle,
  rating,
  totalRatings,
  description,
  jobLink,
  index,
  jobId,
}: CompanyCardProps) => {
  return (
    <Card className="flex-none h-[162px] md:h-[353px] w-[252px] md:w-[300px] mt-4 rounded-[1.9rem] bg-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105">
      <CardContent className="p-0 h-full w-full ">
        <div
          className={`p-5 md:p-6  h-full flex flex-col  items-baseline md:items-center justify-between rounded-[1.9rem] relative text-xl 
            ${
              index === 0
                ? "bg-[#0A5DBC]"
                : index === 1
                ? "bg-[#00205b]"
                : index === 2
                ? "bg-[#971C26]"
                : "bg-[#0A5DBC]"
            }`}
        >
          <Image
            src={companyLogo || "/placeholder.svg"}
            alt={`${name} logo`}
            width={80}
            height={80}
            className=" w-[6.7rem] md:w-36"
          />
          <div className="flex md:flex-col flex-col-reverse items-baseline md:items-center">
            <h6 className=" text-white text-center leading-7 text-sm md:text-xl font-bold">
              {jobTitle}
            </h6>
            <div className="flex items-center font-montserrat font-medium text-base">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-white ml-1 italic">
                ({(rating || Math.random() * 1 + 3).toFixed(1)}){" "}
                {totalRatings || Math.floor(Math.random() * 100) + 50} + Jobs
              </span>
            </div>
          </div>
          {/* <p className="hidden md:block text-white font-medium italic text-center text-base leading-tight min-h-[40px]">
          {description}
          </p> */}
          <Link href={`/jobdescription/${jobId}`}>
            <Button
              variant="secondary"
              size="sm"
              className=" px-4 py-2 md:py-5  rounded-full font-medium text-[0.83rem] md:text-base leading-[1.4rem] "
            >
              Apply Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default function JobSearchHero() {
  const jobListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const handleScroll = () => {
    if (jobListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = jobListRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScrollLeft = () => {
    if (jobListRef.current) {
      jobListRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (jobListRef.current) {
      jobListRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const currentRef = jobListRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (uploadMessage) {
      const timer = setTimeout(() => setUploadMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadMessage]);

  // const companies = [
  //   {
  //     logo: "/LandingPageImages/spotify.png?height=40&width=40",
  //     name: "Early Career Manager",
  //     rating: 4.5,
  //     totalRatings: 28,
  //     description: "Your career playlist starts here.",
  //     link: "https://jobgenix-test.vercel.app/jobdescription/6e14161f-2c0b-459e-b364-832de3cd6c67",
  //   },
  //   {
  //     logo: "/LandingPageImages/airbus.png?height=40&width=40",
  //     name: "Research Intern",
  //     rating: 4.6,
  //     totalRatings: 26,
  //     description: "Design tomorrow's experiences for millions.",
  //     link: "https://jobgenix-test.vercel.app/jobdescription/b840244c-7a76-4fa2-ba49-e5babfdd1e8f",
  //   },
  //   {
  //     logo: "/LandingPageImages/zomato.png?height=40&width=40",
  //     name: "Data Analyst",
  //     rating: 4.7,
  //     totalRatings: 25,
  //     description: "Feed your career with endless opportunities.",
  //     link: "https://jobgenix-test.vercel.app/jobdescription/12ce3fd6-90ff-4bed-ab5b-033e01be4946",
  //   },
  //   {
  //     logo: "/LandingPageImages/razorpay.png?height=40&width=40",
  //     name: "Intern - SEO",
  //     rating: 4.8,
  //     totalRatings: 24,
  //     description: "Empowering businesses, one payment at a time.",
  //     link: "https://jobgenix-test.vercel.app/jobdescription/c1fae9fe-a581-41a1-996b-32598fc16447",
  //   },
  // ];

  const { data: session } = useSession(); // Get user session data

  const userId = session?.user?.id; // Get user ID from session
  const addJobs = useJobStore((state) => state.addJobs);

  useEffect(
    () => {
      const fetchJobs = async () => {
        try {
          const response = await fetch("/api/job/getJobs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId?.toString(),
              userSkills: ["JavaScript", "React", "Node.js"],
              stream: "1",
              type: "jobs",
              limit: "4",
            }),
          });

          const data = await response.json();
          addJobs(data.jobs); // Add jobs to global state
          console.log(data);
        } catch (error) {
          console.error("Failed to fetch jobs:", error);
        }
      };

      fetchJobs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  ); // Fetch jobs when userId changes

  const jobs = useJobStore((state) => state.jobs); // Global state
  // console.log(jobs); // Log the jobs data

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1. Get signed upload credentials from your API
      const signedResponse = await fetch("/api/uploadcv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileType: file.type,
          // userId: userId, // If you want to associate with a user
        }),
      });

      const signedData = await signedResponse.json();
      if (!signedResponse.ok || !signedData.success) {
        throw new Error(
          signedData.message || "Failed to get upload credentials"
        );
      }

      // 2. Upload file to Cloudinary
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("api_key", signedData.api_key);
      uploadFormData.append("timestamp", signedData.timestamp);
      uploadFormData.append("signature", signedData.signature);
      uploadFormData.append("folder", signedData.folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signedData.cloud_name}/upload`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error?.message || "Upload failed");
      }

      // 3. (Optional) Save the Cloudinary URL to your DB
      // await fetch("/api/uploadcv", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     resumeUrl: uploadData.secure_url,
      //     // userId: userId,
      //   }),
      // });

      setUploadMessage("Resume uploaded successfully! ✅");
    } catch (err) {
      setUploadMessage((err as Error).message || "Upload failed!");
    }
  };

  return (
    <div className="max-w-screen mx-auto px-4 mt-8 md:mt-20 py-20 bg-transparent font-montserrat ">
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-3xl md:text-[2.5rem] leading-7 font-semibold mb-3 md:mb-6 font-sora">
          Type It. <span className="text-blue-500">Upload It.</span> Get Hired.
        </h1>

        <div className="relative max-w-xl md:w-4/5 md:max-w-[60.9rem] mx-auto mb-2">
          <Input
            type="text"
            placeholder="Dream job? Type it in ✨"
            className="pl-4 pr-10 py-4 sm:py-6 lg:py-8 lg:pl-5 md:w-full rounded-full bg-[#EAEAEA] border-[#9DCEFF] focus:outline-none md:text-lg md:placeholder:text-lg"
          />
          <Search
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="font-montserrat font-medium text-[0.8rem] sm:text-xl space-x-1 mb-4">
          <span> Or</span>
          <span
            onClick={triggerFileInput}
            className="cursor-pointer text-blue-600 underline hover:text-blue-800"
          >
            Upload Resume
          </span>
          {uploadMessage && (
            <div
              className={`fixed inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50 font-sora`}
            >
              <div className="bg-white border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg font-semibold">
                {uploadMessage}
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
          <span className="hidden md:inline">and let our</span>

          <Image
            width={500}
            height={500}
            src="/images2/JobGenix Logo.png"
            alt="JobGenix Logo"
            className="w-[6.7rem] h-auto hidden md:inline -mt-1"
          />

          <span className="hidden md:inline"> AI ✨ find it for you.</span>
        </div>
      </div>

      {/* section 2- top companies hiring  */}
      <div className="mt-12 md:mt-32 relative">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-sora text-center mb-6 sm:mb-9">
          Top Companies Actively Hiring
        </h2>
        {/* <p className="text-xs sm:text-sm text-gray-600 justify-center flex-wrap flex gap-2 mb-6">
          Upload your CV and find your perfect match
        </p> */}

        <div className="relative flex items-center ">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <ChevronLeft className="text-gray-500" size={20} />
            </button>
          )}

          {/* Scrollable Job List - Fixed margin on mobile */}
          <div
            ref={jobListRef}
            className="flex flex-row gap-4 scrollbar-hide overflow-x-auto scroll-smooth scrollbar-hide mx-auto"
          >
            {jobs?.map((company, index) => (
              <CompanyCard key={index} {...company} index={index} />
            ))}
          </div>
          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={handleScrollRight}
              className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <ChevronRight className="text-gray-500" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
