import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MainPage = () => {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const fetchData = async () => {
    if (!name) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${name}&apikey=b33febda`
      );
      const data = await response.json();

      if (data.Response === "True") {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const detailsRes = await fetch(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=b33febda`
            );
            const fullDetails = await detailsRes.json();
            if (!fullDetails.Poster || fullDetails.Poster === "N/A") {
              fullDetails.Poster =
                "https://via.placeholder.com/300x445?text=No+Image";
            }
            return fullDetails;
          })
        );
        setMovies(detailedMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Skeleton card for loading state
  const MovieCardSkeleton = () => (
    <div className="w-44 sm:w-48 md:w-52 rounded-lg border border-indigo-100 p-3 shadow-sm bg-white">
      <Skeleton height={256} />
      <Skeleton height={20} className="mt-2 mb-1" />
      <Skeleton height={16} width={80} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
      {/* Search form */}
      <form
        onSubmit={handleSearchClick}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Search movie..."
          onChange={handleInputChange}
          value={name}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Find
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array(10)
            .fill()
            .map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
        </div>
      ) : (
        <MovieCards data={movies} />
      )}
    </div>
  );
};

export default MainPage;
