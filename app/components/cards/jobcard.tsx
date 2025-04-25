import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export default function Jobcard() {
  const profile =
    "https://s3-alpha-sig.figma.com/img/62b2/de86/3e5c02d1c4d27a7ec3537a08183734bc?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Iiv2eQpy9M7Ro9noN8BPWprVs63QsOjznCF8NXKHcWPJSB1e7zX-kCfCZvkfaAVquKwJWnJ7cHHubY6yN7Qxko32Lem2uq25NITl1LtsmkIcWpFc9Ibhswq9w81HVkbuOWlIM2vJEY9w4E78wqGYwrLUk3c3TZ0fGwPXB45Oq4EU4EQaLHvJtALAyDsxw67EdAqn~L3BZdwt4OiJJeb3EX3j9ZmSeaMCt8GiaA5J0beuvu2ODUqMeWkZ28yvPcsV0osSVLPvdRkig1VlSAVC5BFDJ7BRpWAhuJGvDI45kuJvuafU1DIZ7JS~yBVmfc~KwpG-USxfdafY-RSKjeI1sg__";
  const imgurl =
    "https://s3-alpha-sig.figma.com/img/74e9/b231/724bca7dfbbf597d9c891c925b7eecd3?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rFftIWrKcpkG7Z9IioKK6JoWl2NsLHw6YoY79st3RqYZpxOLLq70PjuvV2DuNBkvj95P6vNp46OCjCxXX1vGjjVMBH2kyWrAFTbnQSZHas85vxzvErLjEBzdui-ChslKV6GaqnisTFcMGUjclSEm5Z0zyzghrfllCo5K2Kg5dy0tTWcJBswCLzX~8w08xC6c9pV6n6QMSFYH37PZn-5YgX3IZWu1itoDIcMNnfzf0irWVHs8UklF1pFCd3VB4~TVZghS6s6Ek9fyJQonpEot0UlsA~NTSvJdqQYeM~6aCN1g5Mkc2fu29xaBhuDWNQr-l1Cad-vCQlKYC6Cuq6C9ww__";
  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden">
      <div className="h-32 w-full relative ">
        <Image src={imgurl} fill className="object-cover" alt="img"></Image>
      </div>
      <div className="flex flex-col gap-7 p-4">
        <div className="flex gap-6 px-1">
          <span className="px-2 py-1 rounded-full text-[#2B65EC] bg-[#DBEAFE] text-xs font-light">
            4 weeks
          </span>
          <span className="px-2 py-1 rounded-full text-[#269669] bg-[#D1FAE5]  text-xs font-light">
            Beginners
          </span>
        </div>
        <p className="text-left px-1 text-light text-sm w-[80%]">
          Master effective communication for professional success.
        </p>
        <div className="flex px-1 justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="relative h-8 w-8 rounded-full overflow-hidden ">
              <Image src={profile} fill alt="profile"></Image>
            </div>
            <p>John Smith</p>
          </div>
          <div className="flex gap-2 items-center">
            <Link
              href={"/"}
              className="py-1 px-3 bg-[#0073E6] rounded-4xl text-white"
            >
              Apply Now!
            </Link>
            <Bookmark />
          </div>
        </div>
      </div>
    </div>
  );
}
