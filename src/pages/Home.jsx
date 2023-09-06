import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import NotificationsList from "../components/UI/NotificationsList";
import counterimg from "../assets/images/counter-timer-img.png";
import Clock from "../components/UI/Clock";
import useGetData from "../custom-hooks/useGetData";

const Home = () => {
  // const year = new Date().getFullYear();

  const [timerValue, setTimerValue] = useState(600); // 600 seconds = 10 minutes

  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Registration",
      details: "You are now registered for the QOA open day 2023! After registering you will receive your first set of points. Use this code to collect coupons and use coupons to give you access to our activities!",
    },
    {
      id: 2,
      name: "Support station",
      details: "Meet the wonderworkers behind the screens, our support staff! Our QOA support staff will guide and assist you!",
    },
    {
      id: 3,
      name: "Presentations",
      details: "We have 12 highly informative presentations running throughout the day. With our presenters, you can get an insider view into QOA and experience what we are all about! Don't forget to earn your coupon.",
    },
    {
      id: 4,
      name: "VR Experience",
      details: "We have something exciting for you! Kids can experience some fun on our VR activities! To gain access to these you would have to attend the presentation first!",
    },
    {
      id: 5,
      name: "Teacher Subject Halls",
      details: "Engage with the teachers to gain a deeper understanding of how lessons are conducted, and much more! Don't forget to earn your coupon from at least 3 stations.",
    },
    {
      id: 6,
      name: "Applications station",
      details: "Here we have our applications team who are well equipped to assist you with any queries on how to apply and when to apply!",
    },
    {
      id: 7,
      name: "Inflatables & kids activities",
      details: "Hey kids! Join us in the great outdoors for some adrenalin rush activities on the Gladiator track, Climbing wall and 3 in 1 Jumping castle!",
    },
    {
      id: 8,
      name: "Food vendors",
      details: "Grab a drink, a snack, or a meal at one of the many food stalls that are sure to tantalize your taste buds.",
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

  const updateTimer = () => {
    setTimerValue((prevValue) => prevValue - 1);
  };

  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6" className="hero__img-section">
              <div className="hero__img">
                <img src={heroImg} alt="hero" />
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h2>Welcome to the QOA Open day!</h2>
                <div className="categories-container">
                  <h2 className="categories-title">EXPLORE THE POSSIBILITIES</h2>
                  <ul className="categories-list">
                    {activities.map((activity) => (
                      <li
                        key={activity.id}
                        className={`category-item ${
                          selectedActivity === activity.id ? "active" : ""
                        }`}
                      >
                        <div className="category-header">
                          <button
                            className="show-more-button"
                            onClick={() => handleActivityClick(activity.id)}
                          >
                            {selectedActivity === activity.id ? (
                  <i className="ri-arrow-down-s-fill"></i>
                ) : (
                  <i className="ri-arrow-right-s-fill"></i>
                )}
                          </button>
                          <h3
                            onClick={() => handleActivityClick(activity.id)}
                            className="category-name"
                          >
                            {activity.name}
                          </h3>
                        </div>
                        {selectedActivity === activity.id && (
                          <div className="category-details">
                            {activity.details}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
