import React from 'react'
import Image from 'next/image'
import { CategoryDropdown } from "../dropdown/category-dropdown";
import { useState } from "react";

export default function HostCard1() {
    const [category, setCategory] = useState("");
  return (
    <div className="w-full flex justify-between ">
          {/* top left column */}
          <div className="flex flex-col gap-20 w-[50%]">
            {/* field 1 */}
            <div className="relative flex w-[491px] items-center gap-2.5 border border-[color:var(--Azure-Blue,#0073E6)] pl-[25px] pr-5 py-4 rounded-[50px] border-solid">
              <p className="absolute -top-5 text-xs">
                Company you are hiring for. *
              </p>
              <Image
                src={"/brand/google.png"}
                height={50}
                width={50}
                alt="google"
                className="h-6 w-6"
              ></Image>
              <input
                type="text"
                placeholder="Google LLC"
                className="h-full outline-0 text-lg"
              />
            </div>
            {/* field 2 */}
            <div className="relative flex w-[491px] items-center gap-2.5 border border-[color:var(--Azure-Blue,#0073E6)] pl-[25px] pr-5 py-4 rounded-[50px] border-solid">
              <p className="absolute -top-5 text-xs">
                Company you are hiring for. *
              </p>
              <input
                type="text"
                placeholder="Start Typing"
                className="h-full w-full outline-0 text-lg"
              />
            </div>
            {/* field 3 */}
            <div className="relative flex w-[491px] items-center gap-2.5 border border-[color:var(--Azure-Blue,#0073E6)] pl-[25px] pr-5 py-4 rounded-[50px] border-solid">
              <p className="absolute -top-5 text-xs">
                Company you are hiring for. *
              </p>
              <input
                type="text"
                placeholder="Kharagpur, West Bengal"
                className="h-full w-full outline-0 text-lg"
              />
            </div>
          </div>
          {/* top right column  */}
          <div className="w-[50%] flex flex-col gap-15">
            {/* field 1 */}
            <div className="flex flex-col gap-4">
              {/* subpart 1 */}
              <div className="flex items-center">
                <p className="text-[20px] mr-2">
                  Job Type. <span className="text-red-600">*</span>{" "}
                </p>{" "}
                <input type="checkbox" className="accent-green-600" />{" "}
                <label htmlFor="checkbox" className="text-[20px] ml-2">
                  full Time
                </label>
                <input type="checkbox" className="accent-green-600 ml-4" />{" "}
                <label htmlFor="checkbox" className="text-[20px] ml-2">
                  Part Time
                </label>
              </div>
              {/* subpart 2 */}
              <div className="flex items-center">
                <p className="text-[20px] mr-4">
                  Location <span className="text-red-600">*</span>{" "}
                </p>{" "}
                <input type="checkbox" className="accent-green-600" />{" "}
                <label htmlFor="checkbox" className="text-[20px] ml-1">
                  Onsite
                </label>
                <input type="checkbox" className="accent-green-600 ml-4" />{" "}
                <label htmlFor="checkbox" className="text-[20px] ml-1">
                  Remote
                </label>
                <input type="checkbox" className="accent-green-600 ml-4" />{" "}
                <label htmlFor="checkbox" className="text-[20px] ml-1">
                  Hybrid
                </label>
              </div>
            </div>
            {/* field 2 */}
            <CategoryDropdown
              value={category}
              onChange={setCategory}
              options={["Engineering", "Marketing", "Design"]}
            />
          </div>
        </div>
  )
}
