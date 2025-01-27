import { Code, Users, Building2, Trophy } from 'lucide-react'
import { Card, CardContent } from '../ui/card';

export function HeroSection() {
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
    <section className="px-4 py-16 md:px-6 lg:px-8 bg-gradient-to-b from-[#E8F5E9] to-white">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#2E7D32] md:text-5xl lg:text-6xl">
            Jobgenix Campus
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Level up your coding skills by practicing the hiring assessments of your dream companies & ace your placement game!
          </p>
          <a href="#" className="text-blue-600 hover:underline">
            View More →
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden bg-gradient-to-br from-yellow-50 to-green-50 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md active:shadow-xl" onClick={() => {
              console.log(`Clicked ${feature.title}`);
            }}>
              <CardContent className="flex flex-col items-center justify-center p-6" aria-label={`${feature.title} card`}>
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

