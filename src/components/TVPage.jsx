import React from "react";
import { useGetTVShowsByPopularityQuery } from "../MovieAPI/TvApi"; // Adjust the path accordingly

const TVShowsList = () => {
  const { data, error, isLoading } = useGetTVShowsByPopularityQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Popular TV Shows</h1>
      <ul>
        {data.results.map((tvShow) => (
          <li key={tvShow.id}>
            <h2>{tvShow.name}</h2>
            <p>{tvShow.overview}</p>
            <p>Rating: {tvShow.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TVShowsList;
