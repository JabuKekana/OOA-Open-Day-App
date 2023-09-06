import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/notifications.css";
import NotificationsList from "../components/UI/NotificationsList";
import useGetData from "../custom-hooks/useGetData";

const Notifications = () => {
  const { data: allNotifications, loading } = useGetData("notifications");
  const [filteredNotifications, setFilteredNotifications] = useState(allNotifications);

  useEffect(() => {
    setFilteredNotifications(allNotifications);
  }, [allNotifications]);

  return (
    <Helmet title="Shop">
      <section className="notifications">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="section__title">Notifications</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading...</h5>
            ) : (
              <NotificationsList data={filteredNotifications} /> 
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Notifications;
