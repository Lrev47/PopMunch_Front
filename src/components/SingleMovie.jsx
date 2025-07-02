import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGetMovieByIdQuery } from "../MovieAPI";
import { Container, Button, LoadingSpinner } from "../design-system/components";

const PageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  min-height: 100vh;
  padding-top: 80px;
`;

const BackdropSection = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(10, 14, 26, 0.3) 0%,
      rgba(10, 14, 26, 0.7) 60%,
      ${({ theme }) => theme.colors.background.primary} 100%
    );
    z-index: 1;
  }
`;

const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ContentSection = styled(Container)`
  position: relative;
  margin-top: -200px;
  z-index: 2;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: start;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const PosterWrapper = styled(motion.div)`
  position: sticky;
  top: 100px;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
`;

const Details = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  }
`;

const Tagline = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  &::before { content: '"'; }
  &::after { content: '"'; }
`;

const MetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  
  span:first-child {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const Overview = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.accent};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const GenreTag = styled(motion.span)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.transitions.duration.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    border-color: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const CollectionCard = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  img {
    width: 100px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

const CompanyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const CompanyCard = styled.div`
  text-align: center;
  
  .logo-container {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.background.glass};
    backdrop-filter: blur(${({ theme }) => theme.blur.sm});
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    
    img {
      max-width: 100%;
      max-height: 60px;
      filter: brightness(0.9);
    }
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    
    &.country {
      color: ${({ theme }) => theme.colors.text.tertiary};
      font-size: ${({ theme }) => theme.typography.fontSize.xs};
    }
  }
`;

const FinancialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FinancialCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    background: ${({ theme }) => theme.colors.accent.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.accent.error};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

function SingleMovie() {
  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingSpinner fullScreen />
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

  const handleCollectionClick = (id) => {
    navigate(`/collections/${id}`);
  };

  // Format movie runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format release date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <PageContainer>
      {movie.backdrop_path && (
        <BackdropSection>
          <BackdropImage
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
        </BackdropSection>
      )}
      
      <ContentSection maxWidth="xl">
        <ContentGrid>
          <PosterWrapper
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Poster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </PosterWrapper>
          
          <Details>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Title>{movie.title}</Title>
              
              {movie.tagline && (
                <Tagline>{movie.tagline}</Tagline>
              )}
              
              <MetaContainer>
                {movie.release_date && (
                  <MetaItem>
                    <span>📅</span> {formatDate(movie.release_date)}
                  </MetaItem>
                )}
                
                {movie.runtime > 0 && (
                  <MetaItem>
                    <span>⏱️</span> {formatRuntime(movie.runtime)}
                  </MetaItem>
                )}
                
                {movie.vote_average > 0 && (
                  <MetaItem>
                    <span>⭐</span> {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
                  </MetaItem>
                )}
                
                {movie.status && (
                  <MetaItem>
                    <span>🎬</span> {movie.status}
                  </MetaItem>
                )}
              </MetaContainer>
              
              <Overview>{movie.overview}</Overview>
              
              <ButtonGroup>
                {movie.homepage && (
                  <Button
                    as="a"
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="lg"
                  >
                    <span>🔗</span> Official Website
                  </Button>
                )}
              </ButtonGroup>
            </motion.div>
          
            {movie.genres && movie.genres.length > 0 && (
              <Section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <SectionTitle>Genres</SectionTitle>
                <GenreList>
                  {movie.genres.map((genre) => (
                    <GenreTag
                      key={genre.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {genre.name}
                    </GenreTag>
                  ))}
                </GenreList>
              </Section>
            )}
          
            {movie.belongs_to_collection && (
              <Section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <SectionTitle>Part of a Collection</SectionTitle>
                <CollectionCard
                  onClick={() => handleCollectionClick(movie.belongs_to_collection.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {movie.belongs_to_collection.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.belongs_to_collection.poster_path}`}
                      alt={movie.belongs_to_collection.name}
                    />
                  )}
                  <div>
                    <h4>{movie.belongs_to_collection.name}</h4>
                    <p>Click to explore the complete collection</p>
                  </div>
                </CollectionCard>
              </Section>
            )}
          
            {movie.production_companies && movie.production_companies.length > 0 && (
              <Section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <SectionTitle>Production Companies</SectionTitle>
                <CompanyGrid>
                  {movie.production_companies.map((company) => (
                    <CompanyCard key={company.id}>
                      <div className="logo-container">
                        {company.logo_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                          />
                        ) : (
                          <span>No Logo</span>
                        )}
                      </div>
                      <p>{company.name}</p>
                      {company.origin_country && (
                        <p className="country">{company.origin_country}</p>
                      )}
                    </CompanyCard>
                  ))}
                </CompanyGrid>
              </Section>
            )}
          
            {(movie.budget > 0 || movie.revenue > 0) && (
              <Section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <SectionTitle>Financial</SectionTitle>
                <FinancialGrid>
                  {movie.budget > 0 && (
                    <FinancialCard
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4>Budget</h4>
                      <p>{formatCurrency(movie.budget)}</p>
                    </FinancialCard>
                  )}
                  {movie.revenue > 0 && (
                    <FinancialCard
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4>Revenue</h4>
                      <p>{formatCurrency(movie.revenue)}</p>
                    </FinancialCard>
                  )}
                </FinancialGrid>
              </Section>
            )}
          </Details>
        </ContentGrid>
      </ContentSection>
    </PageContainer>
  );
}

export default SingleMovie;
