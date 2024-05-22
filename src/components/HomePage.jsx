import { useGetMoviesByPopularityQuery } from "../MovieAPI";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data || !data.results.length) {
    return <div>No movies available</div>;
  }

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  // console.log(data);
  return (
    <>
      <div>
        {data.results.map((movie) => (
          <div key={movie.id}>
            <img
              onClick={() => handleClick(movie.id)}
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
