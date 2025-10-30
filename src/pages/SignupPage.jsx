import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/components/authpages.css";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        email,
        username,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log("error logging in", error);
      const message =
        error.response?.data?.errorMessage ||
        "Signup failed. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="auth-page signup-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Choose a strong password"
            />
          </div>

          {errorMessage && (
            <div className="alert alert-error">{errorMessage}</div>
          )}

          <button type="submit" className="btn btn-primary auth-submit-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-footer-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
