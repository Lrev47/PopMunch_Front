import React from "react";
import HomePage from "./components/HomePage";
import TopNav from "./components/NavBar";
import Sidebar from "./components/SideNav";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <TopNav />
      <Sidebar />
      <HomePage />
    </>
  );
}
export default App;
