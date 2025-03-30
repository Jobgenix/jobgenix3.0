"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/app/components/ui/button";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const opportunityOptionsHamburger = [
    { name: "Home", route: "/opportunities?type=internships" },
    { name: "About us", route: "/opportunities?type=jobs" },
    { name: "Internships", route: "/comingSoon" },
    { name: "Jobs", route: "/comingSoon" },
    { name: "Roadmaps", route: "/roadmaps" },
    { name: "Opportunities", route: "/comingSoon" },
    { name: "Courses", route: "/comingSoon" },
    { name: "Practice", route: "/comingSoon" },
  ];

  const opportunityOptions = [
    { name: "Courses", route: "/comingSoon" },
    { name: "Practice", route: "/comingSoon" },
    { name: "Mentorship", route: "/comingSoon" },
    { name: "Government Jobs", route: "/comingSoon" },
  ];

  const [loginStatus, setLoginStatus] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      setLoginStatus(true);
      setUserImage(session?.user?.image ?? null);
    } else {
      setLoginStatus(false);
      setUserImage(null);
    }
  }, [session, status]);

  return (
    <div className="relative">
      {/* Announcement Banner */}
      <div className="curv h-auto py-2 px-4 mx-auto bg-[#0073e6] text-white text-sm sm:text-lg rounded-bl-full rounded-br-full text-center w-[85%] sm:w-[85%] xl:ml-[7%] ml-[7.5%] font-semibold">
        <span className="mr-1">📢</span>
        Join 10,000+ students & job seekers growing their careers with Jobgenix!
      </div>

      <div className="nav flex justify-between items-center px-4 sm:px-6 xl:px-0 xl:ml-[12%]">
        {/* Logo */}
        <div className="Logo flex justify-start">
          <Image
            src="/images2/logo.png"
            className="ml-0 sm:ml-4 xl:ml-24 mt-5 pt-3  "
            alt="logo"
            width={150}
            height={150}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-8 xl:ml-[50px] font-[sora] xl:justify-start w-full mt-8">
          <Link
            href="/opportunities?type=internships"
            className="text-md text-[#646A66] font-semibold"
          >
            Home
          </Link>
          <Link
            href="/opportunities?type=jobs"
            className="text-md text-[#646A66] font-semibold"
          >
            About us
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-md text-[#646A66] font-semibold flex items-center">
                Internships
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 mt-4 py-2 bg-gray-300 hidden xl:block">
              {opportunityOptions.map((option) => (
                <DropdownMenuItem key={option.name}>
                  <Link
                    href={option.route}
                    className="text-sm text-[#646A66] font-semibold"
                  >
                    {option.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-md text-[#646A66] font-semibold flex items-center">
                Jobs <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 mt-4 py-2 z-50 bg-gray-300 hidden xl:block">
              {opportunityOptions.map((option) => (
                <DropdownMenuItem key={option.name}>
                  <Link
                    href={option.route}
                    className="text-sm text-[#646A66] font-semibold"
                  >
                    {option.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/comingSoon"
            className="text-md text-[#646A66] font-semibold"
          >
            Roadmaps
          </Link>
          <Link
            href="/comingSoon"
            className="text-md text-[#646A66] font-semibold"
          >
            Opportunities
          </Link>
          <button className="h-10 w-28 bg-[#31363d] text-white rounded-lg">
            For Business
          </button>
          <button className="h-10 w-16 border-black border rounded-lg">
            Host
          </button>
{/* Profile Button - Visible on Both Mobile & Desktop */}
<div className="flex">
            <Button
              className="bg-white h-12 w-24 sm:w-20 text-black hover:bg-white rounded-[18px] font-medium"
              onClick={() => (loginStatus ? router.push("/profile") : router.push("/auth/login"))}
            >
              {loginStatus ? (
                userImage ? (
                  <Image
                    src={userImage || "/placeholder.svg"}
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

        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center mt-5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mr-2"
          >
            <Image
              src="/images2/menu-5-line.png"
              alt="logo"
              width={30}
              height={30}
              className="rounded-full mt-2"
            />
          </Button>

          
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-[100px] left-0 right-0 bg-white shadow-lg rounded-md p-4 mx-4 z-50">
            <div className="flex flex-col space-y-3">
              {opportunityOptionsHamburger.map((option) => (
                <Link
                  key={option.name}
                  href={option.route}
                  className="block text-md text-[#646A66] font-semibold py-2 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {option.name}
                </Link>
              ))}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button className="h-10 w-full sm:w-28 bg-[#31363d] text-white rounded-lg">
                  For Business
                </button>
                <button className="h-10 w-full sm:w-16 border-black border rounded-lg">
                  Host
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
