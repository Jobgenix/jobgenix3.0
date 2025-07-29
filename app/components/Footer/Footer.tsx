"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const [clipPathValue, setClipPathValue] = useState(
    "ellipse(50% 30% at 50% 0%)"
  );

  useEffect(() => {
    const handleResize = () => {
      const newValue =
        window.innerWidth >= 1024
          ? "ellipse(50% 30% at 50% 0%)"
          : "ellipse(50% 15% at 50% 0%)";
      setClipPathValue(newValue);
    };

    // Run once on mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <footer className="flex flex-col h-[53rem] sm:h-[58rem] md:h-[60rem]  lg:h-[70rem] relative overflow-hidden">
      {/* Background clipped header */}
      <div
        className="bg-[#021C2D] h-full relative z-0"
        style={{
          filter: "drop-shadow(0 10px 30px rgba(0, 123, 255, 0.2))",
        }}
      >
        <div className="relative -top-1 h-2 bg-[#F5F5F5]"></div>
        <div
          id="clipPath"
          className="absolute top-0 left-0 bg-[#F5F5F5] w-full h-full bg-cover bg-center bg-no-repeat mt-0"
          style={{ clipPath: clipPathValue }}
        ></div>
      </div>

      {/* Content overlapping the header */}
      <div
        id="frontContaint"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex flex-col justify-between gap-36 w-full h-full text-center text-white font-montserrat"
      >
        <div className="select-none lg:h-[30vh] w-full flex flex-col items-center justify-center gap-2">
          <div className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[400px] 2xl:w-[472px] h-auto mt-2 md:m-0">
            <Image
              src="/brand/jobGenix-black-blue.svg"
              alt="Logo"
              layout="responsive"
              width={250}
              height={250}
            />
          </div>
          <p className="text-sm sm:text-base text-[#333333] font-normal mt-2 px-4">
            Powering Dreams, One Career at a Time.
          </p>
        </div>

        {/* inner Containt */}
        <div className="w-4/5 gap-16 mx-auto px-4 text-center  ">
          {/* Subscribe Section */}
          <div className=" flex flex-col justify-between h-36 sm:h-40 ">
            <h3 className="text-xl font-montserrat font-semibold t">
              Subscribe
            </h3>
            <p className="text-[#C9C9C9] text-sm font-normal">
              Join our community to receive updates.
            </p>
            <div className="flex justify-center mt-2 gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="text-[#9A9A9A] text-[0.7rem] font-medium px-4 py-2 w-64  rounded-xl focus:outline-none"
              />
              <button className="bg-[#0073E6] text-base font-medium px-4 py-2 rounded-xl font-montserrat">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-xs font-semibold mt-2">
              By subscribing you agree to our Privacy Policy
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-between  gap-6 text-left mt-20">
            <div>
              <h4 className=" text-base md:text-lg lg:text-xl font-semibold mb-2">
                Quick Links
              </h4>
              <ul className="text-sm lg:text-base font-medium text-[#CAE4FD] space-y-1">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/opportunities?type=jobs">Explore Jobs</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Top Courses</Link>
                </li>
                <li>
                  <Link href="/comingsoon">For Employers</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Mentorship</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Blog</Link>
                </li>
                <li>
                  <Link href="/comingsoon">About Us</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Contact</Link>
                </li>
              </ul>
            </div>
            <div className=" hidden lg:block">
              <h4 className=" text-base md:text-lg lg:text-xl font-semibold mb-2 ">
                Popular Categories
              </h4>
              <ul className="text-sm lg:text-base font-medium text-[#CAE4FD] space-y-1">
                <li>
                  <Link href="/comingsoon">IT & Software</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Marketing & Sales</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Design & Creatives</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Business & Management</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Data Science & AI</Link>
                </li>
                <li>
                  <Link href="/opportunities?type=internships">
                    Internships
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              <h4 className=" text-base md:text-lg lg:text-xl font-semibold mb-2 ">
                Resources
              </h4>
              <ul className="text-sm lg:text-base font-medium text-[#CAE4FD] space-y-1">
                <li>
                  <Link href="/comingsoon">Resume Builder</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Career Guides</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Interview Tips</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Success Stories</Link>
                </li>
                <li>
                  <Link href="/comingsoon">FAQs</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Support Centre</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className=" text-base md:text-lg lg:text-xl font-semibold mb-2">
                Legal
              </h4>
              <ul className="text-sm lg:text-base font-medium text-[#CAE4FD] space-y-1">
                <li>
                  <Link href="/comingsoon">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/comingsoon">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Logo and Socials */}
          <div className="flex justify-between items-center mt-20">
            <Image
              src="/LandingPageImages/logoDark.svg"
              alt="Logo"
              height={100}
              width={100}
            />
            <div className="flex justify-center space-x-4">
              <a
                target="_blank"
                href="https://www.instagram.com/jobgenix.unbeatable/"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-gray-400 cursor-pointer hover:text-white" />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/jobgenix.unbeatable/"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-gray-400 cursor-pointer hover:text-white" />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/successwithjobgenix/"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="text-gray-400 cursor-pointer hover:text-white" />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t flex justify-between border-gray-700 mt-6 py-4 text-xs font-medium">
            <p>Made with 🩷 for dreamers</p>
            <p>© 2025 JobGenix. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
