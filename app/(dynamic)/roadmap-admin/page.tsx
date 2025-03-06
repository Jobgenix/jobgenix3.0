// "use client";

// import {Footer} from "@/app/components/LandingPageComponents/Footer";
// import { Navbar } from "@/app/components/LandingPageComponents/navbar";
// import { HeroSection } from "@/app/components/roadmapAdminComponents/HeroSection";
// import ManageUploadsTable from "@/app/components/roadmapAdminComponents/ManageUploadsTable";
// import RoadmapUploadForm from "@/app/components/roadmapAdminComponents/roadmap-upload-form";

// export default function RoadmapAdmin() {
//     return (
//         <div className="overflow-hidden m-0 p-0 bg-gradient-to-br from-green-200 to-green-400">
//             <Navbar />
//             <HeroSection/>
//             <RoadmapUploadForm/>
//             <ManageUploadsTable/>
//             <Footer />
//         </div>
//     );
// }


"use client";

import { RoadmapProvider } from "@/app/context/RoadmapContext";
import { Footer } from "@/app/components/LandingPageComponents/Footer";
import { Navbar } from "@/app/components/LandingPageComponents/navbar";
import { HeroSection } from "@/app/components/roadmapAdminComponents/HeroSection";
import ManageUploadsTable from "@/app/components/roadmapAdminComponents/ManageUploadsTable";
import RoadmapUploadForm from "@/app/components/roadmapAdminComponents/roadmap-upload-form";

export default function RoadmapAdmin() {
    return (
        <RoadmapProvider>
            <div className="overflow-hidden m-0 p-0 bg-gradient-to-br from-green-200 to-green-400">
                <Navbar />
                <HeroSection />
                <RoadmapUploadForm />
                <ManageUploadsTable />
                <Footer />
            </div>
        </RoadmapProvider>
    );
}
