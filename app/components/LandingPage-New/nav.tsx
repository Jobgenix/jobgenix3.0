"use client";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";
import gsap from "gsap";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Nav({ onLoginClick }: { onLoginClick?: () => void }) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const lines = useRef<HTMLDivElement[]>([]);
  const pathname = usePathname();

  const messages = useMemo(
    () => [
      "📢 Empowering future leader across 20+ cities and counting !",
      "🚀 Need help ? our mentors are online Now- Book free sessions !",
      "💼 New Internship! openings just dropped - Apply before they are gone !",
      "🎉Join 8000+ students and job seekers growing their careers with Jobgenix",
    ],
    []
  );
  useEffect(() => {
    if (!boxRef.current || lines.current.length === 0) return;

    // Clear any previous inline styles
    lines.current.forEach((line) => {
      gsap.set(line, { clearProps: "all" });
    });

    const tl = gsap.timeline({ repeat: -1 });

    messages.forEach((_, index) => {
      if (!lines.current[index]) return;

      tl.set(lines.current[index], { opacity: 0, x: "-100%" });

      tl.to(lines.current[index], {
        opacity: 1,
        x: "0%",
        duration: 1,
        ease: "power2.inOut",
      }).to(
        lines.current[index],
        {
          x: "100%",
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "+=1"
      );
    });

    return () => {
      tl.kill();
    };
  }, [messages]);

  const opportunityOptions = [
    { name: "Home", route: "/" },
    { name: "Internships", route: "/Opportunities/internships" },
    { name: "Jobs", route: "/Opportunities/jobs" },
    { name: "Get-job-ready", route: "/gwj" },
    { name: "Courses", route: "/comingsoon" },
    { name: "Practice", route: "/comingsoon" },
    { name: "Mentorship", route: "/comingsoon" },
    { name: "Government Jobs", route: "/comingsoon" },
    { name: "Profile", route: "/profile" },
  ];

  const navItems = [
    { name: "Home", route: "/" },
    { name: "About us", route: "/about-us" },
    { name: "Roadmaps", route: "/roadmaps" },
    { name: "Internships", route: "/Opportunities/internships" },
    { name: "Jobs", route: "/Opportunities/jobs" },
    { name: "Get-job-ready", route: "/gwj" },
  ];

  const navItemsForblog = [
    {
      id: 1,
      name: "Career Advice",
      children: [
        {
          name: "Resume and Cover Letter Tips",
        },
        {
          name: "Interview Preparation",
        },
        { name: "Job Search Strategies" },
        {
          name: "Personal Branding & Networking",
        },
        {
          name: "Career Growth & Development",
        },
      ],
    },

    // {
    //   name: "Internships & Entry-Level Jobs",
    //   children: [
    //     {
    //       name: "How to Find Internships",
    //       route: "/internships-entry-jobs/find-internships",
    //     },
    //     {
    //       name: "Internship Success Stories",
    //       route: "/internships-entry-jobs/success-stories",
    //     },
    //     {
    //       name: "Entry-Level Job Guides",
    //       route: "/internships-entry-jobs/job-guides",
    //     },
    //     {
    //       name: "Skills Employers Look For",
    //       route: "/internships-entry-jobs/skills",
    //     },
    //     {
    //       name: "Transitioning from Internship to Job",
    //       route: "/internships-entry-jobs/transition",
    //     },
    //   ],
    // },

    {
      id: 2,

      name: "Industry Insights",
      children: [
        {
          name: "Job Market Trends",
        },
        {
          name: "Emerging Industries",
        },
        {
          name: "In-Demand Skills",
        },
        {
          name: "Technology and Automation Impact",
        },
        {
          name: "Sector-specific Insights",
        },
      ],
    },

    // {
    //   name: "Skill Development & Certifications",
    //   children: [
    //     {
    //       name: "Top Online Courses",
    //       route: "/skill-development/online-courses",
    //     },
    //     {
    //       name: "Must-Have Certifications",
    //       route: "/skill-development/certifications",
    //     },
    //     {
    //       name: "Soft Skills Development",
    //       route: "/skill-development/soft-skills",
    //     },
    //     {
    //       name: "Technical Skill Tutorials",
    //       route: "/skill-development/technical-tutorials",
    //     },
    //     {
    //       name: "Time Management & Productivity",
    //       route: "/skill-development/productivity",
    //     },
    //   ],
    // },

    {
      id: 3,
      name: "Success Stories and Interviews",
      children: [
        { name: "Student Success Stories" },
        {
          name: "Industry Expert Interviews",
        },
        { name: "Job Seeker Journeys" },
        {
          name: "Startup Founders’ Stories",
        },
        {
          name: "Inspirational Career Transformations",
        },
      ],
    },

    // {
    //   name: "Job Alerts & Opportunities",
    //   children: [
    //     { name: "Latest Job Openings", route: "/job-alerts/latest" },
    //     { name: "Government Jobs Updates", route: "/job-alerts/government" },
    //     { name: "Part-Time & Remote Jobs", route: "/job-alerts/remote" },
    //     { name: "Campus Recruitment Drives", route: "/job-alerts/campus" },
    //     { name: "Freelance & Gig Work", route: "/job-alerts/freelance" },
    //   ],
    // },
  ];

  const [loginStatus, setLoginStatus] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  // Mobile menu state handled by DropdownMenu component

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {
      setLoginStatus(true);
      setUserImage(session.user.image || null);
    } else {
      setLoginStatus(false);
      setUserImage(null);
    }
  }, [session, status]);
  return (
    <div className="relative">
      {/* GSAP Animated Text */}
      <div
        className="w-[95%] sm:w-[90%] 2xl:w-[80%] mx-auto h-5 md:h-[27px] overflow-hidden bg-[#0073E6] md:bg-[#004080] text-white py-2 px-4 text-center rounded-bl-full rounded-br-full "
        style={{
          boxShadow: `
        0px 18px 41px 0px #0D6DDA33,
        0px 74px 74px 0px #0D6DDA2B,
        0px 166px 100px 0px #0D6DDA1A,
        0px 295px 118px 0px #0D6DDA08,
        0px 461px 129px 0px #0D6DDA00
      `,
        }}
      >
        <div
          ref={boxRef}
          className="h-full relative flex items-center justify-center"
        >
          {messages.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) lines.current[index] = el;
              }}
              className="absolute opacity-0 whitespace-nowrap text-[0.6rem] md:text-sm lg:text-lg font-semibold"
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-4 sm:px-6 xl:px-0 w-[95%] md:w-[85%] 2xl:w-[75%] mx-auto mt-2 bg-transparent">
        {/* Logo */}
        <div
          className="Logo w-[8rem] sm:w-auto cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/brand/jobGenix-black-blue.svg"
            className=""
            alt="logo"
            width={150}
            height={150}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-4 mt-1 font-[sora] ">
          {pathname.startsWith("/blogs") ||
          pathname.startsWith("/categoryblogs") ? (
            <div className="flex gap-6 relative">
              {navItemsForblog.map((item, index) => (
                <div key={index} className="group relative">
                  {/* Parent category (not clickable, or you can keep route if needed) */}
                  <button className="text-md px-3 py-2 rounded-md text-[#333] hover:text-blue-500 transition-colors text-[15px]">
                    {item.name}
                  </button>

                  {/* Dropdown */}
                  {item.children && item.children.length > 0 && (
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md min-w-[240px] z-50">
                      <ul className="flex flex-col">
                        {item.children.map((child, i: number) => (
                          <li key={i}>
                            <Link
                              href={`categoryblogs/${item.name}/${child.name}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.route}
                  className={`mx-2 text-md ${
                    item.name === "Home" ? "text-blue-500" : "text-[#646A66]"
                  } focus:text-blue-500`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Buttons */}
          {session?.user.role === "4" ? (
            <button
              className="h-10 w-32 bg-[#30373d] text-white rounded-lg"
              onClick={() => router.push("/blogs/writeBlogs")}
            >
              Write Blog
            </button>
          ) : (
            <button
              className="h-10 w-32 text-white rounded-lg"
              style={{
                backgroundColor: "black",
              }}
              onClick={() => router.push("/blogs/")}
            >
              Blogs
            </button>
          )}
          <button
            className="h-10 w-32 border-black border rounded-lg transition-colors duration-200  hover:bg-black/40 hover:text-white active:scale-95"
            onClick={() => (window.location.href = "/hostOpportunity")}
          >
            Hire the best
          </button>

          {/* Profile Button */}
          <span
            className="flex items-center justify-center h-12 w-12 text-black rounded-full font-medium ml-2 bg-transparent cursor-pointer"
            onClick={() =>
              loginStatus ? router.push("/profile") : onLoginClick?.()
            }
          >
            {loginStatus ? (
              userImage ? (
                <Image
                  src={userImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full h-10 w-10 object-cover"
                />
              ) : (
                "Logout"
              )
            ) : (
              "Login"
            )}
          </span>
        </div>
        {/* Profile Button for mobile */}
        {/* <div className="xl:hidden block  mr-2">
          <Button
            className="bg-white h-12 w-24 sm:w-20 text-black hover:bg-white rounded-[18px] font-medium"
            onClick={() =>
              loginStatus ? router.push("/profile") : onLoginClick()
            }
          >
            {loginStatus ? (
              userImage ? (
                <Image
                  src={userImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full h-10 w-10"
                />
              ) : (
                "Logout"
              )
            ) : (
              "Login"
            )}
          </Button>
        </div> */}

        {/* // ✅ Mobile Menu Button  */}
        <div className="xl:hidden z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex flex-col gap-1">
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60 bg-gray-300 mt-4 flex flex-col p-0">
              {pathname.startsWith("/blogs") ||
              pathname.startsWith("/categoryblogs")
                ? navItemsForblog.map((item) => (
                    <DropdownMenuSub key={item.id}>
                      <DropdownMenuSubTrigger className="px-2 py-1.5 text-sm font-bold text-[#333] hover:bg-gray-400">
                        {item.name}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="bg-gray-200 hidden md:block">
                        {item.children.map((child, idx) => (
                          <DropdownMenuItem
                            key={idx}
                            className="p-0 hover:bg-gray-300"
                          >
                            <Link
                              href={`/categoryblogs/${encodeURIComponent(
                                item.name
                              )}/${encodeURIComponent(child.name)}`}
                              className="w-full px-2 py-1.5 text-sm text-[#555]"
                            >
                              {child.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                      {/* Nested children */}
                      {/* Nested children */}
                      <div
                        className="pl-4 flex flex-col sm:absolute sm:left-full sm:top-0 sm:pl-0 sm:bg-gray-200 max-h-[70vh] overflow-y-auto
  "
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={`/categoryblogs/${encodeURIComponent(
                              item.name
                            )}/${encodeURIComponent(child.name)}`}
                            className="px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-300"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </DropdownMenuSub>
                  ))
                : opportunityOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.name}
                      className="p-0 hover:bg-gray-400"
                    >
                      <Link
                        href={option.route}
                        className="w-full px-2 py-1.5 text-sm text-[#646A66] font-bold"
                      >
                        {option.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
