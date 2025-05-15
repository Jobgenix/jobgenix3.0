import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClientOnly from "../../components/client-only/clientOnly";
import { useSession } from "next-auth/react";
import { GoShareAndroid } from "react-icons/go";
import { toast } from "sonner";

interface Job {
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  jobId: string;
  jobLocation: string[];
  jobType: "office" | "remote" | "hybrid"; // extend as needed
  jobLink: string;
  requireSkils: string;
  description: string;
  matchingSkills: string[];
  jobgenixSuggestion: boolean;
  match: string; // keep as string like "28.6%" or change to number if needed
}

export default function JoBDet({ job }: { job: Job }) {
  const { status } = useSession();

    const handleShare = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[300px_1fr] gap-4">
        {/* Job Card */}
        <div
          className="bg-[#F5F5F5] rounded-xl p-5 shadow-sm h-fit "
          style={{
            boxShadow:
              "1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(200, 200, 200, 0.50) inset, -6px 6px 12px 0px rgba(200, 200, 200, 0.20), 6px -6px 12px 0px rgba(200, 200, 200, 0.20), -6px -6px 12px 0px rgba(255, 255, 255, 0.90), 6px 6px 15px 0px rgba(200, 200, 200, 0.90)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                <path d="M12 7c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1h3c.6 0 1-.4 1-1s-.4-1-1-1h-2V8c0-.6-.4-1-1-1z" />
              </svg>
              Just Now
            </span>
            <div className="flex gap-2 items-center">
              <button onClick={handleShare} className="text-gray-500">
                <GoShareAndroid />
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 relative">
              <Image
                src={job.companyLogo}
                fill
                alt="logo-google"
                className="object-cover"
              />
            </div>
          </div>

          <h1 className="text-center font-semibold text-lg mb-1">
            {job.jobTitle}
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            {job.companyName}
          </p>

          <div className="flex justify-between mb-4">

            {job.match >= "20%" ? ("Your match is ") : (
              <div
                className="flex items-center gap-1  bg-[#F4F4F5] text-black px-2 py-1 rounded-full text-[9px] "
                style={{
                  boxShadow:
                    "1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(200, 200, 200, 0.50) inset, -6px 6px 12px 0px rgba(200, 200, 200, 0.20), 6px -6px 12px 0px rgba(200, 200, 200, 0.20), -6px -6px 12px 0px rgba(255, 255, 255, 0.90), 6px 6px 15px 0px rgba(200, 200, 200, 0.90)",
                }}
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <Image
                  src="/images2/Jobgenix Logo.png"
                  height={40}
                  width={40}
                  alt="logo-jobgenix"
                />
                <span className="font-bold"> Ai Recommended</span>
              </div>
            )}



            <div
              className="flex items-center gap-1 bg-[#F4F4F5] text-green-600 px-2 py-1 rounded-full text-[9px] "
              style={{
                boxShadow:
                  "1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(200, 200, 200, 0.50) inset, -6px 6px 12px 0px rgba(200, 200, 200, 0.20), 6px -6px 12px 0px rgba(200, 200, 200, 0.20), -6px -6px 12px 0px rgba(255, 255, 255, 0.90), 6px 6px 15px 0px rgba(200, 200, 200, 0.90)",
              }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="font-bold">{job.match}</span>
            </div>
          </div>

          <div className="border-t border-b py-3 mb-4">
            <p className="text-sm text-gray-500 mb-2">Matched Skill(s)</p>
            <div className="flex flex-wrap gap-2">
              {job.matchingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                  style={{
                    boxShadow:
                      "1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(200, 200, 200, 0.50) inset, -6px 6px 12px 0px rgba(200, 200, 200, 0.20), 6px -6px 12px 0px rgba(200, 200, 200, 0.20), -6px -6px 12px 0px rgba(255, 255, 255, 0.90), 6px 6px 15px 0px rgba(200, 200, 200, 0.90)",
                  }}
                >
                  <CheckCircle className="w-3 h-3" />
                  {skill}
                </span>
              ))}

              {/* <span className="bg-linear-to-r from-[#] to-blue-500 text-gray-600 px-3 py-1 rounded-full text-xs"  style={{ boxShadow: "1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(200, 200, 200, 0.50) inset, -6px 6px 12px 0px rgba(200, 200, 200, 0.20), 6px -6px 12px 0px rgba(200, 200, 200, 0.20), -6px -6px 12px 0px rgba(255, 255, 255, 0.90), 6px 6px 15px 0px rgba(200, 200, 200, 0.90)" }}>Interaction Design</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs"  style={{ boxShadow: "1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(200, 200, 200, 0.50) inset, -6px 6px 12px 0px rgba(200, 200, 200, 0.20), 6px -6px 12px 0px rgba(200, 200, 200, 0.20), -6px -6px 12px 0px rgba(255, 255, 255, 0.90), 6px 6px 15px 0px rgba(200, 200, 200, 0.90)" }}>Prototyping</span> */}
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mb-4">+ More</div>

          <div className="flex gap-2">
            <button className="bg-blue-600 text-white h-8 rounded-full py-2 px-2 text-xs font-medium flex-1">
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
            <button className="bg-blue-600 text-white border h-8 border-blue-600  rounded-full py-1 px-4  text-xs font-medium flex-1">
              Get Referral
            </button>
          </div>
        </div>

        {/* Job Details */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm max-w-3xl"
          style={{
            boxShadow:
              "1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(200, 200, 200, 0.50) inset, -6px 6px 12px 0px rgba(200, 200, 200, 0.20), 6px -6px 12px 0px rgba(200, 200, 200, 0.20), -6px -6px 12px 0px rgba(255, 255, 255, 0.90), 6px 6px 15px 0px rgba(200, 200, 200, 0.90)",
          }}
        >
          {/* <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">About the Company</h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Scelerisque mus nunc ultricies viverra tincidunt eu cum. Auctor
              elementum nunc in amet. Amet nunc amet aliquot neque neque egestas cursus. Fames cursus.
            </p>
          </div> */}

          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Job Description</h2>
            <ClientOnly>
              <p
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </ClientOnly>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Requirements</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
              <li>{job.requireSkils}</li>
            </ol>
          </div>

          {/* <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Contact Details</h2>
            <p className="text-sm text-gray-600 max-w-2xl">
              <Link className="break-words overflow-hidden inline-block max-w-full underline" href={job.jobLink}>{job.jobLink}</Link>
            </p>
          </div> */}
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="mt-6 max-w-5xl mx-auto bg-[#0060c0] rounded-xl p-0 h-48 text-white relative overflow-hidden">
        {/* Background images */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images2/blue-card.png"
            alt="frame98"
            fill
            className="object-cover opacity-50 "
          />
        </div>

        {/* Text content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-xl">Your Journey&apos;s Just Getting Started</h1>
          <button className="border border-white w-44 mt-10 rounded-full h-8">
            Explore more jobs
          </button>
        </div>
      </div>
    </div>
  );
}
