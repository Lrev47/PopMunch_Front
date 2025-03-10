import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetMoviesByPopularityQuery } from "../MovieAPI";

const MainHero = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();

  if (isLoading) {
    return (
      <div className="main-hero" style={{ backgroundColor: 'var(--primary-bg-color)' }}>
        <div className="main-hero-content">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-hero" style={{ backgroundColor: 'var(--primary-bg-color)' }}>
        <div className="main-hero-content">
          <div className="error-message" style={{ color: 'var(--accent-color)' }}>
            {error.message}
          </div>
        </div>
      </div>
    );
  }

  const movie = data?.results[0];

  if (!movie) {
    return null;
  }

  const handleExploreMovies = () => {
    navigate("/movies");
  };

  const handleMovieDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const scrollToContent = () => {
    const contentSection = document.getElementById("landing-page-content");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="main-hero">
      <div 
        className="main-hero-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      <div className="main-hero-content">
        <h1 className="main-hero-title">
          Welcome to <span>PopMunch</span><br />
          Your Movie Universe
        </h1>
        
        <p className="main-hero-subtitle">
          Discover, explore and review the latest movies and TV shows. 
          Join our community of film enthusiasts and find your next favorite entertainment.
        </p>
        
        <div className="main-hero-buttons">
          <button 
            className="main-hero-button primary"
            onClick={handleExploreMovies}
          >
            <span>🔍</span> Explore Movies
          </button>
          
          <button 
            className="main-hero-button secondary"
            onClick={handleMovieDetails}
          >
            <span>🎬</span> Featured Film
          </button>
        </div>
      </div>
      
      <div className="scroll-indicator" onClick={scrollToContent}>
        <div className="scroll-indicator-text">Scroll Down</div>
        <div className="scroll-indicator-arrow"></div>
      </div>
    </div>
  );
};

export default MainHero;
