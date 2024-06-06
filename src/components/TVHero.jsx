import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetTVShowsByPopularityQuery } from "../MovieAPI/TvApi";


const TVHero = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetTVShowsByPopularityQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const tvShow = data?.results[0];

  if (!tvShow) {
    return null;
  }

  const handleClick = (id) => {
    navigate(`/tv/${id}`);
  };

  return (
    <div className="tv-hero-container">
      <div
        className="tv-hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`,
        }}
      >
        <div className="tv-hero-overlay"></div>
        <div className="tv-hero-content">
          <div className="tv-hero-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
            />
          </div>
          <div className="tv-hero-details">
            <h1>{tvShow.name}</h1>
            <p>{tvShow.overview}</p>
            <button onClick={() => handleClick(tvShow.id)}>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVHero;
