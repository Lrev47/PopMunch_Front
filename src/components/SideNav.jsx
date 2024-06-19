import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../StateManagment/websiteSlice";
import { useNavigate, useLocation } from "react-router-dom";

function SideBar() {
  const isSidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const handleNavigation = (path) => {
    dispatch(toggleSidebar());
    navigate(path);
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
