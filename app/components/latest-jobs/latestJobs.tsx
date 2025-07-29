/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
// import { Search, ArrowRight } from "lucide-react";
import { useJobStore } from "@/app/_store/oppJobStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// import Image from "next/image";

import Home from "../job-display-new/job-cards";
import Home2 from "../job-display-new/job-cards2";

type CourseOption = {
  id: string;
  name: string;
};

interface JobSearchFormData {
  search: string;
  passingYear: string;
  course: string;
}

interface JobSearchPayload {
  userId: string;
  name?: string;
  passingYear?: string;
  stream?: string;
  type?: string;
}

export default function LatestJobs() {
  const { data: session } = useSession();
  const { register, handleSubmit, setValue } = useForm<JobSearchFormData>();
  const addJobs = useJobStore((state) => state.addJobs);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch course options from backend
  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);
  const [type, setType] = useState<string>("");

  useEffect(() => {
    // Fetch degree options
    const fetchDegrees = async () => {
      try {
        const res = await fetch("/api/job/get-degree");
        const data = await res.json();
        // Correct mapping: value = id, label = name
        setCourseOptions(data.map((deg: any) => ({ id: deg.value, name: deg.label })));
      } catch (err) {
        setCourseOptions([]);
      }
    };
    fetchDegrees();
  }, []);

  useEffect(() => {
    // Set default type based on route
    if (pathname?.includes("internships")) {
      setType("internships");
    } else if (pathname?.includes("jobs")) {
      setType("jobs");
    } else {
      setType("");
    }
  }, [pathname]);

  const onSubmit = async (data: JobSearchFormData) => {
    const selectedCourse = courseOptions.find((c) => c.name === data.course);
    const courseId = selectedCourse?.id;

    const payload: JobSearchPayload = {
      userId: session?.user?.id || "",
    };

    if (data.search && data.search.trim() !== "")
      payload.name = data.search.trim();
    if (data.passingYear && data.passingYear !== "")
      payload.passingYear = data.passingYear;
    if (courseId && data.course !== "" && data.course !== "Course")
      payload.stream = courseId;
    if (type) payload.type = type;

    Object.keys(payload).forEach((key) => {
      const typedKey = key as keyof JobSearchPayload;
      if (payload[typedKey] === undefined) {
        delete payload[typedKey];
      }
    });

    const response = await fetch("/api/job/getJobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const { jobs } = await response.json();
    addJobs(jobs);
  };

  return (
    <div className="sm:relative top-0 flex flex-col justify-center gap-7 md:gap-20 w-[95%] md:w-4/5 mx-auto sm:mt-[-1%] min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:h-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:gap-4 md:gap-7 w-full mt-14 sm:mt-0 md:h-full">
          {/* Search Input */}
          <div className="relative w-full md:w-[401px] h-full mb-4 sm:mb-0 min-w-44">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Job title, Keywords, Company"
              {...register("search")}
              className="w-full h-10 md:h-full pl-10 pr-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-row gap-3 sm:gap-4 md:gap-7 md:h-full">
            {/* Passing Year Select */}
            <div className="w-full sm:w-[150px] mb-4 sm:mb-0">
              <select
                {...register("passingYear")}
                className="h-10 md:h-full w-full text-gray-400 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Passing Year</option>
                {[
                  "2019",
                  "2020",
                  "2022",
                  "2023",
                  "2024",
                  "2025",
                  "2026",
                  "2027",
                  "2028",
                ].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Select */}
            <div className="w-full sm:w-[180px] mb-4 sm:mb-0">
              <select
                {...register("course")}
                className="h-10 md:h-full w-full px-4 text-gray-400 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Course</option>
                {courseOptions.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Apply Button */}
            <div className="w-full sm:w-auto md:h-full">
              <button
                type="submit"
                className="w-full md:h-full sm:w-auto bg-[#005DB9] text-white px-5 py-2 md:px-8 rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-row justify-center min-h-screen font-montserrat  ">
        {/* jobs  */}
        <div className=" flex items-start w-full ">
          {/* left  */}
          <div className="hidden xl:flex flex-col items-center w-[25%] min-w-80  h-[50rem] bg-white mt-[2.7rem] rounded-2xl">
            <div className=" h-[22.1rem] w-[17rem] mt-20 ">
              <p className="text-sm text-black font-normal text-center">
                Sponsored by <span className="text-[#0035D8]">JobGenix</span>
              </p>
              {/* sponser card  */}
              <div
                className=" relative h-[20.5rem] w-[17rem] rounded-2xl flex flex-col justify-around "
                style={{
                  background:
                    "linear-gradient(180deg, #007BFF 0%, #1C4980 100%)",
                }}
              >
                <div className="w-full h-full rounded-2xl bg-[url('/background/sponsoredEnroll.svg')] bg-cover bg-center bg-no-repeat ">
                  <div className="relative flex flex-col justify-between p-6 pb-4 w-full h-full">
                    <div className="text-xl font-bold text-[#ffffffda]">
                      <p>Elevate Your Career</p>
                      <p>with JobGenix </p>
                      <p>Employee </p>
                      <p>Grooming!</p>
                    </div>
                    <h2 className="text-base text-[#ffffffcc] font-semibold ">
                      <p>📅 Exclusive Training </p>
                      <p>
                        Sessions
                        <span className="text-[#fffffff3] text-bold">
                          Available Now!
                        </span>
                      </p>
                    </h2>
                    {/* Enroll Now  */}
                    <button className="w-full bg-white text-blue-900 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors">
                      {/* <button className="w-full py-3 text-center text-lg text-black"> */}
                      Enroll Now
                    </button>

                    <div className="text-center text-[#ffffffa9]  text-xs font-bold ">
                      <p className="">
                        Sponsored by{" "}
                        <span className="text-white">JobGenix</span>
                      </p>
                      <p className="">Your Partner in Career Success!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right  */}
          <div className="w-full xl:w-[75%] flex flex-col gap-5 ">
            <div className="px-1 sm:px-4">
              <h1 className="text-xl font-bold text-black  mb-4 ml-2 ">
                Featured Jobs
              </h1>
              <Home />
            </div>
            <div className="px-1 sm:px-4">
              <h1 className="text-xl font-bold text-black  mb-4 ml-2 ">
                All Jobs
              </h1>
              <Home2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
