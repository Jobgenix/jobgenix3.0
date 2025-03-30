export default function JobSearchPage() {
    return (
      <div className="min-h-screen bg-white mt-3">
        {/* Header */}
        <header className="bg-blue-500 py-6 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-white text-2xl font-semibold text-center mb-4">
              Unlock Your Potential: Find Your Dream Job Today
            </h1>
  
            {/* Search Bar */}
            <div className="flex max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search Job title, Keyword, Company"
                  className="w-full py-2 px-4 rounded-l-md border-0 focus:ring-0 focus:outline-none"
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </header>
  
        {/* Filters */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 ml-72">
              <span className="text-sm font-medium">Year</span>
              <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">All Years</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Stream</span>
              <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">All Streams</div>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-5 pt-2 py-4 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Upload CV Card */}
            <div className="bg-blue-500 rounded-lg p-6 text-white flex flex-col  h-48">
              <div>
                <h3 className="font-semibold text-lg">
                  Upload your CV now and get an AI-based score tailored to your dream job
                </h3>
              </div>
              <button className="bg-white text-blue-600 font-medium py-2 rounded-md hover:bg-blue-50 transition-colors">
                Get Started
              </button>
            </div>
  
            {/* Job Cards */}
          
            
          </div>
        </div>
        <div className="mt-[-14.05%]">
  <div className="flex justify-center items-center gap-4 mt-4 ml-[30%]">
    <JobCard color="bg-green-200" className="w-80 boder-b" />
    <JobCard color="bg-yellow-200" className="w-80" />
    <JobCard color="bg-yellow-200" className="w-80"/>
  </div>
  <div className="flex justify-center items-center gap-4 mt-4 ml-[30%]">   
    <JobCard color="bg-green-200" className="w-80" />
    <JobCard color="bg-yellow-200" className="w-80" />
    <JobCard color="bg-yellow-200" className="w-80" />
  </div>
</div>

     
      </div>
    )
  }
  
  function JobCard({ color, className }: { color: string; className?: string }) {
    return (
      <div className={`${color} ${className} rounded-lg p-4 relative`}>
        <div className="flex  justify-between items-start mb-2">
          <div>
            <div className="text-xs bg-white px-2 py-1 rounded-sm inline-block mb-1">REMOTE</div>
            <h3 className="font-semibold">Visual designer</h3>
            <div className="flex items-center text-xs gap-1 mt-1">
              <span>Delhi/NCR</span>
              <span className="w-1 h-1 bg-black rounded-full"></span>
              <span>On-site</span>
            </div>
          </div>
          <button className="text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
  
        <div className="border-t border-gray-300 my-2"></div>
  
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <div className="font-medium">Experience</div>
            <div>2Y</div>
          </div>
          <div>
            <div className="font-medium">Job Type</div>
            <div>Full-time</div>
          </div>
          <div>
            <div className="font-medium">Salary</div>
            <div>16k-25k</div>
          </div>
        </div>
  
        <button className="absolute bottom-2 right-2 text-xs bg-white px-2 py-1 rounded-sm">View</button>
      </div>
    )
  }
  
  