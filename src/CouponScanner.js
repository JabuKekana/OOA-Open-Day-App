import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Container, Row, Col } from "reactstrap";
import UserDetails from "./UserDetails"; // Import the UserDetails component

const CouponScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(true); // State to control whether the camera is open

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      setCameraOpen(false); // Close the camera when data is scanned
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleQRCodeResult = (result) => {
    if (result) {
      setScannedData(result.text);
      setCameraOpen(false); // Close the camera when data is scanned
    }
  };
  

  return (
    <Container>
      <Row>
        <Col lg="6">
          <h2>QR Code Scanner</h2>
          {cameraOpen && ( // Render the QrReader component only if cameraOpen is true
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              onResult={handleQRCodeResult}
              style={{ width: "100%" }}
            />
          )}
        </Col>
        <Col lg="6">
          {/* Conditional rendering of UserDetails component */}
          {scannedData && <UserDetails uid={scannedData} />}
        </Col>
      </Row>
    </Container>
  );
};

export default CouponScanner;
