"use client";

import { Navbar } from '../components/LandingPageComponents/navbar';
import { Footer } from "@/app/components/LandingPageComponents/Footer";
import Name from '../components/profilePage/name';
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You need to login first");
      router.push("/auth/login");
    }
  }, [status, router]);

  // Show nothing (or a loader) while checking authentication
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If unauthenticated, prevent rendering (redirect happens inside useEffect)
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="h-auto w-full bg-[#c6f7d5] ">
      <Navbar />
      <Name />
      <Footer />
    </div>
  );
}
