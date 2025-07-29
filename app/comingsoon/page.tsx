"use client";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "../components/Footer/Footer";
import Nav from "../components/LandingPage-New/nav";

export default function ComingSoon() {
  return (
    <div
      className={`font-sora min-h-screen flex flex-col bg-gradient-to-br bg-[#F5F5F5]`}
    >
      <Nav onLoginClick={() => (window.location.href = "/login")} />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center gap-6 bg-white/80 rounded-2xl shadow-lg p-8 max-w-xl w-full">
          <div className="flex items-center gap-3">
            <Image
              src="/images/emoji.png"
              alt="Icon"
              width={40}
              height={40}
              className="hidden md:block"
            />
            <h1 className="text-3xl md:text-5xl font-bold text-green-600">
              Hey!
            </h1>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-700 text-center">
            We are cooking <br /> this feature...
          </h2>
          <div className="p-3 text-lg text-white bg-[#2F8E5B] rounded-xl text-center">
            Meanwhile, feel free to interact with our socials.
          </div>
          <div className="flex gap-6 mt-2 items-center justify-center">
            <Link
              href="https://www.linkedin.com/company/successwithjobgenix/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-blue-600 text-3xl hover:scale-110 transition"
              />
            </Link>
            <Link
              href="https://www.instagram.com/jobgenix.unbeatable/"
              target="_blank"
              aria-label="Instagram"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-pink-500 text-3xl hover:scale-110 transition"
              />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
