import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ScheduleGrid from "../components/ScheduleGrid";
import CreateShiftForm from "../components/CreateShiftForm";
import "../styles/components/Schedule.css";

function SchedulePage() {
  const { user } = useContext(AuthContext);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch all shifts when component mounts
  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shifts`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setShifts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching shifts:", err);
      setError("Failed to load shifts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if current user is admin
  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schedule-page">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <h1>Weekly Schedule</h1>
        {isAdmin && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Shift
          </button>
        )}
      </div>

      {/* Placeholder for schedule grid */}
      <div className="schedule-content">
        <ScheduleGrid 
          shifts={shifts}
          isAdmin={isAdmin}
          onRefresh={fetchShifts}
        />
      </div>

      {/* Create Shift Modal */}
      {showCreateModal && (
        <CreateShiftForm
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchShifts}
        />
      )}
    </div>
  );
}

export default SchedulePage;
