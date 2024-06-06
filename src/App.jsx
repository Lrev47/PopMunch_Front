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

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainHero />
              <TopNav />
              <Sidebar />
              <LandingPage />
            </>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <>
              <TopNav />
              <Sidebar />
              <SingleMovie />
            </>
          }
        />
        <Route
          path="/tv/:id"
          element={
            <>
              <TopNav />
              <Sidebar />
              <SingleTvShow />
            </>
          }
        />
        <Route
          path="/logIn"
          element={
            <>
              <TopNav />
              <Sidebar />
            </>
          }
        />
        <Route
          path="/tv"
          element={
            <>
              <TopNav />
              <TVHero />
              <Sidebar />
              <TVShowsList />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <TopNav />
              <Sidebar />
              <MovieHero />
              <PopularMovieList />
            </>
          }
        />
        <Route
          path="/collections/:id"
          element={
            <>
              <TopNav />
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
