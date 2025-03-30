"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent } from "@/app/components/ui/card"

interface CompanyCardProps {
  logo: string
  name: string
  rating: number
  totalRatings: number
  description: string
}

const CompanyCard = ({ logo, name, rating, totalRatings, description }: CompanyCardProps) => {
  return (
    <Card className="w-full rounded-3xl h-full max-w-[170px] overflow-hidden">
      <CardContent className="p-0">
        <div
          className={`p-4 ${name === "Spotify" ? "bg-green-500" : name === "Airbnb" ? "bg-red-400" : name === "Zomato" ? "bg-red-500" : "bg-blue-500"}`}
        >
          <Image src={logo || "/placeholder.svg"} alt={`${name} logo`} width={80} height={80} className="mb-2  m-auto" />
          <h3 className="text-white text-center">{name}</h3>
          <div className="flex  items-center mt-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-300 text-xs">
                  ★
                </span>
              ))}
            </div>
            <span className="text-white text-xs ml-1">
              ({rating}) {totalRatings} + Jobs
            </span>
          </div>
          <p className="text-white italic text-center text-xs leading-tight min-h-[40px]">{description}</p>
          <Button variant="secondary" size="sm" className="mt-2 w-full rounded-full text-xs font-medium">
            View jobs
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function JobSearchHero() {
  const [searchQuery, setSearchQuery] = useState("")

  const companies = [
    {
      logo: "/LandingPageImages/spotify.png?height=40&width=40",
      name: "Spotify",
      rating: 4.5,
      totalRatings: 28,
      description: "Your career playlist starts here.",
    },
    {
      logo: "/LandingPageImages/airbnb.png?height=40&width=40",
      name: "Airbnb",
      rating: 4.6,
      totalRatings: 26,
      description: "Design tomorrow's experiences for millions.",
    },
    {
      logo: "/LandingPageImages/zomato.png?height=40&width=40",
      name: "Zomato",
      rating: 4.7,
      totalRatings: 25,
      description: "Feed your career with endless opportunities.",
    },
    {
      logo: "/LandingPageImages/razorpay.png?height=40&width=40",
      name: "Razorpay",
      rating: 4.8,
      totalRatings: 24,
      description: "Empowering businesses, one payment at a time.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white font-montserrat">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl   font-bold mb-6">
          Type It. <span className="text-blue-500">Upload It.</span> Get Hired.
        </h1>

        <div className="relative max-w-xl mx-auto mb-4">
          <Input
            type="text"
            placeholder="Dream job? Type it in ✨"
            className="pl-4 pr-10 py-6 rounded-full bg-gray-200 border-[#9DCEFF]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <p className="text-xs sm:text-sm text-gray-600 justify-center flex-wrap flex gap-2">
          Or{" "}
          <Link href="#" className="text-blue-500 underline  font-bold">
            upload your resume
          </Link>{" "}
          and let our <span className="font-medium"><span><img src="/company-logos/JobGenix Logo.png" alt="" width={85} /></span> </span>AI ✨ find it for you.
        </p>
      </div>

      <div className="mt-12 ">
        <h2 className="text-xl  font-medium text-center mb-6">Featured Companies Actively Hiring</h2>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto justify-center items-center pb-4 flex-wrap scrollbar-hide">
            {companies.map((company, index) => (
              <CompanyCard key={index} {...company} />
            ))}
          </div>

          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="text-gray-500" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

