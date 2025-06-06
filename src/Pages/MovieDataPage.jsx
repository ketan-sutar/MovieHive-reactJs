import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../utils/getMovieById";

const MovieDataPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const placeholder = "https://via.placeholder.com/300x445?text=No+Image";

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieById(id);
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : placeholder}
          alt={movie.Title}
          className="w-64 rounded shadow"
        />
        <div>
          <p className="mb-2">
            <strong>Rating:</strong> ⭐ {movie.imdbRating}
          </p>
          <p className="mb-2">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="mb-2">
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p className="mb-2">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="mb-2">
            <strong>Language:</strong> {movie.Language}
          </p>
          <p className="mb-2">
            <strong>Runtime:</strong> {movie.Runtime}
          </p>


          <p className="mb-2">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="mb-2">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="mb-2">
            <strong>Released Date:</strong> {movie.Released}
          </p>
          <p className="mb-2">
            <strong>Country:</strong> {movie.Country}
          </p>
          <p className="mb-2">
            <strong>Awards:</strong> {movie.Awards}
          </p>


        </div>
      </div>
    </div>
  );
};

export default MovieDataPage;
