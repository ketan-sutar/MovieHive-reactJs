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
        console.log("Searched Movies:", detailedMovies);
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

  // Skeleton card component
  const MovieCardSkeleton = () => (
    <div className="w-48 rounded-lg border p-3 shadow animate-pulse">
      <Skeleton height={256} />
      <Skeleton height={20} style={{ marginTop: 8, marginBottom: 6 }} />
      <Skeleton height={16} width={80} />
    </div>
  );

  return (
    <>
      <div>
        <div style={{ marginTop: "20px" }}>
          <form onSubmit={handleSearchClick}>
            <input
              type="text"
              placeholder="Search movie..."
              onChange={handleInputChange}
              value={name}
            />
            <button type="submit" style={{ marginLeft: "10px" }}>
              Find
            </button>
          </form>
        </div>

        {/* Show skeletons while loading, else show movies */}
        {loading ? (
          <div className="flex flex-wrap justify-center gap-6 p-6">
            {Array(6)
              .fill()
              .map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
          </div>
        ) : (
          <MovieCards data={movies} />
        )}
      </div>
    </>
  );
};

export default MainPage;
