import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/notification-details.css";
import { motion } from "framer-motion";
import NotificationsList from "../components/UI/NotificationsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";

const NotificationDetails = () => {
  const [notification, setNotification] = useState({});
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();

  const [rating, setRating] = useState(null);
  const { id } = useParams();

  const { data: notifications } = useGetData("notifications");

  const docRef = doc(db, "notifications", id);

  useEffect(() => {
    const getNotification = async () => {
      if (notifications.length > 0) {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNotification(docSnap.data());
        } else {
          console.log("No Notifications");
        }
      }
    };

    getNotification();
  }, [docRef, notifications]);

  const {
    imgUrl,
    notificationName,
    timestamp,
    notificationMsg,
    category,
  } = notification;

  const relatedNotifications = notifications.filter((item) => item.category == category);
  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      author: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, [notification]);

  return (
    <Helmet title={notificationName}>
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <div className="product__details">
                <h2>{notificationName}</h2>
                <p className="mt-3">{notificationMsg}</p>
                <span className="timestamp">
                {timestamp
                  ? timestamp.toDate().toLocaleString()
                  : // Display a placeholder if timestamp is missing
                    "N/A"}
              </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>

            <Col lg="12" className="mt-1">
              <h5 className="related__title"><em>See All Notifications</em></h5><br/>
            </Col>
            <NotificationsList data={relatedNotifications} />
          </Row>
        </Container>
      </section>

      
    </Helmet>
  );
};

export default NotificationDetails;
