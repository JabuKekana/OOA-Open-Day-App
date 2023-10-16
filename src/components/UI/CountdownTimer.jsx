import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetTime }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  function calculateRemainingTime() {
    const currentTime = new Date().getTime();
    const difference = targetTime - currentTime;

    if (difference <= 0) {
      // Countdown has finished, return all zeros
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    let interval;

    if (remainingTime.hours !== 0 || remainingTime.minutes !== 0 || remainingTime.seconds !== 0) {
      interval = setInterval(() => {
        setRemainingTime(calculateRemainingTime());
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, targetTime]);

  return (
    <span className="countdown-timer">
      {remainingTime.hours.toString().padStart(2, "0")}:
      {remainingTime.minutes.toString().padStart(2, "0")}:
      {remainingTime.seconds.toString().padStart(2, "0")}
    </span>
  );
};

export default CountdownTimer;
