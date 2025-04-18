import Image from 'next/image'
export default function JobGenixPromo() {
  return (
   
     <div className="hidden xl:block">
         <Image src="/images2/frame72.png" alt="JobGenix" width={250} height={300} className="m-auto mt-10 mb-5" />
         <button className='absolute text-[14px]  rounded-md w-28 ml-14 text-semibold top-[42%] bg-white'>Enroll Now</button>
          <h1 className='text-center text-2xl font-bold mt-10 absolute top-0 w-44 left-80'>Featured Jobs</h1>
     </div>
    
  )
}
