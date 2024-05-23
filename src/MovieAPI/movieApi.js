import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.themoviedb.org/3";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzI5ZDgyYzYyZWVlMGM5MmViZGMwZDNlODRhOGVkOCIsInN1YiI6IjY2MTQ5M2IxOTgyZjc0MDE3ZTYwOThiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WqlUSnnJyMSv-E0NRBtgzI12s1TYceGk0F7AABQ1rFM";

export const MovieApi = createApi({
  reducerPath: "MovieApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMoviesByPopularity: builder.query({
      query: () =>
        "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=en",
    }),
    getMovieById: builder.query({
      query: (movieId) => `/movie/${movieId}`,
    }),
  
  getCollectionById: builder.query({
    query:(collectionId) => `/collection/${collectionId}`,
  }),
  }),
});

export const { useGetMoviesByPopularityQuery, useGetMovieByIdQuery, useGetCollectionByIdQuery } = MovieApi;