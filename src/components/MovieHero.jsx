import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetMoviesByPopularityQuery } from "../MovieAPI";

const MainHero = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const movie = data?.results[0];

  if (!movie) {
    return null;
  }

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      className="main-hero"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="hero-content">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <button onClick={() => handleClick(movie.id)}>View Details</button>
      </div>
    </div>
  );
};

export default MainHero;
