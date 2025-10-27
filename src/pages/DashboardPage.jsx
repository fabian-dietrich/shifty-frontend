import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/Dashboard.css";

function DashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🎉 Welcome to Your Dashboard!</h1>

      <div className="dashboard-card-success">
        <h2>🔒 This is a Protected Page</h2>
        <p>You can only see this page because you're logged in!</p>
      </div>

<div className="dashboard-card-user">
  <div className="dashboard-user-header">
    <div 
      className="dashboard-user-avatar"
      style={{ backgroundColor: user?.color }}
    >
      {user?.username?.substring(0, 2).toUpperCase() || "??"}
    </div>
    <h3>{user?.username || "User"}</h3>
  </div>
  <div className="dashboard-user-info">
    <p>
      <strong>Email:</strong> {user?.email || "N/A"}
    </p>
    <p>
      <strong>Signed in until:</strong>{" "}
      {user?.exp ? new Date(user.exp * 1000).toLocaleString() : "N/A"}
    </p>
  </div>
</div>

      <div className="dashboard-card-features">
        <h3>What You've Accomplished:</h3>
        <ul className="dashboard-list">
          <li>✅ Successfully registered an account</li>
          <li>✅ Logged in and received a JWT token</li>
          <li>✅ Accessed a protected route</li>
          <li>✅ Your token is being verified on every request</li>
          <li>✅ You can refresh the page and stay logged in!</li>
        </ul>
      </div>

      <div className="dashboard-card-tips">
        <h4>💡 Try These Things:</h4>
        <ul className="dashboard-list">
          <li>Refresh the page - you'll stay logged in!</li>
          <li>Click "Logout" - you'll be redirected</li>
          <li>Try accessing /dashboard without logging in</li>
          <li>Open DevTools → Application → Local Storage to see your token</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
