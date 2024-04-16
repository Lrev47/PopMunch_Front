import { Link, useNavigate } from "react-router-dom";

function TopNav() {
  const navigate = useNavigate();

  return (
    <div className="TopNav">
      <Link className="TopNavLinks">
        <img
          className="WebsiteLogo"
          alt="Website logo"
          src="https://imagizer.imageshack.com/img922/3152/npjpsD.png"
        />
      </Link>
      <form className="searchBarForm">
        <input
          id="search-input"
          className="searchBar"
          type="search"
          placeholder="Search..."
        />
      </form>
      <div className="HamburgerMenu">
        <div className="lines"></div>
        <div className="lines"></div>
        <div className="lines"></div>
      </div>
    </div>
  );
}
export default TopNav;
