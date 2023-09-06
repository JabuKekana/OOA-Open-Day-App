import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import QRCode from "react-qr-code";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify"; // Import react-toastify

const UserDetails = ({ uid }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserDetails(userData);
          setCoupon(userData.coupon || 0); // Set coupon from Firestore
        } else {
          console.error("User not found in Firestore.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [uid]);

  const incrementCoupon = () => {
    if (!userDetails) {
      return;
    }

    // Increment the coupon count
    const newCouponCount = coupon + 1;
    setCoupon(newCouponCount);

    // Update the coupon count in Firestore
    const userDocRef = doc(db, "users", uid);
    updateDoc(userDocRef, { coupon: newCouponCount })
      .then(() => {
        console.log("Coupon count updated successfully in Firestore");
        toast.success("Coupon count updated successfully");
      })
      .catch((error) => {
        console.error("Error updating coupon count in Firestore:", error);
        toast.error("Failed to update coupon count");
      });
  };

  const decrementCoupon = () => {
    if (!userDetails || coupon <= 0) {
      return;
    }

    // Decrement the coupon count
    const newCouponCount = coupon - 1;
    setCoupon(newCouponCount);

    // Update the coupon count in Firestore
    const userDocRef = doc(db, "users", uid);
    updateDoc(userDocRef, { coupon: newCouponCount })
      .then(() => {
        console.log("Coupon count updated successfully in Firestore");
        toast.success("Coupon count updated successfully");
      })
      .catch((error) => {
        console.error("Error updating coupon count in Firestore:", error);
        toast.error("Failed to update coupon count");
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userDetails) {
    return <p>User not found</p>;
  }

  return (
    <Container>
      <Row>
        <Col lg="6" mt="12">
          <h3>User Information:</h3>
          <p>Email: {userDetails.email}</p>
          <p>Name: {userDetails.displayName}</p>
          <p>Coupons: {coupon}</p>
          <div>
            <button
              className="btn btn-warning btn-circle"
              onClick={decrementCoupon}
            >
              -
            </button>
            <button
              className="btn btn-primary btn-circle"
              onClick={incrementCoupon}
            >
              +
            </button><br/><br/><br/>
          </div>
        </Col>
        <Col lg="6" mt="10">
          <h2>User QR Code</h2>
          <QRCode value={uid} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
