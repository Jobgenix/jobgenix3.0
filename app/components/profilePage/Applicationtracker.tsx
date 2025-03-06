"use client";
import { useState } from "react";
import { FaFilter, FaSort } from "react-icons/fa";

export default function ApplicationTracker() {
  const applications = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      status: "Pending",
      dateApplied: "2025-02-25",
    },
    {
      id: 2,
      company: "Amazon",
      position: "Data Analyst",
      status: "Interview Scheduled",
      dateApplied: "2025-02-20",
    },
    {
      id: 3,
      company: "Microsoft",
      position: "Frontend Developer",
      status: "Rejected",
      dateApplied: "2025-02-18",
    },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Interview Scheduled":
        return "bg-blue-200 text-blue-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      case "Accepted":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="tracker xl:w-[90%] sm:w-[80%] lg:w-[50%] mx-auto mb-5 mt-8 bg-[#e6f6ec] rounded-lg p-5">
      <h1 className="text-xl font-semibold mb-4 text-center sm:text-left">Application Tracker</h1>
      <div className="header flex flex-col sm:flex-row justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-6 mb-4">
        <button className="h-10 w-full sm:w-28 p-2 border border-green-500 flex items-center justify-center space-x-2">
          <FaFilter className="text-gray-600" />
          <span>Filter</span>
        </button>
        <button className="h-10 w-full sm:w-28 p-2 border border-green-500 flex items-center justify-center space-x-2">
          <FaSort className="text-gray-600" />
          <span>Sort</span>
        </button>
      </div>

      <ul className="hidden sm:flex justify-between bg-white font-bold rounded-lg pb-2 px-4 border-gray-500">
        <li className="w-1/4">Company</li>
        <li className="w-1/4">Position</li>
        <li className="w-1/4">Status</li>
        <li className="w-1/4">Date Applied</li>
      </ul>

      <div className="mt-4">
        {applications.map((app) => (
          <div key={app.id} className="border-b py-2 px-4 bg-white rounded-md shadow-md mb-2">
            <ul className="sm:flex justify-between items-center">
              <li className="w-full sm:w-1/4 font-semibold text-center sm:text-left">{app.company}</li>
              <li className="w-full sm:w-1/4 text-center sm:text-left">{app.position}</li>
              <li className="w-full sm:w-1/4 text-center sm:text-left">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </li>
              <li className="w-full sm:w-1/4 text-center sm:text-left">{app.dateApplied}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
