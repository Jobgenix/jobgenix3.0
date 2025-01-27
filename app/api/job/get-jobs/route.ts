import { NextRequest, NextResponse } from "next/server";
import { companies, opportunities } from "@/lib/schema";
import { db } from "@/lib/db";
import { z } from "zod";
import { ZodError } from "zod";
import { and, eq, gt, ilike, sql } from "drizzle-orm";
import { degreeTypeSchema, passoutYearSchema } from "@/constants/jobOpportunities";
import { getJobsById, setJobsById } from "@/utils/jobCache";

const getJobsSchema = z.object({
    jobId: z.string().uuid().optional(),
    name: z.string().optional(),
    limit: z.string().regex(/^[0-9]+$/).optional().default("10"),
    userId: z.string().uuid(),
    lastJobId: z.string().uuid().optional(),
    passingYear: passoutYearSchema.optional(),
    stream: degreeTypeSchema.optional(),
}).refine((data) => !(data.jobId && data.name), {
    message: "Either jobId or name should be provided, but not both.",
    path: ["jobId", "name"], // Affects both fields
});


async function getJobs(req: NextRequest) {
    try {
        const requestBody = await req.json();
        const validatedQuery = getJobsSchema.parse(requestBody);

        const jobId = validatedQuery.jobId;
        const name = validatedQuery.name;
        const limit = parseInt(validatedQuery.limit);
        const lastJobId = validatedQuery.lastJobId;
        const stream = validatedQuery.stream;
        const passingYear = validatedQuery.passingYear;

        const query = db.select({
            companyName: companies.name,
            companyLogo: companies.logo,
            jobTitle: opportunities.title,
            jobId: opportunities.id,
            jobLocation: opportunities.location,
            jobType: opportunities.workplaceType,
        }).from(opportunities).innerJoin(companies, eq(opportunities.companyId, companies.id));

        if (jobId) {
            const cachedJob = await getJobsById(jobId);
            if(!cachedJob){
                const result = await db.select().from(opportunities).innerJoin(companies, eq(opportunities.companyId, companies.id)).where(eq(opportunities.id, jobId));
                await setJobsById(result[0])
                return new NextResponse(JSON.stringify({ job: result[0] }), { status: 200 });
            }
            return new NextResponse(JSON.stringify({ job: cachedJob }), { status: 200 });
        }
        const filters = [];
        if (name) filters.push(ilike(opportunities.title, `%${name}%`));
        if (lastJobId) filters.push(gt(opportunities.id, lastJobId));
        if (stream) filters.push(sql`${stream} = ANY(${opportunities.degree})`);
        if (passingYear) filters.push(sql`${passingYear} = ANY(${opportunities.passoutYear})`);



        const result = await query.orderBy(opportunities.id).where(filters.length ? and(...filters) : undefined).limit(limit);

        return new NextResponse(
            JSON.stringify({ jobs: result, hasMore: result.length === limit }),
            { status: 200 }
        );


    } catch (error) {
        if (error instanceof ZodError) {
            return new NextResponse(JSON.stringify({ error: "validation_error", message: error.message }), { status: 400 });
        } else if (error instanceof Error) {
            return new NextResponse(JSON.stringify({ error: "server_error", message: error.message }), { status: 500 });
        } else {
            return new NextResponse(JSON.stringify({ error: "unknown_error", message: error }), { status: 500 });
        }
    }
}

export { getJobs as POST }