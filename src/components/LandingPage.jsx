import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetMoviesByPopularityQuery,
  useGetTVShowsByPopularityQuery,
} from "../MovieAPI";

const LandingPage = () => {
  const navigate = useNavigate();

  const {
    data: movieData,
    error: movieError,
    isLoading: movieLoading,
  } = useGetMoviesByPopularityQuery();
  const {
    data: tvData,
    error: tvError,
    isLoading: tvLoading,
  } = useGetTVShowsByPopularityQuery();

  if (movieLoading || tvLoading) {
    return <div>Loading...</div>;
  }
  if (movieError || tvError) {
    return <div>{(movieError || tvError).message}</div>;
  }

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleTVClick = (id) => {
    navigate(`/tv/${id}`);
  };

  const movies = movieData?.results.slice(0, 10) || [];
  const tvShows = tvData?.results.slice(0, 11) || [];

  return (
    <div className="landing-page">
      <main className="main-content">
        <section className="movies-section">
          <h2>Popular Movies</h2>
          <div className="movie-list">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-item"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className="poster-title">{movie.title}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="tvshows-section">
          <h2>Popular TV Shows</h2>
          <div className="tv-list">
            {tvShows.map((show) => (
              <div
                key={show.id}
                className="tv-item"
                onClick={() => handleTVClick(show.id)}
              >
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                />
                <p className="poster-title">{show.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
