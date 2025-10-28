"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { ChevronDown } from "lucide-react";
import Nav from "../../components/LandingPage-New/nav";
import Footer from "../../components/Footer/Footer";
import YourJourneyBanner from "../../components/YourJourneyBanner";
import { useParams } from "next/navigation";
import axios from "axios";
import { BsEnvelope, BsLinkedin } from "react-icons/bs";

// ✅ Define proper type for referral data
type ReferralInput = {
  id: string;
  name: string;
  designation: string;
  email: string;
  linkedinUrl: string;
};

export default function ReferralCard() {
  const [openMap, setOpenMap] = useState<
    Record<string, "tips" | "emailHR" | "followUp" | null>
  >({});
  const [referrals, setReferrals] = useState<ReferralInput[]>([]);
  const params = useParams();
  const id = params?.jobId as string;

  // ✅ Fetch referral data from backend
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/job/getreffaralData?jobId=${id}`);
        setReferrals(res.data.referrals || []);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };
    if (id) fetchJob();
  }, [id]);

  // ✅ Toggle each accordion independently per referral
  const toggleSection = (
    referralId: string,
    section: "tips" | "emailHR" | "followUp"
  ) => {
    setOpenMap((prev) => ({
      ...prev,
      [referralId]: prev[referralId] === section ? null : section,
    }));
  };

  return (
    <div>
      <Nav />

      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6 font-inter mt-10">
        {referrals.map((referral) => (
          <div key={referral.id} className="border-b pb-4 text-center">
            {/* Referral Info */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {referral.name}
                </h2>
                <p className="text-gray-600 text-sm">{referral.designation}</p>
              </div>

              <div className="text-blue-600 text-sm text-right">
                <a
                  href={referral.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 justify-end hover:underline"
                >
                  <BsLinkedin /> <p className="text-black">LinkedIn</p>
                </a>
                <span className="flex items-center gap-1 justify-end mt-1">
                  <BsEnvelope /> <p className="text-black">{referral.email}</p>
                </span>
              </div>
            </div>

            {/* ✅ Hardcoded Accordion Sections */}
            <AccordionItem
              title="Connection Request Tips"
              content={
                <>
                  <p>
                    Hi <b>[Name]</b>, I admire <b>[Company]</b>’s work in{" "}
                    <b>[Field]</b>. As a <b>[Your Role]</b>, I’d love to connect
                    for a potential referral.
                  </p>
                  <p>
                    Keep your message short, polite, and genuine. Avoid directly
                    asking for a referral in your first message — build rapport
                    first!
                  </p>
                </>
              }
              isOpen={openMap[referral.id] === "tips"}
              onToggle={() => toggleSection(referral.id, "tips")}
            />

            <AccordionItem
              title="Email to HR"
              content={
                <>
                  <p className="font-semibold">Subject:</p>
                  <p className="mb-3">
                    Referral Request for <b>Software Engineer Position</b>
                  </p>

                  <p>Dear Ms. Smith,</p>

                  <p>
                    I’m a <b>Software Engineer</b> with 5 years of experience in{" "}
                    <b>[specific skills]</b>. <b>[Mutual Contact]</b>{" "}
                    recommended I reach out regarding the <b>[Job Title]</b>{" "}
                    role at <b>[Company]</b>. I’m excited about the company’s
                    mission and ongoing projects. Please find my resume
                    attached.
                  </p>

                  <p>
                    Could we discuss potential opportunities? Thank you for your
                    time and consideration.
                  </p>

                  <p className="mt-3">
                    Best regards,
                    <br />
                    [Your Name]
                    <br />
                    [Your Contact Info]
                  </p>
                </>
              }
              isOpen={openMap[referral.id] === "emailHR"}
              onToggle={() => toggleSection(referral.id, "emailHR")}
            />

            <AccordionItem
              title="Follow-Up Mail"
              content={
                <>
                  <p className="font-semibold">Subject:</p>
                  <p className="mb-3">
                    Follow-Up on Referral Request for <b>[Job Title]</b>
                  </p>

                  <p>Dear Ms. Smith,</p>

                  <p>
                    I hope this email finds you well. I’m following up on my
                    previous email (sent <b>[date]</b>) regarding the{" "}
                    <b>[Job Title]</b> role at <b>[Company]</b>.
                  </p>

                  <p>
                    I’m very enthusiastic about the opportunity and would
                    appreciate any updates on the hiring process.
                  </p>

                  <p>
                    Thank you for your time!
                    <br />
                    Best regards,
                    <br />
                    [Your Name]
                    <br />
                    [Your Contact Info]
                  </p>
                </>
              }
              isOpen={openMap[referral.id] === "followUp"}
              onToggle={() => toggleSection(referral.id, "followUp")}
            />
          </div>
        ))}
      </div>

      <div className="hidden my-28 lg:flex justify-center">
        <YourJourneyBanner />
      </div>
      <Footer />
    </div>
  );
}

/* -------------------- Accordion Item -------------------- */
function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [ref, { height }] = useMeasure();

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm my-5">
      <button
        className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition"
        onClick={onToggle}
      >
        <span>{title}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <motion.div
        animate={{ height: isOpen ? height : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div
          ref={ref}
          className="px-5 pb-5 text-[15px] text-gray-700 leading-relaxed space-y-4"
        >
          {content}
        </div>
      </motion.div>
    </div>
  );
}
