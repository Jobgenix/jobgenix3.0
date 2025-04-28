import { NextRequest, NextResponse } from "next/server";
import { companies, opportunities } from "@/lib/schema";
import { db } from "@/lib/db";
import { string, z } from "zod";
import { ZodError } from "zod";
import { and, eq, gt, ilike, sql, desc } from "drizzle-orm";
import {
  jobTypeSchema,
  passoutYearSchema,
} from "@/constants/jobOpportunities";
import { getJobsById, setJobsById } from "@/utils/jobCache";

// Define the job result type from DB queries
interface JobQueryResult {
  companyName: string;
  companyLogo: string | null;
  jobTitle: string;
  jobId: string;
  jobLocation: string[];
  jobType: "remote" | "office" | "hybrid";
  jobLink: string;
  requireSkils: string | null;
}

// Define a type for cached job data that might have a nested structure
interface CachedJobData {
  companyName?: string;
  companyLogo?: string | null;
  jobTitle?: string;
  jobId?: string;
  jobLocation?: string[];
  jobType?: "remote" | "office" | "hybrid";
  jobLink?: string;
  requireSkils?: string | null;
  opportunities?: {
    requireSkils?: string | null;
    [key: string]: unknown;
  };
  companies?: {
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const getJobsSchema = z
  .object({
    jobId: z.string().uuid().optional(),
    name: z.string().optional(),
    limit: z
      .string()
      .regex(/^[0-9]+$/)
      .optional()
      .default("10"),
    userId: z.string().uuid(),
    lastJobId: z.string().uuid().optional(),
    passingYear: passoutYearSchema.optional(),
    stream: string().optional(),
    type: jobTypeSchema.optional(),
    userSkills: z.array(z.string()).optional(),
  })
  .refine((data) => !(data.jobId && data.name), {
    message: "Either jobId or name should be provided, but not both.",
    path: ["jobId", "name"],
  });

/**
 * Matches user skills with required job skills with partial matching
 * @param userSkills Array of user skills
 * @param requireSkills String of comma-separated required skills
 * @returns Object with matching skills and suggestion flag
 */
function getMatchedSkills(userSkills: string[] | undefined, requireSkills: string | null): { 
  matchingSkills: string[], 
  jobgenixSuggestion: boolean 
} {
  // Handle empty cases
  if (!userSkills || userSkills.length === 0 || !requireSkills) {
    console.log("No skills to match: empty user skills or required skills");
    return { matchingSkills: [], jobgenixSuggestion: false };
  }
  
  // Normalize user skills to lowercase
  const normalizedUserSkills = userSkills.map(skill => skill.trim().toLowerCase());
  console.log("Normalized user skills:", normalizedUserSkills);
  
  // Normalize required skills to lowercase and split by commas
  const normalizedRequiredSkills = requireSkills
    .split(',')
    .map(skill => skill.trim().toLowerCase());
  console.log("Normalized required skills:", normalizedRequiredSkills);
  
  // Find matching skills - use partial matching to be more flexible
  const matched = [];
  for (const userSkill of normalizedUserSkills) {
    for (const reqSkill of normalizedRequiredSkills) {
      // Check if user skill is contained in required skill or vice versa
      if (userSkill.includes(reqSkill) || reqSkill.includes(userSkill)) {
        matched.push(reqSkill);
        break; // Found a match for this user skill, move to the next one
      }
    }
  }
  
  // Remove duplicates from matched skills
  const uniqueMatched = [...new Set(matched)];
  
  // Calculate match percentage based on required skills
  const matchPercentage = normalizedRequiredSkills.length > 0 
    ? (uniqueMatched.length / normalizedRequiredSkills.length) * 100 
    : 0;
  
  console.log(`Matched ${uniqueMatched.length} out of ${normalizedRequiredSkills.length} skills (${matchPercentage.toFixed(2)}%)`);
  console.log("Matching skills:", uniqueMatched);
  
  return {
    matchingSkills: uniqueMatched,
    jobgenixSuggestion: matchPercentage > 30,
  };
}

/**
 * Extracts requireSkils field from job data regardless of structure
 * @param jobData Job data from cache or DB
 * @returns The requireSkils value or null if not found
 */
function extractRequiredSkills(jobData: CachedJobData | null): string | null {
  if (!jobData) return null;
  
  // Check direct property
  if (jobData.requireSkils) {
    return jobData.requireSkils;
  }
  
  // Check nested in opportunities
  if (jobData.opportunities && jobData.opportunities.requireSkils) {
    return jobData.opportunities.requireSkils;
  }
  
  return null;
}

async function getJobs(req: NextRequest) {
  try {
    const requestBody = await req.json();
    console.log("Request body:", JSON.stringify(requestBody));
    
    const validatedQuery = getJobsSchema.parse(requestBody);

    const {
      jobId,
      name,
      limit,
      lastJobId,
      stream,
      passingYear,
      type,
      userSkills,
    } = validatedQuery;

    console.log("User skills received:", JSON.stringify(userSkills));
    
    const parsedLimit = parseInt(limit) || 10;

    // If jobId is provided, fetch single job
    if (jobId) {
      console.log("Fetching job by ID:", jobId);
      // Get cached job with proper typing
      const cachedJob = await getJobsById(jobId) as CachedJobData | null;
      
      let jobdata: JobQueryResult | null = null;
      let requireSkils: string | null = null;
      
      if (cachedJob) {
        // Extract required skills from cached job
        requireSkils = extractRequiredSkills(cachedJob);
        
        if (requireSkils) {
          // If job is cached and has required skills
          jobdata = {
            companyName: cachedJob.companyName || '',
            companyLogo: cachedJob.companyLogo || null,
            jobTitle: cachedJob.jobTitle || '',
            jobId: cachedJob.jobId || '',
            jobLocation: cachedJob.jobLocation || [],
            jobType: cachedJob.jobType || 'office',
            jobLink: cachedJob.jobLink || '',
            requireSkils: requireSkils
          };
          console.log("Job found in cache with skills data:", requireSkils);
        } else {
          console.log("Job found in cache but missing skills data");
        }
      }
      
      // If not cached or missing skills data, fetch from database
      if (!jobdata || requireSkils === null) {
        console.log("Fetching complete job data from database");
        const dbResult = await db
          .select({
            companyName: companies.name,
            companyLogo: companies.logo,
            jobTitle: opportunities.title,
            jobId: opportunities.id,
            jobLocation: opportunities.location,
            jobType: opportunities.workplaceType,
            jobLink: opportunities.jobLink,
            requireSkils: opportunities.requireSkils,
          })
          .from(opportunities)
          .innerJoin(companies, eq(opportunities.companyId, companies.id))
          .where(eq(opportunities.id, jobId));

        if (dbResult && dbResult.length > 0) {
          jobdata = dbResult[0] as JobQueryResult;
          requireSkils = jobdata.requireSkils;
          console.log("Job found in database with skills:", requireSkils);

          // Cache the job data for future use
          await setJobsById(jobdata as unknown as Parameters<typeof setJobsById>[0]);
        } else {
          console.log("No job found in DB for ID:", jobId);
        }
      }

      // Handle case where job is not found
      if (!jobdata) {
        return new NextResponse(
          JSON.stringify({ error: "job_not_found", message: "Job not found" }),
          { status: 404 }
        );
      }

      let matchingSkills: string[] = [];
      let jobgenixSuggestion = false;

      console.log("User skills:", userSkills);
      console.log("Required Skills:", requireSkils);

      if (userSkills && userSkills.length > 0 && requireSkils) {
        console.log("Processing skills match for job:", jobId);
        const matchResult = getMatchedSkills(userSkills, requireSkils);
        matchingSkills = matchResult.matchingSkills;
        jobgenixSuggestion = matchResult.jobgenixSuggestion;
      } else {
        console.log("Skipping skill matching - missing user skills or job skills");
      }

      // Ensure requireSkils is included in the response
      const responseJob = {
        ...jobdata,
        requireSkils,
        matchingSkills,
        jobgenixSuggestion,
      };

      return new NextResponse(
        JSON.stringify({
          job: responseJob,
        }),
        { status: 200 }
      );
    }

    // Build query for multiple jobs
    const filters = [];
    if (name) filters.push(ilike(opportunities.title, `%${name}%`));
    if (lastJobId) filters.push(gt(opportunities.id, lastJobId));
    if (stream) filters.push(sql`${stream} = ANY(${opportunities.degree})`);
    if (passingYear)
      filters.push(sql`${passingYear} = ANY(${opportunities.passoutYear})`);
    if (type) filters.push(eq(opportunities.type, type));

    const query = db
      .select({
        companyName: companies.name,
        companyLogo: companies.logo,
        jobTitle: opportunities.title,
        jobId: opportunities.id,
        jobLocation: opportunities.location,
        jobType: opportunities.workplaceType,
        jobLink: opportunities.jobLink,
        requireSkils: opportunities.requireSkils,
      })
      .from(opportunities)
      .innerJoin(companies, eq(opportunities.companyId, companies.id))
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(opportunities.postedAt))
      .limit(parsedLimit);

    const result = await query as JobQueryResult[];
    console.log(`Found ${result.length} jobs matching criteria`);

    const jobsWithMatchingSkills = result.map((job) => {
      const requireSkils = job.requireSkils;
      console.log(`Job ${job.jobId} required skills:`, requireSkils);
      
      if (userSkills && userSkills.length > 0 && requireSkils) {
        console.log(`Processing skills match for job: ${job.jobId} - ${job.jobTitle}`);
        const matchResult = getMatchedSkills(userSkills, requireSkils);
        return {
          ...job,
          matchingSkills: matchResult.matchingSkills,
          jobgenixSuggestion: matchResult.jobgenixSuggestion,
        };
      }
      return {
        ...job,
        matchingSkills: [],
        jobgenixSuggestion: false,
      };
    });

    return new NextResponse(
      JSON.stringify({
        jobs: jobsWithMatchingSkills,
        hasMore: result.length === parsedLimit,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    if (error instanceof ZodError) {
      return new NextResponse(
        JSON.stringify({ error: "validation_error", message: error.message }),
        { status: 400 }
      );
    } else if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({ error: "server_error", message: error.message }),
        { status: 500 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: "unknown_error", message: String(error) }),
        { status: 500 }
      );
    }
  }
}

export { getJobs as POST };