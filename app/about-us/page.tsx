"use client";

import React from "react";
import Footer from "../components/Footer/Footer";
import Nav from "../components/LandingPage-New/nav";
import { BookOpen, GraduationCap, Users } from "lucide-react";
const stats = [
  {
    id: 1,
    title: "Discover your dream job",
    value: "400+ hiring partners",
    icon: <BookOpen className="text-orange-400 w-10 h-10" />,
  },
  {
    id: 2,
    title: "Crack your dream job with 20+ courses curated by industry experts",
    value: " Learn with 20+ courses",
    icon: <Users className="text-blue-400 w-10 h-10" />,
  },
  {
    id: 3,
    title: "Get job-ready with practical knowledge & real-world experience",
    value: "100+ industry problem",
    icon: <GraduationCap className="text-green-400 w-10 h-10" />,
  },
];

const items = [
  {
    title: "Our Vision",
    text: "Powering career success for every member of the global workforce as their trusted lifelong learning partner.",
    imgAlt: "Vision illustration",
  },
  {
    title: "Our Mission",
    text: "Making our learners achieve their desired outcomes.",
    imgAlt: "Mission illustration",
  },
];

export default function AboutUsPage() {
  return (
    <div className="font-sora flex flex-col bg-[#F5F5F5] ">
      <Nav onLoginClick={() => (window.location.href = "/login")} />
      <main className="md:px-20 px-5">
        <div className="py-20">
          <h3 className="text-3xl">About Us</h3>
          <h1 className="text-5xl font-medium mt-4">Your Dream Our Goal</h1>
        </div>

        <div className="py-5">
          <h3 className="text-3xl mb-4">Jobgenix</h3>
          <p>
            Jobgenix was born with a simple mission - to make landing a dream
            job as easy as two clicks. Founded by Souvik Saha, the platform is
            designed for GenZ students and young professionals frustrated with
            outdated, complicated job portals. At its core, Jobgenix uses Al to
            analyze uploaded CVs and instantly show a candidate&apos;s selection
            percentage, giving them clarity and confidence before applying.
            Along with smart CV editing and structured programs, Jobgenix
            prepares students to face real-world opportunities with confidence.
            More than just a platform, it is a community empowering youth to
            step boldly into the future of work.
          </p>
        </div>
        <h1 className="text-5xl font-medium mt-16 text-center">
          What gives us an edge?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto p-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-all"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {item.value}
                </h2>
                <p className="text-gray-500 text-sm font-medium mt-2">
                  {item.title}
                </p>
              </div>
              <div className="flex justify-end items-center">
                <div className="bg-orange-50 p-3 rounded-lg inline-block">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
            >
              {/* Image Placeholder */}
              {/* <div className="h-52 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
                Image Placeholder
              </div> */}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Heading */}
            <h2 className="text-4xl font-bold text-gray-900 mb-10">
              Contact us
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 - Inquiries */}
              <div className="bg-[#F5F9FF] rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {/* Icon placeholder */}
                  <div className="h-10 w-10 bg-yellow-100 rounded flex items-center justify-center text-2xl">
                    👋
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3">Inquiries</h3>
                <p className="text-gray-700">
                  <strong>Partnerships - </strong>
                  <a href="mailto:partner@unstop.com" className="text-blue-600">
                    team.jobgenix@jobgenix.co.in
                  </a>
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Sales Inquiries - </strong>
                  +91 9830981268 <br />
                  <span className="text-sm text-gray-500">
                    (Monday to Saturday, 11:00 AM to 8:00 PM)
                  </span>
                </p>
              </div>

              {/* Card 2 - Company */}
              <div className="bg-[#F5F9FF] rounded-2xl p-8 shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center mb-4">
                  {/* Icon placeholder */}
                  <div className="h-10 w-10 bg-yellow-100 rounded flex items-center justify-center text-2xl">
                    🏢
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3">Company</h3>
                <p className="text-gray-700">
                  <strong>Company Name - </strong>Jobgenix
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>MSME - </strong>MSME registered enterprise
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
