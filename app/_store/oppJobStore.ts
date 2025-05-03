import { create } from 'zustand';
import { StateCreator } from 'zustand';

interface JobType {
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  jobId: string;
  jobLocation: string[];
  jobType: "office" | "remote" | "hybrid"; // Adjust if needed
  jobLink: string;
  jobgenixSuggestion: boolean;
  requireskils: string;
  match:string
}

interface JobStoreState {
  jobs: JobType[];
  addJobs: (jobs: JobType[]) => void; // Update to accept an array of JobType
}

const JobStore: StateCreator<JobStoreState> = (set) => ({
  jobs: [],
  addJobs: (newJobs: JobType[]) => {
    set(() => ({
      jobs: newJobs, // Replace the jobs array with the new array
    }));
  },
});

const useJobStore = create<JobStoreState>(JobStore);
export { useJobStore };