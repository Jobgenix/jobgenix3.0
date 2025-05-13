import Image from 'next/image'
export default function JobGenixPromo() {
  return (
   
     <div className="hidden xl:block">
         <Image src="/images2/frame72.png" alt="JobGenix" width={250} height={300} className="m-auto mt-10 mb-5" />
         <button className='absolute text-[14px]  rounded-md w-28 ml-14 text-semibold top-[42%] bg-white'>Enroll Now</button>
     </div>
    
  )
}
