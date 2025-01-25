// import React from 'react';
// import Image from "next/image";


// const ReferAndWin: React.FC = () => {
//   return (
//     <div className="bg-green-200 p-6 rounded-lg flex items-center justify-between">
//       <div className="mr-6">
//         <h2 className="text-2xl font-bold mb-2">Refer & Win</h2>
//         <p className="text-gray-700">MacBook, iPhone, Apple Watch, AirPods, Cash Rewards and more!</p>
//       </div>
//       <div className="w-1/2 flex justify-end">
//         <Image 
//           src={img} 
//           alt="Refer and Win" 
//           width={200} // Provide width
//           height={100} // Provide height. Adjust these as needed
//           style={{ maxHeight: '8rem', objectFit: 'contain' }} // Use style for max-height and object-fit
//         />
//       </div>
//       <a
//         href="#"
//         className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
//       >
//         Get Started
//       </a>
//     </div>
//   );
// };

// export default ReferAndWin;

// "use client"

// import Image from "next/image"
// import img from "../app/Images/Main.png";

// export default function ReferAndWin() {
//   return (
//     <div className="bg-[#E8F5E9] p-10 flex items-center justify-center">
//       <div className="w-3/5 border p-2 flex items-center rounded-xl justify-around bg-[#9BE6C1]">
//       <div className="space-y-2">
//         <h2 className="text-2xl font-semibold text-gray-800">Refer & Win</h2>
//         <p className="text-gray-600 text-sm">
//           MacBook, iPhone, Apple Watch,
//           <br />
//           AirPods, Cash Rewards and more!
//         </p>
//         <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
//           Get Started
//         </button>
//       </div>
//       <div className="relative">
        
//         <div className="rounded-2xl overflow-hidden hidden xl:flex  border-[#B7E4C7]">
//           <Image
//             src={img}
//             alt="People using referral app"
//             className="object-cover w-[230px] h-[170px]"
//           />
//         </div>
//       </div>
//       </div>
//     </div>
//   )
// }

"use client";

import Image from "next/image";
import img from "../../Images/Main.png";

export  function ReferAndWin() {
  return (
    <div className="bg-[#E8F5E9] p-10 flex items-center justify-center">
      <div className="w-4/5 xl:w-2/5 border p-6 flex flex-col xl:flex-row items-center rounded-xl justify-between bg-[#9BE6C1]"> {/* Added flex-col and xl:flex-row */}
        <div className="space-y-2 text-center xl:text-left"> {/* Added text-center and xl:text-left */}
          <h2 className="text-2xl font-semibold text-gray-800">Refer & Win</h2>
          <p className="text-gray-600 text-sm">
            MacBook, iPhone, Apple Watch,
            <br />
            AirPods, Cash Rewards and more!
          </p>
          <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
        <div className="relative mt-6 xl:mt-0"> {/* Added margin-top for mobile */}
          <div className="rounded-2xl overflow-hidden border-[#B7E4C7]"> {/* Removed hidden and xl:flex */}
            <Image
              src={img}
              alt="People using referral app"
              width={230} // Important: Add width
              height={170} // Important: Add height
              style={{ objectFit: 'cover' }} // Use style prop
            />
          </div>
        </div>
      </div>
    </div>
  );
}