import { Navbar } from "../components/LandingPageComponents/navbar"
import { HeaderSection } from "../components/LandingPageComponents/header-section"
import { TrustedCompanies } from "../components/LandingPageComponents/trusted-companies"
import { ForSection } from "../components/LandingPageComponents/for-section"
import { LearnSection } from "../components/LandingPageComponents/learn-section"
import { CampusSection } from "../components/LandingPageComponents/campus-section"
import { MentorSection } from "../components/LandingPageComponents/mentor-section"
import { OpportunitySection } from "../components/LandingPageComponents/opportunity-section"
import { HostSection } from "../components/LandingPageComponents/host-section"
import { Footer } from "../components/LandingPageComponents/Footer"
import { ReferAndWin } from "../components/LandingPageComponents/ReferAndWin"
import { StatsSection } from "../components/LandingPageComponents/statsSection"
import CareerButtons from "../components/LandingPageComponents/CareerButtons"


export function Landing() {
    return (
        <div className="min-h-screen bg-[#E8F5E9] overflow-hidden">
            <Navbar />
            <HeaderSection />
            <TrustedCompanies />
            <CareerButtons />
            <ForSection />
            <LearnSection />
            <CampusSection />
            <MentorSection />
            <OpportunitySection />
            <HostSection />
            <ReferAndWin />
            <StatsSection />
            <Footer />

        </div>
    )
}