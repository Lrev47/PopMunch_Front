import { useGetMoviesByPopularityQuery } from "../MovieAPI";
import { useNavigate } from "react-router-dom";

const PopularMovieList = () => {
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data || !data.results.length) {
    return <div>No movies available</div>;
  }

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  const movies = data.results.slice(1);

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-header">Popular Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => handleClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovieList;
