import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import TopNav from "./components/NavBar";
import Sidebar from "./components/SideNav";
import Hero from "./components/Hero";
import SingleMovie from "./components/SingleMovie"
function App() {
  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <TopNav />
              <Sidebar />
              <Hero />
              <HomePage />
            </>
          }

        />
        <Route path="/movie/:id"
        element={
          <>
          <TopNav/>
          <Sidebar/>
          <SingleMovie/>
          </>
        }
        />
      </Routes>
    </>
  );
}

export default App;
