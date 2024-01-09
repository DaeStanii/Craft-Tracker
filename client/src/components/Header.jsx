import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="text-center bg-gradient-to-r from-green-400/50 to-blue-500/50">
      <div>
        <Link to="/">Home</Link>
        {Auth.loggedIn() ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>
              <Link to="/">Logout</Link>
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Get Started</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
