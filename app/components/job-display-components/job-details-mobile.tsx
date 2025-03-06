// "use client";

// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { IoShareSocialOutline } from "react-icons/io5";
// import { CiLocationOn } from "react-icons/ci";
// import { PiBagBold } from "react-icons/pi";
// import { MdOutlineHome } from "react-icons/md";

// export default function JobDetailsMobile() {
//   const data = {
//     companyName: "Google INC",
//     jobs: "Software Engineer",
//     location: "kolkata , India",
//     type: "Full-time",
//     loctype: "Remote",
//     details: "",
//     responsibilities: "",
//   };
//   const copyToClipboard = () => {
//     const url = window.location.href;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => alert("URL copied to clipboard!"))
//       .catch((err) => console.error("Failed to copy URL:", err));
//   };
//   return (
//     <div className="sm:hidden block h-screen w-full ">
//       <div className="head flex  space-x-36 ml-8 mt-12">
//         <MdKeyboardArrowLeft size={50} className="mt-3 absolute left-4 " />
//         <h1 className="text-4xl mt-4 font-semibold">Details</h1>
//         <button onClick={copyToClipboard}>
//           <IoShareSocialOutline size={40} className="mt-2 " />
//         </button>
//       </div>
//       <div className="company-desc h-40 w-[80%] ml-20 mt-16 bg-[#01a768] rounded-[50px]">
//         <h1 className="text-white text-3xl font-semibold text-center p-12 ml-2">
//           {data.companyName}
//         </h1>
//         <div className="logo h-28 w-28 bg-green-200 rounded-full border-white border-[5px] ml-[28%] absolute top-72"></div>
//       </div>

//       <div className="desc mt-16 ">
//         <h1 className=" ml-28 text-3xl font-semibold">{data.jobs}</h1>

//         <div className="flex items-center gap-2 mt-4 ml-36">
//           <CiLocationOn size={30} />
//           <p className="text-xl font-semibold text-gray-500">{data.location}</p>
//         </div>
//       </div>
//       <div className="btn1 flex flex-wrap gap-4 justify-center ml-8 mt-12">
//         <button className="h-24 w-40 sm:h-20 sm:w-48 border rounded-xl border-green-500 p-3 pt-2">
//           <div className="logo h-12 w-12 sm:h-12 sm:w-14 bg-green-300 rounded-full mt-[-12%] ml-3 ">
//             <PiBagBold size={40} className="ml-1 mt-3 pt-2 sm:size-8" />
//           </div>
//           <div className="desc mt-[-32%] ml-14">
//             <p className="text-gray-500 text-sm sm:text-xs">Job type</p>
//             <h1 className="text-lg font-semibold sm:text-sm">{data.type}</h1>
//           </div>
//         </button>

//         <button className="h-24 w-40 sm:h-20 sm:w-48 border rounded-xl border-green-500 p-3">
//           <div className="logo h-12 w-12 sm:h-12 sm:w-14 bg-green-300 rounded-full mt-[-12%] ml-1">
//             <MdOutlineHome size={40} className="ml-1 p-1 mt-2 sm:size-8" />
//           </div>
//           <div className="desc mt-[-32%] ml-14 ">
//             <p className="text-gray-500 text-sm sm:text-xs">Job Location</p>
//             <h1 className="text-lg font-semibold sm:text-sm">{data.loctype}</h1>
//           </div>
//         </button>
//       </div>
//       <div className="job-about z-0 mb-16 pb-24">
//         <h1 className="text-3xl font-semibold mt-12 ml-6">About the job</h1>
//         <p className="max-w-[70%] text-lg ml-24 mt-6">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
//           ipsum. Magni, asperiores. Excepturi, doloribus laudantium quam
//           quibusdam perspiciatis amet minus rerum maxime, corrupti facere
//           recusandae debitis neque optio adipisci provident mollitia culpa rem
//           quis ipsum. Provident atque fuga sit, voluptates perspiciatis placeat
//           voluptas labore, quasi voluptate ab, consequuntur eos! Fugit, sit? Qui
//           molestiae quam, officia dicta obcaecati voluptatibus animi cum
//           pariatur enim doloremque quibusdam quo expedita nisi veritatis
//           voluptatum provident suscipit maiores dolorem dolor. Doloribus rem
//           minima quibusdam voluptatibus ipsam consectetur quidem. Minus
//           reiciendis ad dolorem autem accusantium esse quaerat amet cumque modi
//           iste. Ratione suscipit modi quam velit vel
//         </p>
//         <div className="btn2 flex gap-6 justify-center ml-3 mt-5 z-10 fixed bottom-3  sm:left-12 text-white">
//           <button className="h-16 w-52 sm:w-40 md:w-52 rounded-lg bg-[#383838]">
//             1157+ Applicants
//           </button>
//           <button className="h-16 w-52 sm:w-40 md:w-52 rounded-lg bg-[#01a768]">
//             Apply Now
//           </button>
//         </div>
//         <h1 className="text-3xl font-semibold mt-12 ml-6">
//           Key Responsibilities
//         </h1>
//         <p className="max-w-[70%] text-lg ml-24 mt-6 mb-24">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere culpa
//           ullam aut sequi quasi. Sapiente maxime repellendus ipsum consectetur
//           incidunt deleniti ipsam autem dolor nihil esse voluptas id asperiores
//           minima ratione quam iusto totam, error nulla illo dolorum commodi.
//           Magni accusantium voluptatum repellendus quia. Nostrum repellat
//           repudiandae aspernatur iusto possimus odit rem minus temporibus quo
//           vel eius debitis culpa eaque adipisci saepe dicta voluptas magnam,
//           quas incidunt optio praesentium iste! Soluta quam quaerat culpa
//           deserunt?
//         </p>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { IoShareSocialOutline } from "react-icons/io5";
// import { CiLocationOn } from "react-icons/ci";
// import { PiBagBold } from "react-icons/pi";
// import { MdOutlineHome } from "react-icons/md";
// import { JobCardProps } from "@/types/job";
// import JobDetails from "./job-details";
// import Link from "next/link";

