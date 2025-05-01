import Footer from "../../components/LandingPage-New/footerNew";
import Nav from "../../components/LandingPage-New/nav";
import JoBDet from "../../components/job-display-new/job-desc";

export default async function JobDisplayNew({
  params,
}: {
  params: { id?: string };
}) {
  const id = params.id;

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

  // Initialize job with default values
  let job: Job = {
    companyName: "",
    companyLogo: "",
    jobTitle: "",
    jobId: "",
    jobLocation: [],
    jobType: "office",
    jobLink: "",
    requireSkils: "",
    description: "",
    matchingSkills: [],
    jobgenixSuggestion: false,
    match: "",
  };

  try {
    const response = await fetch(`http://localhost:3000/api/job/getJobs`, {
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
        jobId: `${id}`,
      }),
    });
    const data = await response.json();
    job = data.job; // Assign the fetched job data
    console.log("Job data:", job);
  } catch (error) {
    console.error("Error fetching job data:", error);
  }

  return (
    <div className="font-sora">
      <div className="">
        <Nav />
      </div>
      <div className="mt-3">
        <JoBDet job={job} /> {/* Pass the job object */}
      </div>

      <div className="mt-1">
        <Footer />
      </div>
    </div>
  );
}
