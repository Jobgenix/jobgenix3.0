import { db } from "@/lib/db";
import { opportunities, referrals } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
    }

    // Fetch the job by ID
    const job = await db
      .select({
        referrals: opportunities.referrals,
      })
      .from(opportunities)
      .where(eq(opportunities.id, jobId))
      .limit(1);

    if (!job || job.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const referralIds = job[0].referrals || [];

    if (referralIds.length === 0) {
      return NextResponse.json({ referrals: [] });
    }

    // Fetch referral data for all IDs
    const referralData = await db
      .select()
      .from(referrals)
      .where(inArray(referrals.id, referralIds));

    return NextResponse.json({ referrals: referralData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
