import Image from "next/image"
import mentorBg from "@/public/images/mentorBg.png"

export default function MentorBanner() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] h-[80px]">
        <div className="flex items-center h-full ">
          {/* Image container with full height */}
          <div className="h-full w-1/5  shrink-0">
            <Image
              src={mentorBg}
              alt="Mentor"
              fill
              className="object-cover"
              sizes="80px"
              priority
            />
          </div>

          {/* Text content with proper padding */}
          <div className="flex-1 px-4">
            <p className="text-xl text-gray-600 mb-0.5 sm:text-sm">Need guidance?</p>
            <p className="text-xl font-medium sm:text-base">
              Discover Proven Tips from <span className="text-emerald-600">Leading Mentors!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

