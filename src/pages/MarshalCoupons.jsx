import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import  useAuth  from "../custom-hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import CouponScanner from "../CouponScanner";

const MarshalCoupons = () => {
  const { currentUser } = useAuth();
  const [isMarshal, setIsMarshal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserMarshalStatus = async () => {
      if (currentUser) {
        const userUid = currentUser.uid;
        const userDocRef = doc(db, "users", userUid);

        try {
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setIsMarshal(userData && userData.isMarshal);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error fetching user data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserMarshalStatus();
  }, [currentUser]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <p>Loading...</p>
            ) : isMarshal ? (
              <CouponScanner />
            ) : (
              <p>
                You don't have permission to view this page. Please contact your administrator.
              </p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MarshalCoupons;
