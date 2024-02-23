import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
// import Logo from "../../public/craft-tracker.png";
import Home from "../../../public/home.png";
import Profile from "../../../public/profile.png";
import Logout from "../../../public/logout.png";
import Knit from "../../../public/knitted-sweater.png"
import needles from "../../../public/needles.png"

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header 
    style={{ backgroundImage: `url(${Knit})`, height: '100px'}}
    className="sticky bg-sky-700/95 rounded-t-full m-2"
    // className="h-24 pt-3 pb-2 text-center bg-gradient-to-r from-green-400/50 to-blue-500/50"
    >
      <div >
        <Link to="/">

        <img src={needles} className="w-20 absolute left-7 top-3" ></img>
        </Link>
        {Auth.loggedIn() ? (
          <div
            className="flex flex-row gap-3 bg-sky-700/95 justify-center items-center absolute -bottom-7 right-4 px-2 pb-1 rounded-b-2xl"
            style={{ backgroundImage: `url(${Knit})` }}
          >
            <Link to="/"> 
              <img
                src={Home}
                className="rounded-full w-7"
              />
            </Link>
            <Link to="/me">
              <img
                src={Profile}
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
              className="absolute -bottom-5 right-6 rounded-b-xl px-2 bg-sky-700/80"
              style={{backgroundImage: `url(${Knit})`}}
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
