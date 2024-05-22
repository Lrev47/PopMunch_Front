import { configureStore } from "@reduxjs/toolkit";
import { MovieApi } from "../MovieAPI/movieApi";
import uiReducer from "./websiteSlice";
import { TVShowsApi } from "../MovieAPI/TvApi";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [MovieApi.reducerPath]: MovieApi.reducer,
    [TVShowsApi.reducerPath]: TVShowsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MovieApi.middleware, TVShowsApi.middleware),
});

export default store;
