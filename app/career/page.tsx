import React from "react";
import Nav from "../components/LandingPage-New/nav";
import Footer from "../components/Footer/Footer";
const careItems = [
  {
    title: "Period leave",
    description: "10 days/year for women & trans employees.",
  },
  {
    title: "Wellcess support",
    description: "Access to professional counsellors whenever you need.",
  },
  {
    title: "Flexible time",
    description: "Work from anywhere. anytime (as per business needs).",
  },
  {
    title: "Growth",
    description:
      "Switch roles within jobgenix to grow in the direction you love.",
  },
];

const CareerPage: React.FC = () => {
  return (
    <>
      <Nav />
      <div className="px-3 md:px-20 py-10 font-sora">
        <h1 className="text-center font-medium text-4xl md:text-5xl">
          Hiring is the most important role at Jobgenix
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center mt-10">
          <div>
            <div className="mt-6 text-xl flex flex-col gap-1 text-[#414A5D] font-light">
              <p>
                identifying, recruiting, and enabling the right people in the
                right teams is one of the highest-leverage roles anyone can play
                in our organization.
              </p>
              <p>
                We&apos;re always looking for exceptional talent to join
                Jobgenix, regardless of experience. If you&apos;re passionate
                about building the future of careers and opportunities,
                we&apos;ll find a place for you.{" "}
                <strong className="font-semibold">
                  We create opportunities around great people — not the other
                  way around.
                </strong>{" "}
              </p>

              <p className="mt-3">
                When we meet potential team members, we ask ourselves:
              </p>
              <ul className="mt-2">
                <li className="flex items-center gap-16">
                  <span className="w-2 h-2 rounded-full bg-[#414A5D] inline-block"></span>
                  Are they smarter than us?
                </li>
                <li className="flex items-center gap-16">
                  <span className="w-2 h-2 rounded-full bg-[#414A5D] inline-block"></span>
                  Are they more ambitious than us?
                </li>
                <li className="flex items-center gap-16">
                  <span className="w-2 h-2 rounded-full bg-[#414A5D] inline-block"></span>
                  Do they take full ownership of their lives?
                </li>
                <li className="flex items-center gap-16">
                  <span className="w-2 h-2 rounded-full bg-[#414A5D] inline-block"></span>
                  Are they comfortable saying, &quot;I don&apos;t know&quot;?
                </li>
              </ul>
            </div>
          </div>
          <div>
            <img src="/culture/culture4.png" alt="culture" />
          </div>
        </div>
        <div className="mt-6 text-xl flex flex-col gap-1 text-[#414A5D] font-light">
          <p>If that sounds like you, we&apos;d love to meet.</p>
          <p className="font-semibold mt-10 text-4xl">Application process:</p>
          <p className="mt-8">
            We only accept applications through employee referrals. Find someone
            in our team who can vouch for you and start a conversation.
            That&apos;s where it all begins!
          </p>
          <section className="py-16 bg-white font-[sora]">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-5xl font-semibold mb-10 text-left">
                At Jobgenix, we care for each other
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {careItems.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left"
                  >
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareerPage;
