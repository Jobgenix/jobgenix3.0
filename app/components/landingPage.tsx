import { Navbar } from "../components/LandingPageComponents/navbar"
import { HeaderSection } from "../components/LandingPageComponents/header-section"
import { TrustedCompanies } from "../components/LandingPageComponents/trusted-companies"
import { ForSection } from "../components/LandingPageComponents/for-section"
import { LearnSection } from "../components/LandingPageComponents/learn-section"
import { CampusSection } from "../components/LandingPageComponents/campus-section"
import { MentorSection } from "../components/LandingPageComponents/mentor-section"
import { JobSection } from "../components/LandingPageComponents/job-section"
import { OpportunitySection } from "../components/LandingPageComponents/opportunity-section"
import { HostSection } from "../components/LandingPageComponents/host-section"
import { Footer } from "../components/LandingPageComponents/Footer"
import { ReferAndWin } from "../components/LandingPageComponents/ReferAndWin"
import {StatsSection} from "../components/LandingPageComponents/statsSection"

export function Landing() {
    return (
        <div className="min-h-screen bg-[#E8F5E9]">
            <Navbar />
            <main>
            <HeaderSection />
        <TrustedCompanies/>
        <ForSection />
        <LearnSection />
        <CampusSection />
        <MentorSection />
        <JobSection />
        <OpportunitySection />
        <HostSection /> 
        <ReferAndWin/>
        <StatsSection/>
        <Footer/>
            </main>
        </div>
    )
}