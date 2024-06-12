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
    getFilteredTVShows: builder.query({
      query: ({ startDate, endDate, genres, minVoteCount, region, watchProviders }) => 
        `/discover/tv?air_date.gte=${startDate}&air_date.lte=${endDate}&with_genres=${genres}&vote_count.gte=${minVoteCount}&region=${region}&with_watch_providers=${watchProviders}&watch_region=${region}&include_adult=false&language=en-US&page=1`,
    }),
    getGenres: builder.query({
      query: () => `/genre/tv/list?language=en-US`,
    }),
    getRegions: builder.query({
      query: () => `/watch/providers/regions?language=en-US`,
    }),
    getWatchProviders: builder.query({
      query: () => `/watch/providers/tv?language=en-US`,
    }),
  }),
});

export const { 
  useGetTVShowsByPopularityQuery, 
  useGetTVShowByIdQuery, 
  useGetFilteredTVShowsQuery,
  useGetGenresQuery,
  useGetRegionsQuery,
  useGetWatchProvidersQuery 
} = TVShowsApi;
