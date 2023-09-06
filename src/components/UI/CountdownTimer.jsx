import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetTime }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  function calculateRemainingTime() {
    const currentTime = new Date().getTime();
    const difference = targetTime - currentTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="countdown-timer">
      {remainingTime.hours.toString().padStart(2, "0")}:
      {remainingTime.minutes.toString().padStart(2, "0")}:
      {remainingTime.seconds.toString().padStart(2, "0")}
    </span>
  );
};

export default CountdownTimer;
