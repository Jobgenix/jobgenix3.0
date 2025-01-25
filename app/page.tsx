"use client";
import InternshipForm from "@/app/components/internship-form";
import { ROLE_IDS } from "@/constants/roles";
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
    if (session.data?.user.role !== ROLE_IDS.EMPLOYER && session.status === 'authenticated') {
      router.push('/home');
    }
  }, [session, router]);

  return (
    <>
      {/* <InternshipForm /> */}
      <Landing/>
    </>
  );
}
