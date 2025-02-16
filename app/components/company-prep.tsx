import { ArrowUpRight } from "lucide-react"

const companies = [
  {
    name: "Microsoft",
    logo: "/images/Microsoft.png",
    description: "Microsoft creates a variety of products, including personal computers and software.",
  },
  {
    name: "Amazon",
    logo: "/images/Amazon.png",
    description: "Amazon is an online retail platform established in 1994 by Jeff Bezos.",
  },
  {
    name: "Google",
    logo: "/images/GoogleIconBg.png",
    description: "Google is a global technology company headquartered in Mountain View, California.",
  },
  {
    name: "Apple",
    logo: "/images/Apple.png",
    description: "Apple Inc. is a global leader in technology, specializing in electronics, software etc",
  },
  {
    name: "Adobe",
    logo: "/images/Adobe.png",
    description: "Adobe focuses on developing creativity and multimedia software products.",
  },
]

export default function CompanyPreparation() {
  return (
    <section className="bg-gradient-to-r from-[#E5FFE6] to-[#FFFDE6] py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-[#1B4B2E]">Company Preparation</h2>
          <a href="#" className="text-blue-500 flex items-center gap-1 hover:underline">
            View all
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <p className="text-gray-600 mb-8">Crack upcoming interviews in just 5 days</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {companies.map((company) => (
            <div
              key={company.name}
              className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] cursor-pointer"
            >
              <div
                className="h-32 relative flex items-center justify-center"
                style={{
                  background: `url("/images/CompanyBg.png") center/cover`,
                }}
              >
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg mb-2">{company.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{company.description}</p>
                <button className="flex items-center gap-1 text-white bg-[#2F8E5B] px-6 py-2.5 rounded-full hover:bg-[#059669] transition-colors mx-auto shadow-md">
                  Coming Soon
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
