import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../StateManagment/websiteSlice";

function TopNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > navRef.current.offsetTop) {
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
        alt="Website logo"
        src="https://imagizer.imageshack.com/img922/3152/npjpsD.png"
      />
      <div className="HamburgerMenu" onClick={handelToggleSideBar}>
        <div className="lines"></div>
        <div className="lines"></div>
        <div className="lines"></div>
      </div>
    </div>
  );
}

export default TopNav;
