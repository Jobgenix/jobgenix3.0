import React from "react";
import LoginCard from "../components/Modals/loginModal";
import Hero from "../components/LandingPage-New/hero";

import Nav from "../components/LandingPage-New/nav";

export default function Page() {
  return (
    <div className="">
      <Nav />
      <Hero />
      <LoginCard></LoginCard>
    </div>
  );
}
