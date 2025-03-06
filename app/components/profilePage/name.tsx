"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Name() {
  const [formData, setFormData] = useState({
    email: "sp@example.com",
    phone: "+91 9456XXXXX",
    university: "Example Institute of Technology",
    location: "India",
    summary: "summary for me is summary.",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-[#c6f7d5] px-4 sm:px-2">
      <div className="w-full xl:w-[91%] max-w-8xl ml-2  bg-green-50 p-6 sm:p-4 rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
          <img
            src="https://via.placeholder.com/70"
            alt="Profile"
            className="w-16 h-16 rounded-full mb-2 sm:mb-0"
          />
          <div>
            <h1 className="text-2xl font-semibold">Swarnava Paul</h1>
            <p className="text-gray-500">Developer</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="relative">
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            <FaTimes className="absolute top-10 right-3 text-gray-500 cursor-pointer" />
            <p className="text-xs text-red-500">* Required</p>
          </div>

          <div className="relative">
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            <p className="text-xs text-red-500">* Required</p>
          </div>

          <div className="relative">
            <label className="text-sm text-gray-600">College/University</label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            <FaTimes className="absolute top-10 right-3 text-gray-500 cursor-pointer" />
            <p className="text-xs text-red-500">* Required</p>
          </div>
  
          <div className="relative">
            <label className="text-sm text-gray-600">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm text-gray-600">Professional Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 h-24 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto">
            Save Changes
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
