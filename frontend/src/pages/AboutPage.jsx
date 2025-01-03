import React from "react";
import backgroundImage from "../assets/img/book-removebg-preview.png";

const AboutPage = () => {
  return (
    <section className="bg-gradient-to-b from-white to-pink-300 py-16 px-8 rounded-b-3xl rounded-t-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Heading and Description */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">About</h2>
          <h3 className="text-3xl text-center font-bold text-gray-900 mb-4">
            The Redex Library
          </h3>
          <p className="text-gray-600 text-xl text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non lacinia
            fusce eu id. Fringilla sit sociis in suspendisse. Ultrices enim odio
            amet odio in duis fames.
          </p>
        </div>

        {/* Card Section */}
        <div className="flex items-center gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src={backgroundImage}
              alt="Stack of books"
              className="rounded-xl shadow-lg w-full h-auto max-h-[250px] object-contain"
            />
          </div>

          {/* Info Card */}
          <div className="w-full md:w-1/2 bg-pink-100 rounded-xl p-8 shadow-lg ">
            <h3 className="text-4xl font-bold mb-4">The Redex Library</h3>
            <div className="flex items-center justify-between text-gray-700">
              <p className="flex items-center gap-2">
                <span className="text-lg font-medium">Author:</span>
                Redex Library
              </p>
              <p className="flex items-center gap-2">
                <span className="text-lg font-medium">Total:</span>
                368 Books
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-pink-300"></div>
              <div className="w-8 h-8 rounded-full bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
