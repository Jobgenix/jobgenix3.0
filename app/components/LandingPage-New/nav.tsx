"use client";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import gsap from "gsap";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Nav({ onLoginClick }: { onLoginClick?: () => void }) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const lines = useRef<HTMLDivElement[]>([]);
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
    { name: "Get-job-ready", route: "/comingsoon" },
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
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className={`text-md ${
                item.name === "Home" ? "text-blue-500" : "text-[#646A66]"
              } focus:text-blue-500`}
            >
              {item.name}
            </Link>
          ))}

          {/* Buttons */}
          <button
            className="h-10 w-32 bg-[#30373d] text-white rounded-lg"
            onClick={() => (window.location.href = "/comingsoon")}
          >
            For Business
          </button>
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
              {opportunityOptions.map((option) => (
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
