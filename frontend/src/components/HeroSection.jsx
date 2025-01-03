import React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/img/bg.png"; // Replace with your image path
import AboutPage from "../pages/AboutPage";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center rounded-b-3xl w-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <NavBar />
        {/* Main Content */}
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight">
              Expand your mind, <br /> reading a book
            </h1>
            <p className="mt-4 text-blue-200 text-lg">
              Reading books is a wonderful way to spend your time. Here at we
              believe reading will help you make connections with others.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 mx-4 text-base font-medium rounded-md bg-white text-blue-600 hover:bg-blue-50"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 py-3 text-base font-medium rounded-md text-white border border-white hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AboutPage />
    </>
  );
}

export default HeroSection;
