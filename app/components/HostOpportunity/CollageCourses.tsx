/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

export default function CollegeCourses({ onChange }: { onChange?: (data: any) => void }) {
  const [specificCourseYear] = useState(true);
  const [selectedCollegeType, setSelectedCollegeType] = useState("Engineering Colleges");
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [selectedPassOutYears, setSelectedPassOutYears] = useState<string[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const passOutYears = ["2024", "2025", "2026", "2027", "2028", "2029"];

  useEffect(() => {
    // Fetch degrees from backend (grouped by field)
    const fetchDegrees = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/job/get-degree?upload=1");
        const data = await res.json();
        setDegreeOptions(data);
      } catch (err) {
        setDegreeOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDegrees();
  }, []);

  // Map college type to degree fields (no 'All' tab)
  const collegeTypeMap: Record<string, string[]> = {
    "Engineering Colleges": ["engineering"],
    "B-Schools": ["business"],
    "Arts & Science": ["arts", "science"],
    "Others": ["other"],
  };

  // Tab order (no 'All')
  const tabOrder = ["Engineering Colleges", "B-Schools", "Arts & Science", "Others"];

  // Filter degree groups for the selected college type
  const filteredGroups = degreeOptions.filter((group) =>
    collegeTypeMap[selectedCollegeType]?.includes(group.field)
  );

  // Handler for course checkbox
  const handleCourseChange = (courseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCourseIds([...selectedCourseIds, courseId]);
    } else {
      setSelectedCourseIds(selectedCourseIds.filter((id) => id !== courseId));
    }
  };

  // Handler for passout year
  const handlePassOutYearChange = (year: string) => {
    if (selectedPassOutYears.includes(year)) {
      setSelectedPassOutYears(selectedPassOutYears.filter((y) => y !== year));
    } else {
      setSelectedPassOutYears([...selectedPassOutYears, year]);
    }
  };

  useEffect(() => {
    onChange?.({
      degree: selectedCourseIds,
      passoutYear: selectedPassOutYears,
    });
  }, [selectedCourseIds, selectedPassOutYears, onChange]);

  return (
    <div className="mb-12 w-full">
      {specificCourseYear && (
        <div className="mt-4 border border-[#AFAFAF] sm:border-none pt-2 sm:pt-4 bg-[#F8F8F8] card-shadow no-shadow-mobile sm:min-h-[22.6rem] rounded-xl font-inter font-medium text-base">
          {/* College Type Tabs */}
          <div className="flex border-b border-[#AFAFAF] sm:pb-1 overflow-x-auto activity-scroll ">
            {tabOrder.map((type) => (
              <div key={type} className="flex flex-col justify-end">
                <button
                  className={`px-4 py-2 font-medium rounded-t-md whitespace-nowrap ${selectedCollegeType === type ? "text-[#0073E6]" : ""}`}
                  onClick={() => setSelectedCollegeType(type)}
                >
                  {type}
                </button>
                <div
                  className={`w-full h-0 ${selectedCollegeType === type
                    ? "border-b-[5px] border-[#0073E6] rounded-2xl"
                    : "border-b-[5px] border-transparent"
                    }`}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-5 ">
            {/* Course Checkboxes, grouped by field */}
            <div className="w-full sm:max-w-52 flex flex-col">
              {loading ? (
                <div className="text-gray-500 p-4">Loading degrees...</div>
              ) : filteredGroups.length === 0 ? (
                <div className="text-gray-500 p-4">No courses found.</div>
              ) : (
                filteredGroups.map((group) => (
                  group.degrees.length > 0 && (
                    <div key={group.field} className="mb-2">
                      <div className="flex flex-col gap-0.5">
                        {group.degrees.map((course: any) => (
                          <label
                            key={course.id}
                            className="flex items-center cursor-pointer pl-5 py-2 h-12 border-b border-[#AFAFAF] last:border-b-0 w-full"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600 h-4 w-5"
                              checked={selectedCourseIds.includes(course.id)}
                              onChange={(e) => handleCourseChange(course.id, e.target.checked)}
                            />
                            <span className="ml-2 text-gray-700">{course.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                ))
              )}
            </div>
            {/* Pass Out Year */}
            <div className="pb-3 px-3 sm:p-0">
              <label className="block text-gray-700 py-4">Pass Out Year</label>
              <div className="flex flex-wrap gap-x-3 gap-y-4 mt-3">
                {["All", ...passOutYears].map((year) => (
                  <button
                    key={year}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-[3.2rem] border ${selectedPassOutYears.includes(year)
                      ? "bg-[#DEEEFF] border-[#0073E6]"
                      : "bg-white border-[#383838] border-dashed hover:bg-gray-100"
                      }`}
                    onClick={() => handlePassOutYearChange(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
