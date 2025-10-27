import { useState, useEffect } from "react";
import axios from "axios";

function AssignWorkerForm({ shift, onClose, onSuccess }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setFetchingUsers(true);
      const token = localStorage.getItem("authToken");
      
      // We'll need to get users from the backend
      // For now, we'll use a workaround - get them from MongoDB or create a users endpoint
      // Let's create a simple endpoint first
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUsers(response.data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setFetchingUsers(false);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    
    if (!selectedUserId) {
      setError("Please select a user");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shifts/${shift._id}/assign`,
        { userId: selectedUserId },
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        }
      );

      console.log("✅ User assigned to shift:", response.data);
      
      // Call success callback to refresh shifts
      if (onSuccess) {
        onSuccess();
      }
      
      // Close modal
      onClose();
    } catch (err) {
      console.error("❌ Error assigning user:", err);
      setError(
        err.response?.data?.errorMessage || 
        "Failed to assign user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUnassign = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shifts/${shift._id}/unassign`,
        {},
        {
          headers: { 
            "Authorization": `Bearer ${token}` 
          }
        }
      );

      console.log("✅ User unassigned from shift:", response.data);
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      console.error("❌ Error unassigning user:", err);
      setError(
        err.response?.data?.errorMessage || 
        "Failed to unassign user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

<div className="modal-header">
  <div className="modal-header-content">
    <p className="modal-shift-info">
      {shift.dayOfWeek} {shift.startTime} — {shift.endTime}
    </p>
  </div>
  <button className="modal-close" onClick={onClose}>
    ✕
  </button>
</div>

<div className="modal-body">
          {shift.assignedWorker ? (
            /* FILLED SHIFT: Show current assignment with unassign option */
            <div className="current-assignment-inline">
              <strong>Currently assigned to:</strong>
              <div className="worker-badge-with-actions">
                <div className="worker-info-compact">
                  <div 
                    className="worker-avatar-small"
                    style={{ backgroundColor: shift.assignedWorker.color }}
                  >
                    {shift.assignedWorker.username.substring(0, 2).toUpperCase()}
                  </div>
                  <span>{shift.assignedWorker.username}</span>
                </div>
                <button
                  onClick={handleUnassign}
                  className="btn-icon btn-icon-danger"
                  disabled={loading}
                  title="Unassign worker"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            /* EMPTY SHIFT: Show assignment form */
            <form onSubmit={handleAssign} className="assign-form">
              <div className="form-group">
                <label htmlFor="userId" className="form-label">
                  Select Worker
                </label>
                
                {fetchingUsers ? (
                  <div className="loading-small">Loading users...</div>
                ) : users.length === 0 ? (
                  <div className="alert alert-info">No users available</div>
                ) : (
                  <select
                    id="userId"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">-- Select a user --</option>
                    {users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.username} ({user.email})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {error && (
                <div className="alert alert-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading || fetchingUsers}
              >
                {loading ? "Assigning..." : "Assign Worker"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignWorkerForm;