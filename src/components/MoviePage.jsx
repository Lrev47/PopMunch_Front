import React from "react";
import { useGetMoviesByPopularityQuery } from "../MovieAPI";
import { useNavigate } from "react-router-dom";

const PopularMovieList = () => {
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="movie-page-container">
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-page-container">
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--accent-color)" }}>
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!data || !data.results.length) {
    return (
      <div className="movie-page-container">
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p>No movies available</p>
        </div>
      </div>
    );
  }

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  // We skip the first movie since it's in the hero
  const movies = data.results.slice(1);

  return (
    <div className="movie-page-container">
      <div className="movie-page-header">
        <h1 className="movie-page-title">
          Popular Movies <span>🔥</span>
        </h1>
      </div>

      <div className="movie-filters">
        <button className="movie-filter active">All</button>
        <button className="movie-filter">Action</button>
        <button className="movie-filter">Comedy</button>
        <button className="movie-filter">Drama</button>
        <button className="movie-filter">Horror</button>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => {
          // Format the release date year
          const releaseYear = movie.release_date ? 
            new Date(movie.release_date).getFullYear() : '';
          
          // Format the rating
          const rating = movie.vote_average?.toFixed(1);
          
          return (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="movie-card-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-card-overlay">
                  <p>{movie.overview?.slice(0, 100)}...</p>
                </div>
              </div>
              <div className="movie-card-content">
                <h3 className="movie-card-title">{movie.title}</h3>
                <div className="movie-card-meta">
                  <div className="movie-card-rating">
                    <span>⭐</span> {rating}
                  </div>
                  <div className="movie-card-year">{releaseYear}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularMovieList;
