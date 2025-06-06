// utils/getMovieById.js
export const getMovieById = async (id) => {
  const response = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=b33febda`
  );
  const data = await response.json();
  return data;
};
