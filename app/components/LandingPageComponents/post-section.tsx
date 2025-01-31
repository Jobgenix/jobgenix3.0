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
            src="https://s3-alpha-sig.figma.com/img/78b7/32f2/616184f84af2a61c950423a58e667f73?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DsXlcUadVLbueAddrUvrvC5Mhv-8RUcoUyXGDXpCNzjIqJtBpxpauFjet5Yp-EEqcvaYAWxQuLuPACZmW~sOIPhTqOTlcSRF1TyWP8vUldGoiMt8h8D1Xxc~F4kTrsKX0KqGDSc66iUVFSr8azTcGW701sealDTgXsFoIeME5c53DLeU-oaUNai8BJCfOdu0qjcSruPsyJGLJnHCJXA4VmAMJmIJEUFSC6VtVloEZoTGt5GXR~FgPNcOuLvNvtpVeME63oPbDStdHN5HPauD9befchtvYY8zddwoQVRPxCe71gB5WY0QFb5oshE4TwihjnNXO~2tMiiy2j39PtqXZw__"
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

