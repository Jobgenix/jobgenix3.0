import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { companies } from "@/lib/schema";
import { addCompanySchema } from "./input";
import { ZodError } from "zod";
import { v4 as uuid } from "uuid";

async function addCompany(req: NextRequest) {
    const requestBody = await req.json();

    if (!requestBody.userId) return new NextResponse(JSON.stringify({ err: "Unauthorised request" }), { status: 400 });
    try {
        const { name,website, logo } = await addCompanySchema.parseAsync(requestBody);
        const company = await db.insert(companies).values({
            id: uuid(),
            name,
            
            website,
            logo,
        }).returning();

        return new NextResponse(JSON.stringify({ company: company[0] }), { status: 201 });
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

export { addCompany as POST };