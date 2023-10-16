import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import  useAuth  from "../../custom-hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { auth } from "../../firebase-config"; 
import { onAuthStateChanged } from "firebase/auth"; 
import useGetData from "../../custom-hooks/useGetData";
import "./footer.css";

const Footer = () => {

  const year = new Date().getFullYear();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMarshal, setIsMarshal] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        const userUid = currentUser.uid;
        const userDocRef = doc(db, "users", userUid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setIsAdmin(userData && userData.isAdmin);
          setIsMarshal(userData && userData.isMarshal);
        }
      }
    };

    fetchUserRole();
  }, [currentUser]);

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-4" md="6">
            <div>
              <Link to="/" ><button>Sign out</button></Link>
            </div><br/><br/>
            {isAdmin && (
  <div>
    <Link to="/dashboard">
      <button>Admin</button><br /><br />
    </Link>
  </div>
)}
{isMarshal && (
  <Link to="/marshal-coupons">
  <button>QR Code Scanner</button><br />
</Link>
)}
<br/>
            <div className="logo">
              <div className="text-white">
                <h1>Qurtuba Online Academy</h1>
              </div>
            </div>

            <p className="footer__text mt-4">
              We are a digital Islamic distance education provider based in
              South Africa. Our dual schooling curriculum ensures students a
              broad academic future, while simultaneously providing access to a
              quality Islamic studies curriculum, including Arabic.
            </p>
          </Col>
          <Col lg="3" md="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Top Categories</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-o">
                  <a
                    href="https://qurtubaonline.co.za/apply-now/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                  </a>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-o">
                  <a
                    href="https://qurtubaonline.co.za/course-offerings/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Course Offerings
                  </a>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-o">
                  <a
                    href="https://qurtubaonline.co.za/course-offerings/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fees
                  </a>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-o">
                  <a
                    href="https://qurtubaonline.co.za/guidance-counsellor/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Guidance Counsellor
                  </a>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Links</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-o">
                  <a
                    href="https://qurtubaonline.co.za/events/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Events
                  </a>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-o">
                  <a
                    href="https://qurtubaonline.co.za/virtual-clubs/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Virtual Clubs
                  </a>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-o">
                  <a
                    href="https://qurtubaonline.co.za/faq/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FAQs
                  </a>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-o">
                  <a
                    href="https://qurtubaonline.co.za/careers/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Careers
                  </a>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Contact</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-o d-flex align-tems-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p>+2710 109 1784</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-o d-flex align-tems-center gap-2">
                  <span>
                    <i className="ri-whatsapp-line"></i>
                  </span>
                  <p>+27825354271</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-o d-flex align-tems-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p>info@qurtubaonline.co.za</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12">
            <p className="footer__copyright">
              Copyright | All rights reserved {year}{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
