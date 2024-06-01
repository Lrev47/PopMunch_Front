import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../StateManagment/websiteSlice";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const isSidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    dispatch(toggleSidebar());
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button
        className="close-button"
        onClick={() => dispatch(toggleSidebar())}
      >
        &#x2715;
      </button>
      <h1>Navigation Menu</h1>
      <ul className="sidebar-links">
        <li onClick={() => handleNavigation("/movies")}>Movie Section</li>
        <li onClick={() => handleNavigation("/tv")}>TV Section</li>
      </ul>
    </div>
  );
}

export default SideBar;
