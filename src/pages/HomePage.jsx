import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/homepage.css";

function HomePage() {
  const { demoLogin, isLoggedIn } = useContext(AuthContext);
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    setIsStarting(true);
    setErrorMessage("");

    const result = await demoLogin();

    if (result.success) {
      navigate("/schedule");
    } else {
      setErrorMessage(result.error);
      setIsStarting(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">🗓️ Welcome to Shifty</h1>
      <p className="home-subtitle">
        A scheduling tool for teams running small businesses like cafés,
        restaurants or independent retailers.
      </p>
      <div className="home-card">
        <p>Core Features:</p>
        <ul className="home-list">
          <li>👤 User registration and login</li>
          <li>💼 Admin privileges</li>
          <li>🔐 JWT token-based user authentication</li>
          <li>🧭 Protected routes</li>
          <li>🔓 Persistent login sessions</li>
        </ul>

        {!isLoggedIn && (
          <div className="home-demo-section">
            <button
              onClick={handleDemoLogin}
              disabled={isStarting}
              className="btn btn-primary home-demo-btn"
            >
              {isStarting ? "Starting demo…" : "Try Demo"}
            </button>
            <p className="home-demo-hint">
              Sign in as Admin to give Shifty a try. Demo data will be discarded when the session closes.
            </p>
            {errorMessage && (
              <div className="alert alert-error">{errorMessage}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;