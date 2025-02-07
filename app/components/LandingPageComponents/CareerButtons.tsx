import { Briefcase, GraduationCap, FileUp } from "lucide-react"
import Link from "next/link";

export default function CareerButtons() {
  return (
    <div className="flex flex-col w-full items-center gap-4 p-6  mx-auto md:hidden bg-gradient-to-r from-[#C6F7D5] to-[#FFFCEF] ">
      <Link href="/opportunities?type=jobs" className="group shadow-lg shadow-gray-400 flex flex-col items-center  p-4 bg-[#F9E39E] w-4/5 rounded-2xl hover:shadow-lg transition-all duration-300">
      <button className="flex items-center flex-col">
        <div className="flex items-center gap-2 mb-1">
          
          <span className="font-semibold text-lg">Jobs</span>
          <Briefcase className="w-5 h-5" />
        </div>
        <span className="text-sm text-gray-600">Find the right opportunity</span>
      </button>
      </Link>

      <Link href="/opportunities?type=internships" className="group shadow-lg shadow-gray-400 flex flex-col items-center p-4 bg-[#D5CDFD] w-4/5 rounded-2xl hover:shadow-lg transition-all duration-300">
        <button className="flex items-center flex-col">
          <div className="flex items-center gap-2 mb-1">
            
            <span className="font-semibold text-lg">Internships</span>
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-sm text-gray-600">Start Your Career</span>
        </button>
      </Link>

      <button className="group shadow-lg shadow-gray-400 flex flex-col items-center p-4 bg-[#EBCABFF7] w-4/5 rounded-2xl hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-2 mb-1">
          
          <span className="font-semibold text-lg">Power up your career</span>
          <FileUp className="w-5 h-5" />
        </div>
        <span className="text-sm text-gray-600">Upload Your CV</span>
      </button>
    </div>
  )
}

