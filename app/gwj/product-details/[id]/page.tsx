"use client";
import Footer from "@/app/components/Footer/Footer";
import Nav from "@/app/components/LandingPage-New/nav";
import {
  govtJobs,
  oncampusCourses,
  trendingCourses,
  stats,
  govtStats,
} from "@/constants/dummyData";
import {
  Brain,
  Check,
  ChevronDown,
  ChevronUp,
  Notebook,
  Paperclip,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaFileAlt,
  FaAtom,
  FaCheckSquare,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import { Monitor, Cpu, FileText } from "lucide-react";

const features = [
  {
    icon: <FaFileAlt size={28} className="text-[#0073e6]" />,
    title: "Mock Test",
  },
  {
    icon: <FaUserGraduate size={28} className="text-[#0073e6]" />,
    title: "Research Paper",
  },
  {
    icon: <FaAtom size={28} className="text-[#0073e6]" />,
    title: "5+ In demand Projects",
  },
  {
    icon: <FaCheckSquare size={28} className="text-[#0073e6]" />,
    title: "Real Time Feedback",
  },
  {
    icon: <FaBook size={28} className="text-[#0073e6]" />,
    title: "Jobgenix Talent Award",
  },
  {
    icon: <FaUsers size={28} className="text-[#0073e6]" />,
    title: "Merit Certificate",
  },
];

const Govtfeatures = [
  {
    icon: <FaFileAlt size={28} className="text-[#0073e6]" />,
    title: "General Mental Ability",
  },
  {
    icon: <FaUserGraduate size={28} className="text-[#0073e6]" />,
    title: "Essential Subjects (as per qualification)",
  },
  {
    icon: <FaAtom size={28} className="text-[#0073e6]" />,
    title: "Skill Test",
  },
  {
    icon: <FaCheckSquare size={28} className="text-[#0073e6]" />,
    title: "Interview/personality Test",
  },
];

const features2 = [
  {
    icon: <Monitor className="w-6 h-6 text-blue-600" />,
    text: "Live & on-demand sessions",
  },
  {
    icon: <Cpu className="w-6 h-6 text-blue-600" />,
    text: "get referred from top brands",
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    text: "Get referred from top brands",
  },
];
const features3 = [
  {
    icon: <Brain className="w-6 h-6 text-blue-600" />,
    text: "Soft skills training",
  },
  {
    icon: <Notebook className="w-6 h-6 text-blue-600" />,
    text: "Cover letter & resume preparation",
  },
  {
    icon: <VideoIcon className="w-6 h-6 text-blue-600" />,
    text: "Interview practice",
  },
];
const companies = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Meta",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShFGV-kmuuMoVSUi5SxXoGJ-2u3oYJjGR3IQ&s",
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
  },
  {
    name: "JP Morgan",
    logo: "https://brandyhq.com/wp-content/uploads/2024/12/JP-Morgan-Logo.jpg",
  },
  {
    name: "Uber",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJIOGtHi6yLhWs9gI0Bz1T83KoUzuqCQ7IQ&s",
  },
  {
    name: "Bain and company",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw3b6dFJ01Pny_nz57a2ARZS6OWlNKrjzaDQ&s",
  },
  {
    name: "Zomato",
    logo: "https://play-lh.googleusercontent.com/ixPkPHkzd8VD0HbmCL1n5PKYi3tWn8hGpRjeP6lutuFWZ6VpXUePGa9ZHcP6f_99bDA=s256-rw",
  },
  {
    name: "Mastercard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "TCS",
    logo: "/gwj/companies/tcs.png",
  },
];
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
type Courses = {
  id: number;
  title: string;
  img: string;
  bullets: string[];
  enroll: number;
  rating: number;
  rate: number;
};
const ProductDetailsPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [course, setCourse] = useState<Courses | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      if (page === "oncampus") {
        const found = oncampusCourses.find((c) => c.id === parseInt(id));
        if (found) setCourse(found);
        else setError(true);
      } else if (page === "trending") {
        const found = trendingCourses.find((c) => c.id === parseInt(id));
        if (found) setCourse(found);
        else setError(true);
      } else if (page === "govt") {
        const found = govtJobs.find((c) => c.id === parseInt(id));
        if (found) setCourse(found);
        else setError(true);
      } else {
        setError(true);
      }
    }
  }, [id, page]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">
          Error: Course not found!
        </h1>
      </div>
    );
  }

  return (
    <div className="font-sora bg-[#F5F5F5]">
      <Nav />
      <section
        className="bg-cover bg-center text-white mt-5"
        style={{
          backgroundImage:
            "url('https://d2o2utebsixu4k.cloudfront.net/Data%20science-9ebefe6e77794815b69708b0ac1e9d13-af28611554944c678c0989ef967e8103.webp')",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:flex lg:items-center lg:justify-between">
          {/* Left Content */}
          <div className="lg:w-2/3">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/brand/jobGenix-black-blue.svg"
                alt="IIIT Bangalore"
                className="h-12 bg-white rounded p-2"
              />
            </div>

            <h1 className="text-6xl font-bold leading-snug mb-6">
              {course?.title}
            </h1>

            <ul className="space-y-2 text-lg">
              {course?.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 mt-6">
              <p className="text-lg font-medium">
                100+ enrolled | ⭐ {course?.rating}/5
              </p>
            </div>
          </div>

          {/* Right Box */}
          <div className="mt-10 lg:mt-0 lg:w-1/3">
            <div className="bg-white text-black rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Secure your spot now!
              </h3>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-center justify-between">
                  <span>📅 Duration</span>
                  {page === "trending" && parseInt(id || "0") === 1 ? (
                    <>
                      <span className="font-semibold">2 months</span>
                    </>
                  ) : (
                    <span className="font-semibold">4 months</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span>💳 Registration charge</span>
                  <div>
                    <p className="font-semibold line-through">INR 7,999*</p>
                    <p className="font-semibold">INR 4,999*</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>⏳ Admission Deadline</span>
                  <span className="font-semibold">31-oct-2025</span>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <a
                  href="/gwj/Brochure Grow Up with JobGenix.pdf"
                  target="_blank" // opens in new tab
                  rel="noopener noreferrer"
                  download // this triggers direct download instead of open
                  className="w-1/2"
                >
                  <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    Download brochure
                  </button>
                </a>

                <button className=" w-1/2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  <Link href="/gwj/enroll">Apply now</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-600 font-medium mb-2">
            Key Features: Crack 20 LPA job
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            A Mission To Level Up <span className="text-[#0073e6]">India</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {page === "govt"
            ? Govtfeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-2xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition"
                >
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                </div>
              ))
            : features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-2xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition"
                >
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                </div>
              ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Trusted by the World’s Leading Companies
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 lg:space-y-4 items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-center w-24 h-24 mb-3 group-hover:shadow-md transition">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-12 object-contain"
                />
              </div>
              <p className="text-sm font-medium">{company.name}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto w-full bg-white border rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center divide-y md:divide-y-0 md:divide-x divide-gray-300 text-center">
          {page === "govt"
            ? govtStats.map((stat, index) => (
                <div key={index} className="flex-1 py-6 px-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
                    {stat.value}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">
                    {stat.label}
                  </p>
                </div>
              ))
            : stats.map((stat, index) => (
                <div key={index} className="flex-1 py-6 px-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
                    {stat.value}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
        </div>
      </div>

      {page !== "govt" && (
        <div>
          {/* next section */}
          <div className="w-full bg-[#FBFCFF] border rounded-2xl p-6 md:p-10 shadow-sm my-20 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              {/* Left Content */}
              <div className="">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Go from{" "}
                  {page === "trending" && parseInt(id || "0") === 1 ? (
                    <>
                      <span className="text-blue-600">
                        beginner to pro in 2 months
                      </span>
                    </>
                  ) : (
                    <span className="text-blue-600">
                      beginner to pro in 4 months
                    </span>
                  )}
                </h2>
                <p className="text-gray-600 mt-3">
                  With a curriculum designed and taught by industry experts, you
                  will get the skills and mentorship for career success.
                </p>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {features2.map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center text-center border rounded-xl p-4 hover:shadow-md transition"
                    >
                      <div className="bg-blue-50 rounded-lg p-3 mb-2">
                        {feature.icon}
                      </div>
                      <p className="text-gray-700 text-sm md:text-base">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="flex justify-center">
                <img
                  src="/gwj/product-details-1.png" // replace with your image path
                  alt="Learning illustration"
                  className="w-full max-w-md rounded-lg"
                />
              </div>
            </div>
          </div>
          {/* next section */}

          <div className="w-full bg-[#FBFCFF] border rounded-2xl p-6 md:p-10 shadow-sm max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Left Content */}
              <div className="flex justify-center">
                <img
                  src="/gwj/product-details-2.png" // replace with your image path
                  alt="Learning illustration"
                  className="w-full max-w-md rounded-lg"
                />
              </div>
              {/* Right Image */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Become <span className="text-blue-600">placement-ready</span>
                </h2>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {features3.map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center text-center border rounded-xl p-4 hover:shadow-md transition"
                    >
                      <div className="bg-blue-50 rounded-lg p-3 mb-2">
                        {feature.icon}
                      </div>
                      <p className="text-gray-700 text-sm md:text-base">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="w-full px-6 md:px-20 py-12">
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
      <section className="w-full px-6 py-12 md:px-16 lg:px-24 mt-10">
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
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
