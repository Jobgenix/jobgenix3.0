'use client'
import Nav from "../components/LandingPage-New/nav";
import { Sora } from 'next/font/google'; // Corrected import path

// Initialize the Sora font
const soraFont = Sora({
    subsets: ['latin'],
    // Optional: Add weights if needed (e.g., 400, 700)
    // weight: ['400', '700'],
    // Optional: Add styles if needed (e.g., 'normal', 'italic')
    // style: ['normal', 'italic'],
});

export default function Opertunites() {
    return (
        <main className={soraFont.className}>
            <Nav />


            <div className="bg-[#021C2D] my-4 flex flex-col items-center py-8 relative">
                {/* Bubble decorations - now smaller and flanking the text */}
                <div className="absolute w-full max-w-2xl flex justify-between items-center px-4 top-1/2 transform -translate-y-1/2">
                    {/* Left side bubbles */}
                    <div className="flex flex-col items-start space-y-2">
                        {/* Large left bubble (now smaller) */}
                        <div className="w-16 h-16 rounded-full bg-[#0073E6] opacity-30"></div>
                        {/* Small left bubble */}
                        <div className="w-10 h-10 rounded-full bg-[#0073E6] opacity-30 ml-4"></div>
                    </div>

                    {/* Right side bubbles */}
                    <div className="flex flex-col items-end space-y-2">
                        {/* Medium right bubble (now smaller) */}
                        <div className="w-12 h-12 rounded-full bg-[#0073E6] opacity-30"></div>
                        {/* Additional small right bubble */}
                        <div className="w-8 h-8 rounded-full bg-[#0073E6] opacity-30 mr-4"></div>
                    </div>
                </div>

                {/* Main heading with bubbles on sides */}
                <div className="relative z-10 px-4 max-w-2xl text-center">
                    <h1 className="text-4xl text-white font-bold mb-12">
                        Unlock Your Potential: Find Your Dream Job Today
                    </h1>
                </div>

                {/* Search elements */}
                <div className="relative -bottom-16 bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl mx-auto flex flex-wrap gap-4 justify-center items-end">
                    <div className="flex-1 min-w-[250px]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search jobs, keywords"
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                            />
                            <svg
                                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <select className="p-3 border border-gray-300 rounded-lg bg-white">
                        <option>All Years</option>
                        <option>2023</option>
                        <option>2022</option>
                        <option>2021</option>
                    </select>

                    <select className="p-3 border border-gray-300 rounded-lg bg-white">
                        <option>All Streams</option>
                        <option>Engineering</option>
                        <option>Business</option>
                        <option>Design</option>
                    </select>

                    <button className="bg-[#0073E6] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                        Apply Now
                    </button>
                </div>
            </div>




        </main>
    );
}