import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGetCollectionByIdQuery } from "../MovieAPI";
import { Container, LoadingSpinner } from "../design-system/components";

const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  min-height: 100vh;
  padding-top: 80px;
`;

const CollectionContainer = styled(Container)`
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.xl};
`;

const CollectionHeader = styled(motion.div)`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const CollectionPoster = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
`;

const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CollectionTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.colors.accent.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  }
`;

const CollectionOverview = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const MoviesSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

const MoviesList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const MovieCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.base};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.duration.base};
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: transparent;
    
    &::before {
      opacity: 0.05;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  position: relative;
  z-index: 1;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const MovieTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const MovieDate = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.accent.gold};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MovieOverview = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.accent.error};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const CollectionDetails = () => {
  const { id } = useParams();
  const { data: collection, error, isLoading } = useGetCollectionByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <LoadingSpinner fullScreen={false} size="lg" />
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorContainer>
          <p>Error: {error.message}</p>
        </ErrorContainer>
      </PageContainer>
    );
  }

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  // Sort movies by release date
  const sortedMovies = [...(collection?.parts || [])].sort((a, b) => 
    new Date(a.release_date) - new Date(b.release_date)
  );

  // Format release date
  const formatDate = (dateString) => {
    if (!dateString) return "Release date unknown";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <PageContainer>
      <CollectionContainer maxWidth="xl">
        <CollectionHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {collection?.poster_path && (
            <CollectionPoster
              src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
              alt={collection.name}
            />
          )}
          <CollectionInfo>
            <CollectionTitle>{collection?.name}</CollectionTitle>
            <CollectionOverview>{collection?.overview}</CollectionOverview>
          </CollectionInfo>
        </CollectionHeader>

        <MoviesSection>
          <SectionTitle>Movies in this Collection</SectionTitle>
          <MoviesList>
            {sortedMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                onClick={() => handleClick(movie.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {movie.poster_path ? (
                  <MoviePoster
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div style={{ 
                    width: '150px', 
                    height: '225px', 
                    background: 'linear-gradient(to bottom, #252525, #1A1A1A)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6B7280'
                  }}>
                    No Poster
                  </div>
                )}
                <MovieInfo>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieDate>{formatDate(movie.release_date)}</MovieDate>
                  <MovieOverview>{movie.overview || "No overview available"}</MovieOverview>
                </MovieInfo>
              </MovieCard>
            ))}
          </MoviesList>
        </MoviesSection>
      </CollectionContainer>
    </PageContainer>
  );
};

export default CollectionDetails;
