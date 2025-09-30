"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import { useXarrow } from "react-xarrows";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  ArrowLeft,
  ArrowRight,
  ArrowRightFromLine,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  dummyImages,
  oncampusCourses,
  testimonials,
  trendingCourses,
} from "../../constants/dummyData";
import Footer from "../components/Footer/Footer";
import Link from "next/link";
import { useSession } from "next-auth/react";

type VerticalSliderProps = {
  images: string[];
  direction?: "up" | "down";
};

const VerticalSlider: React.FC<VerticalSliderProps> = ({
  images,
  direction = "up",
}) => {
  return (
    <div className="overflow-hidden h-40 w-28 relative">
      <motion.div
        className="flex flex-col gap-4"
        animate={{
          y: direction === "up" ? ["100%", "-100%"] : ["-100%", "100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {images.map((src: string, index: number) => (
          <img
            key={index}
            src={src}
            alt="reward"
            className="rounded-xl w-full h-auto"
          />
        ))}
      </motion.div>
    </div>
  );
};

function App() {
  const router = useRouter();

  const updateXarrow = useXarrow();
  useEffect(() => {
    window.addEventListener("resize", updateXarrow);
    return () => window.removeEventListener("resize", updateXarrow);
  }, [updateXarrow]);

  const faqs = [
    {
      question: " What is the Grow Up With Jobgenix program?",
      answer:
        "The Grow Up With Jobgenix program is a career-focused training ecosystem designed for GenZ students and young professionals. It combines AI-powered CV analysis, skill-based training, real-world projects, internships, and mentorship to help participants land their dream jobs with confidence.",
    },
    {
      question:
        "What makes Jobgenix different from other training or job platforms?",
      answer:
        "Unlike traditional job portals, Jobgenix uses AI to instantly analyze CVs and show a candidate’s selection chances. Along with structured training, mock tests, research projects, and portfolio building (LinkedIn, GitHub, Kaggle), it ensures students are job-ready while maintaining a high 95% placement success rate.",
    },
    {
      question: "What benefits do I get after enrolling in the program?",
      answer: "Participants gain access to: ",
      points: [
        "Live training with industry experts",
        "Internship/job opportunities with 400+ hiring partners",
        "5+ flagship projects solving real-world business problems",
        "Research paper opportunities and a merit certificate",
        "Jobgenix Talent Award and career portfolio ",
        "Get direct acsess to Jobgenix Placement Cell",
      ],
    },
    {
      question: "Who can join this program?",
      answer:
        "The program is open to students, freshers, and young professionals who want to upgrade their skills, build a strong career portfolio, and increase their chances of getting placed in top companies with competitive salary packages.",
    },
    {
      question: "How can I apply for the program?",
      answer: "The selection process is simple: ",
      points: [
        "Register online through the official form.",
        "Book your seat in the program.",
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [activeIndexForSlider, setActiveIndexForSlider] = useState<
    number | null
  >(0);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <div className="bg-[#F2F8FE] font-sora">
        <section className="bg-[url('/gwj/bg.png')] px-6 py-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
            {/* Text Content */}
            <div className=" text-center md:text-left md:w-1/2">
              <img
                src="/gwj/gwj.png"
                alt="grow up with jobgenix"
                className="md:w-[500px]"
              />
              <p className="text-2xl text-black mb-3 flex flex-col md:flex-row items-center">
                <span> A Mission To Level Up </span>
                <img
                  src="/gwj/indiaLogo.png"
                  alt="india"
                  className="w-[70px] ms-2 mb-2"
                />
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {" "}
                Get certified, Get Ahead
              </p>
              <Link
                href="/gwj/enroll"
                className="inline-flex items-center gap-2 bg-blue-600 text-white text-xl px-6 py-4 rounded-full hover:bg-blue-700 transition "
              >
                Enrol Now
              </Link>
            </div>

            {/* Video / Image */}
            <div className="w-full md:w-1/2">
              <img src="/gwj/banner.png" alt="" className="w-[800px]" />
            </div>
          </div>
        </section>
        <section className="py-10 flex flex-col p-3">
          <div className="flex items-center space-x-5 md:space-x-14 md:mb-4">
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900">
              Placement Guaranteed courses
            </h1>
          </div>

          <div className="w-full">
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              loop={true}
              modules={[Pagination]}
              pagination={{ clickable: true, el: ".custom-pagination-1" }}
            >
              {trendingCourses.map((course, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="group transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer rounded-xl shadow-md bg-white my-8"
                    onClick={() => {
                      router.push(
                        `/gwj/product-details/${course.id}?page=trending`
                      );
                    }}
                  >
                    <img
                      src={course.img}
                      alt={`Slide ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                    <div className=" mt-3 p-3 pt-0">
                      <h2 className="text-2xl font-semibold ">
                        {course.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-3">
                        <p>✅</p>
                        <p>Placement guaranted course</p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <p>⌚</p>
                        <p>4 months with live classes</p>
                      </div>
                      <div className="h-[2px] bg-gray-200 my-6 w-full"></div>
                      <p>Our students placed at </p>
                      <div className="flex gap-2 items-center mt-2">
                        {course.companies?.map((company, idx) => (
                          <img
                            key={idx}
                            src={company}
                            alt="company"
                            className="h-8 w-auto"
                          />
                        ))}
                        <p>& more.</p>
                      </div>
                      <div className="text-[#1D4ED8] flex items-center gap-2 justify-end">
                        <p>know more</p> <ArrowRightFromLine />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="custom-pagination-1 mt-5 flex justify-center gap-2"></div>
          </div>
        </section>
        <section className="py-10 flex flex-col p-3">
          <div className="flex items-center space-x-5 md:space-x-14 md:mb-4">
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900">
              On Campus courses
            </h1>
          </div>

          <div className="w-full">
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              loop={true}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
              }}
            >
              {oncampusCourses.map((course, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="group transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer rounded-xl shadow-md bg-white my-8"
                    onClick={() => {
                      router.push(
                        `/gwj/product-details/${course.id}?page=oncampus`
                      );
                    }}
                  >
                    <img
                      src={course.img}
                      alt={`Slide ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                    <div className=" mt-3 p-3 pt-0">
                      <h2 className="text-2xl font-semibold ">
                        {course.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-3">
                        <p>✅</p>
                        <p>Placement guaranted course</p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <p>⌚</p>
                        <p>4 months with live classes</p>
                      </div>
                      <div className="h-[2px] bg-gray-200 my-6 w-full"></div>
                      <p>Our students placed at </p>
                      <div className="flex gap-2 items-center mt-2">
                        {course.companies?.map((company, idx) => (
                          <img
                            key={idx}
                            src={company}
                            alt="company"
                            className="h-8 w-auto"
                          />
                        ))}
                        <p>& more.</p>
                      </div>
                      <div className="text-[#1D4ED8] flex items-center gap-2 justify-end">
                        <p>know more</p> <ArrowRightFromLine />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-pagination mt-5 flex justify-center gap-2"></div>
          </div>
        </section>
        <section className="w-full px-6 md:px-20 py-12 bg-white">
          {/* Title */}
          <h2 className="text-2xl md:text-5xl font-semibold text-center mb-12 relative inline-block">
            Certifications
          </h2>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-6">
                Get Certification from Jobgenix:
              </h3>

              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                  <span>
                    Get Completion certification and Merit certification from
                    Jobgenix.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                  <span>
                    Build a portfolio for crack product based companies.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                  <span>Widely acceptable by all companies and recruiters</span>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                  <span>Direct access to Jobgenix Placement cell</span>
                </li>
              </ul>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img
                src="/gwj/certificate.png" // replace with your certificate image
                alt="Certification"
                className="rounded-lg shadow-lg w-full md:w-3/4"
              />
            </div>
          </div>
        </section>

        <div
          className="w-full py-16 px-6 md:px-16 text-white transition-colors duration-700"
          style={{
            background: `linear-gradient(to right, ${
              testimonials[activeIndexForSlider ?? 0].bg
            } 0%, ${
              testimonials[activeIndexForSlider ?? 0].bg
            } 50%, #000 100%)`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Section */}
            <div className="flex items-center justify-between">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold">
                  Don&apos;t Just Take Our Word for It
                </h2>
                <p className="text-lg max-w-md">
                  Exclusive Created Tracks and guided path for you to track your
                  dream companies based on common preparation journey.
                </p>

                <Link href="/gwj/enroll">
                  <button className="px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition">
                    Enrol Now
                  </button>
                </Link>
              </div>

              {/* Custom Next Button */}
              <div className="swiper-button-next !static !translate-x-0 mt-4 flex justify-center "></div>
            </div>
            {/* Right Section (Swiper Slider) */}
            <div>
              <Swiper
                modules={[Navigation, Autoplay]}
                loop={true}
                spaceBetween={20}
                slidesPerView={2.2}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 16 }, // mobile full width
                  640: { slidesPerView: 1.2, spaceBetween: 16 }, // small tablet
                  768: { slidesPerView: 1.5, spaceBetween: 20 }, // tablet
                  1024: { slidesPerView: 2, spaceBetween: 24 }, // desktop
                  1280: { slidesPerView: 2.2, spaceBetween: 28 }, // large screen
                }}
                autoplay={{ delay: 3000 }}
                navigation={{
                  nextEl: ".swiper-button-next",
                }}
                className="pb-10"
                onSlideChange={(swiper) =>
                  setActiveIndexForSlider(swiper.realIndex)
                }
              >
                {testimonials.map((track, index) => (
                  <SwiperSlide key={index} className="flex justify-center px-2">
                    <div
                      className="w-full max-w-sm min-h-[400px] rounded-xl shadow-md p-6 md:p-8 border-r-4 border-b-4 border-blue-900"
                      style={{
                        backgroundColor: track.bg,
                      }}
                    >
                      <div className="text-3xl text-blue-900 mb-2">“</div>
                      <p className="text-white mb-4">{track.text}</p>
                      <p className="font-semibold text-white">{track.name}</p>
                      <p className="text-sm text-white">{track.rating}/5</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <section className="w-full px-6 py-12 md:px-16 lg:px-24">
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Left Side */}
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Frequently asked <br /> questions
              </h2>
              <p className="mt-4 text-gray-600">
                Can’t find the answer you are looking for?
              </p>
              <a
                href="#"
                className="mt-2 inline-block font-semibold text-green-700 hover:underline"
              >
                Reach out to us
              </a>
            </div>
            {/* Right Side (Accordion) */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button
                    className="flex w-full items-center justify-between text-left"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="mt-2 text-gray-600 text-sm leading-relaxed">
                      <p>{faq.answer}</p>
                      {faq.points && (
                        <ul className="mt-2 list-disc list-inside space-y-1">
                          {faq.points.map((point: string, idx: number) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-8 bg-blue-50 rounded-2xl shadow-md space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xl md:text-3xl font-semibold text-gray-800">
              Share with your friends and grab a 10% discount with
              exciting prizes.{" "}
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              & win MacBook, iPhone, Cash Rewards, etc.{" "}
              <span className="text-sm text-blue-600 cursor-pointer">
                Know More
              </span>
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.youtube.com/@JobGenixOfficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <button className="bg-red-600 text-white p-3 rounded-full">
                  <FaYoutube />
                </button>
              </a>
              <a
                href="https://www.instagram.com/jobgenix.team?utm_source=ig_web_button_share_sheet&igsh=ZnlpdGJzOWF2OTB0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-pink-700 text-white p-3 rounded-full">
                  <FaInstagram />
                </button>
              </a>
              <a
                href="https://www.linkedin.com/company/successwithjobgenix/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-blue-700 text-white p-3 rounded-full">
                  <FaLinkedinIn />
                </button>
              </a>
              <a
                href="mailto:team@jobgenix.co.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-red-600 text-white p-3 rounded-full">
                  <FaEnvelope />
                </button>
              </a>
              <a
                href="https://www.jobgenix.co.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white border text-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
                  <FiCopy />
                  Copy
                </button>
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex gap-4">
            <VerticalSlider images={dummyImages} direction="down" />
            <VerticalSlider images={dummyImages} direction="up" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
