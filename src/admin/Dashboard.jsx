import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import useAuth from "../custom-hooks/useAuth";
import "../styles/dashboard.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import useGetData from "../custom-hooks/useGetData";

const Dashboard = () => {
  const { data: notifications } = useGetData("notifications");
  const { data: users } = useGetData("users");
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAdminStatus = async () => {
      if (currentUser) {
        const userUid = currentUser.uid;
        const userDocRef = doc(db, "users", userUid);

        try {
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setIsAdmin(userData && userData.isAdmin);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error fetching user data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserAdminStatus();
  }, [currentUser]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <p>Loading...</p>
            ) : isAdmin ? (
              <>
                <Col lg="3">
                  <div className="products__box">
                    <h5>Notifications Sent</h5>
                    <span>{notifications.length}</span>
                  </div>
                </Col>
                <Col lg="3">
                  <div className="users__box">
                    <h5>Total Users</h5>
                    <span>{users.length}</span>
                  </div>
                </Col>
              </>
            ) : (
              <div>
                You don't have permission to view this page. Please contact your administrator.
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
