import React from "react";
import { Routes, Route } from "react-router-dom";
import PopularMovieList from "./components/MoviePage";
import TopNav from "./components/NavBar";
import Sidebar from "./components/SideNav";
import Hero from "./components/Hero";
import SingleMovie from "./components/SingleMovie";
import LoginPage from "./components/LogIn";
import Footer from "./components/Footer";
import TVShowsList from "./components/TVPage";
import SingleTvShow from "./components/SingleTvShow"

function App() {
  return (
    <>
      <TopNav />
      <Sidebar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <PopularMovieList />
            </>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <>
              <SingleMovie />
            </>
          }
        />


<Route
          path="/tv/:id"
          element={
            <>
              <SingleTvShow  />
            </>
          }
        />


        <Route
          path="/logIn"
          element={
            <>
              <LoginPage />
            </>
          }
        />

        <Route />

        <Route
          path="/tv"
          element={
            <>
              <TVShowsList />
            </>
          }
        />

        <Route />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
