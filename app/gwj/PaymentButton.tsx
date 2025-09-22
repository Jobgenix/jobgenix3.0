// components/RazorpayCheckout.tsx
"use client";
import React, { useState } from "react";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

type Props = {
  amount: number; // rupees, e.g., 499
  description?: string;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  user?: { id?: string; name?: string; email?: string; contact?: string };
  onSuccess?: (data: any) => void;
  onFailure?: (err: any) => void;
};

export default function RazorpayCheckout({
  amount,
  description,
  user,
  onSuccess,
  onFailure,
  loading,
  setLoading,
}: Props) {
  const createAndOpen = async () => {
    if (setLoading) setLoading(true);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          userId: user?.id,
          meta: { plan: description },
        }),
      });
      const data = await res.json();
      if (setLoading) setLoading(false);
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      const order = data.order;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: process.env.NEXT_PUBLIC_APP_NAME || "Jobgenix",
        description: description || "Order",
        order_id: order.id,
        handler: async function (response: any) {
          // response: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
          console.log("verifying", response);
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.valid) {
              onFailure?.(verifyData);
            } else {
              onSuccess?.(verifyData);
            }
          } catch (err) {
            console.error("verify call failed", err);
            onFailure?.(err);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.contact || "",
        },
        theme: { color: "#2563eb" },
      };

      // ensure checkout script loaded
      if (!window.Razorpay) {
        const s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        s.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        s.onerror = () => {
          throw new Error("Razorpay SDK load failed");
        };
        document.body.appendChild(s);
      } else {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error(err);
      onFailure?.(err);
    }
  };

  return (
    <button
      onClick={createAndOpen}
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
    >
      Pay ₹{amount}
    </button>
  );
}
