import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import CouponScanner from "../CouponScanner";

const Coupons = () => {
  const { data: usersData, loading } = useGetData("users");


  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {/* Render your user data */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <CouponScanner usersData={usersData} />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Coupons;
