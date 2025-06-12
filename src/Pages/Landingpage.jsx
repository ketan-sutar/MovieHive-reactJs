import React from "react";
import { FaSearch, FaStar, FaDatabase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: (
      <FaSearch className="text-3xl sm:text-4xl md:text-5xl text-indigo-600" />
    ),
    title: "Smart Search",
    description:
      "Find any movie instantly with our intelligent search. Search by title.",
  },
  {
    icon: (
      <FaStar className="text-3xl sm:text-4xl md:text-5xl text-yellow-400" />
    ),
    title: "Personal Collection",
    description:
      "Build and organize your movie library. Rate movies and track what you've watched.",
  },
  {
    icon: (
      <FaDatabase className="text-3xl sm:text-4xl md:text-5xl text-green-500" />
    ),
    title: "Rich Data",
    description:
      "Access cast, crew, ratings, reviews, and availability details.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-500">
          Your Ultimate Movie Discovery Platform
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg text-indigo-900">
          MovieHive
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-10 sm:mb-12">
          Discover, explore, and curate your perfect movie collection. Powered
          by comprehensive movie data and intelligent search.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="w-full sm:w-auto inline-flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-12 rounded-full text-base sm:text-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          <FaSearch className="mr-2 sm:mr-3 text-lg sm:text-xl" />
          Start Exploring
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-5 sm:mb-8 text-indigo-900">
          Everything you need to explore movies
        </h2>
        <p className="text-center text-indigo-700 max-w-2xl mx-auto mb-12 sm:mb-16 text-sm sm:text-base">
          Powerful features designed to enhance your movie discovery experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 sm:mb-6">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-indigo-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-indigo-600 py-16 sm:py-24 text-center px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 sm:mb-6 text-white drop-shadow-md">
          Ready to discover your next favorite movie?
        </h2>
        <p className="text-indigo-200 max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base">
          Join thousands of movie enthusiasts who trust MovieHive for their
          entertainment needs.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="w-full sm:w-auto bg-white text-indigo-600 font-bold py-3 sm:py-4 px-6 sm:px-12 rounded-full text-base sm:text-lg shadow-lg hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-white"
        >
          Start Your Journey →
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
