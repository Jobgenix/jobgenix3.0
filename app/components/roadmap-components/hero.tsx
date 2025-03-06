import Image from 'next/image';

export default function Hero() {
    return (
       <div>
        
         <div className=" h-3/5 lg:h-screen w-full md:h-4/5 sm:h-3/5  bg-[#ebf3dc] pt-24 ">
               <p className="text-[#007347] ml-[5%] lg:ml-[32%] md:ml-[12%] sm:ml-[5%] ">Discover structured roadmaps designed to open new doors in your learning journey</p>
               <h1 className="lg:text-6xl sm:text-6xl md:text-6xl text-3xl font-bold text-[#007347] ml-[20%] sm:ml-[15%] lg:ml-[35%] md:ml-[20%] ">Unlock your Path</h1>
               <span className="lg:text-6xl sm:text-6xl md:text6x text-3xl p-3  font-bold text-[#007347] ml-[28%] sm:ml-[25%] lg:ml-[40%] md:ml-[32%]">to</span>
               <span className="lg:text-6xl sm:text-6xl md:text6x text-3xl font-bold text-[#95AC58]">Success</span>
              <Image src="/images2/lock-img.png" className="min-h-[100px] lg:ml-[38%]  ml-[7%] mt-[-14%] lg:mt-[-4%] md:mt-[-7.5%]  md:ml-[30%] sm:ml-[24%] sm:mt-[-10%]"  alt="lock-img" height={350} width={350}/>

          
         </div>
       </div>
    );
}
  

  