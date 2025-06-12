import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../utils/getMovieById";

const MovieDataPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const placeholder = "https://via.placeholder.com/300x445?text=No+Image";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieById(id);
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <div className="text-center mt-16 text-indigo-700 text-xl font-semibold">
        Loading movie data...
      </div>
    );

  return (
    <div className="min-h-screen bg-indigo-50 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          ← Back to Home
        </button>

        {/* Movie Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-6">
          {movie.Title}
        </h1>

        <div className="flex flex-col sm:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : placeholder}
              alt={movie.Title}
              className="w-full sm:w-64 h-auto rounded-xl shadow-md"
            />
          </div>

          {/* Movie Details */}
          <div className="flex flex-col gap-3 text-gray-700 text-base leading-relaxed">
            <p>
              <span className="font-semibold text-gray-900">⭐ Rating:</span>{" "}
              <span className="text-yellow-400 font-medium">
                {movie.imdbRating}
              </span>
            </p>
            <p>
              <span className="font-semibold text-gray-900">🎬 Year:</span>{" "}
              {movie.Year}
            </p>
            <p>
              <span className="font-semibold text-gray-900">📖 Plot:</span>{" "}
              {movie.Plot}
            </p>
            <p>
              <span className="font-semibold text-gray-900">🎭 Genre:</span>{" "}
              {movie.Genre}
            </p>
            <p>
              <span className="font-semibold text-gray-900">🗣️ Language:</span>{" "}
              {movie.Language}
            </p>
            <p>
              <span className="font-semibold text-gray-900">⏱️ Runtime:</span>{" "}
              {movie.Runtime}
            </p>
            <p>
              <span className="font-semibold text-gray-900">🎬 Director:</span>{" "}
              {movie.Director}
            </p>
            <p>
              <span className="font-semibold text-gray-900">🎭 Actors:</span>{" "}
              {movie.Actors}
            </p>
            <p>
              <span className="font-semibold text-gray-900">📅 Released:</span>{" "}
              {movie.Released}
            </p>
            <p>
              <span className="font-semibold text-gray-900">🌍 Country:</span>{" "}
              {movie.Country}
            </p>
            <p>
              <span className="font-semibold text-gray-900">🏆 Awards:</span>{" "}
              {movie.Awards}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDataPage;
