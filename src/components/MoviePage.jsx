import React, { useState, useEffect } from "react";
import { useGetMoviesByPopularityQuery, useGetFilteredMoviesQuery } from "../MovieAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section, Grid, Card, Button, SkeletonGrid } from "../design-system/components";

const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  min-height: 100vh;
  padding-top: 80px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const PageTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.colors.accent.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  }
`;

const PageSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const FilterButton = styled(Button)`
  ${({ $active, theme }) => $active && `
    background: ${theme.colors.accent.primary.gradient};
    color: ${theme.colors.text.primary};
    box-shadow: ${theme.shadows.glow};
  `}
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  color: ${({ theme }) => theme.colors.accent.error};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const NoResultsContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const PopularMovieList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const genreParam = searchParams.get('genre');
  const [activeFilter, setActiveFilter] = useState("All");

  // Genre name to ID mapping
  const genreMap = {
    'action': '28',
    'comedy': '35',
    'drama': '18',
    'horror': '27',
    'scifi': '878',
    'sci-fi': '878'
  };

  // Set active filter based on URL parameter
  useEffect(() => {
    if (genreParam && genreMap[genreParam.toLowerCase()]) {
      const capitalizedGenre = genreParam.charAt(0).toUpperCase() + genreParam.slice(1);
      setActiveFilter(capitalizedGenre === 'Scifi' ? 'Sci-Fi' : capitalizedGenre);
    } else {
      setActiveFilter("All");
    }
  }, [genreParam]);

  // Determine which query to use based on active filter
  const shouldUseFiltered = activeFilter !== "All" && genreParam;
  const genreId = genreParam ? genreMap[genreParam.toLowerCase()] : '';

  // Use filtered query when genre is selected, otherwise use popularity query
  const popularQuery = useGetMoviesByPopularityQuery(undefined, { skip: shouldUseFiltered });
  const filteredQuery = useGetFilteredMoviesQuery(
    { year: '', genres: genreId },
    { skip: !shouldUseFiltered }
  );

  const { data, error, isLoading } = shouldUseFiltered ? filteredQuery : popularQuery;

  const filters = ["All", "Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

  if (error) {
    return (
      <PageContainer>
        <Container maxWidth="xl">
          <ErrorContainer>
            Error loading movies: {error.message || "Something went wrong"}
          </ErrorContainer>
        </Container>
      </PageContainer>
    );
  }

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  // Skip the first movie since it's in the hero
  const movies = data?.results.slice(1) || [];

  return (
    <PageContainer id="movies-section">
      <Container maxWidth="xl">
        <Section spacing="3xl">
          <PageHeader>
            <PageTitle
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Popular Movies <span>🔥</span>
            </PageTitle>
            <PageSubtitle
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover the most watched films from around the world
            </PageSubtitle>
          </PageHeader>

          <FilterContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filters.map((filter) => (
              <FilterButton
                key={filter}
                variant="ghost"
                size="sm"
                $active={activeFilter === filter}
                onClick={() => {
                  setActiveFilter(filter);
                  if (filter === "All") {
                    setSearchParams({});
                  } else {
                    setSearchParams({ genre: filter.toLowerCase().replace('-', '') });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </FilterButton>
            ))}
          </FilterContainer>

          {isLoading ? (
            <SkeletonGrid count={15} minWidth="250px" />
          ) : movies.length === 0 ? (
            <NoResultsContainer>
              No movies available at the moment
            </NoResultsContainer>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Grid minWidth="250px" gap="lg">
                  {movies.map((movie) => (
                    <motion.div
                      key={movie.id}
                      variants={itemVariants}
                      layout
                    >
                      <Card
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        title={movie.title}
                        subtitle={movie.release_date ? new Date(movie.release_date).getFullYear() : ''}
                        rating={movie.vote_average?.toFixed(1)}
                        description={movie.overview}
                        onClick={() => handleMovieClick(movie.id)}
                        badge={movie.vote_average >= 8 ? "TOP RATED" : movie.vote_average >= 7 ? "TRENDING" : null}
                        badgeVariant={
                          movie.vote_average >= 8 ? "success" : 
                          movie.vote_average >= 7 ? "warning" : 
                          "default"
                        }
                      />
                    </motion.div>
                  ))}
                </Grid>
              </motion.div>
            </AnimatePresence>
          )}
        </Section>
      </Container>
    </PageContainer>
  );
};

export default PopularMovieList;