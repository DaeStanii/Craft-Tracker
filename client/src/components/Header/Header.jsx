import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Logo from "../public/craft-tracker.png";
import Home from "../public/home.png";
import Create from "../public/create.png";
import Profile from "../public/profile.png";
import Logout from "../public/logout.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="h-24 pt-3 pb-2 text-center bg-gradient-to-r from-green-400/50 to-blue-500/50">
      <div>
        <Link to="/">
          <img
            src={Logo}
            style={{ width: "75px" }}
            className="ml-2 rounded-full"
          />
        </Link>
        {Auth.loggedIn() ? (
          <div
            className="flex flex-row gap-3 justify-center items-center"
            style={{ position: "absolute", top: "60px", right: "30px" }}
          >
            <Link to="/">
              <img
                src={Home}
                className="rounded-full w-7"
              />
            </Link>
            <Link to="/profile">
              <img
                src={Profile}
                className="rounded-full w-7"
              />
            </Link>
            <Link to="/projects">
              <img
                src={Create}
                className="rounded-full w-7"
              />
            </Link>
            <button onClick={logout}>
              <Link to="/">
                <img
                  src={Logout}
                  className="rounded-full w-7 bg-transparent"
                />
              </Link>
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              style={{ position: "absolute", top: "65px", right: "10px" }}
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
