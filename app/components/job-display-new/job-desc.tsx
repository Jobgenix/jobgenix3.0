import { Bookmark, Check, MapPin, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ClientOnly from "../../components/client-only/clientOnly";

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
  match: string; // keep as string like "28.6%" or change to number if needed
}

export default function JoBDet({ job }: { job: Job }) {
  const { status } = useSession();
  return (
    <div className=" min-h-screen font-montserrat">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-y-5 gap-x-16">
        {/* Job Card */}
        <div className="max-w-[28.9rem] w-full bg-[#F5F5F5] rounded-xl py-[1.14rem] px-[1.1rem] shadow-sm flex flex-col items-center gap-4 h-fit sm:mt-11 lg:mt-36 card-shadow">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between w-full mb-2">
              <span className="opacity-[70%] flex flex-col sm:flex-row items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[1.2rem] h-[1.2rem]"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                  <path d="M12 7c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1h3c.6 0 1-.4 1-1s-.4-1-1-1h-2V8c0-.6-.4-1-1-1z" />
                </svg>
                Just Now
              </span>
              <div className="flex gap-2">
                <button
                  className="opacity-[70%] flex items-center"
                  onClick={async () => {
                    // Construct your site job link
                    const jobPageUrl = `${window.location.origin}/jobdescription/${job.jobId}`;
                    await navigator.clipboard.writeText(jobPageUrl);
                    // Show toast
                    if (typeof window !== "undefined") {
                      const toast = document.createElement("div");
                      toast.textContent = "Copied the link!";
                      toast.style.position = "fixed";
                      toast.style.bottom = "2rem";
                      toast.style.left = "50%";
                      toast.style.transform = "translateX(-50%)";
                      toast.style.background = "#333";
                      toast.style.color = "#fff";
                      toast.style.padding = "0.75rem 1.5rem";
                      toast.style.borderRadius = "9999px";
                      toast.style.zIndex = "9999";
                      toast.style.fontSize = "1rem";
                      toast.style.opacity = "0.95";
                      document.body.appendChild(toast);
                      setTimeout(() => {
                        toast.remove();
                      }, 1500);
                    }
                  }}
                  title="Copy job link"
                  type="button"
                >
                  <Share2 className="h-5 w-auto" />
                </button>
                <Bookmark className="h-5 w-auto" />
              </div>
            </div>

            <div className="sm:mt-[-14px] space-y-4">
              <div className="flex justify-center ">
                <div className="size-[3.33rem] relative">
                  <Image
                    src={job.companyLogo}
                    fill
                    alt="logo-google"
                    className="object-cover"
                  />
                </div>
              </div>
              <h1 className="text-center text-xl font-bold">{job.jobTitle}</h1>
            </div>
          </div>
          <div className="text-center text-sm font-medium opacity-[70%] flex items-center gap-1 mt-1 mb-2">
            {job.companyName}
            <span className="rounded-full size-1 bg-black"></span>
            <MapPin className="h-5 w-auto" />
            {job.jobLocation}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {job.match >= "20%" ? (
              "Your match is "
            ) : (
              <div className="flex items-center gap-2 bg-[#F4F4F5] text-black py-[0.7rem] px-[0.95rem] rounded-3xl card-shadow">
                <span className="w-2 h-2 bg-[#0073E6] shadow-amber-950 shadow-2xl rounded-full"></span>
                <Image
                  src="/brand/jobGenix-black-blue.svg"
                  height={40}
                  width={40}
                  alt="logo-jobgenix"
                  className="h-auto w-16"
                />
                <span className="text-xs font-bold"> Ai Recommended</span>
              </div>
            )}

            <div className="flex items-center gap-2 bg-[#F4F4F5] py-[0.7rem] px-[0.95rem] rounded-3xl card-shadow">
              <span className="w-2 h-2 bg-[#2E8B57] rounded-full"></span>
              <span className="font-bold text-xs">{job.match} Match Score</span>
            </div>
          </div>

          <hr
            className="w-[75%] opacity-[50%] mb-3 mt-4"
            style={{
              borderImageSource:
                "linear-gradient(90deg, rgba(153,153,153,0) 0%, rgba(99,99,99,0.528846) 10.58%, #333333 50%, rgba(99,99,99,0.53) 90.38%, rgba(153,153,153,0) 100%)",
              borderImageSlice: 1,
            }}
          />

          {/* more button  */}
          <div className="flex gap-2 mb-3">
            <button className="bg-blue-600 card-shadow text-white rounded-3xl py-[0.6rem] px-[0.95rem] text-base font-medium">
              {status === "authenticated" ? (
                <Link href={job.jobLink} className="text-white">
                  Apply Now
                </Link>
              ) : (
                <Link href="/login" className="text-white">
                  Register to Apply
                </Link>
              )}
            </button>
            <button className="bg-blue-600 card-shadow text-white border border-blue-600 rounded-3xl py-[0.6rem] px-[0.95rem] text-base font-medium">
              Get Referral
            </button>
          </div>
        </div>

        {/* Job Details */}

        {/* <div className="max-w-[37.1rem] bg-white rounded-xl py-11 px-12 shadow-sm card-shadow">
          <div className="mb-6">
            <h2 className="font-bold text-xl mb-3">Job Description</h2>
            <ClientOnly>
              <p
                className="text-base"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </ClientOnly>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-3">Requirements</h2>
            <ol className="list-decimal pl-5 space-y-2 text-base">
              <li>{job.requireSkils}</li>
            </ol>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-3">Required Skills</h2>
            <p className="text-base">{job.requireSkils}</p>
          </div>
        </div> */}

        <div className="max-w-[37.1rem] bg-white rounded-xl py-11 px-12 shadow-sm card-shadow">
          <div className="mb-6">
            <h2 className="font-bold text-xl mb-3">About the job</h2>
            <ClientOnly>
              <div
                className="text-base prose prose-ul:list-disc prose-ol:list-decimal prose-li:ml-6"
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  );
}
