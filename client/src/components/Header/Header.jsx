import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Home from "../../images/home.png";
import Profile from "../../images/profile.png";
import Logout from "../../images/logout.png";
// import Knit from "../../images/knitted-sweater.png";
// import needles from "../../images/needles.png";
import paperPlane from "../../images/paper-plane.png";
import Sidebar from "./Sidebar/Sidebar"

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header
      style={{ height: "50px" }}
      className="sticky m-0 bg-[#9c4988] dark:bg-[#272443]"
    >
      <div>
        <Sidebar />
        <h1 className="text-center pt-1 text-[#272443] text-3xl dark:text-[#f3f0f1] font-bold"><a href="/">Craft Tracker</a></h1>
        {Auth.loggedIn() ? (
          <div
            className="flex flex-row gap-3 justify-center items-center absolute bottom-2 right-4 px-2 pb-1 rounded-b-2xl"
          >
            <Link to="/">
              <img src={Home} className="w-7 dark:invert" />
            </Link>
            <Link to="/me">
              <img src={Profile} className="w-7 dark:invert" />
            </Link>
            <Link to="/suggestions">
            <img src={paperPlane} className="w-7 dark:invert" />
            </Link>
            <button onClick={logout}>
              <Link to="/">
                <img src={Logout} className="w-7 dark:invert" />
              </Link>
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="absolute bold bottom-4 right-6 px-2"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
