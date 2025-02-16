
import { Code, Users, Building2, Trophy } from 'lucide-react'
import { Card, CardContent } from "@/app/components/ui/card"

export function CampusSection() {
  const features = [
    {
      title: "Coding expert",
      icon: Code,
    },
    {
      title: "Expert speak",
      icon: Users,
    },
    {
      title: "Campus LMS",
      icon: Building2,
    },
    {
      title: "Contest",
      icon: Trophy,
    },
  ]

  return (
    <section className="px-4 py-16 md:px-6 lg:px-8 bg-[linear-gradient(88.92deg,#C6F7D5_1.71%,#FFFCEF_99.56%)]">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl  text-[#2E7D32] md:text-5xl lg:text-6xl">
            Jobgenix Campus
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Level up your coding skills by practicing the hiring assessments of your dream companies & ace your placement game!
          </p>
          <a href="/comingSoon" className="text-blue-600 hover:underline">
            View More →
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="rounded-2xl border-gray-400 overflow-hidden bg-[#FFFDE7] cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md active:shadow-xl"
              onClick={() => {
                console.log(`Clicked ${feature.title}`);
              }}
            >
              <CardContent 
                className="flex flex-col  items-center justify-center p-6 bg-[linear-gradient(89.83deg,#FFF4C5_-5.24%,#E5F7EB_110.74%)] shadow-[0px_4px_4px_0px_#00000040]" 
                aria-label={`${feature.title} card`}
              >
                <feature.icon className="mb-4 h-12 w-12 text-[#2E7D32]" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

