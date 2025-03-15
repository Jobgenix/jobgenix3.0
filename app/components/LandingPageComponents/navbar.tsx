"use client";
/* eslint-disable */
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Search, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

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

  const opportunityOptions = [
    { name: "Courses", route: "/comingSoon" },
    { name: "Practice", route: "/comingSoon" },
    { name: "Mentorship", route: "/comingSoon" },
    { name: "Government Jobs", route: "/comingSoon" },
  ];

  const opportunityOptionsHamburger = [
    { name: "Internship", route: "/opportunities?type=internships" },
    { name: "Jobs", route: "/opportunities?type=jobs" },
    { name: "Government Jobs", route: "/comingSoon" },
    { name: "Mentorship", route: "/comingSoon" },
    { name: "Roadmaps", route: "/comingSoon" },
    { name: "Resources", route: "/comingSoon" },
    { name: "Courses", route: "/comingSoon" },
    { name: "Practice", route: "/comingSoon" },
  ];

  
  return (
    <nav className="sticky top-0 z-[9999] w-full bg-white border-b shadow-md shadow-black/30 max-h-[10vh] flex items-center justify-center">
      <div className="w-full mx-auto flex items-center justify-between gap-3">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl">
            <Image
              width={120}
              height={50}
              className="w-full h-auto"
              src="/company-logos/logo.png"
              alt="Logo"
            />
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search Opportunities"
              className="w-[250px] pl-10 text-[#646A66] rounded-3xl border-gray-300"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          </div>
        </div>

        {/* Middle and Right Sections */}
        <div className="flex gap-4">
          <div className="hidden xl:flex items-center gap-4">
            <Link href="/opportunities?type=internships" className="text-md text-[#646A66] font-bold">
              Internships
            </Link>
            <Link href="/opportunities?type=jobs" className="text-md text-[#646A66] font-bold">
              Jobs
            </Link>
            <Link href="/comingSoon" className="text-md text-[#646A66] font-bold">
              Roadmaps
            </Link>
            <Link href="/comingSoon" className="text-md text-[#646A66] font-bold">
              Resources
            </Link>

            {/* Opportunities Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-md text-[#646A66] font-bold flex items-center">
                  Get started <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48 mt-4 py-2 bg-gray-300 hidden xl:block">
                {opportunityOptions.map((option) => (
                  <DropdownMenuItem key={option.name}>
                    <Link href={option.route} className="text-sm text-[#646A66] font-bold">
                      {option.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden xl:flex items-center gap-3 px-3">
            <span className="text-gray-400">|</span>

            <Button
              className="bg-white h-12 w-24 text-black hover:bg-white rounded-[18px] font-medium flex items-center gap-2 px-4 py-2"
              onClick={() => (loginStatus ? router.push("/profile") : router.push("/auth/login"))}
            >
              {loginStatus ? (
                userImage ? (
                  <Image src={userImage} alt="Profile" width={40} height={40} className="rounded-full" />
                ) : (
                  "Logout"
                )
              ) : (
                "Login"
              )}
            </Button>

            <span className="text-gray-400">|</span>

            <Link href="/job-upload">
              <Button variant="outline" className="h-9 px-4 font-bold text-[#646A66] border-gray-200 rounded-[18px]">
                <Plus className="mr-1 h-4 w-4" /> Host
              </Button>
            </Link>
            <Link href="/comingSoon">
              <Button variant="ghost" className="h-9 px-4 bg-[#DFE2FF] text-[#383838] font-extrabold hover:bg-gray-100 rounded-[18px]">
                For Business
              </Button>
            </Link>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="xl:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex flex-col gap-1">
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60 bg-gray-300 mt-4 flex flex-col">
              {opportunityOptionsHamburger.map((option) => (
                <DropdownMenuItem key={option.name}>
                  <Link href={option.route    } className="text-sm text-[#646A66] font-bold">
                    {option.name}
                  </Link>             
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
