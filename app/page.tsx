"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {Landing} from "@/app/components/landingPage"

export default function Page() {

  const session = useSession();
  const router = useRouter();

  useEffect(() => {

    if (session.status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [session, router]);

  return (
    <>
      {/* <InternshipForm /> */}
      <Landing/>
    </>
  );
}
