import { Button } from "@/app/components/ui/button"
import { Check } from 'lucide-react'
import Image from "next/image"
// import learnImage from "../../Images/1000+ students.png"

export function LearnSection() {
  const features = [
    "50+ Courses",
    "Certificate",
    "Projects & Assignments"
  ]

  return (
    <section className="bg-[#E5F7EB]  py-12 border  lg:px-8">
      <div className="container mx-auto rounded-2xl bg-[linear-gradient(88.42deg,#C6F7D5_1.71%,#FFFCEF_99.56%)] bg-white p-8 w-4/5">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative">
            <Image
              src="/LandingPageImages/1000+ students.png"
              alt="Learn & Level Up"
              width={500}
              height={300}
              className="rounded-2xl"
            />
          </div>
          <div>
            <h2 className="mb-2 text-4xl font-bold">
              Learn & 
              <br/>
              <span className="text-[#2E7D32]"> Level Up Your Skills</span>
            </h2>
            <p className="mb-6 text-gray-600">
              Select from a wide range of courses to upskill and advance your career!
            </p>
            <div className="mb-8 space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="rounded-full bg-[#2E7D32]/10 p-1">
                    <Check className="h-4 w-4 text-[#2E7D32]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button className="bg-[#2E7D32] rounded-3xl text-white hover:bg-[#1B5E20]">
              Explore Courses →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

