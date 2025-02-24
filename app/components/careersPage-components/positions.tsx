import React from "react";
import Image from "next/image";

export default function Positions() {
    return (
        <div className="container mb-16 cursor-pointer"> 
    <div className="box flex justify-center space-x-4 mt-24 ml-[5%]">
        <div className="b1 flex h-16 w-96 p-5 bg-[#e5f7eb] rounded-lg shadow-2xl">
            <h1 className="text-lg  ">Growth Intern</h1>
            <Image src="/images2/rightarrow.png" className="ml-40" alt="" height={30} width={30} />
        </div>
        <div className="b2 flex h-16 w-96 p-5 bg-[#e5f7eb] rounded-lg shadow-2xl">
            
            {/* <Image src="/images2/rightarrow.png" alt="" className="ml-24" height={30} width={30} /> */}
            
        </div>
        <div className="b3 flex  h-16 w-96 p-5  bg-[#e5f7eb] rounded-lg shadow-2xl">
            
            {/* <Image src="/images2/rightarrow.png" className="ml-20 " alt="" height={30} width={30} /> */}
        </div>
        
    </div>

    <div className="box2 flex mb-4 mt-8  space-x-4 ml-[14%]"> 
        <div className="b1 flex h-16 w-96 p-5 bg-[#e5f7eb] rounded-lg shadow-lg">
            
            {/* <Image src="/images2/rightarrow.png" className="ml-10 " alt="" height={30} width={30} /> */}
        </div>
        <div className="b2 flex h-16 w-96 p-5 bg-[#e5f7eb] rounded-lg shadow-lg">
            
            {/* <Image src="/images2/rightarrow.png" className="ml-28 " alt="" height={30} width={30} /> */}
        </div>
        <div className="b3 flex h-16 w-96 p-5 bg-[#e5f7eb] rounded-lg shadow-lg">
            
            {/* <Image src="/images2/rightarrow.png" className="ml-28" alt="" height={30} width={30} /> */}
        </div>
        
    </div>

     <div className="box2 flex mb-4 mt-8 space-x-4 ml-[14%]"> 
        <div className="b1 flex h-16 w-96 p-5 bg-[#e5f7eb] rounded-lg shadow-lg">
        
            
            {/* <Image src="/images2/rightarrow.png" className="ml-32 " alt="" height={30} width={30} /> */}
            </div>
            

        <div className="b2 flex h-16 w-96 p-5 bg-[#e5f7eb] rounded-lg shadow-lg">
        
            
            {/* <Image src="/images2/rightarrow.png" className="ml-8 " alt="" height={30} width={30} /> */}
        </div>
        <div className="b3 flex h-16 w-96  p-5 bg-[#e5f7eb] rounded-lg shadow-lg">
            
            {/* <Image src="/images2/rightarrow.png" className="ml-36" alt="" height={30} width={30} /> */}
        </div>
        
    </div>
    <div className="box2 flex mb-4 mt-8 space-x-4 ml-[40.5%]"> 
        <div className="b1 flex h-16 w-96 p-5  bg-[#e5f7eb] rounded-lg shadow-lg">
           
            {/* <Image src="/images2/rightarrow.png" className="ml-2 " alt="" height={30} width={30} /> */}
        </div>
        
    </div>

</div>
    );
    }