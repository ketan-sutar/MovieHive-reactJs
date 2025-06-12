import React, { useEffect, useState } from "react";
import { getMovieById } from "../utils/getMovieById";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const defaultIDs = [
  "tt1216300",
  "tt0111161",
  "tt1375666",
  "tt0112870",
  "tt0468569",
  "tt0110912",
  "tt0137523",
  "tt4154796",
  "tt0080684",
];

const MovieCards = ({ data = [] }) => {
  const [fallbackMovies, setFallbackMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const placeholder = "https://placehold.co/400x600?text=No+Image";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const favRef = doc(db, "favorites", user.uid);
        const favSnap = await getDoc(favRef);
        if (favSnap.exists()) {
          setFavorites(favSnap.data().movieIDs || []);
        }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const loadDefaults = async () => {
      const movies = await Promise.all(
        defaultIDs.map((id) => getMovieById(id))
      );
      setFallbackMovies(movies);
    };

    if (data.length === 0) loadDefaults();
  }, [data]);

  const toggleFavorite = async (id, e) => {
    e.stopPropagation(); // Prevent card navigation
    if (!userId) return alert("Please log in to save favorites.");

    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);

    await setDoc(doc(db, "favorites", userId), {
      movieIDs: updatedFavorites,
    });
  };

  const moviesToRender = data.length > 0 ? data : fallbackMovies;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {moviesToRender.map((movie) => (
        <div
          key={movie.imdbID}
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
          className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer"
        >
          <img
            src={
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : placeholder
            }
            alt={movie.Title}
            className="w-full h-72 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholder;
            }}
          />

          {/* Favorite Icon */}
          <button
            onClick={(e) => toggleFavorite(movie.imdbID, e)}
            className="absolute top-3 right-3 text-2xl z-10 text-red-500 hover:text-red-600"
            title="Toggle Favorite"
          >
            {favorites.includes(movie.imdbID) ? <FaHeart /> : <FaRegHeart />}
          </button>

          {/* Card Content */}
          <div className="p-4 bg-indigo-50">
            <h3 className="text-indigo-900 text-lg font-semibold line-clamp-1">
              {movie.Title}
            </h3>
            <p className="text-gray-700 text-sm mt-1">
              <span className="font-medium">Year:</span> {movie.Year}
            </p>
            <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
              <span className="font-medium">Rating:</span>
              <span className="text-yellow-400">
                {movie.imdbRating || "N/A"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCards;
