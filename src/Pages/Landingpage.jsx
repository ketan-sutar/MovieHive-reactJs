import React from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          🎬 MovieHive
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Discover, search, and save your favorite movies — all in one hive.
          Powered by real-time OMDb data.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300 ease-in-out"
        >
          <FaSearch className="inline-block mr-2 mb-1" />
          Get Started
        </button>
        <div className="mt-12 text-sm text-gray-400">
          Powered by <span className="text-white font-medium">OMDb API</span>
        </div>
      </div>

      {/* Feature Cards */}
      <section className="bg-[#1c1c2c] py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 text-center">
          {/* Feature 1 */}
          <div className="bg-[#2c2c3c] p-8 rounded-xl shadow-md hover:scale-105 transition transform duration-300">
            <FaSearch className="text-yellow-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Search Movies</h3>
            <p className="text-gray-400">
              Instantly find detailed movie info by title, year, or keyword.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#2c2c3c] p-8 rounded-xl shadow-md hover:scale-105 transition transform duration-300">
            <FaStar className="text-red-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Save Favorites</h3>
            <p className="text-gray-400">
              Build your personal collection of loved and must-watch movies.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#2c2c3c] p-8 rounded-xl shadow-md hover:scale-105 transition transform duration-300">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="OMDB"
              className="h-12 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">OMDb Integration</h3>
            <p className="text-gray-400">
              Access trusted movie data from the Open Movie Database API.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
