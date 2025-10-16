import { opportunitySchema } from "@/app/job-upload/jobFormValidator";
import { ROLE_IDS } from "@/constants/roles";
import { db } from "@/lib/db";
import { opportunities, referrals, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";

async function createJob(req: NextRequest) {
  const requestBody = await req.json();

  const referralsFromBody = requestBody.referrals;
  console.log("Request Body (referrals):", referralsFromBody);

  try {
    // Optional: role check logic if needed
    // const userRole = await db
    //   .select({ roleId: users.roleId })
    //   .from(users)
    //   .where(eq(users.id, requestBody.userId));
    // if (userRole[0].roleId !== ROLE_IDS.EMPLOYER)
    //   return new NextResponse(JSON.stringify({ err: "Unauthorised request" }), { status: 401 });

    // ✅ Insert referrals
    const referralsFromDB = await db
      .insert(referrals)
      .values(
        referralsFromBody.map((referral: any) => ({
          id: uuidv4(),
          name: `${referral.firstName} ${referral.lastName}`,
          designation: referral.designation,
          email: referral.mail,
          linkedinUrl: referral.linkedin,
        }))
      )
      .returning();

    // Extract referral IDs and attach them to opportunity
    const referralIds = referralsFromDB.map((ref) => ref.id);
    requestBody.referrals = referralIds;

    // ✅ Validate the full opportunity including referralIds
    const opportunity = opportunitySchema.parse(requestBody);

    // Extract skills using your function
    const jd = opportunity.description;
    const resultSkills = await getActSkils(jd);

    // ✅ Insert opportunity into DB
    const data = await db
      .insert(opportunities)
      .values({
        id: uuidv4(),
        ...opportunity,
        postedAt: new Date(opportunity.postedAt),
        deadline: new Date(opportunity.deadline),
        requiredSkils: resultSkills,
      })
      .returning();
    console.log(data);

    return new NextResponse(
      JSON.stringify({ success: "Job created successfully" }),
      { status: 201 }
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

// function for get the extracted skils
async function getActSkils(extractedText: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const prompt = `Extract technical skills from the following job description and return a comma-separated list of normalized industry terms:\n\n${extractedText}`;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    console.error("Error calling Gemini API:", response.statusText);
    return null;
  }

  const data = await response.json();
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    return null;
  }

  return data.candidates[0].content.parts[0].text.trim();
}

export { createJob as POST };
