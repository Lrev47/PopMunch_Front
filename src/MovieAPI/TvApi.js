import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.themoviedb.org/3";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzI5ZDgyYzYyZWVlMGM5MmViZGMwZDNlODRhOGVkOCIsInN1YiI6IjY2MTQ5M2IxOTgyZjc0MDE3ZTYwOThiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WqlUSnnJyMSv-E0NRBtgzI12s1TYceGk0F7AABQ1rFM";

export const TVShowsApi = createApi({
  reducerPath: "TVShowsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTVShowsByPopularity: builder.query({
      query: () =>
        "/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=en",
    }),
    getTVShowById: builder.query({
      query: (tvShowId) => `/tv/${tvShowId}`,
    }),
  }),
});

export const { useGetTVShowsByPopularityQuery, useGetTVShowByIdQuery } =
  TVShowsApi;
