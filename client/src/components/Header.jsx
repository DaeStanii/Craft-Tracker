import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Logo from "../public/craft-tracker.png"

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="h-24 pt-3 pb-2 text-center bg-gradient-to-r from-green-400/50 to-blue-500/50">
      <div>
        <Link to="/">
          <img src={Logo} style={{width: "75px"}} className="ml-2 rounded-full"></img>
        </Link>
        {Auth.loggedIn() ? (
          <div  style={{position: "absolute", top: "65px", right: "10px"}}>
            <Link to="/profile">Profile</Link>
            <Link to="/projects" className="ml-2">Projects</Link>
            <button onClick={logout}>
              <Link to="/" className="ml-2">Logout</Link>
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" style={{position: "absolute", top: "65px", right: "10px"}}>Get Started</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
