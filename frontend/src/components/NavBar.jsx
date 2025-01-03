import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="absolute top-6 left-6">
        <h1 className="text-3xl font-bold text-white">Redex</h1>
      </div>
      <div className="absolute top-6 right-6 flex space-x-6">
        <a href="/" className="text-white font-medium my-3 text-xl">
          Home
        </a>
        <a href="/about-page" className="text-white font-medium my-3 text-xl">
          About
        </a>
        <a href="/" className="text-white font-medium my-3 text-xl">
          Store
        </a>
        <a href="/" className="text-white font-medium my-3 text-xl">
          Contact Us
        </a>
        <button
          onClick={() => navigate("/add-book")}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-500 hover:text-white"
        >
          Add Book
        </button>
      </div>
    </div>
  );
}

export default NavBar;
