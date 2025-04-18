import Footer from "../components/LandingPage-New/footerNew";
import Nav from "../components/LandingPage-New/nav";
import JoBDet from "../components/job-display-new/job-desc";

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
};