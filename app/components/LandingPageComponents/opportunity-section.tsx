import { Card, CardContent } from "@/app/components/ui/card"
import Image from "next/image"

export function OpportunitySection() {
  const opportunities = [
    {
      title: "Quizzes",
      bgColor: "bg-yellow-100",
      img:"/images/Background2.png"
    },
    {
      title: "Aptitude Prep",
      bgColor: "bg-green-100",
      img:"/images/Background5.png"
    },
    {
      title: "Webinar",
      bgColor: "bg-blue-100",
      img:"/images/Background4.png"
    },
    {
      title: "Competitions",
      bgColor: "bg-orange-100",
      img:"/images/Background3.png"
    },
  ]

  return (
    <section className="bg-[linear-gradient(180deg, #C6F7D5 1.5%, #FFF4C5 96%)] px-4 py-16 text-white md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-4xl text-black font-bold">
              Pick <span className="text-[#4CAF50]">The Right Opportunity!</span>
            </h2>
            <p className="text-gray-400">
              Explore opportunities that best suits your skills and interests!
            </p>
            
          </div>
          <a href="/comingSoon" className="text-blue-400 hover:underline">
            Explore all →
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
          {opportunities.map((opportunity, index) => (
            <Card
              key={index}
              className={`overflow-hidden ${opportunity.bgColor} rounded-2xl `}
            >
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {opportunity.title}
                </h3>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={opportunity.img}
                    alt={opportunity.title}
                    width={300}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

