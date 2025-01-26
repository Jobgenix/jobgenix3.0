/* eslint-disable*/
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Plus, Bell } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const [loginStatus, setLoginStatus] = useState(false);

  const session = useSession();
  const router = useRouter();
  let userId;
  useEffect(() => {
    if (session.status === "loading") return;

    userId = session.data?.user?.id;
    if (userId) {
      setLoginStatus(true);
    }
  }, [session]);

  const opportunityOptions = [
    { name: "Internships", route: "/opportunities?type=Internships" },
    { name: "Jobs", route: "/job-display" },
    { name: "Government Jobs", route: "/opportunities?type=Government Jobs" },
    { name: "Freshers", route: "/opportunities?type=Freshers" },
    { name: "Remote Jobs", route: "/opportunities?type=Remote Jobs" },
    { name: "Part-time Jobs", route: "/opportunities?type=Part-time Jobs" },
  ];

  return (
    <nav className="sticky h-[10vh] flex z-[9999] items-center justify-center top-0 w-full border-b bg-white">
      <div className="w-full mx-auto flex items-center gap-3 justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl ">
            <Image
              height={100}
              width={150}
              className="h-[10vh]"
              src="https://s3-alpha-sig.figma.com/img/ec08/93e5/253cb74fcc4215a86fb3f64054477aeb?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bMAGEPXumU8iJkjthX2EwOhg483Ql6ACOMFUliXGpmQmlbM4SZNnpKThhXg6UunXxbQwX26rnlv5PIFGKxdf8HW52a0SvuwEvBQ7BJg-qq1mb0jAhnehRAtoXYSLcFVVgoQHx5avcZ3JcIPPiSvbkRr9hFwJsHbDP3-1opqfAjh0Cvf-QDd0oijXstnT-HDUeoYDyUSPe3F4dMUr6Dv8Y4I9K2RR~wCKFgVgrlspHyBi~Vna~zBZbsjJEK5P8RLLXYNGlzZLcKP4jla4mwLKuEpjZHUu0gb6vWTkulIiTWsK8PFyGPaQpJ4BWcfPEBdB1mUSbPGlzMdYYZMPytRzNQ__"
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

        {/* Middle and Right Sections: Hidden on small/medium screens */}
        <div className="hidden xl:flex items-center gap-4">
          <Link href="#" className="text-sm text-[#646A66] font-bold">
            Resources
          </Link>
          <Link href="#" className="text-sm text-[#646A66] font-bold">
            Mentorship
          </Link>
          <Link href="#" className="text-sm text-[#646A66] font-bold">
            Courses
          </Link>
          <Link href="#" className="text-sm text-[#646A66] font-bold">
            Practice
          </Link>

          {/* Opportunities Dropdown (Desktop) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link
                href="#"
                className="text-sm text-[#646A66] font-bold flex justify-center items-center"
              >
                Opportunities
                <ChevronDown className="h-4 w-4" />
              </Link>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 bg-gray-300">
              {opportunityOptions.map((option) => (
                <DropdownMenuItem key={option.name}>
                  <Link
                    href={option.route}
                    className="text-sm text-[#646A66] font-bold"
                  >
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
                  className="w-full bg-[#01A768] hover:bg-[#018e59] text-white rounded-[18px] font-medium"
                  onClick={() =>
                    loginStatus
                      ? router.push("/home")
                      : router.push("/auth/login")
                  }
                >
                  {loginStatus ? "logout" : "Login"}
                </Button>
          <span className="text-gray-400">|</span>
          <Bell />
          <Link href="/job-upload">
            <Button
              variant="outline"
              className="h-9 px-4 font-bold text-[#646A66] text-center border-gray-200 rounded-[18px]"
            >
              <Plus className="mr-1 h-4 w-4" /> Host
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="h-9 px-4 bg-[#DFE2FF] text-[#383838] font-extrabold hover:bg-gray-100 rounded-[18px]"
          >
            For Business
          </Button>
        </div>

        {/* Hamburger Menu for Small/Medium Screens */}
        <div className="xl:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex flex-col gap-1">
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 bg-gray-300 mr-0 flex flex-col justify-center align-center">
              {opportunityOptions.map((option) => (
                <DropdownMenuItem key={option.name}>
                  <Link
                    href={option.route}
                    className="text-sm text-[#646A66] font-bold"
                  >
                    {option.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                <Button
                  className="w-full bg-[#01A768] hover:bg-[#018e59] text-white rounded-[18px] font-medium"
                  onClick={() =>
                    loginStatus
                      ? router.push("/home")
                      : router.push("/auth/login")
                  }
                >
                  {loginStatus ? "logout" : "Login"}
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/job-upload">
                  <Button
                    variant="outline"
                    className="w-full font-bold text-[#646A66] text-center border-gray-200 rounded-[18px]"
                  >
                    <Plus className="mr-1 h-4 w-4" /> Host
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full bg-[#DFE2FF] text-[#383838] font-extrabold hover:bg-gray-100 rounded-[18px]"
                >
                  For Business
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
