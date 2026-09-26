import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Workflow from "../components/Workflow";
import AccessControl from "../components/AccessControl";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <AccessControl />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;