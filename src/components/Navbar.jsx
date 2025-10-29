import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
        <NavLink to="/" className="navbar-logo">
          Shifty
        </NavLink>

        <div className="navbar-links">

          {isLoggedIn ? (
            <>
              <NavLink to="/schedule" className="navbar-link">
                Schedule
              </NavLink>

              <NavLink to="/dashboard" className="navbar-link">
                Dashboard
              </NavLink>

              <button onClick={handleLogout} className="navbar-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signup" className="navbar-link">
                Signup
              </NavLink>
              <NavLink to="/login" className="navbar-link">
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
