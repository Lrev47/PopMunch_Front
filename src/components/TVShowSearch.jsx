import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  useGetFilteredTVShowsQuery,
  useGetGenresQuery,
} from "../MovieAPI/TvApi";
import { Container, LoadingSpinner } from "../design-system/components";

const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SearchContainer = styled(Container)`
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.xl};
`;

const SearchHeader = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  background: ${({ theme }) => theme.colors.accent.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`;

const SearchForm = styled(motion.form)`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent.primary.start}66;
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.primary.start};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent.primary.start}1A;
  }
  
  option {
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-style: italic;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.accent.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const ResultsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

const TVShowGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const TVShowCard = styled(motion.div)`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.secondary};
  transition: all ${({ theme }) => theme.transitions.duration.base};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.duration.base};
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    
    &::before {
      opacity: 1;
    }
    
    img {
      transform: scale(1.05);
    }
    
    .content {
      background: ${({ theme }) => theme.colors.background.tertiary};
    }
  }
`;

const TVShowPoster = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.duration.base};
  }
  
  .rating {
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.background.glass};
    backdrop-filter: blur(${({ theme }) => theme.blur.sm});
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: ${({ theme }) => theme.colors.accent.gold};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }
  
  .seasons {
    position: absolute;
    bottom: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.accent.primary.start};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

const TVShowContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  transition: background ${({ theme }) => theme.transitions.duration.base};
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

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
    <PageContainer>
      <SearchContainer maxWidth="xl">
        <SearchHeader>Search TV Shows</SearchHeader>
        
        <SearchForm
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FormGroup>
            <Label>Year:</Label>
            <Select name="year" value={searchParams.year} onChange={handleChange}>
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Genres:</Label>
            {genreLoading ? (
              <LoadingText>Loading genres...</LoadingText>
            ) : genreError ? (
              <ErrorText>Error loading genres</ErrorText>
            ) : (
              <Select
                name="genres"
                value={searchParams.genres}
                onChange={handleChange}
              >
                <option value="">Select Genre</option>
                {genreData?.genres?.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Select>
            )}
          </FormGroup>
        </SearchForm>

        <ResultsContainer>
          {isLoading && <LoadingSpinner />}
          {error && <ErrorText>Error: {error.message}</ErrorText>}
          
          {data && data.results && data.results.length > 0 ? (
            <TVShowGrid
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {data.results.map((tvshow, index) => (
                <TVShowCard
                  key={tvshow.id}
                  onClick={() => handleClick(tvshow.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TVShowPoster>
                    {tvshow.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                        alt={tvshow.name}
                      />
                    ) : (
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        background: 'linear-gradient(to bottom, #252525, #1A1A1A)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6B7280'
                      }}>
                        No Image
                      </div>
                    )}
                    {tvshow.vote_average > 0 && (
                      <div className="rating">
                        <span>⭐</span>
                        {tvshow.vote_average.toFixed(1)}
                      </div>
                    )}
                    {tvshow.first_air_date && (
                      <div className="seasons">
                        {new Date(tvshow.first_air_date).getFullYear()}
                      </div>
                    )}
                  </TVShowPoster>
                  <TVShowContent className="content">
                    <h3>{tvshow.name}</h3>
                    <p>{tvshow.overview || "No overview available"}</p>
                  </TVShowContent>
                </TVShowCard>
              ))}
            </TVShowGrid>
          ) : (
            data && !isLoading && (
              <NoResults>
                No TV shows found matching your criteria
              </NoResults>
            )
          )}
        </ResultsContainer>
      </SearchContainer>
    </PageContainer>
  );
};

export default TVShowSearch;
