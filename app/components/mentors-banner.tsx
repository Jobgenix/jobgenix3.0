// import Image from "next/image"
// // import mentorBg from "@/public/images/mentorBg.png"

// export default function MentorBanner() {
//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] h-[80px]">
//         <div className="flex items-center h-full ">
//           {/* Image container with full height */}
//           <div className="h-full w-1/5 border shrink-0">
//             <Image
//               src={`/images/mentorBg.png`}
//               alt="Mentor"
//               fill
//               sizes="80px"
//               priority
//             />
//           </div>

//           {/* Text content with proper padding */}
//           <div className="flex-1 px-4 border">
//             <p className="text-xl text-gray-600 mb-0.5 sm:text-sm">Need guidance?</p>
//             <p className="text-xl font-medium sm:text-base">
//               Discover Proven Tips from <span className="text-emerald-600">Leading Mentors!</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import Image from "next/image"


export default function GuidanceBanner() {
  return (
    <div className="block h-32 flex items-center justify-center  w-screen  mx-auto transition-transform ">
      <div className="bg-gradient-to-r h-[80%] md:h-4/5 from-[#E8F5E9] to-[#F1F8E9] w-full  md:px-0 md:w-4/5 lg:w-3/5 md:rounded-3xl   flex items-center shadow-sm">
        <div className="relative h-full w-full  md:rounded-3xl flex-shrink-0">
          <Image
            src="/images/mentorBg.png"
            alt="Mentor profile"
           fill
            className="md:rounded-3xl"
          />
        </div>
      </div>
    </div>
  )
}

// import Link from "next/link";

// export default function GuidanceBanner() {
//   return (
//     <div className="flex h-32 items-center justify-center w-screen mx-auto transition-transform">
//       <div
//         className="bg-gradient-to-r h-24 from-[#E8F5E9] to-[#F1F8E9] w-full md:w-4/5 border rounded-lg flex items-center gap-4 shadow-sm relative"
//         style={{ backgroundImage: "url('/images/mentorBg.png')", backgroundSize: "cover", backgroundPosition: "left center", backgroundRepeat: "no-repeat" }}
//       >
//       </div>
//     </div>
//   );
// }
