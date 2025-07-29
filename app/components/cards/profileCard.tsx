import UserDetails from "@/types/userDetails";
import { MapPin, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function ProfileCard({ data }: { data: UserDetails }) {
  const [isEditable, setIsEditable] = useState(false);
  const [skills, setSkills] = useState(data.skills.split(","));
  const [newSkill, setNewSkill] = useState("");

  // Function to add new skill
  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  return (
    <div className="w-full max-w-[28rem] h-full flex flex-col gap-5 lg:gap-10">
      {/* //added a custom css as card-shadow */}
      <div
        className={`card-shadow lg:min-h-[757px] lg:h-full font-montserrat font-normal h-fit bg-white rounded-2xl px-2 py-6 sm:p-6 text-center`}
      >
        <div className="min-w-[20.3rem] md:min-w-max w-full flex flex-col items-center gap-4 ">
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              src={data.profileImage}
              height={50}
              width={50}
              alt="Surajit Saha"
              className="size-28 border-[#0073E680] border-[3px] rounded-full  mx-auto"
            />

            <h2 className="font-bold text-xl">{data.name}</h2>
            <p className="font-medium text-sm text-gray-500">UI/UX Designer</p>
            <p className="font-medium text-sm text-gray-500 flex items-center gap-2">
              <MapPin size={17} /> {data.location}
            </p>
          </div>

          <div className="card-shadow bg-gray-100 text-xs leading-[1.1rem] text-[#333333] font-bold py-[0.7rem] px-4 rounded-full w-max mx-auto shadow-lg ">
            Member&#39;s Id : 9798789
          </div>

          <div className="card-shadow bg-gray-100 py-[0.7rem] px-4 rounded-full w-fit mx-auto shadow-lg font-medium text-base leading-[1.4rem]">
            Opportunities Applied : <span className="">204</span>
          </div>

          {/* seperator */}
          <hr
            className=" w-[85%]"
            style={{
              borderImageSource:
                "linear-gradient(90deg, rgba(153,153,153,0) 0%, rgba(99,99,99,0.528846) 10.58%, #333333 50%, rgba(99,99,99,0.53) 90.38%, rgba(153,153,153,0) 100%)",
              borderImageSlice: 1,
            }}
          />

          <div className="text-left-fit mx-auto h-[3.5rem] flex flex-col justify-between items-center">
            <div className="flex items-center gap-4 sm:gap-7">
              <span className="font-medium text-sm text-[#333333]">
                LinkedIn Profile
              </span>
              <Link
                href="https://www.linkedin.com/in/"
                className="text-[#0073E6] opacity-[70%] text-xs leading-[1.1rem] font-bold flex items-center gap-1"
                target="_blank"
              >
                www.linkedin.com/in/{" "}
                <SquarePen size={20} className="size-5 sm:size-6 text-black" />
              </Link>
            </div>

            <div className="w-full flex items-center gap-7 justify-between">
              <span className="text-left font-light text-sm text-[#333333]">
                Portfolio
              </span>
              <Link
                href="https://www.portfolio.com/in/"
                className="text-[#0073E6] opacity-[70%] text-xs leading-[1.1rem] font-bold flex items-center gap-1"
                target="_blank"
              >
                www.portfolio.com/in/{" "}
                <SquarePen size={20} className="size-5 sm:size-6 text-black" />
              </Link>
            </div>
          </div>
          <hr
            className=" w-[85%]"
            style={{
              borderImageSource:
                "linear-gradient(90deg, rgba(153,153,153,0) 0%, rgba(99,99,99,0.528846) 10.58%, #333333 50%, rgba(99,99,99,0.53) 90.38%, rgba(153,153,153,0) 100%)",
              borderImageSlice: 1,
            }}
          />

          {/* skills */}
          {/* <div className="flex flex-col justify-start items-center gap-3">
            <p className="text-lg leading-6 font-semibold text-center text-[#333333] flex justify-center">
              Skill(s)
            </p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {data.skills.split(",").map((skill: string, index: number) => (
                <span
                  key={index}
                  className="card-shadow flex text-white text-sm font-medium items-center gap-2.5 bg-[#0073E6] px-4 py-[0.7rem] rounded-3xl"
                >
                  {skill}
                </span>
              ))}
              <button
                type="button"
                onClick={() => setIsEditable(!isEditable)}
                className={`${
                  isEditable && "bg-slate-200"
                } px-3 rounded-md py-2 cursor-pointer text-black flex items-center gap-2 font-medium self-end`}
              >
                <SquarePen size={20} />
              </button>
            </div>
          </div> */}
          <div className="flex flex-col justify-start items-center gap-3">
            <p className="text-lg leading-6 font-semibold text-center text-[#333333] flex justify-center">
              Skill(s)
            </p>

            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="card-shadow flex text-white text-sm font-medium items-center gap-2.5 bg-[#0073E6] px-4 py-[0.7rem] rounded-3xl"
                >
                  {skill}
                </span>
              ))}

              {isEditable && (
                <>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add skill"
                    className="border p-2 rounded text-sm"
                  />
                  <button
                    onClick={addSkill}
                    className="px-3 rounded-md py-2 bg-[#0073E6] text-white text-sm font-medium"
                  >
                    +
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setIsEditable(!isEditable)}
                className={`${isEditable && "bg-slate-200"
                  } px-3 rounded-md py-2 cursor-pointer text-black flex items-center gap-2 font-medium`}
              >
                <SquarePen size={20} />
              </button>
            </div>

            {isEditable && (
              <button
                onClick={() => setIsEditable(false)}
                className="mt-2 px-3 rounded-md py-2 bg-[#0073E6] text-white text-sm font-medium"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Refer Card  */}
      <div className="card-shadow lg:h-full lg:max-h-[261px] h-fit flex flex-col items-center justify-center gap-3 px-[1rem] py-[1.6rem] rounded-[15px] bg-white">
        <h1 className="self-stretch text-[#333333] text-center font-sora text-2xl font-bold leading-[44px] ">
          Refer your Friends
        </h1>
        <div className="flex gap-4">
          <Image
            src={"/brand/whatsapp.png"}
            height={900}
            width={900}
            alt="whatsapp"
            className="w-[5.4rem]"
          />
          <Image
            src={"/brand/instagram.png"}
            height={900}
            width={900}
            alt="instagram"
            className="w-[5.4rem]"
          />
          <Image
            src={"/brand/telegram.png"}
            height={900}
            width={900}
            alt="telegram"
            className="w-[5.4rem]"
          />
        </div>
      </div>
    </div>
  );
}
