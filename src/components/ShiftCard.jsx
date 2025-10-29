import { useState } from "react";

function ShiftCard({ shift, isAdmin, onRefresh, onAssignClick }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    if (isAdmin) {
      // Admin clicks trigger assign callback
      onAssignClick(shift);
    } else {
      // Regular users just toggle details
      setShowDetails(!showDetails);
    }
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
            <span className="open-icon">⚠️</span>
            <span>not assigned</span>
          </div>
        )}
      </div>




    </div>
  );
}

export default ShiftCard;