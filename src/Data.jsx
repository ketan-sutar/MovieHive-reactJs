// import React, { useEffect, useState } from "react";

// const Data = () => {
//   const [query, setQuery] = useState("Iron"); // or any default value
//   const [movies, setMovies] = useState([]);

//   const fetchData = async () => {
//     if (!query) return;

//     try {
//       const response = await fetch(
//         `https://www.omdbapi.com/?s=${query}&apikey=b33febda`
//       );
//       const data = await response.json();

//       console.log("Fetched Data:", data);

//       if (data.Response === "True") {
//         setMovies(data.Search);
//       } else {
//         console.error("Error:", data.Error);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [query]); // Run whenever `query` changes

//   return (
//     <div>
//       <h2>Fetched Movies:</h2>
//       <ul>
//         {movies.map((movie) => (
//           <li key={movie.imdbID}>{movie.Title} ({movie.Year})</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Data;
