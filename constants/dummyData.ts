const dummyImages = [
  "/gwj/iphone.jpeg",
  "/gwj/mac.jpg",
  "/gwj/mug.jpg",
  "/gwj/cash.jpg",
  "/gwj/shirt.jpg",
  "/gwj/water_bottle.jpg",
];

const steps = [
  {
    title: "Registration",
    description:
      "Complete the sign-up form with your details. This marks the official start of your learning journey.",
  },
  {
    title: "Join our student community",
    description:
      " Step into a vibrant network of learners from diverse backgrounds. Share ideas, collaborate, and grow together.",
  },
  {
    title: "Training + Internship",
    description:
      "Learn from expert-led training sessions tailored to industry needs. Apply your skills through hands-on internship experience.",
  },
  {
    title: "Meet your tribe",
    description:
      "Connect with people who inspire and support you. Build lasting relationships with like-minded individuals.",
  },
];
const testimonials = [
  {
    name: "Garima Sharma",
    rating: "4.9",
    text: "Mr. Souvik sir is an amazing mentor. He made me feel so comfortable and confident during our call, and his clear instructions gave me a fantastic roadmap for my career. I'm so grateful for his guidance and I appreciate his insightful nature.",
    bg: "#4F46E5",
  },
  {
    name: "Satavisha Das",
    rating: "4.7",
    text: "It was a fun and truly informative conversation that made me more confident. Your friendly approach helped me feel comfortable, and your guidance gave me a clear direction. I sincerely appreciate the effort you put into supporting my career journey.",
    bg: "#9333EA",
  },
  {
    name: "NAGA SAI",
    rating: "4.7",
    text: "I had an incredibly insightful session with Souvik Saha. He gave clear guidance on improving my resume and valuable advice on making it stand out. His Jobgenix portal and community are among the best resources for job and internship updates.",
    bg: "#F59E0B",
  },
  {
    name: "Ishika",
    rating: "4.3",
    text: "It was an absolute game-changer for my preparation journey. The thoughtfully curated questions struck the perfect balance between difficulty and variety, making me more confident. I truly appreciate the effort put into creating such high-quality resources for learners like me.",
    bg: "#1bc15f",
  },
  {
    name: "Swapnil Srivastava",
    rating: "4.8",
    text: "The mentor gave practical advice that cleared my doubts about career direction. His actionable guidance boosted my confidence and provided a clear roadmap. It was a productive session, and I recommend it to anyone seeking clarity in professional growth.",
    bg: "#1ac2cc",
  },
];

const testimonials2 = [
  {
    name: "Vikrant Padmani",
    rating: "4.7",
    text: "It was very informative and useful conversation with Souvik. He is very humble and down to earth person and he guided me very well structured path which I should follow for my Automation /SDET career and on which part I need to focus and need to work on. Thank you very much Souvik for your time and guidance.",
    bgColor: "bg-gradient-to-br from-purple-200 via-white to-purple-500",
  },
  {
    name: "Shruti Debnath",
    rating: "4.9",
    text: "The mentor is very knowledgeable, humble, and attentive. He listened patiently to my queries, understood my perspective, and addressed my concerns with clear and practical solutions. His advice gave me a better sense of direction and confidence in my path. I truly appreciate the time, patience, and effort he devoted to guiding me toward improving my professional skills and growth.",
    bgColor: "bg-gradient-to-br from-orange-200 via-white to-orange-500",
  },
  {
    name: "Moupriya Biswas",
    rating: "4.8",
    text: "Souvik Sir helped me gain absolute clarity on my career goals, providing the exact steps I should take to achieve them. His practical guidance completely changed the way I approach my growth. The advice was both actionable and encouraging. I’m sincerely grateful for his support, time, and dedication to helping me stay focused on my personal and professional journey forward.",
    bgColor: "bg-gradient-to-br from-indigo-200 via-white to-indigo-500",
  },
  {
    name: "Anuska",
    rating: "4.8",
    text: "Souvik Saha Sir understood my problem statement in detail and suggested an excellent approach to solve it efficiently. His guidance was clear, logical, and inspiring, giving me confidence to move forward. I truly value his experience and insight, and I am looking forward to staying connected for long-term advice, career direction, and continuous improvement through his valuable professional and personal mentorship.",
    bgColor: "bg-gradient-to-br from-red-200 via-white to-red-500",
  },
  {
    name: "Diya Bhattacharya",
    rating: "4.9",
    text: "Souvik Sir is a friendly, supportive, and very detail-oriented mentor. In my testing career, his guidance has been invaluable, and I have learned a great deal from his well-designed and practical courses. His approach ensures deep understanding. I am grateful for his constant support, encouragement, and patience, which have helped me improve significantly. Thank you so much for your guidance always.",
    bgColor: "bg-gradient-to-br from-teal-200 via-white to-teal-500",
  },
];

