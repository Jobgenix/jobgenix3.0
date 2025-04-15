import { CheckCircle } from "lucide-react"
import Image from "next/image"

export default function JoBDet() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[300px_1fr] gap-4">
        {/* Job Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                <path d="M12 7c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1h3c.6 0 1-.4 1-1s-.4-1-1-1h-2V8c0-.6-.4-1-1-1z" />
              </svg>
              Just Now
            </span>
            <div className="flex gap-2">
              <button className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M15 4.5l-6 6 6 6-1.5 1.5L6 10.5 13.5 3z" />
                </svg>
              </button>
              <button className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M9 19.5l6-6-6-6 1.5-1.5L18 13.5 10.5 21z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" className="w-10">
                <path
                  fill="#EA4335"
                  d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
                />
                <path
                  fill="#FBBC05"
                  d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
                />
                <path
                  fill="#4285F4"
                  d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
                />
                <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
                <path
                  fill="#EA4335"
                  d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
                />
                <path
                  fill="#4285F4"
                  d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-center font-semibold text-lg mb-1">Senior UX Designer</h1>
          <p className="text-center text-sm text-gray-500 mb-4">Google • San Francisco, CA</p>

          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-1  bg-[#F4F4F5] text-black px-2 py-1 rounded-full text-[9px] " style={{ boxShadow: "1px 1px 2px 0px rgba(255, 255, 255, 0.30)" }}>
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <Image src="/images2/Jobgenix Logo.png" height={40} width={40} alt="logo-jobgenix"/>
              <span className="font-bold">  Ai Recommended</span>
            </div>
            <div className="flex items-center gap-1 bg-[#F4F4F5] text-green-600 px-2 py-1 rounded-full text-[9px] " style={{ boxShadow: "1px 1px 2px 0px rgba(255, 255, 255, 0.30)" }}>
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="font-bold">91% Match Score</span>
            </div>
          </div>

          <div className="border-t border-b py-3 mb-4">
            <p className="text-sm text-gray-500 mb-2">Matched Skill(s)</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                User-Centered Design
              </span>
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Wireframing
              </span>
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                User Research
              </span>
              <span className="bg-[#00EF69] text-gray-600 px-3 py-1 rounded-full text-xs">Interaction Design</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">Prototyping</span>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mb-4">+ More</div>

          <div className="flex gap-2">
            <button className="bg-blue-600 text-white  h-8 rounded-full py-2 px-2 text-xs font-medium flex-1">
              Register to Apply
            </button>
            <button className="bg-blue-600 text-white border h-8 border-blue-600  rounded-full py-1 px-4  text-xs font-medium flex-1">
              Get Referral
            </button>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">About the Company</h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Scelerisque mus nunc ultricies viverra tincidunt eu cum. Auctor
              elementum nunc in amet. Amet nunc amet aliquot neque neque egestas cursus. Fames cursus.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Job Description</h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Scelerisque mus nunc ultricies viverra tincidunt eu cum. Auctor
              elementum nunc in amet. Amet nunc amet aliquot neque neque egestas cursus. Fames cursus pulvinar nisi
              nulla adipiscing interdum cursus. Amet amet purus id gravida sed eget cursus mi nisi a. Amet nunc amet
              aliquot neque neque egestas cursus. Fames cursus pulvinar adipiscing mattis nisi. Mattris sed adipiscing
              nulla. Orci pulvinar adipiscing mattis nisi. Mattris sed adipiscing nulla. Orci pulvinar adipiscing mattis
              nisi. Mattris sed adipiscing nulla. Orci pulvinar adipiscing mattis nisi. Mattris sed adipiscing nulla.
              Orci pulvinar adipiscing mattis nisi. Mattris sed adipiscing nulla. Orci.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Requirements</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
              <li>Lorem ipsum dolor sit amet consectetur. Scelerisque mus nunc ultricies viverra tincidunt eu cum.</li>
              <li>Auctor elementum nunc in amet.</li>
              <li>
                Amet nunc amet aliquot neque neque egestas cursus. Fames cursus pulvinar nisi nulla adipiscing interdum
                cursus.
              </li>
              <li>Fames cursus pulvinar nisi nulla adipiscing.</li>
              <li>
                Amet purus id gravida sed eget cursus mi nisi a. Nisi amet nunc amet aliquot neque neque egestas cursus.
                Fames cursus pulvinar adipiscing mattis nisi. Mattris sed adipiscing nulla. Orci pulvinar adipiscing
                mattis nisi. Mattris sed adipiscing nulla. Orci pulvinar adipiscing mattis nisi. Mattris sed adipiscing
                nulla. Orci.
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Contact Details</h2>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Scelerisque mus nunc ultricies viverra tincidunt eu cum.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="mt-6 max-w-6xl mx-auto bg-[#0060c0] rounded-xl p-0 h-48 text-white relative overflow-hidden">
  {/* Background images */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/images2/capa 2.png"
      alt="Wave Pattern"
      width={792}
      height={407}
      className="w-full h-full object-cover opacity-20"
    />
    <Image
      src="/images2/capa 1.png"
      alt="Wave Pattern"
      width={792}
      height={407}
      className="w-full h-full object-fill opacity-20 absolute top-[-1%] rght-0 "
    />
  </div>

  {/* Text content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
    <h1 className="text-xl">Your Journey's Just Getting Started</h1>
    <button className="border border-white w-44 mt-10 rounded-full h-8">Explore more jobs</button>
  </div>
</div>

    </div>
  )
}
