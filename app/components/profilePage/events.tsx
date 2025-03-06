"use client";
import { useState } from "react";

export default function Events() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Events", desc: "Description Events", date: new Date().toDateString() },
  ]);

  const addNewCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      name: `Events ${courses.length + 1}`,
      desc: `Description of Events ${courses.length + 1}`,
      date: new Date().toDateString(),
    };
    setCourses([...courses, newCourse]);
  };

  return (
    <div className="w-[90%] mt-5 ml-[5%] bg-[#e6f6ec] rounded-lg p-4 overflow-x-auto mb-3">
      <h1 className="font-semibold text-xl ml-5">Upcoming Events</h1>
      <div className="flex flex-wrap gap-5 justify-center sm:justify-start mt-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[25%] bg-[#edf2ef] shadow-2xl p-4 rounded-md"
          >
            <h1 className="text-lg font-semibold">{course.name}</h1>
            <p className="text-sm">{course.desc}</p>
            <p className="text-xs mt-1 text-gray-600">{course.date}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center sm:justify-start mt-4">
        <button
          onClick={addNewCourse}
          className="bg-[#01a768] h-10 p-2 w-40 rounded-lg text-white"
        >
          + Add Event
        </button>
      </div>
    </div>
  );
}