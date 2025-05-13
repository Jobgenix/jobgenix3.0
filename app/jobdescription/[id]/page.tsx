"use client";

import Footer from "../../components/LandingPage-New/footerNew";
import Nav from "../../components/LandingPage-New/nav";
import JoBDet from "../../components/job-display-new/job-desc";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

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

            console.log("User skills fetched:", typeof(userSkills));
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
            userId: session?.user?.id.toString() ,
            userSkills :userSkills,
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
  }, [status, id]);

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
    <div className="font-sora">
      <Nav />
      <div className="mt-3">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : job ? (
          <JoBDet job={job} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
