import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetMoviesByPopularityQuery } from "../MovieAPI";

const MovieHero = () => {
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
    <div className="movie-hero-container">
      <div
        className="movie-hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="movie-hero-overlay"></div>
        <div className="movie-hero-content">
          <div className="movie-hero-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-hero-details">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <button onClick={() => handleClick(movie.id)}>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
