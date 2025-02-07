"use client";

import { useState } from "react";
import Image from "next/image";
import Button1 from "../job-display-components/button1";

export default function ApplyPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full min-h-screen sm:hidden">
            {/* Search Section */}
            <div className="min-h-screen w-full pt-20 mt-[-30%] bg-[#EFF7EB]">
                <div className="flex relative mt-16 px-3">
                    <input
                        type="text"
                        placeholder="Search for better opportunities"
                        className="w-9/12 h-16 border-2 border-black rounded-l-2xl text-xl shadow-2xl pl-5 ml-2 border-none outline-none"
                    />
                    <button className="bg-green-500 w-20 h-16 rounded-r-2xl text-white text-xl shadow-2xl flex justify-center items-center">
                        <Image src="/send.png" alt="search" width={30} height={30} />
                    </button>
                </div>

                {/* Job Listings */}
                <div className="p-5">
                    <p className="text-xl font-bold mb-4">37+ Job Opportunities Found</p>

                    {/* Filters */}
                    <div className="flex space-x-2 justify-center items-center mb-4">
                        <select className="p-2 rounded-xl text-white outline-none bg-[#01A768]">
                            <option>Passing Year</option>
                            <option>2019</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                        </select>
                        <select className="p-2 rounded-xl text-white outline-none bg-[#01A768]">
                            <option>Stream</option>
                            <option>B.Tech</option>
                            <option>M.Tech</option>
                            <option>MBA</option>
                        </select>
                        <select className="p-2 rounded-xl text-white outline-none bg-[#01A768]">
                            <option>Type</option>
                            <option>Internships</option>
                            <option>Full-Time</option>
                            <option>Part-Time</option>
                        </select>
                    </div>

                    {/* Jobs Container with Infinite Scroll */}
                    <div className="jobs h-[500px] overflow-y-auto space-y-4">
                        {[
                            { company: "GE Vernova", logo: "/Path_1.png" },
                            { company: "", logo: "/Group.png" },
                            { company: "Honeywell", logo: "/honeywell_icon.jpeg.png" },
                            { company: "Unknown", logo: "" },
                            { company: "Unknown", logo: "" },
                        ].map((job, index) => (
                            <div
                                key={index}
                                className="p-4 h-48 border rounded-3xl bg-[#FEFFE1] hover:bg-[#C6F7D5] cursor-pointer"
                            >
                                <p className="text-2xl font-bold">Software Engineer</p>
                                <p className="block mt-2 ml-2 text-xl">Bangalore, Karnataka</p>

                                <div className="float-right h-6 w-20 text-center rounded-lg mt-[-15%] bg-[#01A768]">
                                    <p className="text-white">Remote</p>
                                </div>

                                <Button1 />

                                {/* Company Info */}
                                {job.logo && (
                                    <div className="flex items-center mt-[-10%]">
                                        <Image src={job.logo} width={40} height={40} alt={job.company} />
                                        <p className="text-[15px] font-bold ml-2">{job.company}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