// interface JobDetailsMobileProps {
//   job: JobCardProps;
//   onClose: () => void;
// }

// export default function JobDetailsMobile({ job, onClose }: JobDetailsMobileProps) {
//   const copyToClipboard = () => {
//     const url = window.location.href;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => alert("URL copied to clipboard!"))
//       .catch((err) => console.error("Failed to copy URL:", err));
//   };

//   return (
//     <div className="sm:hidden block  h-screen w-full fixed top-0 left-0 bg-white z-50 overflow-y-auto">
//       {/* Header */}
//       <div className="head flex justify-between items-center px-6 py-4">
//         <MdKeyboardArrowLeft size={40} className="cursor-pointer" onClick={onClose} />
//         <h1 className="text-3xl font-semibold">Details</h1>
//         <button onClick={copyToClipboard}>
//           <IoShareSocialOutline size={30} />
//         </button>
//       </div>

//       {/* Company Info */}
//       <div className="company-desc h-40 w-[80%] mx-auto mt-8 bg-[#01a768] rounded-[50px] relative">
//         <h1 className="text-white text-3xl font-semibold text-center p-12">{job.companyName}</h1>
//         <div className="logo h-28 w-28 bg-green-200 rounded-full border-white border-[5px] mx-auto absolute top-24 left-0 right-0 flex items-center justify-center">
//           <img
//             src={job.companyLogo || "/placeholder.svg"}
//             alt={`${job.companyName} logo`}
//             width={52}
//             height={52}
//             className="object-contain"
//           />
//         </div>


//       </div>

//       {/* Job Details */}
//       <div className="desc mt-16 px-6">
//         <h1 className="text-3xl font-semibold">{job.jobTitle}</h1>
//         <div className="flex items-center gap-2 mt-4">
//           <CiLocationOn size={30} />
//           <p className="text-xl font-semibold text-gray-500">{job.jobLocation}</p>
//         </div>
//       </div>

//       {/* Job Type & Location */}
//       <div className="btn1 flex gap-4 justify-center mt-12">
//         <button className="h-24 w-40 border rounded-xl border-green-500 p-3">
//           <div className="logo h-12 w-12 bg-green-300 rounded-full flex items-center justify-center">
//             <PiBagBold size={30} />
//           </div>
//           <div className="desc mt-2 text-center">
//             <p className="text-gray-500 text-sm">Job Type</p>
//             <h1 className="text-lg font-semibold">{job.jobType}</h1>
//           </div>
//         </button>

//         <button className="h-24 w-40 border rounded-xl border-green-500 p-3">
//           <div className="logo h-12 w-12 bg-green-300 rounded-full flex items-center justify-center">
//             <MdOutlineHome size={30} />
//           </div>
//           <div className="desc mt-2 text-center">
//             <p className="text-gray-500 text-sm">Workplace</p>
//             <h1 className="text-lg font-semibold">{job.jobType}</h1>
//           </div>
//         </button>
//       </div>

