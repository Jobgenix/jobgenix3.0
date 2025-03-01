// import Image from "next/image";
// import React from "react";
// import Link from "next/link";

// export default function LifeJobgenix() {
//   return (
//     <div>
//       <div className="head p-2">
//         <h1 className="text-3xl text-center p-2">
//           Unlock the growth and skills with our internship
//         </h1>
//         <Image
//           src="/images2/lightning.png"
//           className="p-2 ml-96 mt-[-4%]"
//           alt="image"
//           height={30}
//           width={80}
//         />
//       </div>
//       <div className="box flex justify-center space-x-4">
//         <div className="b1 h-24 w-56 bg-[#DEEDFC] rounded-lg shadow-lg flex">
//           <Image src="/images2/atm.png" alt="" className="p-1 mt-2" height={30} width={80}/ >
//           <p className="mt-8">Competitive salary</p>
//         </div>
//         <div className="b2 h-24 w-64 bg-[#e5f7eb] rounded-lg shadow-lg flex items-center gap-4 p-4">
//   <Image src="/images2/home.png" alt="Home Icon" className="h-28 w-28 mt-12" height={80} width={80} />
//   <p className="text-sm flex-1 ml-[-5%]">Complete work life balance</p>
// </div>



//         <Image src="/images2/flexible-work.png" alt="" className="p-3 h-32 w-64 mt-[-1%]" width={500} height={500}/ >

//         <div className="b4 h-24 w-56 bg-[#FFF6C9] flex  rounded-lg shadow-lg">
//           <Image src="/images2/brain.png" alt="" className="p-1 mt-3" height={30} width={80}/ >
//           <p className="mt-6 mr-2">On-the-job-training</p>
//         </div>
//      </div>
//      <div className="img-box  flex h-36 w-[50%] mt-24 ml-[24%] bg-[#C6F7D5] rounded-xl">

//         <div className="image p-2 h-32 w-[50%] ml-5 mt-[-3%] rounded-3xl">
//         <Image src="/images2/large-people.png" alt="" className="object-fit" height={300} width={300} />

//         </div>
//         <div className="text block ">
//         <h1 className="p-4 ml-8 text-3xl ">Life at Jobgenix</h1>
//         <p className="pl-5 ml-8 text-xs ">want to learn more what do we belive in and what is our culture</p>
//         <Link href="" className="pl-5 ml-8 text-xs text-blue-500">click to know more</Link>
//         </div>
//      </div>
//     </div>
//   );
// };


import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function LifeJobgenix() {
  return (
    <div>
      <div className="head p-2">
        <h1 className="text-3xl text-center p-2">
          Unlock the growth and skills with our internship
        </h1>
        <Image
          src="/images2/lightning.png"
          className="p-2 ml-96 xl:ml-96 lg:ml-64 md:ml-8 md:mt[-6%]  mt-[-4%]"
          alt="image"
          height={30}
          width={80}
        />
      </div>
      <div className="box flex md:flex-wrap sm:flex-wrap flex-wrap justify-center space-x-4">
        <div className="b1 h-24 w-56 bg-[#DEEDFC] rounded-lg shadow-lg flex">
          <Image src="/images2/atm.png" alt="" className="p-1 mt-2" height={30} width={80} />
          <p className="mt-8">Competitive salary</p>
        </div>
        <div className="b2 h-24 w-64 bg-[#e5f7eb] rounded-lg shadow-lg flex items-center gap-4 p-4">
          <Image src="/images2/home.png" alt="Home Icon" className="h-28 w-28 mt-12" height={80} width={80} />
          <p className="text-sm flex-1 ml-[-5%]">Complete work life balance</p>
        </div>



        <Image src="/images2/flexible-work.png" alt="" className="p-3 h-32 w-64 mt-[-1%]" width={500} height={500} />

        <div className="b4 h-24 w-64 md:relative md:right-7 md:top-4/4 bg-[#FFF6C9] flex  rounded-lg shadow-lg">
          <Image src="/images2/brain.png" alt="" className="p-1 mt-3 " height={30} width={80} />
          <p className="mt-6 mr-2">On-the-job-training</p>
        </div>
      </div>
      <div className="img-box  flex h-36 w-[70%] xl:w-[50%] mt-36 ml-[15%] xl:ml-[25%] bg-[#C6F7D5] rounded-xl">

        <div className="image p-2 h-32 md:w-[60%]  w-[50%] ml-5 mt-[-6%] xl:mt-[-4%] rounded-3xl">
          <Image src="/images2/large-people.png" alt="" className="object-fit md:h-36  xl:w-[80%]" height={400} width={400} />

        </div>
        <div className="text block  ">
          <h1 className="p-2 ml-8 text-3xl md:text-2xl md:ml-4">Life at Jobgenix</h1>
          <p className="pl-2 ml-8 md:ml-4 text-xl md:text-xs">want to learn more what do we belive in and what is our culture</p>
          <Link href="" className="pl-5 ml-5 text-xs md:ml-1 text-blue-500">click to know more</Link>
        </div>
      </div>
    </div>
  );
};