import { opportunitySchema } from "@/app/job-upload/jobFormValidator";
import { ROLE_IDS } from "@/constants/roles";
import { db } from "@/lib/db";
import { opportunities, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

async function createJob(req: NextRequest) {
    const requestBody = await req.json();
    if(!requestBody.userId)
        return new NextResponse(JSON.stringify({ err: "Unauthorised request" }), { status: 401 });
    try {
        const userRole = await db.select({ roleId: users.roleId }).from(users).where(eq(users.id, requestBody.userId));
        if(userRole[0].roleId !== ROLE_IDS.EMPLOYER)
            return new NextResponse(JSON.stringify({ err: "Unauthorised request" }), { status: 401 });
        const opportunity = opportunitySchema.parse(requestBody);
        await db.insert(opportunities).values(opportunity);

        return new NextResponse(JSON.stringify({ success: "Job created successfully" }), { status: 201 });
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

export { createJob as POST }