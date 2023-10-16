import React, { useState, useEffect } from "react";
import "../styles/map.css";
import outdoorMapImage from "../assets/images/outdoor-map-5.jpg";
import indoorMapImage from "../assets/images/indoor-map-4.jpg";


const Map = () => {
  const [isLoading, setIsLoading] = useState(true);
  const outdoorMapImageUrl = "../assets/images/outdoor-map-5.jpg";
  const indoorMapImageUrl = "https://example.com/indoor-map.png";

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
          </a><br/>
          <a href={outdoorMapImage} download="outdoor-map.jpg" className="download__btn">
            <i className="ri-download-2-fill"></i> Download Outdoor Map
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
            src="https://3dthis.com/play.htm?h=ODAxMzMxNw"
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
          </a><br/>
          <a href={indoorMapImage} download="indoor-map.jpg" className="download__btn">
            <i className="ri-download-2-fill"></i> Download Indoor Map
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
            src="https://3dthis.com/play.htm?h=LTM3MjU1Njg"
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
