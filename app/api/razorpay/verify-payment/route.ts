// app/api/razorpay/verify-payment/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // expected: { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId? }
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_LIVE_KEY_ID!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      // update DB status = failed
      await db
        .update(orders)
        .set({ status: "failed", razorpay_payment_id, razorpay_signature })
        .where(eq(orders.order_id, razorpay_order_id));
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    // valid payment -> update order in DB
    const paymentdetails = await db
      .update(orders)
      .set({ status: "paid", razorpay_payment_id, razorpay_signature })
      .where(eq(orders.order_id, razorpay_order_id))
      .returning();

    // TODO: perform post-payment actions (provision subscription, mark invoice paid)
    return NextResponse.json({
      valid: true,
      paymentdetails: paymentdetails[0].id,
    });
  } catch (err: any) {
    console.error("verify-payment error:", err);
    return NextResponse.json(
      { error: err.message ?? "error" },
      { status: 500 }
    );
  }
}
