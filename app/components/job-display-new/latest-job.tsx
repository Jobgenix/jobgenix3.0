"use client"
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Search, ArrowRight } from "lucide-react";
import {useJobStore} from '@/app/_store/oppJobStore';
import { useState, useEffect } from "react";
import Home from "./job-cards";

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
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addJobs = useJobStore((state) => state.addJobs); // This is invalid inside an async function

  const onSubmit = async (data:JobSearchFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const selectedCourse = courseOptions.find((c) => c.name === data.course);
      const courseId = selectedCourse?.id || null;

<<<<<<< HEAD
      const response = await fetch("/api/job/getJobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          limit: "10",
          userSkills: ["JavaScript", "React", "Node.js"],
          passingYear: data.passingYear,
          stream: courseId,
          type: "jobs",
          searchQuery: data.search // Added search query parameter
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const { jobs } = await response.json();
      
      // Filter jobs based on search query if provided
      let filtered = jobs;
      if (data.search) {
        const searchLower = data.search.toLowerCase();
        filtered = jobs.filter((job: any) => 
          job.jobTitle.toLowerCase().includes(searchLower) ||
          job.companyName.toLowerCase().includes(searchLower) ||
          (job.requireskils && job.requireskils.toLowerCase().includes(searchLower))
      )}

      setFilteredJobs(filtered);
      
      // Update global state if needed
      const addJobs = useJobStore((state) => state.addJobs);
      addJobs(filtered);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
=======
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
>>>>>>> 65b786af432730df54eff5773d9c283e573e7ec9
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
                <option value="">Passing Year</option>
                {["2019", "2020", "2022", "2023", "2024", "2025","2026", "2027", "2028"].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Course Select */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="w-full md:w-[136px]">
                <select {...register("course")} className="h-10 w-full px-4 text-center text-gray-400 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select Course</option>
                  {courseOptions.map((course) => (
                    <option key={course.id} value={course.name}>{course.name}</option>
                  ))}
                </select>
              </div>

              {/* Apply Button */}
              <div className="w-full md:w-auto">
                <button 
                  type="submit" 
                  className="w-full md:w-auto bg-[#005DB9] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Apply'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Display loading or error state */}
      {loading && (
        <div className="text-center py-8">
          <p>Loading jobs...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Main Content - Pass filtered jobs to Home component */}
      <Home filteredJobs={filteredJobs} />

      <h1 className="xl:text-2xl xl:ml-[25%] ml-[8%] text-xl bg-[#f9fafb] font-semibold">All Jobs</h1>
<<<<<<< HEAD
=======
      <Home2 />
>>>>>>> 65b786af432730df54eff5773d9c283e573e7ec9

      <button className="flex items-center justify-center bg-[#0073e6] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors w-[150px] xl:ml-[45%] ml-[30%] mb-10">
        <span className="flex items-center">
          Load More
          <ArrowRight size={16} className="ml-2" />
        </span>
      </button>
    </div>
  );
}