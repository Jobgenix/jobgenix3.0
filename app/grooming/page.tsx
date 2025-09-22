"use client";
import Nav from "../components/LandingPage-New/nav";
import Footer from "../components/Footer/Footer";
import { Button } from "../components/ui/button";
import { AnimatePresence, delay, easeOut, motion } from "framer-motion";

import { Bookmark } from "lucide-react";
import Image from "next/image";
import { ArrowRightCircle } from "lucide-react";
import { useEffect, useState } from "react";

const courses = [
  {
    title: "Basic Access",
    description: "Master effective communication for professional success.",
    instructor: "Adrika",
    img: "/grooming/basic.jpg",
    instructorImg: "/grooming/instructor.webp",
    link: "https://forms.gle/tuNYawTzVAZLeoMK7",
  },
  {
    title: "Pro pass",
    description: "Master effective communication for professional success.",
    instructor: "Adrika",
    img: "/grooming/propass.jpg",
    instructorImg: "/grooming/instructor.webp",
    link: "https://forms.gle/oY3tZtm1fUpMnjZV7",
  },
  {
    title: "Elite Accelerator",
    description: "Master effective communication for professional success.",
    instructor: "Adrika",
    img: "/grooming/eliteacc.jpg",
    instructorImg: "/grooming/instructor.webp",
    link: "https://forms.gle/CJE6CycSPh1sw1uQ8",
  },
  {
    title: "elite pass",
    description: "Master effective communication for professional success.",
    instructor: "Tilak",
    img: "/grooming/elitepass.jpg",
    instructorImg: "/grooming/instructor2.jpg",
    link: "https://forms.gle/aHKvaSiaMiLCXadE7",
  },
  {
    title: "Pro elite pass",
    description: "Master effective communication for professional success.",
    instructor: "Tilak",
    img: "/grooming/proelite.jpg",
    instructorImg: "/grooming/instructor2.jpg",
    link: "https://forms.gle/DWWXsAzUwXvYRXux5",
  },
];
const Grooming = () => {
  const text = "career warmup";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      scale: [1.4, 0.95, 1.05, 1],
      transition: {
        ease: easeOut,
        duration: 0.4,
      },
    },
  };
  const professions = [
    "software engineer",
    "UI/UX designer",
    "DevOps engineer",
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % professions.length);
    }, 2500); // change every 2.5s
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-[#F5F5F5]">
      <Nav />
      <section className="pb-10 bg-hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-6 pt-16">
          <div className="text-center max-w-5xl mx-auto">
            <motion.h1
              className="text-[36px] md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {text.split("").map((char, index) => {
                // Apply gradient to "warmup"
                const isGradient = index >= 7;
                return (
                  <motion.span
                    key={index}
                    variants={letter}
                    className={
                      isGradient
                        ? "inline-block bg-gradient-to-r from-[#F16058] to-[#0073E6] bg-clip-text text-transparent"
                        : "inline-block text-[#6C7686]"
                    }
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </motion.h1>
            <p className="text-[16px] md:text-xl text-muted-foreground md:mb-8 max-w-2xl mx-auto leading-relaxed mb-36">
              A quick way to level up your confidence in
              <br />
              <span className="text-[#0073E6] font-medium inline-block min-h-[1.5em] mt-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={professions[index]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="inline-block"
                  >
                    {" "}
                    {professions[index]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
            <Button
              size="lg"
              className="bg-[#0073E6] hover:bg-brand-blue-dark text-primary-foreground px-8 py-4 text-[16px] md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey Now
            </Button>
          </div>

          {/* <div className="flex flex-col items-center">
            <div className="relative inline-block">
              <div className="absolute top-3/4 left-1/2 md:w-[500px] md:h-96 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-t-full blur-2xl opacity-40"></div>
              <div className="block md:hidden">
                <Image
                  src="/grooming/middle.png"
                  alt="JobGenix Platform"
                  width={400}
                  height={300}
                  className="w-auto h-auto"
                  priority
                />
              </div>
              <div className="hidden md:block">
                <Image
                  src="/grooming/middle3.png"
                  alt="JobGenix Platform"
                  width={800}
                  height={600}
                  className="w-auto h-auto"
                  priority
                />
              </div>
            </div>
          </div> */}
        </div>
      </section>
      <section className="bg-[#021C2D] text-section-dark-foreground py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Learn. <span className="text-[#0073E6]">Slay</span>. Get Hired.
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed">
              A power-packed space designed to sharpen your skills, boost
              confidence, and make you job-ready.{" "}
              <span className="text-[#0073E6] font-semibold">
                Pick a track & Start now!
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                description={course.description}
                instructor={course.instructor}
                isBookmarked={index === 1}
                idx={index}
                img={course.img}
                instructorImg={course.instructorImg}
                link={course.link}
              />
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}

      <div className="text-center sm:py-16 m-0 w-full flex flex-col items-center">
        <h2 className="text-xl md:text-3xl lg:text-[3.6rem] lg:leading-[4rem] font-sora font-bold text-gray-900">
          Your Future&apos;s Calling <br />
          <span className="text-gray-800">Are You Ready to Answer?</span>
        </h2>
        <div className="flex sm:gap-5 justify-center lg:gap-[3.4rem] w-full mt-4">
          <Image
            src="/LandingPageImages/left.png"
            alt=""
            width={200}
            height={200}
            className="w-6 md:w-14 max-w-[56px] md:max-w-[56px] h-auto"
          />

          <p className=" text-blue-500 text-sm md:text-base ">
            <span className="cursor-pointer hover:underline">Get matched.</span>{" "}
            <span className="cursor-pointer text-black hover:underline">
              Get mentored.
            </span>{" "}
            <span className="cursor-pointer hover:underline">Get hired.</span>
          </p>
          <Image
            src="/LandingPageImages/right.png"
            alt=""
            width={200}
            height={200}
            className="w-6 md:w-14 max-w-[56px] md:max-w-[56px] h-auto"
          />
        </div>
        {/* Call to Action Button */}
        <button className=" bg-[#0073E6] px-2 py-2 text-white xl:px-6 xl:py-3 rounded-full flex items-center justify-center gap-1 font-bold text-[0.83rem] md:text-base lg:text-xl leading-7 hover:bg-blue-600 transition">
          Create Your Free Account & Start Today
          <ArrowRightCircle size={20} />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Grooming;

interface CourseCardProps {
  title: string;
  description: string;
  instructor: string;
  isBookmarked?: boolean;
  idx: number;
  img: string;
  instructorImg?: string;
  link?: string;
}

const CourseCard = ({
  title,
  description,
  instructor,
  isBookmarked = false,
  idx,
  img,
  instructorImg,
  link = "#",
}: CourseCardProps) => {
  return (
    <div className="bg-white rounded-[20px] shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Thumbnail Section */}
      {/* Thumbnail Section */}
      <div className="relative w-full">
        <Image
          src={img}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-cover rounded-t-[20px]"
          priority
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-black text-sm font-[400] font-Montserrat mb-6 leading-[20px]">
          {description}
        </p>

        {/* Instructor & Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={instructorImg ?? "/grooming/default-instructor.jpg"} // Replace with instructor image URL or fallback
              alt={instructor}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-black text-sm font-[400] font-Montserrat leading-[20px]">
              {instructor}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {" "}
            <a href={link} target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-[12px] font-bold transition-colors">
                enroll Now !
              </button>
            </a>
            <Bookmark
              className={`h-5 w-5 cursor-pointer transition-colors ${
                isBookmarked
                  ? "fill-blue-500 text-blue-500"
                  : "text-black hover:text-blue-500"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
