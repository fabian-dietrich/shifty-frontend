import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/navbar.css";

function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Shifty App
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/schedule" className="navbar-link">
                Schedule
              </Link>

              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <span className="navbar-username">
                Hello, {user?.username || "User"}!
              </span>
              <button onClick={handleLogout} className="navbar-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="navbar-link">
                Signup
              </Link>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
