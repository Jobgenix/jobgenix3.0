// components/RazorpayCheckout.tsx
"use client";
import React from "react";

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type VerifyResponse = {
  valid: boolean;
  [key: string]: unknown;
};

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: { color: string };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

type Props = {
  amount: number;
  description?: string;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  user?: { id?: string; name?: string; email?: string; contact?: string };
  onSuccess?: (data: VerifyResponse) => void;
  onFailure?: (err: Error | VerifyResponse) => void;
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
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: process.env.NEXT_PUBLIC_APP_NAME || "Jobgenix",
        description: description || "Order",
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          console.log("verifying", response);
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData: VerifyResponse = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.valid) {
              onFailure?.(verifyData);
            } else {
              onSuccess?.(verifyData);
            }
          } catch (err: unknown) {
            console.error("verify call failed", err);
            onFailure?.(
              err instanceof Error
                ? err
                : new Error("Unknown verification error")
            );
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.contact || "",
        },
        theme: { color: "#2563eb" },
      };

      if (!window.Razorpay) {
        const s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        s.onload = () => {
          if (window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            throw new Error("Razorpay SDK not available after script load");
          }
        };
        s.onerror = () => {
          throw new Error("Razorpay SDK load failed");
        };
        document.body.appendChild(s);
      } else {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err: unknown) {
      console.error(err);
      onFailure?.(err instanceof Error ? err : new Error("Unexpected error"));
    }
  };

  return (
    <button
      onClick={createAndOpen}
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      disabled={loading}
    >
      Pay ₹{amount}
    </button>
  );
}
