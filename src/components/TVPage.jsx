import React, { useState, useEffect } from "react";
import { useGetTVShowsByPopularityQuery, useGetFilteredTVShowsQuery } from "../MovieAPI";
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
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent.secondary} 0%,
    ${({ theme }) => theme.colors.accent.primary.end} 100%
  );
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
    background: linear-gradient(135deg, ${theme.colors.accent.secondary} 0%, ${theme.colors.accent.primary.end} 100%);
    color: ${theme.colors.text.primary};
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
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

const TVShowsList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const genreParam = searchParams.get('genre');
  const [activeFilter, setActiveFilter] = useState("All");

  // TV genre name to ID mapping (TV genres have different IDs than movies)
  const genreMap = {
    'drama': '18',
    'comedy': '35',
    'action': '10759',  // Action & Adventure for TV
    'thriller': '9648',  // Mystery for TV (closest match)
    'scifi': '10765',   // Sci-Fi & Fantasy for TV
    'sci-fi': '10765',
    'horror': '9648'    // Mystery (horror not a standard TV genre)
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
  const popularQuery = useGetTVShowsByPopularityQuery(undefined, { skip: shouldUseFiltered });
  const filteredQuery = useGetFilteredTVShowsQuery(
    { year: '', genres: genreId },
    { skip: !shouldUseFiltered }
  );

  const { data, error, isLoading } = shouldUseFiltered ? filteredQuery : popularQuery;

  const filters = ["All", "Drama", "Comedy", "Action", "Thriller", "Sci-Fi"];

  const handleClick = (id) => {
    navigate(`/tv/${id}`);
  };

  if (error) {
    return (
      <PageContainer>
        <Container maxWidth="xl">
          <ErrorContainer>
            Error loading TV shows: {error.message || "Something went wrong"}
          </ErrorContainer>
        </Container>
      </PageContainer>
    );
  }

  // Skip the first TV show since it might be in the hero
  const tvShows = data?.results.slice(1) || [];

  return (
    <PageContainer id="tv-section">
      <Container maxWidth="xl">
        <Section spacing="3xl">
          <PageHeader>
            <PageTitle
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Popular TV Shows <span>📺</span>
            </PageTitle>
            <PageSubtitle
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Binge-worthy series everyone's streaming right now
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
          ) : tvShows.length === 0 ? (
            <NoResultsContainer>
              No TV shows available at the moment
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
                  {tvShows.map((tvShow) => (
                    <motion.div
                      key={tvShow.id}
                      variants={itemVariants}
                      layout
                    >
                      <Card
                        image={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                        title={tvShow.name}
                        subtitle={tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : ''}
                        rating={tvShow.vote_average?.toFixed(1)}
                        description={tvShow.overview}
                        onClick={() => handleClick(tvShow.id)}
                        badge={tvShow.vote_average >= 8 ? "TOP RATED" : tvShow.vote_average >= 7 ? "TRENDING" : null}
                        badgeVariant={
                          tvShow.vote_average >= 8 ? "success" : 
                          tvShow.vote_average >= 7 ? "warning" : 
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

export default TVShowsList;