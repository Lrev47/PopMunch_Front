import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../StateManagment/websiteSlice";

function TopNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelToggleSideBar = () => {
    dispatch(toggleSidebar());
  };

  const returnHomeOnClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  // const logInPageOnClick = () => {
  //   navigate("/logIn");
  // };

  return (
    <div className="TopNav">
      <img
        onClick={returnHomeOnClick}
        className="WebsiteLogo"
        alt="Website logo"
        src="https://imagizer.imageshack.com/img922/3152/npjpsD.png"
      />
      <div className="HamburgerMenu" onClick={handelToggleSideBar}>
        <div className="lines"></div>
        <div className="lines"></div>
        <div className="lines"></div>
      </div>
      {/* <button className="LogInButton">Log In</button> */}
    </div>
  );
}

export default TopNav;
