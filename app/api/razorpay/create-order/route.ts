import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // expected { amount: number, currency?: string, receipt?: string, userId?: string }
    const amount = body.amount; // amount in rupees or paise? we'll expect rupees and convert
    if (!amount || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    const currency = body.currency ?? "INR";
    const amountPaise = Math.round(amount * 100);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_LIVE_KEY_ID!,
      key_secret: process.env.RAZORPAY_LIVE_KEY_SECRET!,
    });

    const options = {
      amount: amountPaise,
      currency,
      receipt: body.receipt ?? `rcpt_${Date.now()}`,
      payment_capture: 1, // auto-capture
    };

    const order = await razorpay.orders.create(options);
    const session = await auth();
    const userId = session?.user.id;
    // store order in DB
    await db.insert(orders).values({
      order_id: order.id,
      amount: amountPaise,
      currency,
      status: "created",
      user_id: userId,
      meta: JSON.stringify(body.meta ?? {}),
    });

    return NextResponse.json({ order });
  } catch (err: unknown) {
    console.error("create-order error:", err);

    // Type guard for Error
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    // Fallback
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
