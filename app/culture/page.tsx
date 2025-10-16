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

const CulturePage: React.FC = () => {
  return (
    <div className="font-sora">
      <Nav />
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          <div>
            <h4 className="font-medium text-4xl md:text-5xl">
              At Jobgenix it is always day 1
            </h4>
            <div className="mt-6 text-xl flex flex-col gap-4 text-[#414A5D] font-light">
              <p>
                Every day is a fresh start - a chance to rethink, rebuild, and
                redefine our journey as an organization.
              </p>
              <p>
                Jobgenix was born from a simple idea:{" "}
                <strong className="font-semibold">
                  make opportunities accessible to every young dreamer.{" "}
                </strong>
                What began as a small step t o connect students with real career
                paths has grown into a mission-driven platform t o unlock
                potential at scale.
              </p>
              <p>
                There was no blueprint, no masterplan. Just small wins, bold
                experiments, and relentless grit. That&apos;s how we&apos;ve
                come this far -{" "}
                <strong className="font-semibold">
                  and that&apos;s how we&apos;ll keep moving forward: day by
                  day, step by step.
                </strong>
              </p>
            </div>
          </div>
          <div>
            <img src="/culture/culture1.jpg" alt="culture" />
          </div>
        </div>

        <h4 className="font-medium text-2xl md:text-4xl leading-normal mt-32">
          If you&apos;re part of Jobgenix, or thinking of joining us,
          remember... This place i s designed to make you feel uncomfortable
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <img src="/culture/culture2.png" alt="culture" />
          <img src="/culture/culture3.png" alt="culture" />
          <img src="/culture/culture5.png" alt="culture" />
        </div>
        <div className="mt-6 text-xl flex flex-col gap-4 text-[#414A5D] font-light">
          <p>
            Great things are never built in comfort. At Jobgenix, you&apos;ll
            constantly feel like you&apos;re on the edge - a little nervous, a
            little inexperienced, often racing against time. But that&apos;s
            exactly how greatness is built. This place is about{" "}
            <strong className="font-semibold">
              hard work, wild dreams, and relentless impact.
            </strong>
          </p>
          <p>
            <strong className="font-semibold">
              ...and that&apos;s what makes i t worth it{" "}
            </strong>
            The real thrill a t Jobgenix comes when your work makes
            someone&apos;s life better. When a student finds direction. When a
            fresher cracks their first job. When your idea creates impact at
            scale. That&apos;s the joy of being here -{" "}
            <strong className="font-semibold">
              to see your work touch lives, sometimes millions o f them.
            </strong>
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div>
            <h4 className="font-medium text-3xl mt-32">
              &quot;We&quot; before &quot;me&quot;
            </h4>
            <p className="mt-2 text-xl text-[#414A5D] font-light">
              We don&apos;t chase &quot;careers&quot; at Jobgenix. We chase{" "}
              <strong className="font-semibold">impact</strong>
            </p>
            <div className="mt-6 text-xl flex flex-col gap-4 text-[#414A5D] font-light">
              <p>
                If you&apos;re focused more on your own ladder than on the
                mission, you&apos;ll never fit here. At Jobgenix, the
                <strong className="font-semibold">
                  team always comes before the individual.
                </strong>{" "}
                We stay aligned, push each other forward, and keep ourselves
                brutally honest. Anyone who forgets this sticks out - and sooner
                or later, they move on.
              </p>
            </div>
          </div>
          <div>
            <img src="/culture/culture4.png" alt="culture" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CulturePage;
