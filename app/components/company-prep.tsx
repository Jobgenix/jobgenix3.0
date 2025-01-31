import { ArrowUpRight } from "lucide-react"

const companies = [
  {
    name: "Microsoft",
    logo: "https://s3-alpha-sig.figma.com/img/6a2d/6bdd/1d3acdd53347106bb352e6aa0a33962c?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nNAJ5ImtPR2tQLAXde4oOk87an-p~pwjPrSs5YZ3Cd~d0xle41z9YnVRt2QLchFuwEMSl-lISyGt6LV6UGUvu0~gbOTP5hvb149JAqAhVqXOL5mcGA-hMSf~X1rGGuL3NdM7~gslMzovB-VNcB5sVYNFiTTV8ID7aHpqV43WPajTVBaTSAxer2Qde7~wNPlE8GeIdgRc6DFlkVuzkSYVrMLcBcz-NEcNajD74ljvq167L61OlzeRV8Ki~3i7qeLd~uu6GnmbeZQaKGgGvTSN~h5Lg6CekLkmywORXbsy6Ac9pP4DMrTn7vvi2bgIM0YokFPGK-ktjk25FFCA6Gm8EQ__",
    description: "Microsoft creates a variety of products, including personal computers and software.",
  },
  {
    name: "Amazon",
    logo: "https://s3-alpha-sig.figma.com/img/5a0b/20ce/f09939b887a1e51355226edbd3697c31?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zra7cdajYSawcyLP8D4Lx7vdyRXh1NfamMfm9FiN4i7Mcll8ERx~hOdfzI9T7jpOPUMLz218ULSHTNZdp01ccnQ38K-oGTcs~4wSlZdsMVAKFAQHAOGFEfhlq83AVp0zpnNzGIymoqvsSvDranIZkwXA4Vg3J3U49zi65fKc6k2lAOhluxEcz9FjZo3XESbTna0T0aV39Ta7MyZ4GBhLHxAczFp4zDE51BkHLJdM8badjXhRmfESVkO2TWNcFXGFzZiKoMB4YcKaGI3bX7rVf-8rzMKGRyWIdDspEoFaZLmH8T3Hd9ktY06OgQXan-C6Esh7ZDu0nBKeL7vyro8fCw__",
    description: "Amazon is an online retail platform established in 1994 by Jeff Bezos.",
  },
  {
    name: "Google",
    logo: "https://s3-alpha-sig.figma.com/img/9b6d/ac45/5a2067a11de1ad55f1aa5fd8cc7c29f4?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qOaCCOJCTGI8QvswSSzIPCW0oxxLP1L-owl2ItrKBT0QbJK-PaxE3ez9SojehBWOKxM3w3y3rXvndysMBl2YHuxlZPsGf0SOKB5Ux-wl089BMxwTgF7cUYxRlrQqZXnNqnyp5irKK4e7rQBZce6ZBKQ7-BMhRdpjXwTjqQrduxbZt9DGdk9dNY6fw7YbPV8YF7ylZxbq3bpyrnFWdqpvIxtTESUtyVaB4v6gKa2XH5drEsZFDUDsNtWRwWEov3wJLmJRsXkyEZ8oQltbDWpttC0yR8HtfoG2luCILgPs~GlO-5Ce8p1W2oG50lkuvNdO7Ix-jiI43Loppcj-G4lWPQ__",
    description: "Google is a global technology company headquartered in Mountain View, California.",
  },
  {
    name: "Apple",
    logo: "https://s3-alpha-sig.figma.com/img/5472/7d2f/25e44d1495bf730f9b234ced5348d619?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=e0AX1ZZ3rRhMEVDvr~ISI9OS9kekeagPLvNViivJopsQcvKl79kQbwAfUpKlF-HHKl51oUM~NS0SRW2RcPHwyTpwYPZHTU32DzIU1BEmiFn9wxql6mPt73wyus~6vY7Bdyevk2qDr5Qp8PEENND5UVHDbw41aqJCRYAb2DXjMLHL4T6lrX14NbqdFhgv9oTUmqBg0qINyq3X0RUqYdNnRKuBoKeyk4A4IPfBZs5YzSyDeq689h~cFsyeQIcUFqS7b4Q0BWIpvf5i0wgQyvGo3W-IDIi~2DB0cDD8JUULY5kIFi93IQHhajGsnLCQt5MUdeZY7NTdJ-KTcWepHnzvyQ__",
    description: "Apple Inc. is a global leader in technology, specializing in electronics, software, and services.",
  },
  {
    name: "Adobe",
    logo: "https://s3-alpha-sig.figma.com/img/6b1f/10ec/7e4fafb1038416ff0a0231fbfa1039ca?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k1IGv~jVnrwwSudG7dpjUd46u1jbERZbpqVRJx0eXIl~EYRyQQU5Uqf6gTn0CrAzKCda60pYtL0Gn9TLzBIZSZdhfR-rJ9pLBb4aT~4XxRSkchmkJbp4akSM4TFMUzib4UmZrq4db-4bib9bgcpaqrG6mIxnNF5NGZmnixlILtjyfOEXm2N8nStC1x-tYx4TtJYAeENDpRis2eHoO00rZte5oicJo6v0UcbTCSROsIJ5Kr17ockn~Td7YD884mTO0a-NyRGAgzxYnN7B2tkSXNhBKKNmDoCHsMv848cOIo1A1tYZmLFpNMlHYvL4fR-y7Zya3q07eCNAwQ5~7OhsQQ__",
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
                  background: `url("https://s3-alpha-sig.figma.com/img/270c/54f6/6f467aa40e004a5c701f276c2328da99?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F8JMQEIGqyVp541ghND~9ygiXy3UJdBsec5BeFOQripClJKwjDtm765Yrovx7wddXVj66veQmgOZ8rykFfLa1y1S7oRItsZ0FAb0U4ROxAH~yOY~ICY~yhRp8g90N2e9oRaiwq8VXnyOsOPlESwlRzZZ7FVi-6QaaCMenPzBqZ~knMGteoStlRpmEKYsRq3H62QQoqLmnDN4VoNS7xd62cnkdgtpmM8eE7UN-uErMffGqlH74c8aLAD6lxv~EalaunN8WGTITGoP7xuhNuitdu2OhW90WYb1pkZiUSSrLEaPLvoEn-ZxxVyYkCfXt6TLEJlkJq2PEeN4Rw-GJYB4~A__") center/cover`,
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
                  Start now
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
