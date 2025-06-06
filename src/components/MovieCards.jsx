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
  const placeholder = "https://placehold.co/400";

  const [userId, setUserId] = useState(null);

  const navigate=useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid); // ✅ correct field
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

  const moviesToRender = data.length > 0 ? data : fallbackMovies;

  const toggleFavorite = async (id) => {
    if (!userId) return alert("Please log in to save favorites.");

    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((fid) => fid !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    setFavorites(updatedFavorites);

    // 🔥 Save to Firestore
    await setDoc(doc(db, "favorites", userId), {
      movieIDs: updatedFavorites,
    });
  };

  return (
    <div
    
    
    className="flex flex-wrap justify-center gap-6 p-6">
      {moviesToRender.map((movie) => (
        <div
          key={movie.imdbID}
          onClick={()=> navigate(`/movie/${movie.imdbID}`)}
          className="relative w-48 border border-gray-300 rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition duration-200"
        >
          <img
            src={
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : placeholder
            }
            alt={movie.Title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholder;
            }}
          />

          {/* Favorite Icon */}
          <button
            onClick={() => toggleFavorite(movie.imdbID)}
            className="absolute top-2 right-2 text-red-600 text-xl z-10"
            title="Toggle Favorite"
          >
            {favorites.includes(movie.imdbID) ? <FaHeart /> : <FaRegHeart />}
          </button>

          <div className="bg-gray-50 p-3">
            <h3 className="text-lg font-semibold">{movie.Title}</h3>
            <p className="text-sm text-gray-700">
              <strong>Year:</strong> {movie.Year}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Rating:</strong> {movie.imdbRating || "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCards;
