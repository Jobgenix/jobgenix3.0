"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import JoBDet from "../../components/job-display-new/job-desc";
import Nav from "../../components/LandingPage-New/nav";
import YourJourneyBanner from "../../components/YourJourneyBanner";

interface Job {
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  jobId: string;
  jobLocation: string[];
  jobType: "office" | "remote" | "hybrid";
  jobLink: string;
  requireSkils: string;
  description: string;
  matchingSkills: string[];
  jobgenixSuggestion: boolean;
  match: string;
}

export default function JobDisplayNew() {
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { status, data: session } = useSession();
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  useEffect(() => {
    const fetchJobData = async () => {
      let userSkills: string[] = [];

      // ✅ If authenticated, fetch the user's skills
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/profileInfo");
          if (res.ok) {
            const data = await res.json();
            userSkills = data.skills.split(",") || [];

            console.log("User skills fetched:", typeof userSkills);
            console.log("User skills fetched:", userSkills);
          } else {
            console.warn("Failed to fetch skills, continuing with empty array");
          }
        } catch (err) {
          console.error("Error fetching user skills:", err);
        }
      }

      try {
        const response = await fetch(`/api/job/getJobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user?.id.toString(),
            userSkills: userSkills,
            jobId: id,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch job data: ${response.statusText}`);
        }

        const data = await response.json();
        setJob(data.job);
      } catch (err) {
        console.error("Error fetching job data:", err);
        setError("Failed to load job data. Please try again later.");
      }
    };

    // Only run when login state is known
    if (status !== "loading" && id) {
      fetchJobData();
    }
  }, [status, id, session?.user?.id]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sora bg-[#F5F5F5] ">
      <Nav onLoginClick={() => router.push("/login")} />
      <div className="mt-3 p-6">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : job ? (
          <JoBDet job={job} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-24 w-24 border-8 border-blue-500 border-t-transparent border-solid mb-6 shadow-lg"></div>
            <p className="text-2xl font-semibold text-gray-700 mt-2">Loading...</p>
          </div>
        )}
      </div>
      <div className="my-24 p-4 flex justify-center">
        <YourJourneyBanner />
      </div>
      <Footer />
    </div>
  );
}
