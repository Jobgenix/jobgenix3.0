import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { gwjenrollment } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {
      name,
      email,
      phone,
      whatsapp,
      college,
      referralName,
      source,
      subject,
      screenshot,
      paymentid,
    } = await req.json();

    const newEnrollment = await db
      .insert(gwjenrollment)
      .values({
        name,
        email,
        phone,
        whatsapp,
        college,
        referralname: referralName,
        source,
        subject,
        screenshot,
        payment_id: paymentid,
      })
      .returning();
    console.log("new enrollment is: ", newEnrollment);

    return NextResponse.json({ success: true, enrollment: newEnrollment });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
