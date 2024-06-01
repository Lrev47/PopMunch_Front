import React from "react";
import { useParams } from "react-router-dom";
import { useGetTVShowByIdQuery } from "../MovieAPI/TvApi";

const SingleTvShow = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetTVShowByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="single-tvshow-container">
      <div className="tvshow-header">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.name}
        />
        <div className="tvshow-info">
          <h1>{data.name}</h1>
          <p>{data.overview}</p>
          <p>
            <strong>First Air Date:</strong> {data.first_air_date}
          </p>
          <p>
            <strong>Last Air Date:</strong> {data.last_air_date}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Number of Seasons:</strong> {data.number_of_seasons}
          </p>
          <p>
            <strong>Number of Episodes:</strong> {data.number_of_episodes}
          </p>
          <p>
            <strong>Average Episode Run Time:</strong>{" "}
            {data.episode_run_time.join(", ")} minutes
          </p>
        </div>
      </div>

      <div className="additional-info">
        <div className="collection">
          <h2>Creators</h2>
          <ul>
            {data.created_by.map((creator) => (
              <li key={creator.id}>{creator.name}</li>
            ))}
          </ul>

          <h2>Genres</h2>
          <ul>
            {data.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>

        <div className="production">
          <h2>Production</h2>
          <ul>
            {data.production_companies.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>

          <h2>Languages</h2>
          <p>
            <strong>Original Language:</strong> {data.original_language}
          </p>
          <p>
            <strong>Spoken Languages:</strong>
          </p>
          <ul>
            {data.spoken_languages.map((language, index) => (
              <li key={index}>{language.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="additional-info">
        <div className="collection">
          <h2>Other Information</h2>
          <p>
            <strong>Homepage:</strong>{" "}
            <a href={data.homepage} target="_blank" rel="noopener noreferrer">
              {data.homepage}
            </a>
          </p>
          <p>
            <strong>Tagline:</strong> {data.tagline}
          </p>
          <p>
            <strong>Rating:</strong> {data.vote_average}
          </p>
          <p>
            <strong>Vote Count:</strong> {data.vote_count}
          </p>
          <p>
            <strong>Popularity:</strong> {data.popularity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTvShow;
