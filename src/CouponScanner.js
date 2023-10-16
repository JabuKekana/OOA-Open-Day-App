





import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import UserDetails from "./UserDetails"; 
import QrReader from "modern-react-qr-reader"; 

const CouponScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(true); 

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      setCameraOpen(false); 
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleQRCodeResult = (result) => {
    if (result) {
      setScannedData(result.text);
      setCameraOpen(false); 
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="6">
          <h2>QR Code Scanner</h2>
          {cameraOpen && (
            // Render the QrReader component from modern-react-qr-reader
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              onResult={handleQRCodeResult}
              style={{ width: "100%" }}
              constraints={ {facingMode: 'environment'} }
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
