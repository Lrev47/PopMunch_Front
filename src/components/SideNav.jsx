import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../StateManagment/websiteSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);

  const closeSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">PopMunch</h2>
        <button className="close-button" onClick={closeSidebar}>
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item" onClick={closeSidebar}>
          <span className="nav-item-icon">🏠</span>
          Home
        </Link>
        <Link to="/movies" className="nav-item" onClick={closeSidebar}>
          <span className="nav-item-icon">🎬</span>
          Movies
        </Link>
        <Link to="/tv" className="nav-item" onClick={closeSidebar}>
          <span className="nav-item-icon">📺</span>
          TV Shows
        </Link>
        <Link to="/logIn" className="nav-item" onClick={closeSidebar}>
          <span className="nav-item-icon">👤</span>
          Profile
        </Link>
      </nav>
      
      <div className="sidebar-section">
        <h3 style={{marginBottom: '1rem', color: 'var(--secondary-color)'}}>Categories</h3>
        <Link to="/movies?genre=action" className="nav-item" onClick={closeSidebar}>Action</Link>
        <Link to="/movies?genre=comedy" className="nav-item" onClick={closeSidebar}>Comedy</Link>
        <Link to="/movies?genre=drama" className="nav-item" onClick={closeSidebar}>Drama</Link>
        <Link to="/movies?genre=horror" className="nav-item" onClick={closeSidebar}>Horror</Link>
      </div>

      <div className="sidebar-section">
        <button className="sidebar-button">Sign In</button>
      </div>
    </div>
  );
}

export default Sidebar;
