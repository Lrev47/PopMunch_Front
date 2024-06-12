import React, { useState, useEffect } from 'react';
import { useGetFilteredMoviesQuery, useGetGenresQuery, useGetRegionsQuery, useGetWatchProvidersQuery } from "../MovieAPI/movieApi";

const MovieSearch = () => {
  const [searchParams, setSearchParams] = useState({
    startDate: '',
    endDate: '',
    genres: '',
    minVoteCount: '',
    region: '',
    watchProviders: '',
  });

  const { data: genreData, isLoading: genreLoading, error: genreError } = useGetGenresQuery();
  const { data: regionData, isLoading: regionLoading, error: regionError } = useGetRegionsQuery();
  const { data: providerData, isLoading: providerLoading, error: providerError } = useGetWatchProvidersQuery();
  const { data, error, isLoading, refetch } = useGetFilteredMoviesQuery(searchParams, { skip: false });

  useEffect(() => {
    if (searchParams) {
      refetch();
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="movie-search-container">
      <h2 className="movie-search-header">Search Movies</h2>
      <form className="movie-search-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={searchParams.startDate} onChange={handleChange} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="endDate" value={searchParams.endDate} onChange={handleChange} />
        </div>
        <div>
          <label>Genres:</label>
          {genreLoading ? (
            <p>Loading genres...</p>
          ) : genreError ? (
            <p>Error loading genres</p>
          ) : (
            <select name="genres" value={searchParams.genres} onChange={handleChange}>
              <option value="">Select Genre</option>
              {genreData.genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label>Minimum Vote Count:</label>
          <input type="number" name="minVoteCount" value={searchParams.minVoteCount} onChange={handleChange} />
        </div>
        <div>
          <label>Region:</label>
          {regionLoading ? (
            <p>Loading regions...</p>
          ) : regionError ? (
            <p>Error loading regions</p>
          ) : (
            <select name="region" value={searchParams.region} onChange={handleChange}>
              <option value="">Select Region</option>
              {regionData.results.map((region) => (
                <option key={region.iso_3166_1} value={region.iso_3166_1}>
                  {region.english_name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label>Watch Providers:</label>
          {providerLoading ? (
            <p>Loading watch providers...</p>
          ) : providerError ? (
            <p>Error loading watch providers</p>
          ) : (
            <select name="watchProviders" value={searchParams.watchProviders} onChange={handleChange}>
              <option value="">Select Watch Provider</option>
              {providerData.results.map((provider) => (
                <option key={provider.provider_id} value={provider.provider_id}>
                  {provider.provider_name}
                </option>
              ))}
            </select>
          )}
        </div>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div className="movie-list-container">
          <ul className="movie-list">
            {data.results.map((movie) => (
              <li key={movie.id} className="movie-item">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
