import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Search } from 'lucide-react'
// import Image from "next/image"

export function JobSection() {
  const jobs = [
    {
      title: "Web Developer",
      category: "Software Development",
      companies: ["EY", "Google"],
    },
    {
      title: "Data Science",
      category: "Computer Science",
      companies: ["Microsoft", "Amazon"],
    },
    {
      title: "Digital Marketing",
      category: "Marketing",
      companies: ["Meta", "Twitter"],
    },
  ]

  return (
    <section className="bg-[linear-gradient(88.92deg,#C6F7D5_1.71%,#FFFCEF_99.56%)] to-white px-4 py-16 md:px-6 lg:px-8">
      <div className="container mx-auto grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-4xl font-bold text-[#2E7D32]">
            Find Your Perfect Role.
          </h2>
          <h3 className="mb-4 text-3xl font-bold text-gray-800">
            Your Future Starts Here!
          </h3>
          <p className="mb-6 text-gray-600">
            Find a Role That Fuels Your Ambitions!
          </p>
          <Button className="mb-6 bg-[#2E7D32] rounded-2xl hover:bg-[#1B5E20]">
            <Search className="mr-2 h-4 w-4 " />
            Find Jobs
          </Button>
          <div className="flex flex-wrap gap-4">
            {["Work From Home", "On-Field", "Full-Time", "Part-Time"].map(
              (filter, index) => (
                <Button key={index} variant="outline" className="rounded-full">
                  <Search className="mr-2 h-4 w-4" />
                  {filter}
                </Button>
              )
            )}
          </div>
        </div>
        <Card className="p-6 bg-white rounded-2xl ">
          <h4 className="mb-4 text-xl font-semibold">Jobs</h4>
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg  p-4"
              >
                <div>
                  <h5 className="font-semibold">{job.title}</h5>
                  <p className="text-sm text-gray-600">{job.category}</p>
                </div>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] rounded-2xl text-white px-8">
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

