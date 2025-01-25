import JobCard from "../components/Job-components";
import { Navbar } from "../components/LandingPageComponents/navbar";
import JobCardList from "../components/demo-job-components";
export default function page() {
    return (
        <>
        <Navbar/>
        <JobCard/>
        <JobCardList/>
        </>
    )
}