const trendingCourses = [
  {
    id: 1,
    title: "Cognizant GenC",
    img: "/gwj/trending-1.png",
    bullets: [
      "Covers aptitude + coding round preparation",
      "Includes previous year Cognizant GenC questions",
    ],
    enroll: 2239,
    rating: 4.7,
    rate: 1197,
  },
  {
    id: 2,
    title: "DSA ",
    img: "/gwj/trending-2.png",
    bullets: [
      "Focus on problem solving patterns in DSA",
      "Designed for clearing service-based interviews",
    ],
    enroll: 6439,
    rating: 4.2,
    rate: 3286,
  },
  {
    id: 3,
    title: "Capgemini On Campus",
    img: "/gwj/trending-3.png",
    bullets: [
      "Guided roadmap for Capgemini on-campus hiring",
      "Covers logical reasoning + coding test practice",
    ],
    enroll: 4239,
    rating: 4.3,
    rate: 2563,
  },
  {
    id: 4,
    title: "TCS NQT Ninja/Digital",
    img: "/gwj/trending-4.png",
    bullets: [
      "Step-by-step preparation for TCS NQT rounds",
      "Digital specific advanced coding & aptitude",
    ],
    enroll: 8539,
    rating: 4.1,
    rate: 4895,
  },
  {
    id: 5,
    title: "IBM On Campus",
    img: "/gwj/on-campus-1.png",
    bullets: [
      "Covers technical + cognitive ability assessments",
      "Mock interview prep with IBM-specific patterns",
    ],
    enroll: 5439,
    rating: 4.8,
    rate: 3147,
  },
];

const oncampusCourses = [
  {
    id: 1,
    title: "IBM On Campus",
    img: "/gwj/on-campus-1.png",
    bullets: [
      "Covers technical + cognitive ability assessments",
      "Mock interview prep with IBM-specific patterns",
    ],
    enroll: 5439,
    rating: 4.8,
    rate: 3147,
  },
  {
    id: 2,
    title: "Jio On Campus",
    img: "/gwj/on-campus-2.png",
    bullets: [
      "Focus on Jio recruitment exam patterns",
      "Includes aptitude + coding preparation",
    ],
    enroll: 3241,
    rating: 4.5,
    rate: 1820,
  },
  {
    id: 3,
    title: "HSBC On Campus",
    img: "/gwj/on-campus-3.png",
    bullets: [
      "Covers finance domain-specific aptitude",
      "Guidance for HSBC coding and interview rounds",
    ],
    enroll: 2789,
    rating: 4.3,
    rate: 1594,
  },
  {
    id: 4,
    title: "Deloitte NLA",
    img: "/gwj/on-campus-4.png",
    bullets: [
      "Complete roadmap for Deloitte NLA hiring",
      "Includes logical reasoning and coding practice",
    ],
    enroll: 4678,
    rating: 4.6,
    rate: 2395,
  },
  {
    id: 5,
    title: "Tech Mahindra",
    img: "/gwj/on-campus-5.png",
    bullets: [
      "Focus on Tech Mahindra’s selection process",
      "Includes practice tests and mock interviews",
    ],
    enroll: 3120,
    rating: 4.2,
    rate: 1756,
  },
  {
    id: 6,
    title: "Wipro WILP",
    img: "/gwj/on-campus-6.png",
    bullets: [
      "Step-by-step prep for Wipro WILP program",
      "Special focus on aptitude + communication skills",
    ],
    enroll: 5291,
    rating: 4.7,
    rate: 2839,
  },
  {
    id: 7,
    title: "Infosys On Campus",
    img: "/gwj/on-campus-7.png",
    bullets: [
      "Detailed preparation for Infosys logical reasoning",
      "Covers coding + behavioral interview questions",
    ],
    enroll: 6890,
    rating: 4.4,
    rate: 3682,
  },
  {
    id: 8,
    title: "HCL TECH On Campus",
    img: "/gwj/on-campus-8.png",
    bullets: [
      "HCL-specific aptitude and coding round prep",
      "Mock interviews with real HCL questions",
    ],
    enroll: 4123,
    rating: 4.3,
    rate: 2190,
  },
  {
    id: 9,
    title: "HEXAWARE",
    img: "/gwj/on-campus-9.png",
    bullets: [
      "Covers Hexaware coding test and HR interview",
      "Logical + quantitative aptitude modules included",
    ],
    enroll: 2890,
    rating: 4.1,
    rate: 1475,
  },
  {
    id: 10,
    title: "EY GDS On Campus",
    img: "/gwj/on-campus-11.png",
    bullets: [
      "EY-specific aptitude, coding, and case study prep",
      "Interview practice with domain-based scenarios",
    ],
    enroll: 3750,
    rating: 4.5,
    rate: 2024,
  },
];

export {
  dummyImages,
  steps,
  testimonials,
  testimonials2,
  trendingCourses,
  oncampusCourses,
};
