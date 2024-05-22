import { useGetMoviesByPopularityQuery } from "../MovieAPI";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { data, error, isLoading } = useGetMoviesByPopularityQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  // Ensure data.results is defined and has at least one movie
  const movie = data?.results?.[0];

  if (!movie) {
    return <div>No movies available</div>;
  }

  const handelClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  // Convert the vote_average to a percentage and format it to two decimal places
  const ratingPercentage = ((movie.vote_average / 10) * 100).toFixed(2);

  return (
    <div className="HeroSection">
      <img
        className="MoviePoster"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
        onClick={handelClick}
      />
      <img
        className="MovieBackdrop"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={`Backdrop for ${movie.title}`}
      />
      <div className="HeroInfoDiv">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div>
          <strong>Rating:</strong>
          <progress value={ratingPercentage} max="100"></progress>
          <span>{ratingPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
