import React, { useState } from "react";
import "../styles/schedule.css";
import CountdownTimer from "../components/UI/CountdownTimer";

const Schedule = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Activity 1",
      details: "Details about Activity 1.",
      startTime: new Date("2023-09-25T10:00:00"),
    },
    {
      id: 2,
      name: "Activity 2",
      details: "Details about Activity 2.",
      startTime: new Date("2023-09-25T09:30:00"),
    },
    {
      id: 3,
      name: "Activity 3",
      details: "Details about Activity 1.",
      startTime: new Date("2023-09-25T10:30:00"),
    },
    {
      id: 4,
      name: "Activity 4",
      details: "Details about Activity 2.",
      startTime: new Date("2023-09-25T12:30:00"),
    },
  ]);

  // Sort activities by start time (ascending order)
  activities.sort((a, b) => a.startTime - b.startTime);

  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleActivityClick = (activityId) => {
    if (selectedActivity === activityId) {
      setSelectedActivity(null);
    } else {
      setSelectedActivity(activityId);
    }
  };

  const isActivityPassed = (activity) => {
    // Check if the activity's start time is in the past
    return activity.startTime < new Date();
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Schedule</h2>
      <h4>Catch the next presentation in time!</h4>
      <ul className="activities-list">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className={`activity-item ${
              selectedActivity === activity.id ? "active" : ""
            } ${isActivityPassed(activity) ? "passed-activity" : ""}`}
          >
            <div className="activity-header">
              <h3
                onClick={() => handleActivityClick(activity.id)}
                className="activity-name"
              >
                {activity.name}
              </h3>
              <button
                className="show-more-button"
                onClick={() => handleActivityClick(activity.id)}
              >
                {selectedActivity === activity.id ? "Show Less" : "Show More"}
              </button>
            </div>
            <CountdownTimer targetTime={activity.startTime} />
            {selectedActivity === activity.id && (
              <div className="activity-details">{activity.details}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
