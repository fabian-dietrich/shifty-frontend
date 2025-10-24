import { useState } from "react";

function ShiftCard({ shift, isAdmin, onRefresh }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    // For now, just toggle to show we can interact
    // Later we'll add modals for assign/edit
    setShowDetails(!showDetails);
  };

  return (
    <div 
      className={`shift-card ${shift.status}`}
      onClick={handleClick}
    >
      {/* Time Display */}
      <div className="shift-card-time">
        <span className="time-text">{shift.startTime}</span>
        <span className="time-separator">—</span>
        <span className="time-text">{shift.endTime}</span>
      </div>

      {/* Worker Assignment or Open Status */}
      <div className="shift-card-worker">
        {shift.assignedWorker ? (
          <div className="worker-info">
            <div 
              className="worker-avatar"
              style={{ backgroundColor: shift.assignedWorker.color }}
              title={shift.assignedWorker.username}
            >
              {shift.assignedWorker.username.substring(0, 2).toUpperCase()}
            </div>
            <span className="worker-name">
              {shift.assignedWorker.username}
            </span>
          </div>
        ) : (
          <div className="shift-open-badge">
            <span className="open-icon">○</span>
            <span>Open</span>
          </div>
        )}
      </div>

      {/* Optional: Admin indicators */}
      {isAdmin && (
        <div className="shift-card-admin-hint">
          <span className="admin-icon">⚙</span>
        </div>
      )}

      {/* Optional: Expanded details (future use) */}
      {showDetails && (
        <div className="shift-card-details" onClick={(e) => e.stopPropagation()}>
          <div className="detail-row">
            <strong>Status:</strong> {shift.status}
          </div>
          {shift.assignedWorker && (
            <div className="detail-row">
              <strong>Email:</strong> {shift.assignedWorker.email}
            </div>
          )}
          {isAdmin && (
            <div className="admin-actions">
              <button className="btn-small btn-secondary">
                {shift.assignedWorker ? "Unassign" : "Assign"}
              </button>
              <button className="btn-small btn-danger">Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShiftCard;