// /* eslint-disable*/
// import { Input } from "@/app/components/ui/input";
// import { Button } from "@/app/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/app/components/ui/dropdown-menu";
// import { Search, ChevronDown } from "lucide-react";
// import Link from "next/link";
// import { Plus, Bell } from "lucide-react";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";




// export function Navbar() {
//   const [loginStatus, setLoginStatus] = useState(false);

//   const session = useSession();
//   const router = useRouter();
//   let userId;
//   useEffect(() => {
//     if (session.status === "loading") return;

//     userId = session.data?.user?.id;
//     if (userId) {
//       setLoginStatus(true);
//     }
//   }, [session]);

//   const opportunityOptions = [
//     { name: "Internships", route: "/opportunities?type=internships" },
//     { name: "Jobs", route: "/opportunities?type=jobs" },
//     { name: "Government Jobs", route: "/comingSoon" },
//     { name: "Freshers", route: "/comingSoon" },
//     { name: "Remote Jobs", route: "/comingSoon" },
//     { name: "Part-time Jobs", route: "/comingSoon" },
//   ];

//   return (
//     <nav className="sticky max-h-[10vh] flex z-[9999] items-center justify-center top-0 w-full border-b bg-white shadow-md shadow-black/30">
//       <div className="w-full mx-auto flex items-center gap-3 justify-between">
//         {/* Left Section: Logo */}
//         <div className="flex items-center gap-2">
//           <Link href="/" className="text-xl ">
//             <Image
//               height={0}
//               width={120}
//               className=" w-full h-auto"
//               src="/company-logos/logo.png"
//               alt="Logo"
//             />
//           </Link>
//           <div className="relative hidden md:block">
//             <Input
//               type="search"
//               placeholder="Search Opportunities"
//               className="w-[250px] pl-10 text-[#646A66] rounded-3xl border-gray-300"
//             />
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
//           </div>
//         </div>

//         {/* Middle and Right Sections: Hidden on small/medium screens */}
//         <div className="flex gap-4">
//           <div className="hidden xl:flex items-center gap-4">
//             <Link href="/comingSoon" className="text-sm text-[#646A66] font-bold">
//               Resources
//             </Link>
//             <Link href="/comingSoon" className="text-sm text-[#646A66] font-bold">
//               Mentorship
//             </Link>
//             <Link href="/comingSoon" className="text-sm text-[#646A66] font-bold">
//               Courses
//             </Link>
//             <Link href="/comingSoon" className="text-sm text-[#646A66] font-bold">
//               Practice
//             </Link>

//             {/* Opportunities Dropdown (Desktop) */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Link
//                   href="#"
//                   className="text-sm text-[#646A66] font-bold flex justify-center items-center"
//                 >
//                   Opportunities
//                   <ChevronDown className="h-4 w-4" />
//                 </Link>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent className="w-48 mt-4 py-2 bg-gray-300">
//                 {opportunityOptions.map((option) => (
//                   <DropdownMenuItem key={option.name}>
//                     <Link
//                       href={option.route}
//                       className="text-sm text-[#646A66] font-bold"
//                     >
//                       {option.name}
//                     </Link>
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           <div className="hidden xl:flex items-center gap-3 px-3">
//             <span className="text-gray-400">|</span>
//             <Button
//               className="w-full bg-[#01A768] hover:bg-[#018e59] text-white rounded-[18px] font-medium"
//               onClick={() =>
//                 loginStatus ? router.push("/home") : router.push("/auth/login")
//               }
//             >
//               {loginStatus ? "logout" : "Login"}
//             </Button>
//             <span className="text-gray-400">|</span>
//             {/* <Bell /> */}
//             <Link href="/job-upload">
//               <Button
//                 variant="outline"
//                 className="h-9 px-4 font-bold text-[#646A66] text-center border-gray-200 rounded-[18px]"
//               >
//                 <Plus className="mr-1 h-4 w-4" /> Host
//               </Button>
//             </Link>
//             <Link href="/comingSoon">
//               <Button
//                 variant="ghost"
//                 className="h-9 px-4 bg-[#DFE2FF] text-[#383838] font-extrabold hover:bg-gray-100 rounded-[18px]"
//               >
//                 For Business
//               </Button>
//             </Link>

//           </div>
//         </div>
//         {/* Hamburger Menu for Small/Medium Screens */}
//         <div className="xl:hidden">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="flex flex-col gap-1">
//                 <span className="block w-6 h-0.5 bg-gray-800"></span>
//                 <span className="block w-6 h-0.5 bg-gray-800"></span>
//                 <span className="block w-6 h-0.5 bg-gray-800"></span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-60 bg-gray-300 mr-0 mt-4 md:mt-8  flex flex-col justify-center align-center xl:hidden">
//               {opportunityOptions.map((option) => (
//                 <DropdownMenuItem key={option.name}>
//                   <Link
//                     href={option.route}
//                     className="text-sm text-[#646A66] font-bold"
//                   >
//                     {option.name}
//                   </Link>
//                 </DropdownMenuItem>
//               ))}
//               <DropdownMenuItem>
//                 <Button
//                   className="w-full bg-[#01A768] hover:bg-[#018e59] text-white rounded-[18px] font-medium"
//                   onClick={() =>
//                     loginStatus
//                       ? router.push("/home")
//                       : router.push("/auth/login")
//                   }
//                 >
//                   {loginStatus ? "logout" : "Login"}
//                 </Button>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Link href="/job-upload" className="w-full">
//                   <Button
//                     variant="outline"
//                     className="w-full font-bold text-[#646A66] text-center border-gray-200 rounded-[18px]"
//                   >
//                     <Plus className="mr-1 h-4" /> Host
//                   </Button>
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Button
//                   variant="ghost"
//                   className="w-full bg-[#DFE2FF] text-[#383838] font-extrabold hover:bg-gray-100 rounded-[18px]"
//                 >
//                   For Business
//                 </Button>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </nav>
//   );
// }

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
    {name: "Resources", route: "/comingSoon" },
    { name: "Courses", route: "/comingSoon" },
    { name: "Practice", route: "/comingSoon" },
  ];
 
  return (
    <nav className="sticky max-h-[10vh] flex z-[9999] items-center justify-center top-0 w-full border-b bg-white shadow-md shadow-black/30">
      <div className="w-full mx-auto flex items-center gap-3 justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl ">
            <Image
              height={0}
              width={120}
              className=" w-full h-auto"
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
 
        {/* Middle and Right Sections: Hidden on small/medium screens */}
        <div className="flex gap-4">
          <div className="hidden xl:flex items-center gap-4">
            <Link
              href="/opportunities?type=internships"
              className="text-sm text-[#646A66] font-bold"
            >
              Internships
            </Link>
            <Link
              href="/opportunities?type=jobs"
              className="text-sm text-[#646A66] font-bold"
            >
              Jobs
            </Link>
            <Link href="/comingSoon" className="text-sm text-[#646A66] font-bold">
              Roadmaps
            </Link>
            <Link href="/comingSoon" className="text-sm text-[#646A66] font-bold">
              Resources
            </Link>
 
            {/* Opportunities Dropdown (Desktop) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link
                  href="#"
                  className="text-sm text-[#646A66] font-bold flex justify-center items-center"
                >
                  Get started
                  <ChevronDown className="h-4 w-4" />
                </Link>
              </DropdownMenuTrigger>
 
              <DropdownMenuContent className="w-48 mt-4 py-2 bg-gray-300 hidden xl:block">
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
              className="w-full bg-[#2F8E5B]  hover:bg-[#1E7045] text-white rounded-[18px] font-medium"
              onClick={() =>
                loginStatus ? router.push("/home") : router.push("/auth/login")
              }
            >
              {loginStatus ? "logout" : "Login"}
            </Button>
            <span className="text-gray-400">|</span>
            {/* <Bell /> */}
            <Link href="/job-upload">
              <Button
                variant="outline"
                className="h-9 px-4 font-bold text-[#646A66] text-center border-gray-200 rounded-[18px]"
              >
                <Plus className="mr-1 h-4 w-4" /> Host
              </Button>
            </Link>
            <Link href="/comingSoon">
              <Button
                variant="ghost"
                className="h-9 px-4 bg-[#DFE2FF] text-[#383838] font-extrabold hover:bg-gray-100 rounded-[18px]"
              >
                For Business
              </Button>
            </Link>
          </div>
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
            <DropdownMenuContent className="w-60 bg-gray-300 mr-0 mt-4 md:mt-8 xl:hidden  flex flex-col justify-center align-center">
              {opportunityOptionsHamburger.map((option) => (
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
                  className="w-full bg-[#2F8E5B] text-white hover:bg-[#1E7045] rounded-[18px] font-medium"
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
                <Link href="/job-upload" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full font-bold text-[#646A66] text-center border-gray-200 rounded-[18px]"
                  >
                    <Plus className="mr-1 h-4" /> Host
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
