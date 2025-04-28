;"use client";
import React, { useState } from "react";
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
        <LoginModal onClose={() => setIsLoginOpen(false)} /> // Pass onClose prop
      )}
    </div>
  );
}
