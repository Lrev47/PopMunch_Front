import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGetTVShowByIdQuery } from "../MovieAPI/TvApi";
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

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const MetaCard = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  
  .label {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.tertiary};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  .value {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const InfoColumn = styled.div``;

const InfoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const InfoItem = styled.li`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.text.muted}33;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.transitions.duration.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent.secondary};
    border-color: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const StatsCard = styled(motion.div)`
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
  
  .value {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    
    &.rating {
      color: ${({ theme }) => theme.colors.accent.gold};
    }
  }
  
  .subtext {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.tertiary};
    margin-top: ${({ theme }) => theme.spacing.xs};
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

const SingleTvShow = () => {
  const { id } = useParams();
  const { data: tvShow, error, isLoading } = useGetTVShowByIdQuery(id);

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

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <PageContainer>
      {tvShow.backdrop_path && (
        <BackdropSection>
          <BackdropImage
            src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
            alt={tvShow.name}
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
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
            />
          </PosterWrapper>
          
          <Details>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Title>{tvShow.name}</Title>
              
              {tvShow.tagline && (
                <Tagline>{tvShow.tagline}</Tagline>
              )}
              
              <MetaGrid>
                <MetaCard>
                  <div className="label">First Air Date</div>
                  <div className="value">{formatDate(tvShow.first_air_date)}</div>
                </MetaCard>
                
                <MetaCard>
                  <div className="label">Status</div>
                  <div className="value">{tvShow.status}</div>
                </MetaCard>
                
                <MetaCard>
                  <div className="label">Seasons</div>
                  <div className="value">{tvShow.number_of_seasons}</div>
                </MetaCard>
                
                <MetaCard>
                  <div className="label">Episodes</div>
                  <div className="value">{tvShow.number_of_episodes}</div>
                </MetaCard>
              </MetaGrid>
              
              <Overview>{tvShow.overview}</Overview>
              
              <ButtonGroup>
                {tvShow.homepage && (
                  <Button
                    as="a"
                    href={tvShow.homepage}
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

            <InfoGrid>
              <InfoColumn>
                {tvShow.created_by && tvShow.created_by.length > 0 && (
                  <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <SectionTitle>Creators</SectionTitle>
                    <InfoList>
                      {tvShow.created_by.map((creator) => (
                        <InfoItem key={creator.id}>{creator.name}</InfoItem>
                      ))}
                    </InfoList>
                  </Section>
                )}

                {tvShow.genres && tvShow.genres.length > 0 && (
                  <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <SectionTitle>Genres</SectionTitle>
                    <InfoList>
                      {tvShow.genres.map((genre) => (
                        <InfoItem key={genre.id}>{genre.name}</InfoItem>
                      ))}
                    </InfoList>
                  </Section>
                )}
              </InfoColumn>

              <InfoColumn>
                {tvShow.production_companies && tvShow.production_companies.length > 0 && (
                  <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <SectionTitle>Production</SectionTitle>
                    <InfoList>
                      {tvShow.production_companies.map((company) => (
                        <InfoItem key={company.id}>{company.name}</InfoItem>
                      ))}
                    </InfoList>
                  </Section>
                )}

                {tvShow.spoken_languages && tvShow.spoken_languages.length > 0 && (
                  <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <SectionTitle>Languages</SectionTitle>
                    <InfoList>
                      {tvShow.spoken_languages.map((language, index) => (
                        <InfoItem key={index}>{language.name}</InfoItem>
                      ))}
                    </InfoList>
                  </Section>
                )}
              </InfoColumn>
            </InfoGrid>

            <Section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <SectionTitle>Statistics</SectionTitle>
              <MetaGrid>
                <StatsCard
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4>Rating</h4>
                  <div className="value rating">★ {tvShow.vote_average?.toFixed(1)}</div>
                  <div className="subtext">{tvShow.vote_count} votes</div>
                </StatsCard>
                
                <StatsCard
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4>Popularity</h4>
                  <div className="value">{tvShow.popularity?.toFixed(0)}</div>
                </StatsCard>
                
                {tvShow.episode_run_time && tvShow.episode_run_time.length > 0 && (
                  <StatsCard
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4>Episode Runtime</h4>
                    <div className="value">{tvShow.episode_run_time.join(", ")} min</div>
                  </StatsCard>
                )}
                
                {tvShow.last_air_date && (
                  <StatsCard
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4>Last Air Date</h4>
                    <div className="value">{formatDate(tvShow.last_air_date)}</div>
                  </StatsCard>
                )}
              </MetaGrid>
            </Section>
          </Details>
        </ContentGrid>
      </ContentSection>
    </PageContainer>
  );
};

export default SingleTvShow;