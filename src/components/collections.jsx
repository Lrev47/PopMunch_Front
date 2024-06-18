import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCollectionByIdQuery } from "../MovieAPI";

const CollectionDetails = () => {
  const { id } = useParams();
  const { data: collection, error, isLoading } = useGetCollectionByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  console.log(collection);

  return (
    <div className="collection-container">
      <div className="collection-header">
        <img
          src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
          alt={collection.name}
        />
        <div className="collection-info">
          <h1>{collection.name}</h1>
          <p>{collection.overview}</p>
        </div>
      </div>
      <div className="collection-movies">
        <h2>Movies in this Collection</h2>
        <ul>
          {collection.parts.map((movie) => (
            <li key={movie.id} onClick={() => handleClick(movie.id)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <p>{movie.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollectionDetails;
