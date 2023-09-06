import React, { useState, useEffect } from "react";
import "../styles/map.css";

const Map = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay with useEffect
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout duration as needed

    // Cleanup the timeout on unmount
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div className="map-container">
      <h2>Outside Map</h2>
      <div className="map-heading">
        <div className="icon-row">
          <a href="#your-link-here-1">
          <i className="ri-store-3-fill"></i>
          </a>
          <a href="#your-link-here-2">
          <i className="ri-slideshow-line"></i>
          </a>
          <a href="#your-link-here-3">
          <i className="ri-community-line"></i>
          </a>
          <a href="#your-link-here-4">
            <i className="ri-questionnaire-fill"></i>
          </a>
          <a href="#your-link-here-5">
            <i className="ri-game-line"></i>
          </a>
        </div>
      </div>
      {isLoading ? (
        <p>Map loading... Please wait.</p>
      ) : (
        <div className="map">
          <iframe
            width="840"
            height="680"
            src="https://3dthis.com/play.htm?h=LTMwMjYzMzA"
            allowFullScreen
            title="Outside Map"
            autoPlay
          ></iframe>
        </div>
      )}
      <h2>Indoor Map</h2>
      <div className="map-heading">
        <div className="icon-row">
        <a href="#your-link-here-1">
          <i className="ri-store-3-fill"></i>
          </a>
          <a href="#your-link-here-2">
          <i className="ri-slideshow-line"></i>
          </a>
          <a href="#your-link-here-3">
          <i className="ri-community-line"></i>
          </a>
          <a href="#your-link-here-4">
            <i className="ri-questionnaire-fill"></i>
          </a>
          <a href="#your-link-here-5">
            <i className="ri-game-line"></i>
          </a>
        </div>
      </div>
      {isLoading ? (
        <p>Map loading... Please wait.</p>
      ) : (
        <div className="map">
          <iframe
            width="840"
            height="680"
            src="https://3dthis.com/play.htm?h=NDIwOTQ3Nw"
            allowFullScreen
            title="Indoor Map"
            autoPlay
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Map;
