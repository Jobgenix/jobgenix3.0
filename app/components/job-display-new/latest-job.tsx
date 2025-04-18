"use client"

import { Search } from "lucide-react"
import Home from "./job-cards"
import Home2 from "./job-cards2"
import { ArrowRight } from "lucide-react"

export default function JobSearchInterface() {
  

  return (
    <div className="min-h-screen bg-sky-50 mt-[-2%]">
      {/* Search Bar */}
      <div className="p-4 ml-0 md:ml-40 mt-0 md:mt-[-2%] relative">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full md:ml-36">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Job title, Keywords, Company"
              className="w-full md:w-[401px] h-10 pl-10 pr-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Posting Type Select */}
          <div className="flex-1 w-full">
          <select className="h-10 w-full text-gray-400  md:w-[180px] px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>Passing Year</option>
              <option>2019</option>
              <option>2020</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
              <option>2028</option>
            </select>
          </div>

          {/* Category Select */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            {/* Dropdown */}
            <div className="w-full md:w-[136px]">
              <select className="h-10 w-full px-4 text-center text-gray-400  border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>BBA</option>
                <option>MBA</option>
                <option>ECONOMIC</option>
                <option>PGDM</option>
                <option>ALL BUSINESS</option>
                <option>ALL GRADUATES</option>
                <option>B.TECH</option>
                <option>M.TECH</option>
                <option>DUAL</option>
                <option>ALL ENGINEERING</option>
                <option>B.SC</option>
              </select>
            </div>

            {/* Apply Button */}
            <div className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-[#005DB9] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Home />
     
        <h1 className="xl:text-2xl xl:ml-[25%] ml-[8%] text-xl bg-[#f9fafb] font-semibold">All Jobs</h1>
      <Home2/>
      <button className="flex  items-center justify-center  bg-[#0073e6] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors w-[150px] xl:ml-[45%] ml-[30%] mb-10">
        <span className="flex items-center">
          Load More
          <ArrowRight size={16} className="ml-2" />
        </span>
      </button>
      
  
</div>
      
     

      
    
  )
}

