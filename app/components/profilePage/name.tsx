"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import profileLog from "@/public/images/user.png"
import { toast } from "sonner";

export default function Name() {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    profileImage: "",
    email: "",
    phone: "",
    university: "",
    location: "",
    summary: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEdited, setIsEdited] = useState(false); // New state to track edits

  // Fetch user details from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/profileInfo");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setFormData(data);
      } catch (error) {
        setError("Error fetching user details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen"><p className="text-center mt-4">Loading...</p></div>;
  if (error) toast.error("Something Went Wrong");;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsEdited(true); // Mark form as edited
  };

  const handleSave = async () => {
    setError("");
    try {
      const response = await fetch("/api/profileInfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: formData.userId }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update profile.");

      toast.success(result.message);
      setIsEdited(false); // Reset edit state after saving
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEdited(false); // Hide buttons
    //window.location.reload(); // Refresh page to reset fields (or fetch initial data again)
    setIsEdited(false)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#c6f7d5] px-4 sm:px-2">
      <div className="w-full xl:w-[91%] max-w-8xl ml-2 bg-green-50 p-6 sm:p-4 rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
          <Image
            src={formData.profileImage}
            width={70}
            height={70}
            alt="Profile"
            className="w-16 h-16 rounded-full mb-2 sm:mb-0"
          />
          <div>
            <h1 className="text-2xl font-semibold">{formData.name}</h1>
            {/* <p className="text-gray-500">Developer</p> */}
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="relative">
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              readOnly
              value={formData.email}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            {/* <FaTimes className="absolute top-10 right-3 text-gray-500 cursor-pointer" /> */}
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

        {/* Buttons (appear only when edited) */}
        {isEdited && (
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
