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
}

interface JobStoreState {
  jobs: JobType[];
  addJobs: (jobs: JobType) => void;
}

const JobStore: StateCreator<JobStoreState> = (set) => ({
  jobs: [],
  addJobs: (jobs: JobType) => {
    set(() => ({
      jobs: [jobs], 
    }));
  },
});

const useJobStore = create<JobStoreState>(JobStore);
export { useJobStore };