import { NextRequest, NextResponse } from "next/server";
import { companies } from "@/lib/schema";
import { db } from "@/lib/db";
import { and, eq, gt } from "drizzle-orm";
import { z } from "zod";
import { ZodError } from "zod";

// Define request query schema for type safety
const querySchema = z.object({
    lastCompanyId: z.string().uuid().optional(),
    name: z.string().optional(),
    limit: z.string().regex(/^[0-9]+$/).optional().default("10"),
    userId: z.string().uuid(),
});

async function getCompanies(req: NextRequest) {
    try {
        // Parse query params
        const { searchParams } = new URL(req.url);
        const { userId } = await req.json();
        const validatedQuery = querySchema.parse({
            lastCompanyId: searchParams.get("lastCompanyId"),
            limit: searchParams.get("limit"),
            name: searchParams.get("name"),
            userId: userId,
        });

        const limit = parseInt(validatedQuery.limit, 10);
        const lastCompanyId = validatedQuery.lastCompanyId;
        const name = validatedQuery.name;

        const query = db.select().from(companies).orderBy(companies.id).limit(limit);

        // Apply sliding window filter if lastCompanyId is provided
        if (lastCompanyId) {
            const result = await query.where(gt(companies.id, lastCompanyId));
            return new NextResponse(JSON.stringify({ companies: result, hasMore: result.length === limit }), { status: 200 });
        }
        else if(name){
            if(lastCompanyId){
                const result = await query.where(and(eq(companies.name, name), gt(companies.id, lastCompanyId)));
                return new NextResponse(JSON.stringify({ companies: result, hasMore: result.length === limit }), { status: 200 });
            }
            const result = await query.where(eq(companies.name, name));
            return new NextResponse(JSON.stringify({ companies: result, hasMore: result.length === limit }), { status: 200 });
        }

        const result = await query;
        return new NextResponse(JSON.stringify({ companies: result, hasMore: result.length === limit }), { status: 200 });
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

export { getCompanies as POST }