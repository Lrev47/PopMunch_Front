import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetMoviesByPopularityQuery } from "../MovieAPI";

const MovieHero = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();

  if (isLoading) {
    return (
      <div className="movie-hero-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-hero-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="error-message">{error.message}</div>
      </div>
    );
  }
  
  const movie = data?.results[0];

  if (!movie) {
    return null;
  }

  const handleViewDetails = (id) => {
    navigate(`/movie/${id}`);
  };

  // Format the release date
  const releaseDate = new Date(movie.release_date);
  const releaseYear = releaseDate.getFullYear();
  
  // Format vote average to a single decimal place
  const rating = movie.vote_average?.toFixed(1);

  return (
    <div className="movie-hero-container">
      <div
        className="movie-hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="movie-hero-content">
          <div className="movie-hero-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-hero-details">
            <h1>{movie.title}</h1>
            {movie.tagline && <div className="tagline">{movie.tagline}</div>}
            
            <div className="movie-hero-meta">
              {releaseYear && (
                <div className="movie-hero-meta-item">
                  <span>📅</span> {releaseYear}
                </div>
              )}
              {rating && (
                <div className="movie-hero-meta-item">
                  <span>⭐</span> {rating}/10
                </div>
              )}
              <div className="movie-hero-meta-item">
                <span>🎬</span> {movie.original_language?.toUpperCase()}
              </div>
              {movie.adult && (
                <div className="movie-hero-meta-item">
                  <span>🔞</span> Adult
                </div>
              )}
            </div>
            
            <p>{movie.overview}</p>
            
            <div className="movie-hero-buttons">
              <button 
                className="movie-hero-button primary"
                onClick={() => handleViewDetails(movie.id)}
              >
                <span>▶</span> View Details
              </button>
              <button className="movie-hero-button secondary">
                <span>❤</span> Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
