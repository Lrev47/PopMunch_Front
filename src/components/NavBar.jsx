import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toggleSidebar } from "../StateManagment/websiteSlice";

function TopNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 20) {
          navRef.current.classList.add("sticky");
        } else {
          navRef.current.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handelToggleSideBar = () => {
    dispatch(toggleSidebar());
  };

  const returnHomeOnClick = () => {
    navigate("/");
  };

  return (
    <div ref={navRef} className="TopNav">
      <img
        onClick={returnHomeOnClick}
        className="WebsiteLogo"
        alt="PopMunch Logo"
        src="https://imagizer.imageshack.com/img922/3152/npjpsD.png"
      />
      
      <nav className="nav-links">
        <Link to="/" className="animated-link">Home</Link>
        <Link to="/movies" className="animated-link">Movies</Link>
        <Link to="/tv" className="animated-link">TV Shows</Link>
      </nav>
      
      <input 
        type="search" 
        className="searchBar" 
        placeholder="Search for movies, TV shows..." 
      />
      
      <button className="LogInButton">Sign In</button>
      
      <div className="HamburgerMenu" onClick={handelToggleSideBar}>
        <div className="lines"></div>
        <div className="lines"></div>
        <div className="lines"></div>
      </div>
    </div>
  );
}

export default TopNav;
