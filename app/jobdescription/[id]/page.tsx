"use client";

import Footer from "../../components/LandingPage-New/footerNew";
import Nav from "../../components/LandingPage-New/nav";
import JoBDet from "../../components/job-display-new/job-desc";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Correct hook

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

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

export default function JobDisplayNew() {
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams(); // ✅ Gets the dynamic route params
  const id = params?.id as string;


  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`/api/job/getJobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "bd6b443f-222d-403d-8c3c-c55b4520d76a",
            userSkills: [
              "JavaScript",
              "React",
              "Node.js",
              "Java",
              "C",
              "c++",
              "Python",
              "c#",
              "Git",
              "SQL",
              "NoSQL",
              "Microservices",
            ],
            stream: "1",
            type: "jobs",
            jobId: id,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch job data: ${response.statusText}`);
        }

        const data = await response.json();
        setJob(data.job); // Update the job state with fetched data
      } catch (err) {
        console.error("Error fetching job data:", err);
        setError("Failed to load job data. Please try again later.");
      }
    };

    fetchJobData();
  }, [id]);


  return (
    <div className="font-sora">
      <div>
        <Nav />
      </div>
      <div className="mt-3">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : job ? (
          <JoBDet job={job} /> // Pass the job object to the JoBDet component
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="mt-1">
        <Footer />
      </div>
    </div>
  );
}