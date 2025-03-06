"use client";
import { useState } from "react";

export default function Practice() {
  const [assessments, setAssessments] = useState([
    { id: 1, name: "Assessment 1", desc: "Description of Assessment", progress: 20 },
  ]);

  const addNewAssessment = () => {
    const newAssessment = {
      id: assessments.length + 1,
      name: `Assessment ${assessments.length + 1}`,
      desc: `Description of Assessment ${assessments.length + 1}`,
      progress: Math.floor(Math.random() * 101), 
    };
    setAssessments([...assessments, newAssessment]);
  };

  return (
    <div className="h-auto w-[90%] mt-5 ml-[5%] bg-[#e6f6ec] rounded-lg p-4 overflow-hidden">
      <h1 className="font-semibold text-xl ml-5">Mock Assessments</h1>
      <div className="flex overflow-x-auto space-x-5 whitespace-nowrap ml-5 pb-4">
        {assessments.map((assessment) => {
          let progressColor = "bg-red-500";

          if (assessment.progress > 40 && assessment.progress < 80) {
            progressColor = "bg-yellow-500";
          } else if (assessment.progress >= 80) {
            progressColor = "bg-green-500";
          }

          return (
            <div
              key={assessment.id}
              className="h-auto w-[90%] sm:w-[45%] md:w-[30%] min-w-[250px] bg-[#edf2ef] shadow-2xl p-4 rounded-md flex-shrink-0"
            >
              <h1 className="text-lg font-semibold">{assessment.name}</h1>
              <p className="text-sm">{assessment.desc}</p>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className={`${progressColor} h-4 rounded-full`}
                  style={{ width: `${assessment.progress}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 text-gray-600">{assessment.progress}% completed</p>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center sm:justify-start mt-4">
        <button
          onClick={addNewAssessment}
          className="bg-[#01a768] h-10 p-2 w-40 rounded-lg text-white"
        >
          + Add New Assessment
        </button>
      </div>
    </div>
  );
}
