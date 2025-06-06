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

  // Skeleton card component
  const MovieCardSkeleton = () => (
    <div className="w-48 rounded-lg border p-3 shadow animate-pulse relative">
      <Skeleton height={256} />
      <Skeleton height={20} style={{ marginTop: 8, marginBottom: 6 }} />
      <Skeleton height={16} width={80} />
      <div className="absolute top-2 right-2">
        <Skeleton circle={true} height={24} width={24} />
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Favourite Movies</h1>
      <Link to="/home" className="text-blue-600 underline mb-4 block">
        ⬅ Go Back
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
        <p>No favorites found.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="w-48 border rounded shadow relative"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://placehold.co/400"
                }
                alt={movie.Title}
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold">{movie.Title}</h3>
                <p className="text-sm text-gray-700">Year: {movie.Year}</p>
              </div>
              <button
                onClick={() => handleUnfavorite(movie.imdbID)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Remove from favorites"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
