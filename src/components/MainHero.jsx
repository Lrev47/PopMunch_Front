import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGetMoviesByPopularityQuery } from "../MovieAPI";
import { Hero } from "../design-system/components";

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.colors.background.tertiary};
  border-top: 3px solid ${({ theme }) => theme.colors.accent.primary.start};
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.accent.error};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const MainHero = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        {error.message || "Failed to load content"}
      </ErrorContainer>
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

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Hero
      backgroundImage={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      title="Welcome to PopMunch"
      description="Discover, explore and review the latest movies and TV shows. Join our community of film enthusiasts and find your next favorite entertainment."
      genre="Your Movie Universe"
      rating={movie.vote_average.toFixed(1)}
      year={new Date(movie.release_date).getFullYear()}
      onPlayClick={handleMovieDetails}
      onInfoClick={handleExploreMovies}
      showScrollIndicator={true}
    />
  );
};

export default MainHero;