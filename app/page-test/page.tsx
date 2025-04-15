import { Button } from "react-day-picker";
import Footer from "../components/LandingPage-New/footerNew";
import Nav from "../components/LandingPage-New/nav";
import { Sora } from "next/font/google";
import JoBDet from "../components/job-display-new/job-desc";

const sora = Sora({ weight: "400", subsets: ["latin"] });

export default function JobDisplayNew() {
  return (
    <div className="font-sora">
      <div className="">
        <Nav />
      </div>
      <div className="mt-3">
        <JoBDet />
      </div>

      <div className="mt-1">
        <Footer />
      </div>
    </div>
  );
}
4;
