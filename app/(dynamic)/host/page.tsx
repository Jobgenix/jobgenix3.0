import Footer from "@/app/components/footer";
import { Navbar } from "@/app/components/LandingPageComponents/navbar";
import Hero from "@/app/components/host-component/hero";

export default function Page() {
  return (
     <div>
         <Navbar />
         <Hero />
        <Footer />
     </div>
  );
}