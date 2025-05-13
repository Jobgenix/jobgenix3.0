import { NextRequest, NextResponse } from "next/server";
import { companies, opportunities } from "@/lib/schema";
import { db } from "@/lib/db";
import { string, z } from "zod";
import { ZodError } from "zod";
import { and, eq, gt, ilike, sql, desc, or } from "drizzle-orm";
import {
  jobTypeSchema,
  passoutYearSchema,
} from "@/constants/jobOpportunities";
// Removed Redis cache imports since we're not using them anymore
// import { getJobsById, setJobsById } from "@/utils/jobCache";

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
  description: string | null; // Added description field
}

const getJobsSchema = z
  .object({
    jobId: z.string().uuid().optional(),
    name: z.string().optional(),
    limit: z
      .string()
      .regex(/^[0-9]+$/)
      .optional(),
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
 * @returns Object with matching skills, suggestion flag, and match percentage
 */
function getMatchedSkills(userSkills: string[] | undefined, requireSkills: string | null): { 
  matchingSkills: string[], 
  jobgenixSuggestion: boolean,
  matchPercentage: number
} {
  // Handle empty cases
  if (!userSkills || userSkills.length === 0 || !requireSkills) {
    console.log("No skills to match: empty user skills or required skills");
    return { matchingSkills: [], jobgenixSuggestion: false, matchPercentage: 0 };
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
    jobgenixSuggestion: matchPercentage > 20,
    matchPercentage: Number(matchPercentage.toFixed(1)) // Round to 1 decimal place and convert to number
  };
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
    
    // If limit is undefined or empty, we won't apply a limit (return all results)
    const parsedLimit = limit ? parseInt(limit) : undefined;

    // If jobId is provided, fetch single job directly from database
    if (jobId) {
      console.log("Fetching job by ID directly from database:", jobId);
      
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
          description: opportunities.description, // Added description field to query
        })
        .from(opportunities)
        .innerJoin(companies, eq(opportunities.companyId, companies.id))
        .where(eq(opportunities.id, jobId));

      // Handle case where job is not found
      if (!dbResult || dbResult.length === 0) {
        console.log("Job not found in database:", jobId);
        return new NextResponse(
          JSON.stringify({ error: "job_not_found", message: "Job not found" }),
          { status: 404 }
        );
      }

      const jobdata = dbResult[0] as JobQueryResult;
      const requireSkils = jobdata.requireSkils;
      console.log("Job found in database with skills:", requireSkils);

      let matchingSkills: string[] = [];
      let jobgenixSuggestion = false;
      let matchPercentage = 0;

      console.log("User skills:", userSkills);
      console.log("Required Skills:", requireSkils);

      if (userSkills && userSkills.length > 0 && requireSkils) {
        console.log("Processing skills match for job:", jobId);
        const matchResult = getMatchedSkills(userSkills, requireSkils);
        matchingSkills = matchResult.matchingSkills;
        jobgenixSuggestion = matchResult.jobgenixSuggestion;
        matchPercentage = matchResult.matchPercentage;
      } else {
        console.log("Skipping skill matching - missing user skills or job skills");
      }

      // Create the complete response job object
      const responseJob = {
        ...jobdata,
        requireSkils,
        matchingSkills,
        jobgenixSuggestion,
        match: `${matchPercentage}%` // Add match percentage to response
      };

      // Return the complete job data
      return new NextResponse(
        JSON.stringify({
          job: responseJob,
        }),
        { status: 200 }
      );
    }

    // Build query for multiple jobs
    const filters = [];
    if (name) {
      filters.push(
        or(
          ilike(opportunities.title, `%${name}%`),
          ilike(companies.name, `%${name}%`)
        )
      );
    }
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
        description: opportunities.description, // Added description field to list query too
      })
      .from(opportunities)
      .innerJoin(companies, eq(opportunities.companyId, companies.id))
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(opportunities.postedAt));
      
    // Only apply limit if it's defined
    const finalQuery = parsedLimit ? query.limit(parsedLimit) : query;

    const result = await finalQuery as JobQueryResult[];
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
          match: `${matchResult.matchPercentage}%` // Add match percentage to response
        };
      }
      return {
        ...job,
        matchingSkills: [],
        jobgenixSuggestion: false,
        match: "0%" // Default match percentage
      };
    });

    return new NextResponse(
      JSON.stringify({
        jobs: jobsWithMatchingSkills,
        hasMore: parsedLimit ? result.length === parsedLimit : false, // If no limit, there's no "more" to fetch
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