import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth"; // Import the useAuth hook
import "../styles/landing-page.css";
import botImg from "../assets/images/CHATBOT-02 1.png";
import landingImg from "../assets/images/landing-page-img.png";



const LandingPage = () => {
  const navigate = useNavigate();
  const { currentUser, signInWithGoogle } = useAuth(); // Use the hook

  console.log("currentUser:", currentUser); // Add this console log

  return (
    <div className="landing-page">
      <div className="landingPage-img">
        <img src={landingImg} alt="landing-page" />
      </div>
      <div className="content">
        <h2 className="animated-text">Welcome to our <br/>Open Day App</h2>
        {currentUser ? (
          // If the user is already signed in, show a different UI
          <button className="sign-up-button" onClick={() => navigate("/home")}>
            Go to Home
          </button>
        ) : (
          // If the user is not signed in, show the sign-up button
          <button className="sign-up-button" onClick={signInWithGoogle}>
            Sign Up
          </button>
        )}
      </div>
      <img className="bot-image" src={botImg} alt="Background" />
    </div>
  );
};

export default LandingPage;

