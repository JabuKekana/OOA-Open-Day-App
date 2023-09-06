import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";
import "../styles/login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      setLoading(false);
      toast.success("Successfully logged in");

      // Redirect to "/dashboard" upon successful login
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      <section className="signup__page">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">ADMIN LOGIN</h3>

              <Form className="auth__form">
                <button
                  type="button"
                  className="buy__btn auth__btn"
                  onClick={handleGoogleSignIn}
                >
                  SIGN UP
                </button>
                <p>
                  Don't have an account?{" "}
                  <Link to="/">Create an account</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
