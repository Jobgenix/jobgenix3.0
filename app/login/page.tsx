"use client";
import React, { useState ,Suspense} from "react";
import LoginModal from "../components/Modals/loginModal";
import Hero from "../components/LandingPage-New/hero";
import Nav from "../components/LandingPage-New/nav";

export default function Page() {
  const [isLoginOpen, setIsLoginOpen] = useState(true); // Modal is open by default

  return (
    <div>
      <Nav />
      <Hero />
      {isLoginOpen && (
        <Suspense fallback={<div>Loading...</div>}>
        <LoginModal onClose={() => setIsLoginOpen(false)} /> {/* Pass onClose prop */}
      </Suspense>
      )}
    </div>
  );
}
