import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Home from "../../images/home.png";
import Profile from "../../images/profile.png";
import Logout from "../../images/logout.png";
import Knit from "../../images/knitted-sweater.png";
import needles from "../../images/needles.png";
import paperPlane from "../../images/paper-plane.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header
      style={{ backgroundImage: `url(${Knit})`, height: "100px" }}
      className="sticky bg-blue-400/80 rounded-t-full m-2"
      // className="h-24 pt-3 pb-2 text-center bg-gradient-to-r from-green-400/50 to-blue-500/50"
    >
      <div>
        <Link to="/">
          <img src={needles} className="w-20 absolute left-7 top-3"></img>
        </Link>
        {Auth.loggedIn() ? (
          <div
            className="flex flex-row gap-3 bg-blue-400/80 justify-center items-center absolute -bottom-7 right-4 px-2 pb-1 rounded-b-2xl"
            style={{ backgroundImage: `url(${Knit})` }}
          >
            <Link to="/">
              <img src={Home} className="w-7" />
            </Link>
            <Link to="/me">
              <img src={Profile} className="w-7" />
            </Link>
            <Link to="/suggestions">
            <img src={paperPlane} className=" w-7" />
            </Link>
            <button onClick={logout}>
              <Link to="/">
                <img src={Logout} className="w-7" />
              </Link>
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="absolute -bottom-5 right-6 rounded-b-xl px-2 bg-blue-400/80"
              style={{ backgroundImage: `url(${Knit})` }}
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
