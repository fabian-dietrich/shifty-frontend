import { useState } from "react";
import ShiftCard from "./ShiftCard";

function ScheduleGrid({ shifts, isAdmin, onRefresh, onAssignClick }) {
  const daysOfWeek = [
    "Monday",
    "Tuesday", 
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const shiftsByDay = {};
  
  daysOfWeek.forEach(day => {
    shiftsByDay[day] = [];
  });

  shifts.forEach(shift => {
    if (shiftsByDay[shift.dayOfWeek]) {
      shiftsByDay[shift.dayOfWeek].push(shift);
    }
  });

  // Sort shifts within each weekday column by start time
  Object.keys(shiftsByDay).forEach(day => {
    shiftsByDay[day].sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
  });

  return (
    <div className="schedule-grid">
      {daysOfWeek.map((day) => (
        <div key={day} className="day-column">
          <div className="day-header">
            <h3>{day}</h3>
          </div>
          
          <div className="shifts-container">
            {shiftsByDay[day].length === 0 ? (
              <div className="no-shifts">
                No shifts scheduled
              </div>
            ) : (
              shiftsByDay[day].map((shift) => (
                <ShiftCard
                  key={shift._id}
                  shift={shift}
                  isAdmin={isAdmin}
                  onRefresh={onRefresh}
                  onAssignClick={onAssignClick}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScheduleGrid;