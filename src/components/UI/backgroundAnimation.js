// backgroundAnimation.js

import React, { useEffect } from "react";

function CircleAnimation() {
  useEffect(() => {
    const animationInterval = setInterval(() => {
      lines();
    }, 200);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  function lines() {
    let sizeW = Math.random() * 12;
    let duration = Math.random() * 3;

    // Create a new circle element
    const e = document.createElement("div");
    e.classList.add("circle");
    document.querySelector(".login-container").appendChild(e);

    // Calculate random position and animation duration
    const randomLeft = Math.random() * window.innerWidth;
    const randomTop = window.innerHeight; // Start at the bottom of the page
    e.style.left = `${randomLeft}px`;
    e.style.top = `${randomTop}px`; // Set the initial top position at the bottom
    e.style.width = `2px ${2 + sizeW}px`;
    e.style.animationDuration = `${2 + duration}s`;

    // Add animation to move the circle upwards
    e.style.animation = `animate linear ${2 + duration}s forwards`;
    e.style.transform = `translateY(-70vh)`; // Move the circle upwards by half the page height

    // Remove the circle element after animation completion
    e.addEventListener("animationend", function () {
      document.querySelector(".login-container").removeChild(e);
    });
  }

  return null; // This component doesn't render anything
}

export default CircleAnimation;
