import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "./path/to/uiSlice";

const SidebarToggle = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <button onClick={() => dispatch(toggleSidebar())}>
      {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
    </button>
  );
};

export default SidebarToggle;
