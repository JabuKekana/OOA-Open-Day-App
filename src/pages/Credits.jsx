import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/credits.css";
import QRCode from "react-qr-code";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import useAuth from "../custom-hooks/useAuth";
import useGetData from "../custom-hooks/useGetData"; // Import useGetData

const Credits = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useAuth();
  const { data: usersData } = useGetData("users"); 

  useEffect(() => {
    if (currentUser) {
      const userUid = currentUser.uid; 
      const fetchData = async () => {
        const userDocRef = doc(db, "users", userUid); // Use UID here
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser(userDocSnap.data());
        }
      };

      fetchData();
    }
  }, [currentUser]);

  return (
    <Helmet title={"Credits"}>
      <section className="credits__section">
        <Container>
          <Row>
            <Col lg="6" md="6" className="qrcode__section">
              <div className="qrcode__img">
                <div className="input-here">
                  {currentUser && user && user.uid ? (
                    <QRCode value={user.uid} />
                  ) : (
                    <span>Error: QR CODE FAILED</span>
                  )}
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="credits__content">
                <p className="hero__subtitle">
                  Participate in more activities & earn coupons!
                </p>
                <h2>
                  You currently have : <br />{" "}
                  <span className="coupon-count">
                    {user ? user.coupon : ""}
                  </span>{" "}
                  <br /> COUPONS
                </h2>
                <h4>How it works?</h4>
                <ol>
                  <li>
                    Look out for the hot spots where you can get your credit
                    points.
                  </li>
                  <li>Complete the task </li>
                  <li>Get your QR code scanned by the facilitator</li>
                </ol>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Credits;
