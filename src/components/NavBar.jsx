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
  };
  const logInPageOnClick = () => {
    navigate("/logIn");
  };
  return (
    <div className="TopNav">
      <img
        onClick={returnHomeOnClick}
        className="WebsiteLogo"
        alt="Website logo"
        src="https://imagizer.imageshack.com/img922/3152/npjpsD.png"
      />

      <form className="searchBarForm">
        <input
          id="search-input"
          className="searchBar"
          type="search"
          placeholder="...Search"
        />
      </form>

      <div className="HamburgerMenu" onClick={handelToggleSideBar}>
        <div className="lines"></div>
        <div className="lines"></div>
        <div className="lines"></div>
      </div>
      <button onClick={logInPageOnClick} className="LogInButton">
        LogIn
      </button>
    </div>
  );
}
export default TopNav;
