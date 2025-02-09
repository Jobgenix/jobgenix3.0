import { Button } from "@/app/components/ui/button"
import Image from "next/image"


export function PostSection() {
  return (
    <section className="bg-[#E8F5E9] px-4 py-16 md:px-6 lg:px-8">
      <div className="container mx-auto grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-4xl font-bold">
            Post Your {" "}
            <br />
            <span className="text-[#2E7D32]">Jobs & Internships</span>
          </h2>
          <p className="mb-6 text-gray-600">
          Find the right candidate from a diverse talent
          pool for your role.
          </p>
          <div className="flex gap-4">
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] rounded-2xl text-white">
              Post Jobs Now
            </Button>
            
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/postImg.png"
            alt="Host Platform"
            width={400}
            height={250}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

