"use client";

import React from "react";
import Footer from "../components/Footer/Footer";
import Nav from "../components/LandingPage-New/nav";

export default function AboutUsPage() {
  return (
    <div className="font-sora min-h-screen flex flex-col bg-[#F5F5F5]">
      <Nav onLoginClick={() => (window.location.href = "/login")} />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4 text-center">
          About Us
        </h1>
        <p className="text-gray-700 text-lg  mb-8">
          Welcome to{" "}
          <span className="font-semibold text-blue-700">Jobgenix</span>! We
          are dedicated to connecting talented individuals with great
          opportunities.
          <br />
          Our mission is to simplify the job search process and help companies
          find the perfect candidates.
        </p>
        <section className="w-full mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-2 ">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mx-auto max-w-md">
            <li>Integrity and transparency</li>
            <li>Innovation in recruitment</li>
            <li>Commitment to our users</li>
          </ul>
        </section>
        <section className="w-full">
          <h2 className="text-xl font-semibold text-green-700 mb-2 ">
            Contact Us
          </h2>
          <p className="text-gray-700 text-center">
            Have questions? Reach out at{" "}
            <a
              href="mailto:info@jobgenix.com"
              className="text-blue-600 underline"
            >
              support@jobgenix.co.in
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
