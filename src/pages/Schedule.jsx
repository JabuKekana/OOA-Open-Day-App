import React, { useState } from "react";
import "../styles/schedule.css";
import CountdownTimer from "../components/UI/CountdownTimer";

const Schedule = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Virtual club cooking session",
      details: "10:00 am  Virtual club cooking session",
      startTime: "10:00 am",
    },
    {
      id: 2,
      name: "Presentation at Gardenia Hall",
      details: "10:00-10:30 am Presentation at Gardenia Hall",
      startTime: "10:30 am",
    },
    {
      id: 3,
      name: "Presentation at Jasmine Hall",
      details: "10:30- 11:00 am Presentation at Jasmine Hall",
      startTime: "10:30 am",
    },
    {
      id: 4,
      name: "Arts and Crafts session",
      details: "11:00am - Arts and Crafts session",
      startTime: "11:00 am",
    },
    {
      id: 5,
      name: "Presentation at Gardenia Hall ",
      details: "11:00-11:30 am - Presentation at Gardenia Hall",
      startTime: "11:00 am",
    },
    {
      id: 6,
      name: "Presentation at Jasmine Hall",
      details: "11:30- 12:00 pm - Presentation at Jasmine Hall",
      startTime: "11:30 am",
    },
    {
      id: 7,
      name: "Virtual club cooking session",
      details: "12:00 pm- Virtual club cooking session",
      startTime: "12:00 am",
    },
    {
      id: 8,
      name: "Presentation in Gardenia Hall",
      details: "12:00- 12:30 pm - Presentation in Gardenia Hall",
      startTime: "12:00 am",
    },
    {
      id: 9,
      name: "Presentation in Jasmine Hall",
      details: "12:30- 13:00 pm - Presentation in Jasmine Hall",
      startTime: "12:30 am",
    },
    {
      id: 10,
      name: "Arts and Crafts session",
      details: "13:00 pm - Arts and Crafts session",
      startTime: "13:00 am",
    },
    {
      id: 11,
      name: "Presentation at Gardenia Hall",
      details: "13:00- 13:30 pm - Presentation at Gardenia Hall",
      startTime: "13:00 am",
    },
    {
      id: 12,
      name: "Presentation at Jasmine Hall",
      details: "13:30- 14:00 pm - Presentation at Jasmine Hall",
      startTime: "13:30 am",
    },
    {
      id: 13,
      name: "Virtual club cooking session",
      details: "14:00 pm - Virtual club cooking session",
      startTime: "14:00 am",
    },
    {
      id: 14,
      name: "Presentation at Gardenia Hall",
      details: "14:00- 14:30 pm - Presentation at Gardenia Hall",
      startTime: "14:00 am",
    },
    {
      id: 15,
      name: "Presentation at Jasmine Hall",
      details: "14:30- 15:00 pm - Presentation at Jasmine Hall",
      startTime: "14:30 am",
    },
    {
      id: 16,
      name: "Arts and Crafts session",
      details: "15:00 pm - Arts and Crafts session",
      startTime: "15:00 am",
    },
    {
      id: 17,
      name: "Presentation at Gardenia Hall ",
      details: "15:00- 15:30- Presentation at Gardenia Hall",
      startTime: "15:00 am",
    },
    {
      id: 18,
      name: "Presentation at Jasmine Hall",
      details: "15:30- 16:00- Presentation at Jasmine Hall",
      startTime: "15:30 am",
    },
  ]);

  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleActivityClick = (activityId) => {
    if (selectedActivity === activityId) {
      setSelectedActivity(null);
    } else {
      setSelectedActivity(activityId);
    }
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
            }`}
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
                {selectedActivity === activity.id ? "Less" : "More"}
              </button>
            </div>
            <p className="static-time">{activity.startTime}</p>
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