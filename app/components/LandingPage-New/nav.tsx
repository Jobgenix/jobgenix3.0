"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useMemo } from "react";

export default function Nav() {



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
    { name: "Internships", route: "/opportunities?type=internships" },
    { name: "Jobs", route: "/opportunities?type=jobs" },
    { name: "Courses", route: "/comingSoon" },
    { name: "Practice", route: "/comingSoon" },
    { name: "Mentorship", route: "/comingSoon" },
    { name: "Government Jobs", route: "/comingSoon" },
  ];
  const navItems = [
    { name: "Home", route: "/" },
    { name: "About us", route: "/comingsoon" },
    { name: "Roadmaps", route: "/roadmaps" },
    { name: "Internships", route: "/opportunities?type=internships" },
    { name: "Jobs", route: "/opportunities?type=jobs" },
    { name: "Ge-job-ready", route: "/comingsoon" },
  ];

  const [loginStatus, setLoginStatus] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  // Mobile menu state handled by DropdownMenu component
  
  console.log("Session data:", session?.user.id);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {
      setLoginStatus(true);
      setUserImage(session.user.image ?? null);
      
    } else {
      setLoginStatus(false);
      setUserImage(null);
    }
  }, [session, status]);

  return (
    <div className="relative">
      {/* GSAP Animated Text */}
      <div className="w-[80%] ml-44  overflow-hidden bg-[#004080] text-white py-2 px-4 text-center rounded-bl-full rounded-br-full hidden xl:block">
        <div
          ref={boxRef}
          className="h-[27px] relative flex items-center justify-center"
        >
          {messages.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) lines.current[index] = el;
              }}
              className="absolute opacity-0 whitespace-nowrap text-lg font-semibold"
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-4 sm:px-6 xl:px-0 xl:ml-24  bg-white ">
        {/* Logo */}
        <div className="Logo">
          <Image
            src="/images2/Logo.png"
            className="ml-4 xl:ml-32 mt-5 pt-3"
            alt="logo"
            width={150}
            height={150}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-8 xl:absolute left-[25%] mt-8 font-[sora]">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className={`text-md ${
                item.name === "Home" ? "text-blue-500" : "text-[#646A66]"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Buttons */}
          <button className="h-10 w-32 bg-[#30373d] text-white rounded-lg">
            For Business
          </button>
          <button className="h-10 w-32 border-black border rounded-lg">
            Hire the best
          </button>

          {/* Profile Button */}
          <Button
            className="bg-white h-12 w-24 sm:w-20 text-black hover:bg-white rounded-[18px] font-medium ml-[-3%]"
            onClick={() =>
              loginStatus ? router.push("/profile") : router.push("/login")
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
        </div>
        {/* Profile Button for mobile */}
        <div className="xl:hidden block mr-8 mt-4">
          <Button
            className="bg-white h-12 w-24 sm:w-20 text-black hover:bg-white rounded-[18px] font-medium"
            onClick={() =>
              loginStatus ? router.push("/profile") : router.push("/auth/login")
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
        </div>

        {/* // ✅ Mobile Menu Button  */}
        <div className="xl:hidden absolute top-5 right-5 z-50">
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
