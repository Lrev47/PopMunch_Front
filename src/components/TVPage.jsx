import React from "react";
import { useGetTVShowsByPopularityQuery } from "../MovieAPI/TvApi";
import { useNavigate } from "react-router-dom";

const TVShowsList = () => {
  const { data, error, isLoading } = useGetTVShowsByPopularityQuery();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/tv/${id}`);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="tvshows-list-container">
      <h1 className="tvshows-list-header">Popular TV Shows</h1>
      <ul className="tvshows-list">
        {data.results.map((tvShow) => (
          <li
            key={tvShow.id}
            className="tvshow-item"
            onClick={() => handleClick(tvShow.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
            />
            <h2>{tvShow.name}</h2>
            <p>{tvShow.overview}</p>
            <p className="rating">Rating: {tvShow.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TVShowsList;
