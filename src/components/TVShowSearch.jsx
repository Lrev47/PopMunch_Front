import React, { useState, useEffect } from "react";
import {
  useGetFilteredTVShowsQuery,
  useGetGenresQuery,
} from "../MovieAPI/TvApi";
import { useNavigate } from "react-router-dom";

const TVShowSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    year: "",
    genres: "",
  });

  const {
    data: genreData,
    isLoading: genreLoading,
    error: genreError,
  } = useGetGenresQuery();
  const { data, error, isLoading, refetch } = useGetFilteredTVShowsQuery(
    searchParams,
    { skip: false }
  );

  useEffect(() => {
    if (searchParams) {
      refetch();
    }
  }, [searchParams, refetch]);

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (id) => {
    navigate(`/tv/${id}`);
  };

  const years = Array.from({ length: 2024 - 1900 + 1 }, (v, k) => 2024 - k);

  return (
    <div className="tvshow-search-container">
      <h2 className="tvshow-search-header">Search TV Shows</h2>
      <form className="tvshow-search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Year:</label>
          <select name="year" value={searchParams.year} onChange={handleChange}>
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Genres:</label>
          {genreLoading ? (
            <p>Loading genres...</p>
          ) : genreError ? (
            <p>Error loading genres</p>
          ) : (
            <select
              name="genres"
              value={searchParams.genres}
              onChange={handleChange}
            >
              <option value="">Select Genre</option>
              {genreData.genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div className="tvshow-list-container">
          <ul className="tvshow-list">
            {data.results.map((tvshow) => (
              <li
                key={tvshow.id}
                className="tvshow-item"
                onClick={() => handleClick(tvshow.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                  alt={tvshow.name}
                />
                <h2>{tvshow.name}</h2>
                <p>{tvshow.overview}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TVShowSearch;
