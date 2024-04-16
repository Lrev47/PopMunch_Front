import { configureStore } from "@reduxjs/toolkit";
import { MovieApi } from "../MovieAPI/movieApi";
import uiReducer from "./websiteSlice";
export const store = configureStore({
  reducer: {
    [MovieApi.reducerPath]: MovieApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MovieApi.middleware),
});

export default store;
