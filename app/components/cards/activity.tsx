"use client";
import React from "react";
import { PencilLine, Trash2, Eye, FileDown } from "lucide-react";
import { Sora } from "next/font/google";
import { useState } from "react";

const sorafont = Sora({
  subsets: ["latin"],
  weight: "400",
});

export default function Activity() {
  
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div
      className={`${sorafont.className} md:w-[735px] mx-auto p-4 space-y-8 mt-25`}
    >
      {/* User Profile Section */}
      <div className="bg-white flex flex-col items-center gap-10  [background:var(--Neutrals-White,#FFF)] shadow-[1px_1px_2px_0px_rgba(255,255,255,0.30)_inset,-1px_-1px_2px_0px_rgba(198,198,198,0.50)_inset,-4px_4px_8px_0px_rgba(198,198,198,0.20),4px_-4px_8px_0px_rgba(198,198,198,0.20),-4px_-4px_8px_0px_rgba(255,255,255,0.90),4px_4px_10px_0px_rgba(198,198,198,0.90)] pt-6 pb-[50px] px-11 rounded-[15px]">
        <div className="flex items-center gap-6 justify-center">
          <h2 className="text-lg">User Profile</h2>
          <button onClick={()=>setIsEditable(!isEditable)} className={`${isEditable && "bg-slate-200"} px-3 rounded-md py-2 cursor-pointer text-blue-600 flex items-center gap-2 text-sm font-medium`}>
            Edit <PencilLine size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div>
            <div className="relative mt-1 w-full">
              <label className="text-xs bg-white absolute left-3 -top-[7px] px-[2px] font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="surajit.saha@example.com"
                readOnly={!isEditable}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0 pl-4 pb-1">
                * Required
              </span>
            </div>
          </div>
          <div>
            <div className="relative mt-1 w-full">
              <label className="text-xs bg-white absolute left-3 -top-[7px] px-[2px] font-medium">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="(+91) 9456XXXXXX"
                readOnly={!isEditable}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0 pl-4 pb-1">
                * Required
              </span>
            </div>
          </div>
          <div>
            <div className="relative mt-1 w-full">
              <label className="text-xs bg-white absolute left-3 -top-[7px] px-[2px] font-medium">
                College/University
              </label>
              <input
                type="text"
                placeholder="Example Institute of Technology"
                readOnly={!isEditable}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0 pl-4 pb-1">
                * Required
              </span>
            </div>
          </div>
          <div>
            <div className="relative mt-1 w-full">
              <label className="text-xs bg-white absolute left-3 -top-[7px] px-[2px] font-medium">
                Location
              </label>
              <input
                type="text"
                placeholder="City, State"
                readOnly={!isEditable}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0 pl-4 pb-1">
                * Required
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <div className="bg-white rounded-2xl  p-6 space-y-4 shadow-[1px_1px_2px_0px_rgba(255,255,255,0.30)_inset,-1px_-1px_2px_0px_rgba(198,198,198,0.50)_inset,-4px_4px_8px_0px_rgba(198,198,198,0.20),4px_-4px_8px_0px_rgba(198,198,198,0.20),-4px_-4px_8px_0px_rgba(255,255,255,0.90),4px_4px_10px_0px_rgba(198,198,198,0.90)]">
        <h2 className="text-center text-[color:var(--Neutrals-Dark-Grey,#333)] [font-family:Sora] text-2xl font-normal leading-[var(--Display-Small-Line-Height,44px)] tracking-[var(--Display-Medium-Tracking,0px)]">
          CV/Resume Management
        </h2>
        <div className="md:flex items-center justify-between bg-gray-100 rounded-xl p-3 text-sm">
          <div className="flex items-center gap-2">
            <FileDown className="text-red-600" />
            <div className="flex flex-col gap-0 justify-center pl-2">
              <span className="text-xs">Surajit_Saha_UIUX_CV_2025.pdf</span>{" "}
              <span className="text-gray-500 text-[10px] font-semibold">
                (Updated on Mar 30, 2025)
              </span>
            </div>
          </div>
          <div className="flex gap-3 ml-10 md:ml-0">
            <button className="text-gray-700 hover:text-black flex items-center gap-1">
              <Eye size={16} /> Preview
            </button>
            <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Learning Activity */}
      <div className="relative bg-white rounded-2xl p-6 space-y-4 shadow-[1px_1px_2px_0px_rgba(255,255,255,0.30)_inset,-1px_-1px_2px_0px_rgba(198,198,198,0.50)_inset,-4px_4px_8px_0px_rgba(198,198,198,0.20),4px_-4px_8px_0px_rgba(198,198,198,0.20),-4px_-4px_8px_0px_rgba(255,255,255,0.90),4px_4px_10px_0px_rgba(198,198,198,0.90)]">
        <h2 className="text-lg mx-auto w-fit font-semibold">
          Learning Activity
        </h2>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto md:overflow-x-hidden">
          {/* Month Labels */}
          <div className="grid grid-cols-52 min-w-[800px] md:min-w-full pl-8 mb-1">
            {[
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
              "Jan",
              "Feb",
              "Mar",
              "Apr",
            ].map((month, i) => (
              <div key={i} className="col-span-4 text-xs text-gray-500">
                {month}
              </div>
            ))}
          </div>

          {/* Selected Month */}
          <div className="absolute md:top-[40px] md:right-[30px] right-[10px] top-[50px] text-sm text-gray-600">
              2025 ▾ January
            </div>


          {/* Activity Grid */}
          <div className="relative grid grid-cols-52 gap-[2px] text-[0px] min-w-[800px] md:min-w-full pl-10">
            {/* Days of the Week */}
            <div className="absolute left-1 flex flex-col gap-3 items-center justify-center h-[60px]">
              {["Mon", "Wed", "Fri"].map((day, i) => (
                <div key={i} className="text-xs text-gray-500 h-[8px]">
                  {day}
                </div>
              ))}
            </div>

            {/* Activity Cells */}
            {Array.from({ length: 52 * 7 }).map((_, i) => {
              const isFilled = [34, 67, 110, 222, 300].includes(i); // example filled cells
              return (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-[2px] border-[0.5px] ${
                    isFilled ? "bg-blue-600" : "bg-white"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