//       {/* About Job */}
//       <div className="job-about px-6 mt-12">
//         <h1 className="text-3xl font-semibold">About the job</h1>
//         <p className="text-lg mt-4">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sint impedit, quibusdam temporibus cupiditate nulla earum eaque excepturi, ut quisquam placeat quidem fugit ab magni est consequuntur natus. Quas, facilis.
//         </p>
//       </div>

//       {/* Apply & Applicants Buttons */}
//       <div className="fixed bottom-3 left-0 right-0 flex gap-4 justify-center p-4">
//         <button className="h-16 w-40 rounded-lg bg-gray-700 text-white">1157+ Applicants</button>

//         <Link href={job.jobLink} passHref legacyBehavior>
//           <a target="_blank">
//             <button className="h-16 w-40 rounded-lg bg-[#01a768] text-white">Apply Now</button>
//           </a>
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { PiBagBold } from "react-icons/pi";
import { MdOutlineHome } from "react-icons/md";
import { JobCardProps } from "@/types/job";
import { CompanyType } from "@/types/companyType";
import { Opportunity } from "@/types/opportunityType";
import Link from "next/link";



interface JobDetailsMobileProps {
  job: JobCardProps;

  onClose: () => void;

}

export default function JobDetailsMobile({ job, onClose }: JobDetailsMobileProps) {
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("URL copied to clipboard!"))
      .catch((err) => console.error("Failed to copy URL:", err));
  };

  return (
    <div className="xl:hidden block h-screen w-full fixed top-0 pt-[10vh] left-0 bg-white z-20 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <MdKeyboardArrowLeft size={32} className="cursor-pointer" onClick={onClose} />
        <h1 className="text-2xl font-semibold">Details</h1>
        <button onClick={copyToClipboard}>
          <IoShareSocialOutline size={28} />
        </button>
      </div>

      {/* Company Info */}
      <div className="relative flex flex-col items-center mt-6">
        <div className="bg-[#01a768] w-64 h-20 rounded-full flex items-center justify-center">
          <h1 className="text-white text-xl font-semibold">{job.companyName}</h1>
        </div>
        <div className="absolute top-14 flex items-center justify-center bg-white w-16 h-16 rounded-full shadow-lg border-4 border-white">
          <img src={job.companyLogo || "/placeholder.svg"} alt={`${job.companyName} logo`} className="w-10 h-10 object-contain" />
        </div>
      </div>

      {/* Job Details */}
      <div className="text-center mt-12 px-6">
        <h1 className="text-2xl font-semibold">{job.jobTitle}</h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <CiLocationOn size={24} />
          <p className="text-lg font-medium text-gray-600">{job.jobLocation}</p>
        </div>
      </div>

      {/* Job Type & Location */}
      <div className="flex justify-center gap-4 mt-6">
        <div className="border rounded-xl p-4 w-40 text-center">
          <div className="bg-green-200 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
            <PiBagBold size={24} />
          </div>
          <p className="text-gray-500 text-sm mt-2">Job Type</p>
          <h1 className="text-lg font-semibold">{job.jobType}</h1>
        </div>

        <div className="border rounded-xl p-4 w-40 text-center">
          <div className="bg-green-200 w-10 h-10 rounded-full flex items-center justify-center mx-auto">
            <MdOutlineHome size={24} />
          </div>
          <p className="text-gray-500 text-sm mt-2">Job Location</p>
          <h1 className="text-lg font-semibold">{job.jobType}</h1>
        </div>
      </div>

      {/* About the Job */}
      <div className="px-6 mt-8">
        <h1 className="text-2xl font-semibold">About the job</h1>
        <p className="text-md text-gray-700 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sint impedit, quibusdam temporibus cupiditate nulla earum eaque excepturi, ut quisquam placeat quidem fugit ab magni est consequuntur natus. Quas, facilis.
        </p>
      </div>

      {/* Key Responsibilities */}
      <div className="px-6 mt-6 mb-24">
        <h1 className="text-2xl font-semibold">Key Responsibilities</h1>
        <p className="text-md text-gray-700 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere culpa ullam aut sequi quasi.
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="sticky  bottom-0 left-0 right-0 bg-gray-200 p-4 border-t flex justify-center gap-4">
        <button className="h-12 w-40 rounded-lg bg-gray-200 text-black font-medium">
          1157+ Applicants
        </button>

        <Link href={job.jobLink || "#"} passHref legacyBehavior>
          <a target="_blank">
            <button className="h-12 w-40 rounded-lg bg-[#01a768] text-white font-medium flex items-center justify-center gap-2">
              Apply Now <MdKeyboardArrowRight size={20} />
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}
