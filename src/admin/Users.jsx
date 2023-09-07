import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import "../styles/users.css";

// Import the new function for updating user coupons
import { updateDoc } from "firebase/firestore";

const Users = () => {
  const { data: usersData, loading } = useGetData("users");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("User deleted!");
  };

  // Define a function to update a user's coupon value
  const updateUserCoupon = async (userId, newCouponValue) => {
    const userDocRef = doc(db, "users", userId);

    try {
      await updateDoc(userDocRef, {
        coupon: newCouponValue, // Update the coupon field with the new value
      });

      toast.success("User coupon updated successfully");
    } catch (error) {
      console.error("Error updating user coupon:", error);
    }
  };

  // Function to handle increasing coupon
  const increaseCoupon = (userId) => {
    const user = usersData.find((user) => user.uid === userId);
    if (user) {
      const currentCoupon = user.coupon || 0;
      const newCouponValue = currentCoupon + 1;
      updateUserCoupon(userId, newCouponValue);
    }
  };

  // Function to handle decreasing coupon
  const decreaseCoupon = (userId) => {
    const user = usersData.find((user) => user.uid === userId);
    if (user) {
      const currentCoupon = user.coupon || 0;
      const newCouponValue = Math.max(0, currentCoupon - 1); // Ensure coupon doesn't go negative
      updateUserCoupon(userId, newCouponValue);
    }
  };

  // Function to print QR code
  const printQRCode = (uid) => {
    const qrCodeElement = document.getElementById(`qrCode-${uid}`);

    if (qrCodeElement) {
      const printWindow = window.open("", "", "width=400,height=400");
      printWindow.document.open();
      printWindow.document.write("<html><head><title>Print</title></head><body>");
      printWindow.document.write(`
        <style>
          body {
            text-align: center;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          @media print {
            .qr-code-print {
              width: 250px;
              height: 250px;
            }
          }
        </style>
      `);
      printWindow.document.write(qrCodeElement.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error("QR code element not found");
    }
  };

  return (
    <section className="users__section">
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
                            <div id={`qrCode-${user.uid}`} className="qr-code-print">
                              <QRCode value={user.uid} size={200} /> {/* Adjust the size prop as needed */}
                            </div>
                          ) : (
                            <span>Error: QR CODE FAILED</span>
                          )}
                        </td>
                        <td>{user.displayName}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.numberOfChildren} 
                        </td>
                        <td>{user.coupon || 0}</td>{" "}
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
                            onClick={() => printQRCode(user.uid)}
                          >
                            Print QR Code
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
    </section>
  );
};

export default Users;
