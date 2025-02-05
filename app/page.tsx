"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Landing } from "@/app/components/landingPage";
import { ROLE_IDS } from "@/constants/roles";

export default function Page() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login");
    }

    if (session.status === 'authenticated' && session.data?.user.role === ROLE_IDS.NEW_USER) {
      router.push("/auth/first-login");
    }
  }, [session, router]);

  return (
    < >
      <Landing />
    </>
  );
}
