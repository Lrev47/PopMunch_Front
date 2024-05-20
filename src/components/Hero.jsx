import { useGetMoviesByPopularityQuery } from "../MovieAPI";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  // Ensure data.results is defined and has at least one movie
  const movie = data?.results?.[0];

  if (!movie) {
    return <div>No movies available</div>;
  }


const handelClick = () => {
  navigate(`/movie/${movie.id}`);
}








  return (
    <div className="HeroSection">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={handelClick}
      
      />
      {/* You can also include the backdrop image if needed */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={`Backdrop for ${movie.title}`}
      />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
};

export default Hero;
