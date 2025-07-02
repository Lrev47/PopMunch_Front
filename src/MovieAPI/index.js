import {
  useGetMoviesByPopularityQuery,
  useGetMovieByIdQuery,
  useGetCollectionByIdQuery,
  useGetFilteredMoviesQuery,
  useGetGenresQuery,
} from "./movieApi";
import { 
  useGetTVShowsByPopularityQuery, 
  useGetTVShowByIdQuery,
  useGetFilteredTVShowsQuery,
  useGetGenresQuery as useGetTVGenresQuery,
} from "./TvApi";

export {
  useGetMoviesByPopularityQuery,
  useGetMovieByIdQuery,
  useGetCollectionByIdQuery,
  useGetFilteredMoviesQuery,
  useGetGenresQuery,
  useGetTVShowsByPopularityQuery,
  useGetTVShowByIdQuery,
  useGetFilteredTVShowsQuery,
  useGetTVGenresQuery,
};
