"use client";
import { useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Course 1", desc: "Description of Course 1", progress: 20 },
  ]);

  const addNewCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      name: `Course ${courses.length + 1}`,
      desc: `Description of Course ${courses.length + 1}`,
      progress: Math.floor(Math.random() * 101), 
    };
    setCourses([...courses, newCourse]);
  };

  return (
    <div className="h-auto w-[90%] mt-5 ml-[5%] bg-[#e6f6ec] rounded-lg p-4 overflow-hidden">
      <h1 className="font-semibold text-xl ml-5">Courses and Certification</h1>
      <div className="flex overflow-x-auto space-x-5 whitespace-nowrap ml-5 pb-4">
        {courses.map((course) => {
          let progressColor = "bg-red-500"; 

          if (course.progress > 40 && course.progress < 80) {
            progressColor = "bg-yellow-500"; 
          } else if (course.progress >= 80) {
            progressColor = "bg-green-500"; 
          }

          return (
            <div
              key={course.id}
              className="h-auto w-[90%] sm:w-[45%] md:w-[30%] min-w-[250px] bg-[#edf2ef] shadow-2xl p-4 rounded-md flex-shrink-0"
            >
              <h1 className="text-lg font-semibold">{course.name}</h1>
              <p className="text-sm">{course.desc}</p>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className={`${progressColor} h-4 rounded-full`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 text-gray-600">{course.progress}% completed</p>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center sm:justify-start mt-4">
        <button
          onClick={addNewCourse}
          className="bg-[#01a768] h-10 p-2 w-40 rounded-lg text-white"
        >
          + Add New Course
        </button>
      </div>
    </div>
  );
}
