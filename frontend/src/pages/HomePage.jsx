import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Section */}
      <NavBar />
      <HeroSection />
      <Footer />
    </div>
  );
}

export default HomePage;
