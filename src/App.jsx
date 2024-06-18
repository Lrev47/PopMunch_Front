import React from "react";
import { Routes, Route } from "react-router-dom";
import PopularMovieList from "./components/MoviePage";
import TopNav from "./components/NavBar";
import Sidebar from "./components/SideNav";
import MovieHero from "./components/MovieHero";
import SingleMovie from "./components/SingleMovie";
import TVHero from "./components/TVHero";
import Footer from "./components/Footer";
import TVShowsList from "./components/TVPage";
import SingleTvShow from "./components/SingleTvShow";
import CollectionDetails from "./components/collections";
import LandingPage from "./components/LandingPage";
import MainHero from "./components/MainHero";
import MovieSearch from "./components/MovieSearch";
import TVShowSearch from "./components/TVShowSearch";

function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainHero />
              <Sidebar />
              <LandingPage />
            </>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <>
              <Sidebar />
              <SingleMovie />
            </>
          }
        />
        <Route
          path="/tv/:id"
          element={
            <>
              <Sidebar />
              <SingleTvShow />
            </>
          }
        />
        <Route
          path="/logIn"
          element={
            <>
              <Sidebar />
            </>
          }
        />
        <Route
          path="/tv"
          element={
            <>
              <TVHero />
              <Sidebar />
              <TVShowsList />
              <TVShowSearch />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Sidebar />
              <MovieHero />
              <PopularMovieList />
              <MovieSearch />
            </>
          }
        />
        <Route
          path="/collections/:id"
          element={
            <>
              <Sidebar />
              <CollectionDetails />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
