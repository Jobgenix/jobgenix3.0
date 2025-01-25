export type JobProps = {
  id: string;
  companyId?: string;
  companyName:string;
  logo:string;
  isVerified: boolean;
  title: string;
  description?: string;
  duration: string;
  location: string[]; // Array of location strings
  type: string; // Job type enum (e.g., full-time, part-time)
  workplaceType: string; // Workplace type enum (e.g., remote, on-site)
  stipendType: string; // Stipend type enum
  diversityType?: string; // Diversity type enum (optional)
  experience: string; // Experience type enum
  yearsOfExperience: string;
  degree?: string[]; // Array of degree enums (optional)
  benefits?: string[]; // Array of benefit enums (optional)
  salary?: string; // Optional salary field
  graduationYear?: string; // Optional graduation year
  status: string; // Job status enum (e.g., active, closed)
  jobLink: string;
  passoutYear?: string[]; // Array of passout years (optional)
  category?: string[]; // Array of categories (optional)
  deadline: string; // Date string for deadline
  postedAt: string; // Date string for posted date
  children?: React.ReactNode;
};
