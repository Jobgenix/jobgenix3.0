// 'use client';

// import { ArrowRight } from 'lucide-react';



// export default function StatsSection() {
//   return (
//     <div className="flex flex-col bg-white items-center justify-center space-y-10 py-10">
//       {/* Stats Card */}
//       <div className="w-[80%] max-w-3xl flex border-[#0073E6] bg-[#C9E3FF] gap-6 rounded-2xl p-8 shadow-md border border-blue-200">
//         <div className='flex flex-col justify-center w-1/3'>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Your Success, By <br /> The Numbers 🚀
//           </h2>
//           <p className="text-gray-600 text-sm mt-1">
//             We’re helping dreamers become <br /> doers—every single day.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid w-2/3 grid-cols-2 gap-4 mt-4 text-gray-900 font-semibold">
//           <div>
//             <p className="text-2xl font-sora">92 %</p>
//             <p className="text-sm text-gray-600 font-montserrat">Job seekers hired within 30 days</p>

//           </div>
//           <div>
//             <p className="text-2xl font-sora">5000 +</p>
//             <p className="text-sm text-gray-600">Industry Mentors on Standby</p>
//           </div>
//           <div>
//             <p className="text-2xl font-sora">1M+</p>
//             <p className="text-sm text-gray-600">Personalized job matches generated</p>
//           </div>
//           <div>
//             <p className="text-2xl font-sora flex items-center">
//               4.8/5 <span className="ml-1 text-yellow-500">⭐</span>
//             </p>
//             <p className="text-sm text-gray-600">Average satisfaction rating</p>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="relative text-center">
//         <h2 className="text-3xl font-bold  text-gray-900">
//           Your Future’s Calling <br />
//           <span className="text-gray-800">Are You Ready to Answer?</span>
//         </h2>




//         <p className="mt-2  text-blue-500">

//           <span className="cursor-pointer hover:underline">Get matched.</span>{' '}
//           <span className="cursor-pointer text-black hover:underline">Get mentored.</span>{' '}
//           <span className="cursor-pointer hover:underline">Get hired.</span>
//         </p>

//         <div className='flex justify-between w-98 h-16'>
//           <img src="/LandingPageImages/left.png" alt="" height={10} className='' />
//           <img src="/LandingPageImages/right.png" alt="" height={10} className='' />
//         </div>

//         {/* Call to Action Button */}
//         <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2 font-medium  hover:bg-blue-600 transition">
//           Create Your Free Account & Start Today
//           <ArrowRight size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function StatsSection() {
  return (
    <div className="flex font-montserrat flex-col bg-white items-center justify-center space-y-10 py-10 px-3 md:px-6 lg:px-8">
      {/* Stats Card */}
      <div className="w-full max-w-3xl flex flex-col md:flex-row border-[#0073E6] bg-[#C9E3FF] gap-6 rounded-2xl p-6 md:p-10 border border-blue-300 shadow-[0_10px_15px_rgba(0,0,0,0.2)]">

        <div className='flex flex-col justify-center w-full md:w-1/3 text-center md:text-left'>
          <h2 className="text-xl text-[#333333] md:text-2xl font-bold text-gray-900">
            Your Success, By <br className='hidden md:block' /> The Numbers 🚀
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            We’re helping dreamers become <br className='hidden md:block' /> doers—every single day.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid w-full md:w-2/3 grid-cols-2 gap-4 text-gray-900 font-semibold text-center">
          <div>
            <p className="text-xl md:text-3xl text-[#333333]  ">92 %</p>
            <p className="text-xs md:text-sm text-gray-600 font-montserrat">Job seekers hired <br /> within 30 days</p>
          </div>
          <div>
            <p className="text-xl md:text-3xl text-[#333333] font-sora">5000 +</p>
            <p className="text-xs md:text-sm text-gray-600">Industry Mentors <br /> on Standby</p>
          </div>
          <div>
            <p className="text-xl md:text-3xl text-[#333333] font-sora">1M+</p>
            <p className="text-xs md:text-sm text-gray-600">Personalized job <br /> matches generated</p>
          </div>
          <div>
            <p className="text-xl md:text-3xl font-sora text-[#333333] flex items-center justify-center">
              4.8/5 <span className="ml-1 text-yellow-500">⭐</span>
            </p>
            <p className="text-xs md:text-sm text-gray-600">Average <br /> satisfaction rating</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center w-full max-w-2xl px-4 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Your Future’s Calling <br />
          <span className="text-gray-800">Are You Ready to Answer?</span>
        </h2>

        <p className="mt-2 text-blue-500 text-sm md:text-base">
          <span className="cursor-pointer hover:underline">Get matched.</span>{' '}
          <span className="cursor-pointer text-black hover:underline">Get mentored.</span>{' '}
          <span className="cursor-pointer hover:underline">Get hired.</span>
        </p>

        <div className='flex justify-between  items-center w-4/5 md:w-2/3 mt-4'>
          <img src="/LandingPageImages/left.png" alt="" className='w-10 md:w-14' />
          <img src="/LandingPageImages/right.png" alt="" className='w-10 md:w-14' />
        </div>
            

        {/* Call to Action Button */}
        <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2 font-medium text-sm md:text-base hover:bg-blue-600 transition">
          Create Your Free Account & Start Today
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}