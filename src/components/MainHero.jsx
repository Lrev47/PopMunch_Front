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
    window.scrollTo(0, 0);
  };

  const scrollToContent = () => {
    const contentSection = document.getElementById("landing-page-content");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="main-hero"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="main-hero-content">
        <div className="main-hero-header">
          <h1>Welcome to Pop Munch!</h1>
          <p className="main-hero-description">
            Your ultimate destination for movie and TV show ratings.
          </p>
        </div>
        <div className="main-hero-featured-movie">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <button onClick={() => handleClick(movie.id)}>View Details</button>
        </div>
      </div>
      <div className="main-hero-scroll-down" onClick={scrollToContent}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-down-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="8 12 12 16 16 12"></polyline>
          <line x1="12" y1="8" x2="12" y2="16"></line>
        </svg>
      </div>
    </div>
  );
};

export default MainHero;
