"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/app/components/ui/switch";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import { formSectionProps } from "@/types/formSectionProps";
import { DegreeType } from "@/types/opportunityType";
import { degreeTypeSchema } from "@/constants/jobOpportunities";

interface coursesProps {
  id: DegreeType;
  label: string;
}

export default function SkillsRequired({ setFormData }: formSectionProps) {
  const [openForCollege, setOpenForCollege] = useState(false);
  const [specificCourse, setSpecificCourse] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<DegreeType[]>([]);

  useEffect(() => {
    if (selectedYear !== null) {
      setFormData('graduationYear', selectedYear); // Ensure correct field name
    }
    setFormData('degree', [...selectedCourses]);
  }, [selectedYear, selectedCourses]);
  

  const years = ["All", "2024", "2025", "2026", "2027", "2028", "2029"];
  const courses: coursesProps[] = [
    { id: degreeTypeSchema.Enum.all, label: "All Courses" },
    { id: degreeTypeSchema.Enum.bachelor, label: "B.Tech" },
    { id: degreeTypeSchema.Enum.master, label: "M.Tech" },
    { id: degreeTypeSchema.Enum.dual, label: "Intergrated / Dual Degree" },
    { id: degreeTypeSchema.Enum.other, label: "Others" },
  ];

  const handleCourseChange = (courseId: DegreeType) => {
    setSelectedCourses((prev) => {
      if (courseId === "all") {
        return prev.length === courses.length ? [] : courses.map((c) => c.id);
      }
      if (prev.includes(courseId)) {
        const newSelection = prev.filter((id) => id !== courseId);
        if (prev.includes("all")) {
          return newSelection.filter((id) => id !== "all");
        }
        return newSelection;
      }
      const newSelection = [...prev, courseId];
      if (newSelection.length === courses.length - 1) {
        return [...newSelection, "all"];
      }
      return newSelection;
    });
  };

  return (
    // <div className="w-full max-w-3xl mx-auto p-4 bg-[#F3FFF4]">
    <div className="space-y-6">
      {/* Title Section */}
      <div>
        <h2 className=" text-2xl font-medium text-[#2F8E5B]  inline-flex items-center gap-1">
          Skills Required: <span className="text-red-500">*</span>
        </h2>
        <p className=" mt-1 text-lg">
          Add the eligibility criteria to better filter the candidates.
        </p>
      </div>

      {/* Toggle Switches */}
      <div className="space-y-4">
        <div className="w-full  h-16 text-xl text-gray-600 bg-[#FFFCEF] border-none rounded-lg shadow-lg shadow-black/20 tracking-wide flex items-center justify-between p-4">
          <span className="text-gray-800 font-medium text-xl">
            Open for college students (currently studying)
          </span>
          <Switch
            checked={openForCollege}
            onCheckedChange={setOpenForCollege}
            className="data-[state=checked]:bg-[#2E7D32]"
          />
        </div>
      </div>

      <div className="w-full h-16 text-xl text-gray-600 bg-[#FFFCEF] border-none rounded-lg shadow-lg shadow-black/20 tracking-wide flex items-center justify-between p-4">
        <span className="text-gray-800 font-medium text-xl">
          Any specific course/ specialization/ graduating year
        </span>
        <Switch
          checked={specificCourse}
          onCheckedChange={setSpecificCourse}
          className="data-[state=checked]:bg-[#2E7D32]"
        />
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <Tabs defaultValue="engineering" className="w-full">
          <TabsList className="w-full justify-start h-auto bg-white border-b">
            <TabsTrigger
              value="engineering"
              className="relative px-4 py-2 text-gray-700 data-[state=active]:text-[#2E7D32] data-[state=active]:font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2E7D32] after:transform after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform"
            >
              Engineering Colleges
            </TabsTrigger>
            <TabsTrigger
              value="bschools"
              className="relative px-4 py-2 text-gray-700 data-[state=active]:text-[#2E7D32] data-[state=active]:font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2E7D32] after:transform after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform"
            >
              B-Schools
            </TabsTrigger>
            <TabsTrigger
              value="arts"
              className="relative px-4 py-2 text-gray-700 data-[state=active]:text-[#2E7D32] data-[state=active]:font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2E7D32] after:transform after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform"
            >
              Arts & Science
            </TabsTrigger>
            <TabsTrigger
              value="others"
              className="relative px-4 py-2 text-gray-700 data-[state=active]:text-[#2E7D32] data-[state=active]:font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2E7D32] after:transform after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform"
            >
              Others
            </TabsTrigger>
          </TabsList>

          <TabsContent value="engineering" className="p-4">
            <div className="grid md:grid-cols-[300px,1fr] gap-6">
              {/* Courses Checkboxes */}
              <div className="space-y-4 border-r pr-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={course.id}
                      checked={selectedCourses.includes(course.id)}
                      onCheckedChange={() => handleCourseChange(course.id)}
                      className="border-[#2E7D32] data-[state=checked]:bg-[#2E7D32] data-[state=checked]:text-white h-5 w-5"
                    />
                    <label
                      htmlFor={course.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {course.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Pass Out Year */}
              <div>
                <h4 className="text-sm font-medium mb-4">Pass Out Year</h4>
                <div className="flex flex-wrap gap-3">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors
                          ${
                            selectedYear === year
                              ? "bg-[#4CAF50] text-white"
                              : "border border-dashed border-gray-400 hover:border-[#4CAF50]"
                          }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bschools" className="p-4">
            <div className="text-center text-gray-500 py-8">Coming soon...</div>
          </TabsContent>

          <TabsContent value="arts" className="p-4">
            <div className="text-center text-gray-500 py-8">Coming soon...</div>
          </TabsContent>

          <TabsContent value="others" className="p-4">
            <div className="text-center text-gray-500 py-8">Coming soon...</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    // </div>
  );
}
