"use client";
import { Landing } from "@/app/components/landingPage";
import LoginModal from "@/app/components/Modals/loginModal";
import { Suspense, useState } from "react";

export default function Page() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Landing onLoginClick={() => setIsLoginOpen(true)} />
      {isLoginOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginModal onClose={() => setIsLoginOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
