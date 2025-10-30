import "../styles/components/homepage.css";

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title"> 🗓️ Welcome to Shifty</h1>
      <p className="home-subtitle">
        This is the landing page, visible without prior authentication.
      </p>
      <div className="home-card">
        <p>
          Shifty is a scheduling tool for teams running small businesses like cafés, restaurants or independent retailers.
        </p>
        <p>Core Features:</p>
        <ul className="home-list">
          <li>👤 User registration and login</li>
          <li>💼 Admin privileges</li>
          <li>🔐 JWT token-based user authentication</li>
          <li>🧭 Protected routes</li>
          <li>🔓 Persistent login sessions</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;