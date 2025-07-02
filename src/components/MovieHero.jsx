import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetMoviesByPopularityQuery } from "../MovieAPI";
import { Hero, LoadingSpinner } from "../design-system/components";
import styled from "styled-components";

const ErrorContainer = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.accent.error};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const MovieHero = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();

  if (isLoading) {
    return <LoadingSpinner fullScreen={false} size="lg" />;
  }

  if (error) {
    return (
      <ErrorContainer>
        {error.message || "Failed to load movie"}
      </ErrorContainer>
    );
  }
  
  const movie = data?.results[0];

  if (!movie) {
    return null;
  }

  const handleViewDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Get genre (would need genre data from API)
  const genre = "Action/Adventure"; // Placeholder - you'd get this from genre API

  return (
    <Hero
      backgroundImage={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      genre={genre}
      title={movie.title}
      description={movie.overview}
      rating={movie.vote_average?.toFixed(1)}
      year={new Date(movie.release_date).getFullYear()}
      runtime={movie.runtime ? formatRuntime(movie.runtime) : null}
      onPlayClick={handleViewDetails}
      onInfoClick={handleViewDetails}
      showScrollIndicator={false}
    />
  );
};

export default MovieHero;