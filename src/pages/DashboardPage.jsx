import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/dashboard.css";

function DashboardPage() {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === "admin";

  return (
    <div className="dashboard-container">
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

      {isAdmin ? (
        <>
        <h4>🔐user with admin privileges</h4>
                </>
      ) : (
              <>  </>
      )}

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

      {isAdmin ? (
        <>
          <div className="dashboard-card-user">
            <h3>Available Admin Features:</h3>
            <ul className="dashboard-list">
              <li>Create & delete shifts in schedule view </li>
              <li>Assign workers to shifts</li>
              <li>Unassign workers from shifts</li>
            </ul>
          </div>

          <div className="dashboard-card-user">
            <h3>Upcoming Admin Features:</h3>
            <ul className="dashboard-list">
              <li>Overview of upcoming open shifts in dashboard view</li>
              <li>Edit shift details in schedule view </li>
              <li>Add, edit, remove shift-specific comments</li>
              <li>Summary of weekly hours per worker </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="dashboard-card-user">
            <h3>Available User Features:</h3>
            <ul className="dashboard-list">
              <li>View all scheduled shifts in schedule view </li>
            </ul>
          </div>

          <div className="dashboard-card-user">
            <h3>Upcoming User Features:</h3>
            <ul className="dashboard-list">
              <li>Swap assigned shifts with colleagues</li>
              <li>Claim open shifts in schedule view</li>
              <li>Overview of my upcoming shifts in dashboard view</li>
              <li>Summary of my weekly hours</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
