import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import "../styles/users.css";
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import useAuth from "../custom-hooks/useAuth";



import { updateDoc } from "firebase/firestore";

const Users = () => {
  const { data: usersData, loading } = useGetData("users");
  const [qrCodes, setQrCodes] = useState({});
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);


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
        }
      }
    };

    fetchUserAdminStatus();
  }, [currentUser]);

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("User deleted!");
  };


  const updateUserCoupon = async (userId, newCouponValue) => {
    const userDocRef = doc(db, "users", userId);

    try {
      await updateDoc(userDocRef, {
        coupon: newCouponValue,
      });

      toast.success("User coupon updated successfully");
    } catch (error) {
      console.error("Error updating user coupon:", error);
    }
  };

  const increaseCoupon = (userId) => {
    const user = usersData.find((user) => user.uid === userId);
    if (user) {
      const currentCoupon = user.coupon || 0;
      const newCouponValue = currentCoupon + 1;
      updateUserCoupon(userId, newCouponValue);
    }
  };

  const decreaseCoupon = (userId) => {
    const user = usersData.find((user) => user.uid === userId);
    if (user) {
      const currentCoupon = user.coupon || 0;
      const newCouponValue = Math.max(0, currentCoupon - 1);
      updateUserCoupon(userId, newCouponValue);
    }
  };

 // Function to download QR code as PNG
 const downloadQRCode = async (uid) => {
  const qrCodeElement = document.getElementById(`qrCode-${uid}`);
  
  if (qrCodeElement) {
    const canvas = await html2canvas(qrCodeElement);
    canvas.toBlob((blob) => {
      saveAs(blob, `qr_code_${uid}.png`);
    });
  } else {
    console.error("QR code element not found");
  }
};

  return (
    <section className="users__section">
    {isAdmin ? (
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <div className="table-responsive">
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th>QR Code</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>No. Of Children</th>
                    <th>Coupon</th>
                    <th>Coupon Action</th>
                    <th>Action</th>
                    <th>Print</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="pt-5 fw-bold">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    usersData?.map((user) => (
                      <tr key={user.uid}>
                        <td>
                          {user.uid ? (
                            <div
                              id={`qrCode-${user.uid}`}
                              className="qr-code-print"
                            >
                              <QRCode value={user.uid} size={200} />
                            </div>
                          ) : (
                            <span>Error: QR CODE FAILED</span>
                          )}
                        </td>
                        <td>{user.displayName}</td>
                        <td>{user.email}</td>
                        <td>{user.numberOfChildren}</td>
                        <td>{user.coupon || 0}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => decreaseCoupon(user.uid)}
                          >
                            -
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => increaseCoupon(user.uid)}
                          >
                            +
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deleteUser(user.uid);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => downloadQRCode(user.uid)}
                          >
                            Download QR Code
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    ) : (
      <div>
        You don't have permission to view this page. Please contact your administrator.
      </div>
    )}
  </section>
);
};

export default Users;