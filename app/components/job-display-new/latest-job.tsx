"use client"
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Search, ArrowRight } from "lucide-react";
import {useJobStore} from '@/app/_store/oppJobStore';

import Home from "./job-cards";
import Home2 from "./job-cards2";

type CourseOption = {
  id: string;
  name: string;
};

const courseOptions:CourseOption[] = [
  { id: "1", name: "B.Tech" },
  { id:"2", name: "M.Tech" },
  { id: "20", name: "BBA" },
  { id: "21", name: "MBA" },
  { id:"3", name: "dual" },
  { id: "30", name: "All Graduates" },
  { id: "31", name: "all engineering" },
  { id: "32", name: "All Business" },
  { id: "55", name: "BCA" },
  { id:"6", name: "MCA" },
  { id:"7", name: "BSc" },
  { id:"8", name: "MSc" },
];

interface JobSearchFormData {
  search: string;
  passingYear: string;
  course: string;
}

export default function JobSearchInterface() {
  const { data: session } = useSession();

  const { register, handleSubmit } = useForm<JobSearchFormData>();

  const addJobs = useJobStore((state) => state.addJobs); // This is invalid inside an async function

  const onSubmit = async (data:JobSearchFormData) => {
    const selectedCourse = courseOptions.find((c) => c.name === data.course);
    const courseId = selectedCourse?.id || null;
    console.log(courseId)


    const response = await fetch("/api/job/getJobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user?.id.toString(),
        limit: "10",
        userSkills: ["JavaScript", "React", "Node.js"],
        passingYear: data.passingYear,
        stream: courseId,
        type: "jobs",
        name: data.search,
      }),
    });

    const {jobs} = await response.json();
    addJobs(jobs);  //Added in globas state
    console.log(jobs); 
  };

  return (
    <div className="min-h-screen bg-sky-50 mt-[-2%]">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Search Bar */}
        <div className="p-4 ml-0 md:ml-40 mt-0 md:mt-[-2%] relative">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">

            {/* Search Input */}
            <div className="relative flex-1 w-full md:ml-36">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search Job title, Keywords, Company"
                {...register("search")}
                className="w-full md:w-[401px] h-10 pl-10 pr-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Passing Year Select */}
            <div className="flex-1 w-full">
              <select {...register("passingYear")} className="h-10 w-full text-gray-400 md:w-[180px] px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Passing Year</option>
                {["2019", "2020", "2022", "2023", "2024", "2025","2026", "2027", "2028"].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Course Select */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="w-full md:w-[136px]">
                <select {...register("course")} className="h-10 w-full px-4 text-center text-gray-400 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  {courseOptions.map((course) => (
                    <option key={course.id} value={course.name}>{course.name}</option>
                  ))}
                </select>
              </div>

              {/* Apply Button */}
              <div className="w-full md:w-auto">
                <button type="submit" className="w-full md:w-auto bg-[#005DB9] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Main Content */}
      <Home />

      <h1 className="xl:text-2xl xl:ml-[25%] ml-[8%] text-xl bg-[#f9fafb] font-semibold">All Jobs</h1>
      <Home2 />

      <button className="flex items-center justify-center bg-[#0073e6] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors w-[150px] xl:ml-[45%] ml-[30%] mb-10">
        <span className="flex items-center">
          Load More
          <ArrowRight size={16} className="ml-2" />
        </span>
      </button>
    </div>
  );
}