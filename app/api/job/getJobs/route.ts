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

function normalizeSkillsArray(skills: string[]): string[] {
  // If the first element contains commas, it's likely a single string with comma-separated skills
  if (skills.length === 1 && skills[0].includes(',')) {
    return skills[0].split(',').map(skill => skill.trim().toLowerCase());
  }
  return skills.map(skill => skill.trim().toLowerCase());
}

function getMatchedSkills(userSkills: string[], requireSkils: string) {
  // Normalize user skills to lowercase and trimmed
  const user = normalizeSkillsArray(userSkills);
  
  // Normalize required skills to lowercase and trimmed
  const required = requireSkils
    .split(/\s*,\s*/)
    .map(skill => skill.trim().toLowerCase());
  
  // Find matching skills
  const matched = required.filter(reqSkill => 
    user.some(userSkill => userSkill === reqSkill)
  );
  
  // Calculate match percentage based on required skills
  const matchPercentage = required.length > 0 
    ? (matched.length / required.length) * 100 
    : 0;
  
  console.log(`Matched ${matched.length} out of ${required.length} skills (${matchPercentage.toFixed(2)}%)`);
  
  return {
    matchingSkills: matched,
    jobgenixSuggestion: matchPercentage > 30,
  };
}

async function getJobs(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const validatedQuery = getJobsSchema.parse(requestBody);

    const {
      jobId,
      name,
      limit,
      lastJobId,
      stream,
      passingYear,
      type,
      userSkills = [],
    } = validatedQuery;

    const parsedLimit = parseInt(limit) || 10;

    // If jobId is provided, fetch single job
    if (jobId) {
        console.log("Fetching job by ID:", jobId);
      // Get cached job without type assertion
      const cachedJob = await getJobsById(jobId);
      
      let jobdata: JobQueryResult | null = null;
      
      if (cachedJob) {
        // If job is cached, cast it to required structure
        jobdata = cachedJob as unknown as JobQueryResult;
      } else {
        // If not cached, fetch from database
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
          
            console.log("Job data from DB:");
          console.log("Raw DB result:", dbResult);

          // Cache the job data for future use
          await setJobsById(jobdata as unknown as Parameters<typeof setJobsById>[0]);
        }else{
            console.log("No job found in DB for ID:");
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

      console.log("Require Skils:", jobdata.requireSkils );

      if (userSkills.length > 0 && jobdata.requireSkils) {
        console.log("Processing skills match for job:", jobdata.jobId);
        const matchResult = getMatchedSkills(userSkills, jobdata.requireSkils);
        matchingSkills = matchResult.matchingSkills;
        jobgenixSuggestion = matchResult.jobgenixSuggestion;
      }

      return new NextResponse(
        JSON.stringify({
          job: {
            ...jobdata,
            matchingSkills,
            jobgenixSuggestion,
          },
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

    const jobsWithMatchingSkills = result.map((job) => {
      if (userSkills.length > 0 && job.requireSkils) {
        const matchResult = getMatchedSkills(userSkills, job.requireSkils);
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
        JSON.stringify({ error: "unknown_error", message: error }),
        { status: 500 }
      );
    }
  }
}

export { getJobs as POST };