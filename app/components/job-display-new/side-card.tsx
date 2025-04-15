import Link from "next/link"
import { CalendarCheck } from "lucide-react"

export default function JobGenixPromo() {
  return (
   
      <div className="w-full max-w-[280px] h-[600px] bg-white rounded-3xl p-4 shadow-md">
        <div className="text-xs text-center mb-2 text-gray-600">Sponsored by JobGenix</div>

        <div className="bg-blue-500 rounded-2xl p-4 text-white w-[85%] mx-auto mb-4 bg-[url('/images2/cave.png')] bg-no-repeat bg-cover bg-center h-[260px]">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold leading-tight mb-4">
              Elevate Your Career with JobGenix Employee Grooming!
            </h2>

            <div className="flex items-center justify-center gap-2 text-sm mb-4">
              <CalendarCheck className="h-4 w-4" />
              <span>
                Exclusive Training Sessions <span className="font-bold">Available Now!</span>
              </span>
            </div>

            <Link href="#" className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-full inline-block">
              Enroll Now
            </Link>
          </div>

          <div className="text-xs text-center mt-2">
            <p>Sponsored by JobGenix</p>
            <p>Your Partner in Career Success!</p>
          </div>
        </div>
      </div>
    
  )
}
