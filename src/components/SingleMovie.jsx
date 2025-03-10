import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetMovieByIdQuery } from "../MovieAPI";

function SingleMovie() {
  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="single-movie-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="single-movie-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--accent-color)' }}>
          <p>Error: {error.message}</p>
        </div>
      </div>
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
    <div className="single-movie-container">
      <div 
        className="single-movie-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      ></div>
      
      <div className="single-movie-content">
        <div className="single-movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        
        <div className="single-movie-details">
          <h1 className="single-movie-title">{movie.title}</h1>
          
          {movie.tagline && (
            <div className="single-movie-tagline">"{movie.tagline}"</div>
          )}
          
          <div className="single-movie-meta">
            {movie.release_date && (
              <div className="single-movie-meta-item">
                <span>📅</span> {formatDate(movie.release_date)}
              </div>
            )}
            
            {movie.runtime > 0 && (
              <div className="single-movie-meta-item">
                <span>⏱️</span> {formatRuntime(movie.runtime)}
              </div>
            )}
            
            {movie.vote_average > 0 && (
              <div className="single-movie-meta-item">
                <span>⭐</span> {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
              </div>
            )}
            
            {movie.status && (
              <div className="single-movie-meta-item">
                <span>🎬</span> {movie.status}
              </div>
            )}
          </div>
          
          <p className="single-movie-overview">{movie.overview}</p>
          
          <div className="single-movie-actions">
            {movie.homepage && (
              <a 
                href={movie.homepage} 
                target="_blank" 
                rel="noopener noreferrer"
                className="single-movie-button primary"
              >
                <span>🔗</span> Official Website
              </a>
            )}
            
            <button className="single-movie-button secondary">
              <span>❤️</span> Add to Favorites
            </button>
          </div>
          
          {movie.genres && movie.genres.length > 0 && (
            <div className="single-movie-section">
              <h3 className="single-movie-section-title">Genres</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {movie.genres.map((genre) => (
                  <span 
                    key={genre.id}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      backgroundColor: 'var(--card-bg)', 
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: '0.9rem'
                    }}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {movie.belongs_to_collection && (
            <div className="single-movie-section">
              <h3 className="single-movie-section-title">Part of a Collection</h3>
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '1.5rem', 
                  alignItems: 'center', 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '1rem', 
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer'
                }}
                onClick={() => handleCollectionClick(movie.belongs_to_collection.id)}
              >
                {movie.belongs_to_collection.poster_path && (
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${movie.belongs_to_collection.poster_path}`} 
                    alt={movie.belongs_to_collection.name}
                    style={{ width: '100px', borderRadius: 'var(--border-radius-sm)' }}
                  />
                )}
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>{movie.belongs_to_collection.name}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--secondary-color)' }}>
                    Click to explore the complete collection
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="single-movie-section">
              <h3 className="single-movie-section-title">Production Companies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {movie.production_companies.map((company) => (
                  <div key={company.id} style={{ textAlign: 'center', maxWidth: '120px' }}>
                    {company.logo_path ? (
                      <div style={{ 
                        height: '60px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '60px',
                            background: 'rgba(255, 255, 255, 0.1)', 
                            padding: '8px', 
                            borderRadius: 'var(--border-radius-sm)'
                          }}
                        />
                      </div>
                    ) : (
                      <div style={{ 
                        height: '60px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--border-radius-sm)'
                      }}>
                        <span>No Logo</span>
                      </div>
                    )}
                    <p style={{ fontSize: '0.9rem' }}>
                      {company.name}
                    </p>
                    {company.origin_country && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--secondary-color)' }}>
                        {company.origin_country}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {(movie.budget > 0 || movie.revenue > 0) && (
            <div className="single-movie-section">
              <h3 className="single-movie-section-title">Financial</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem' 
              }}>
                <div style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '1rem', 
                  borderRadius: 'var(--border-radius-md)' 
                }}>
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Budget</h4>
                  <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{formatCurrency(movie.budget)}</p>
                </div>
                <div style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  padding: '1rem', 
                  borderRadius: 'var(--border-radius-md)' 
                }}>
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Revenue</h4>
                  <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{formatCurrency(movie.revenue)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;
