import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"

export default function JobSearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 md:p-6 h-28">
        <div className="container mx-auto ml-64">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Unlock Your Potential: Find Your Dream Job Today</h1>

          <div className="flex w-full max-w-4xl">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search Job title, Keyword, Company"
                className="w-full py-2 px-4 pr-10 rounded-l-md text-black border-0 mt-10 shadow-2xl"
              />
            </div>
            <Button className="bg-[#005dba] hover:bg-blue-800 rounded px-4 ml-6">
              
              <span className="ml-2 hidden md:inline">Search</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b py-3 px-4">
        <div className="container mx-auto flex flex-wrap gap-2 mt-12">
          <div className="flex items-center mr-4">
            <span className="text-sm font-medium mr-2">Year:</span>
            <Badge variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
              All
            </Badge>
          </div>
          <div className="flex items-center mr-4">
            <span className="text-sm font-medium mr-2">Stream:</span>
            <Badge variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
              All
            </Badge>
          </div>
        
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow bg-gray-50">
        <div className="container mx-auto py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
                <h2 className="font-bold text-lg mb-2">Upload your CV now</h2>
                <p className="text-sm mb-4">and get job recommendations tailored to your profile</p>
                <Button className="w-full bg-white text-blue-500 hover:bg-gray-100">Get Started</Button>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-2">Job type</h3>
                <div className="flex items-center">
                  <input type="radio" id="all-jobs" name="job-type" className="mr-2" />
                  <label htmlFor="all-jobs">All</label>
                </div>
              </div>
            </div>

            {/* Job listings */}
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobListings.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Job {
  title: string
  company: string
  location: string
  salary: string
  experience: string
  skills: string
  color: string
  isNew?: boolean
}

function JobCard({ job }: { job: Job }) {
  const colorClasses = {
    yellow: "bg-yellow-200",
    green: "bg-green-200",
    orange: "bg-orange-200",
  }

  const bgClass = colorClasses[job.color as keyof typeof colorClasses] || "bg-yellow-200"

  return (
    <div className={`rounded-lg p-4 ${bgClass} relative`}>
      {job.isNew && <span className="absolute top-2 right-2 text-xs bg-white px-2 py-0.5 rounded-full">New</span>}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold">{job.title}</h3>
        <span className="text-xs bg-white px-1.5 py-0.5 rounded">2d</span>
      </div>
      <p className="text-sm mb-1">{job.company}</p>
      <p className="text-sm mb-2">{job.location}</p>

      <div className="flex flex-wrap gap-2 mt-3 text-xs">
        <span className="bg-white px-2 py-1 rounded">{job.salary}</span>
        <span className="bg-white px-2 py-1 rounded">{job.experience}</span>
        <span className="bg-white px-2 py-1 rounded">{job.skills}</span>
      </div>
    </div>
  )
}

// Sample job data
const jobListings: Job[] = [
  {
    title: "Visual designer",
    company: "Company A",
    location: "Remote",
    salary: "$50-70K",
    experience: "2+ Years",
    skills: "Figma",
    color: "yellow",
    isNew: true,
  },
  {
    title: "Visual designer",
    company: "Company B",
    location: "Remote",
    salary: "$60-80K",
    experience: "3+ Years",
    skills: "Adobe",
    color: "orange",
  },
  {
    title: "Visual designer",
    company: "Company C",
    location: "Remote",
    salary: "$70-90K",
    experience: "4+ Years",
    skills: "Sketch",
    color: "green",
  },
  {
    title: "Visual designer",
    company: "Company D",
    location: "Remote",
    salary: "$55-75K",
    experience: "2+ Years",
    skills: "Figma",
    color: "yellow",
  },
  {
    title: "Visual designer",
    company: "Company E",
    location: "Remote",
    salary: "$65-85K",
    experience: "3+ Years",
    skills: "Adobe",
    color: "orange",
  },
  {
    title: "Visual designer",
    company: "Company F",
    location: "Remote",
    salary: "$75-95K",
    experience: "4+ Years",
    skills: "Sketch",
    color: "green",
  },
  {
    title: "Visual designer",
    company: "Company G",
    location: "Remote",
    salary: "$50-70K",
    experience: "2+ Years",
    skills: "Figma",
    color: "yellow",
  },
  {
    title: "Visual designer",
    company: "Company H",
    location: "Remote",
    salary: "$60-80K",
    experience: "3+ Years",
    skills: "Adobe",
    color: "orange",
  },
  {
    title: "Visual designer",
    company: "Company I",
    location: "Remote",
    salary: "$70-90K",
    experience: "4+ Years",
    skills: "Sketch",
    color: "green",
  },
  {
    title: "Visual designer",
    company: "Company J",
    location: "Remote",
    salary: "$55-75K",
    experience: "2+ Years",
    skills: "Figma",
    color: "yellow",
  },
]

