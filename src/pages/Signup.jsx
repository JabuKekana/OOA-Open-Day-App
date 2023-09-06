import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import "../styles/login.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import useAuth from "../custom-hooks/useAuth";
import botImg from "../assets/images/CHATBOT-02 1.png";
import logoImg from "../assets/images/landing-page-img.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Use the hook to get current user

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Store user in Firestore with display name
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        // Add a coupon field and initialize it with a value of 0
        coupon: 0,
      });

      // Create a coupon document for the user
      await setDoc(doc(db, "coupons", user.uid), {
        uid: user.uid,
        // Other coupon-related fields can be added here
      });

      setLoading(false);
      toast.success("Successfully signed up");
      navigate("/home");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      <section className="landing__header">
        <div className="landing__header__img">
          <img src={logoImg} alt="Header" className="header-image" />
        </div>
      </section>
      <section className="signup__page">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Welcome <br/>to our Open Day App</h3>
              <img className="bot-image" src={botImg} alt="Background" />
              <Form className="auth__form">
                {currentUser ? (
                  // If the user is already signed in, display a different button
                  <button
                    type="button"
                    className="go-to-home-button"
                    onClick={() => navigate("/home")}
                  >
                    Go to Home
                  </button>
                ) : (
                  // If the user is not signed in, display the sign-up button
                  <button
                    type="button"
                    className="sign-up-button"
                    onClick={handleGoogleSignIn}
                  >
                    SIGN UP
                  </button>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;




