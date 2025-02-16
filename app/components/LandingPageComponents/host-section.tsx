import { Button } from "@/app/components/ui/button"
import Image from "next/image"
import Link from "next/link";

export function HostSection() {
  return (
    <section className="bg-[#E8F5E9] px-4 py-16 md:px-6 lg:px-8">
      <div className="container mx-auto grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-4xl font-bold">
            Host Your Own{" "}
            <br />
            <span className="text-[#2E7D32]">Opportunity</span>
          </h2>
          <p className="mb-6 text-gray-600">
            Connect with a wide range of talent or recruit the brightest minds from
            a pool of <span className="text-[#2F8E5B]">1K+ users</span>
          </p>
          <div className="flex gap-4">
            <Link href="/comingSoon"> <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] rounded-2xl text-white">
              Host Now
            </Button></Link>
            <Link href="/comingSoon">  <Button variant="outline" className="border-[#2E7D32] rounded-2xl text-[#2E7D32]">
              Know More
            </Button></Link>


          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/Background1.png"
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

