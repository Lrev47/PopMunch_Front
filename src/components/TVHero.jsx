import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetTVShowsByPopularityQuery } from "../MovieAPI/TvApi";
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

const TVHero = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetTVShowsByPopularityQuery();

  if (isLoading) {
    return <LoadingSpinner fullScreen={false} size="lg" />;
  }

  if (error) {
    return (
      <ErrorContainer>
        {error.message || "Failed to load TV show"}
      </ErrorContainer>
    );
  }

  const tvShow = data?.results[0];

  if (!tvShow) {
    return null;
  }

  const handleViewDetails = () => {
    navigate(`/tv/${tvShow.id}`);
  };

  // Get genre (would need genre data from API)
  const genre = "Drama/Thriller"; // Placeholder - you'd get this from genre API

  // Format first air date year
  const year = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : null;

  return (
    <Hero
      backgroundImage={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
      genre={genre}
      title={tvShow.name}
      description={tvShow.overview}
      rating={tvShow.vote_average?.toFixed(1)}
      year={year}
      runtime={null} // TV shows don't have runtime in the same way
      onPlayClick={handleViewDetails}
      onInfoClick={handleViewDetails}
      showScrollIndicator={false}
    />
  );
};

export default TVHero;