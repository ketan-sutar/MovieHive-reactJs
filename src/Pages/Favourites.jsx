import React, { useEffect, useState } from "react";
import { getMovieById } from "../utils/getMovieById";
import { Link } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async (uid) => {
      setLoading(true);
      const docRef = doc(db, "favorites", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const ids = docSnap.data().movieIDs || [];
        setFavorites(ids);
        const movieData = await Promise.all(ids.map((id) => getMovieById(id)));
        setMovies(movieData);
      } else {
        setFavorites([]);
        setMovies([]);
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchFavorites(user.uid);
      } else {
        setUserId(null);
        setFavorites([]);
        setMovies([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUnfavorite = async (imdbID) => {
    const updatedFavorites = favorites.filter((id) => id !== imdbID);
    setFavorites(updatedFavorites);
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.imdbID !== imdbID)
    );

    if (userId) {
      await setDoc(doc(db, "favorites", userId), {
        movieIDs: updatedFavorites,
      });
    }
  };

  const MovieCardSkeleton = () => (
    <div className="w-48 rounded-xl border p-3 shadow-sm bg-white">
      <Skeleton height={256} className="rounded" />
      <Skeleton height={20} style={{ marginTop: 8 }} />
      <Skeleton height={16} width={80} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-900 mb-4">
          🎬 Favourite Movies
        </h1>

        <Link
          to="/home"
          className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-200 transition duration-200 mb-6"
        >
          ⬅ Go Back to Home
        </Link>

        {loading ? (
          <div className="flex flex-wrap gap-6">
            {Array(6)
              .fill()
              .map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
          </div>
        ) : movies.length === 0 ? (
          <p className="text-gray-600 text-lg">
            You haven't added any favorite movies yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="w-48 border rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition relative"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://placehold.co/400"
                  }
                  alt={movie.Title}
                  className="h-64 object-cover w-full"
                />
                <div className="p-3">
                  <h3 className="text-base font-semibold text-indigo-900 truncate">
                    {movie.Title}
                  </h3>
                  <p className="text-sm text-gray-700">Year: {movie.Year}</p>
                </div>
                <button
                  onClick={() => handleUnfavorite(movie.imdbID)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow transition"
                  title="Remove from favorites"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
