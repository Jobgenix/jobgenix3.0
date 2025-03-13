"use client";
import { Navbar } from "../components/LandingPageComponents/navbar";
import { Footer } from "@/app/components/LandingPageComponents/Footer";
import Name from "../components/profilePage/name";
import UploadCv from "../components/profilePage/uploadcv";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session , status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You need to login first");
      router.push("/auth/login");
    }
  }, [status, router]);

  if (!session?.user?.id) {
    return null; // Prevents errors when session is null
  }

  return (
    <div className="h-auto w-full bg-[#c6f7d5]">
      <Navbar />
      <Name />
      <UploadCv />
      <Footer />
    </div>
  );
}
