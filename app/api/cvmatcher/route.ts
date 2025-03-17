import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    let requestBody;
    try {
        requestBody = await req.json();
    } catch (error) {
        console.error("Invalid JSON body:", error);
        return NextResponse.json({ status: false, message: "Invalid JSON body" }, { status: 400 });
    }

    const { requiredSkills, userId } = requestBody;

    if (!userId) {
        return NextResponse.json({ status: false, message: "No user found" }, { status: 400 });
    }

    if (!requiredSkills || typeof requiredSkills !== "string") {
        return NextResponse.json({ status: false, message: "No valid required skills found" }, { status: 400 });
    }

    try {
        const userData = await db.select({ skills: users.skills }).from(users).where(eq(users.id, userId));

        if (!userData.length || !userData[0].skills) {
            return NextResponse.json({ status: false, message: "User skills not found" });
        }

        // Convert user skills and required skills from string to array
        const userSkills = userData[0].skills
            .split(/\s*,\s*/) // Split by commas and trim spaces
            .map(skill => skill.trim().toLowerCase());

        const jdSkills = requiredSkills
            .split(/\s*,\s*/) // Split requiredSkills string by commas
            .map(skill => skill.trim().toLowerCase());

        // Find matching skills
        const matchedSkills = userSkills.filter(skill => jdSkills.includes(skill));

        // Calculate match percentage (avoid division by zero)
        const matchPercentage = jdSkills.length > 0
            ? ((matchedSkills.length / jdSkills.length) * 100).toFixed(2) + "%"
            : "0%";

        return NextResponse.json({
            status: true,
            message: "Skill matching completed",
            matchedSkills,
            matchPercentage
        });

    }catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ status: false, message: "Database error" }, { status: 500 });
    }
    
}
