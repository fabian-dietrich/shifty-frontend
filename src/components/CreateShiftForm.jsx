import { useState } from "react";
import axios from "axios";

function CreateShiftForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    dayOfWeek: "Monday",
    startTime: "09:00",
    endTime: "17:00"
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shifts`,
        formData,
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        }
      );

      console.log("✅ Shift created:", response.data);
      
      // Call success callback to refresh shifts
      if (onSuccess) {
        onSuccess();
      }
      
      // Close modal
      onClose();
    } catch (err) {
      console.error("❌ Error creating shift:", err);
      setError(
        err.response?.data?.errorMessage || 
        "Failed to create shift. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Shift</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="shift-form">
          {/* Day of Week */}
          <div className="form-group">
            <label htmlFor="dayOfWeek" className="form-label">
              Day of Week
            </label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={handleChange}
              className="form-input"
              required
            >
              {daysOfWeek.map(day => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div className="form-group">
            <label htmlFor="startTime" className="form-label">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* End Time */}
          <div className="form-group">
            <label htmlFor="endTime" className="form-label">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Shift"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateShiftForm;