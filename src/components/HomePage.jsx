import { useGetMoviesByPopularityQuery } from "../MovieAPI";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(data);
  return (
    <>
      <div>
        {data.results.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            {/* <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={`Backdrop for ${movie.title}`}
            /> */}
          </div>
        ))}
      </div>
    </>
  );
};
export default HomePage;
