import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  useGetMoviesByPopularityQuery,
  useGetTVShowsByPopularityQuery,
} from "../MovieAPI";
import { Container, Section, Grid, Card } from "../design-system/components";

const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  min-height: 100vh;
`;

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.colors.accent.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  }
`;

const SectionSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const SkeletonCard = styled(motion.div)`
  aspect-ratio: 2/3;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.background.glass} 50%,
      transparent 100%
    );
    animation: shimmer 2s infinite;
  }
`;

const ViewAllButton = styled(motion.button)`
  margin: ${({ theme }) => theme.spacing['3xl']} auto 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [moviesRef, moviesInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [tvRef, tvInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleTVClick = (id) => {
    navigate(`/tv/${id}`);
  };

  const movies = movieData?.results.slice(0, 10) || [];
  const tvShows = tvData?.results.slice(0, 10) || [];

  const renderSkeletons = (count) => (
    <LoadingGrid>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </LoadingGrid>
  );

  return (
    <PageContainer id="landing-page-content">
      <Container maxWidth="xl">
        <Section spacing="4xl" ref={moviesRef}>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={moviesInView ? "visible" : "hidden"}
          >
            <SectionHeader>
              <SectionTitle>Popular Movies</SectionTitle>
              <SectionSubtitle>
                Discover the most watched films right now
              </SectionSubtitle>
            </SectionHeader>

            {movieLoading ? (
              renderSkeletons(10)
            ) : movieError ? (
              <div>Error loading movies</div>
            ) : (
              <>
                <Grid minWidth="200px" gap="lg">
                  {movies.map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={moviesInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        title={movie.title}
                        subtitle={new Date(movie.release_date).getFullYear()}
                        rating={movie.vote_average.toFixed(1)}
                        description={movie.overview}
                        onClick={() => handleMovieClick(movie.id)}
                        badge={movie.vote_average >= 8 ? "TOP RATED" : null}
                        badgeVariant={movie.vote_average >= 8 ? "success" : "default"}
                      />
                    </motion.div>
                  ))}
                </Grid>
                <ViewAllButton
                  onClick={() => navigate("/movies")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Movies
                  <span>→</span>
                </ViewAllButton>
              </>
            )}
          </motion.div>
        </Section>

        <Section spacing="4xl" ref={tvRef}>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={tvInView ? "visible" : "hidden"}
          >
            <SectionHeader>
              <SectionTitle>Popular TV Shows</SectionTitle>
              <SectionSubtitle>
                Binge-worthy series everyone's talking about
              </SectionSubtitle>
            </SectionHeader>

            {tvLoading ? (
              renderSkeletons(10)
            ) : tvError ? (
              <div>Error loading TV shows</div>
            ) : (
              <>
                <Grid minWidth="200px" gap="lg">
                  {tvShows.map((show, index) => (
                    <motion.div
                      key={show.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={tvInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        title={show.name}
                        subtitle={new Date(show.first_air_date).getFullYear()}
                        rating={show.vote_average.toFixed(1)}
                        description={show.overview}
                        onClick={() => handleTVClick(show.id)}
                        badge={show.vote_average >= 8 ? "TOP RATED" : null}
                        badgeVariant={show.vote_average >= 8 ? "success" : "default"}
                      />
                    </motion.div>
                  ))}
                </Grid>
                <ViewAllButton
                  onClick={() => navigate("/tv")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All TV Shows
                  <span>→</span>
                </ViewAllButton>
              </>
            )}
          </motion.div>
        </Section>
      </Container>
    </PageContainer>
  );
};

export default LandingPage;