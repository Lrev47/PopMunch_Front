import React from "react";
import { Routes, Route } from "react-router-dom";
import PopularMovieList from "./components/HomePage";
import TopNav from "./components/NavBar";
import Sidebar from "./components/SideNav";
import Hero from "./components/Hero";
import SingleMovie from "./components/SingleMovie";
import LoginPage from "./components/LogIn";
import Footer from "./components/Footer";

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
          path="/logIn"
          element={
            <>
              <LoginPage />
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
