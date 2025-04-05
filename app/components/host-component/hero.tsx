import Image from 'next/image';
import React from 'react';  
import { MdOutlineArrowRightAlt } from 'react-icons/md';



export default function Hero() {
    return (
        <div className="hero h-auto bg-gradient-to-r from-[#d6f8dc] to-[#fbfbed] flex flex-col items-center">
            <div className="header pt-8 max-h-56">
                 
                    <Image src='/images2/image.png' className='mr-[60vw] mt-[3%]' alt='hero' width={400} height={400} />
                
                <h1 className="text-4xl font-semibold text-center mt-[-10%] text-gray-800 ">
                    Host an <span className="text-green-500">Opportunity</span>
                </h1>
                
                <p className="text-center text-lg mt-2 text-gray-400">
                    Choose your Opportunity category from below
                </p>
                <Image src='/images2/image 2.png' className='ml-[60vw] mt-[-7%]' alt='hero' width={550} height={550} />
            </div>

            <div className="h-screen w-full bg-[#e5f7eb] mt-16 ">
                <h1 className='text-green-500 text-2xl text-semi-bold p-4 ml-6'>Anything you want to host</h1>
            <div className="con1 w-[80%] h-64 bg-gradient-to-r from-[#eaf8c6] to-[#daf7cd]  mt-16 rounded-lg ml-44 shadow-lg ">
                  <h1 className='text-xl text-[#224e82] mt-2 p-3'>For <span className='text-[#e8862e] '>Engaging</span> your  target audience</h1>
                  <div className='box-con flex  space-x-4 mt-5 '>
                  <div className='b1 h-16 w-64 bg-white ml-36 rounded-lg p-2'>
                    <Image src='/images2/competitions-bg-icon.svg.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Case Competitions</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Competitions  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                    
                   
                  </div>
                  <div className='b2 h-16 w-64 bg-white  rounded-lg p-2'>
                  <Image src='/images2/hiring-challenges-bg-icon.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Contest</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Contest  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  <div className='b3 h-16 w-64 bg-white  rounded-lg p-2'>
                  <Image src='/images2/quizzes-bg-icon.svg.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Quizzes</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Quizzes  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  <div className='b4 h-26 w-64 bg-white  rounded-lg p-2'>
                  <Image src='/images2/hackathons-bg-icon.svg.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Coding Challenges</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Challenges  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  
                  </div>
                  <div className='box-con2 flex space-x-4 mt-5 ml-24'>
                    
                  <div className='b1 h-16 w-64 bg-white ml-36 rounded-lg p-2'>
                  <Image src='/images2/workshops-bg-icon.svg.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Webinars & Workshops</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Workshops  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  <div className='b2 h-16 w-64 bg-white  rounded-lg p-2'>
                  <Image src='/images2/cultural-events-bg-icon.svg.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Cultural Events</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Events  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  <div className='b3 h-16 w-64 bg-white  rounded-lg p-2'>
                  <Image src='/images2/clip path group.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Webinars</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Webinars  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  
                  
                  </div>
                  
                  
               </div>
               <div className="con2 w-[80%] h-40  bg-gradient-to-r from-[#d4f8db] via-[#e5f9e3] to-[#f5fbea] mt-14 mb-56 rounded-lg ml-44 shadow-lg">
               <h1 className='text-xl p-3'>For <span className='text-green-500'>Hiring</span> the right talent</h1>
               <div className='box-con flex space-x-4 mt-6'>
                  
                  <div className='b1 h-16 w-64 bg-white ml-36 rounded-lg p-2'>
                  <Image src='/images2/jobs-bg-icon.svg.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Jobs</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Jobs  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  <div className='b2 h-16 w-64 bg-white rounded-lg p-2'>
                  <Image src='/images2/internships-bg-icon.svg.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Internships</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Internships  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  <div className='b3 h-16 w-64 bg-white  rounded-lg p-2'>
                  <Image src='/images2/hiring-challenges-bg-icon.svg.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Hiring Challenges</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Challenges  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  <div className='b2 h-26 w-64 bg-white  rounded-lg p-2'>
                  <Image src='/images2/hackathons-bg-icon.svg.png' className='' alt='hero' width={40} height={40} />
                    <div className='para mt-[-16%]'>
                    <p className='text-base ml-12'>Coding Challenges</p>
                    <p className='text-xs ml-12 flex cursor-pointer text-[#2f8dea]'>Create Challenges  <MdOutlineArrowRightAlt className='size-5 ml-3' /> </p>
                    <Image src='/images2/Emphasis.png' className='mt-[-8%] ml-56' alt='hero' width={20} height={20} />
                    </div>
                  </div>
                  
                  </div>  
               </div>
            </div>
       
        </div>
        
    );
}
