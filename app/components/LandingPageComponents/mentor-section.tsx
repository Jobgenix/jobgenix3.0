import { Button } from "@/app/components/ui/button";
import Image from "next/image";
// import img3 from "../../Images/image3.jpeg"

export function MentorSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#C6F7D5_1.5%,#FFF4C5_96%)] px-4 py-16 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col items-center gap-4 ">
          <h2 className="text-4xl font-bold">
            <span className="text-[#2E7D32]">Personalised</span> Mentor Support
          </h2>
          <p className="text-gray-600">
            Choose from top industry mentors and get exclusive 1-on-1 coaching!
          </p>
          <div className="flex gap-4">
            <Button className="bg-[#2E7D32] rounded-2xl text-white hover:bg-[#1B5E20]">
              Find a Mentor
            </Button>
            <Button
              variant="outline"
              className="border-[#2E7D32] rounded-2xl bg-white"
            >
              Become a Mentor
            </Button>
          </div>
        </div>
        <div className="relative rounded-lg  flex justify-center items-center p-6">
          <Image
            src="/LandingPageImages/image3.jpeg"
            alt="Mentor Support"
            width={1000}
            height={500}
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
