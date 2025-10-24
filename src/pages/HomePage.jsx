import "../styles/components/HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Shifty App! 🚀</h1>
      <p className="home-subtitle">
        This is the home page. Everyone can see this page, whether you're logged in or not.
      </p>
      <div className="home-card">
        <h2>About This App</h2>
        <p>
          This is a demonstration of a full-stack MERN application with authentication.
        </p>
        <ul className="home-list">
          <li>✅ User registration and login</li>
          <li>✅ JWT token-based authentication</li>
          <li>✅ Protected routes</li>
          <li>✅ Persistent login sessions</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;