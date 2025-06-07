import React from "react";
import {
  FaSearch,
  FaStar,
  FaUserFriends,
  FaListAlt,
  FaPlay,
  FaRegNewspaper,
  FaDatabase,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <FaSearch className="text-2xl text-primary" />,
    title: "Smart Search",
    description:
      "Find any movie instantly with our intelligent search. Search by title.",
  },
  {
    icon: <FaStar className="text-2xl text-primary" />,
    title: "Personal Collection",
    description:
      "Build and organize your movie library. Rate movies and track what you've watched.",
  },
  {
    icon: <FaDatabase className="text-2xl text-primary" />,
    title: "Rich Data",
    description:
      "Access cast, crew, ratings, reviews, and availability details.",
  },
  {
    icon: <FaUserFriends className="text-2xl text-primary" />,
    title: "Social Features",
    description:
      "Share recommendations and discover trending movies in your network.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 max-w-6xl mx-auto">
        <p className="mb-4 text-sm font-medium text-gray-500">
          Your Ultimate Movie Discovery Platform
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">MovieHive</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Discover, explore, and curate your perfect movie collection. Powered
          by comprehensive movie data and intelligent search.
        </p>
        <div className="flex justify-center flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/auth")}
            className="bg-black text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-gray-800 transition"
          >
            <FaSearch className="inline-block mr-2 mb-1" />
            Start Exploring
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything you need to explore movies
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
          Powerful features designed to enhance your movie discovery experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-gray-100 py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to discover your next favorite movie?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Join thousands of movie enthusiasts who trust MovieHive for their
          entertainment needs.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="bg-black text-white py-3 px-8 rounded-full text-lg hover:bg-gray-800 transition"
        >
          Start Your Journey →
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
