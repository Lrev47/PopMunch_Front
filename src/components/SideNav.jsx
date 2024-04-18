import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../StateManagment/websiteSlice";

function SideBar() {
  const isSidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();

  const sidebarStyle = {
    height: "100%",
    width: isSidebarOpen ? "500px" : "0",
    position: "fixed",
    zIndex: 1,
    top: 0,
    right: 0,
    backgroundColor: "#111",
    overflowX: "hidden",
    transition: "width 0.5s, opacity 0.5s, visibility 0.5s",
    padding: "10px 20px",
    opacity: isSidebarOpen ? 1 : 0,
    visibility: isSidebarOpen ? "visible" : "hidden",
  };
  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
  };

  return (
    <div style={sidebarStyle}>
      <button
        style={closeButtonStyle}
        onClick={() => dispatch(toggleSidebar())}
      >
        &#x2715; {/* Unicode multiplication sign (X symbol) */}
      </button>
      <h1>Sidebar Content</h1>
      <p>Place any content here that should appear in the sidebar.</p>
    </div>
  );
}

export default SideBar;
