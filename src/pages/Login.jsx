import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailAndPasswordSignUp = async () => {
    setLoading(true);

    try {
      // Check if both email and password are provided
      if (!email || !password) {
        toast.error("Please provide both email and password.");
        setLoading(false);
        return;
      }

      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      setLoading(false);
      toast.success("Account created successfully");

      // Redirect to "/dashboard" upon successful signup
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleEmailAndPasswordLogin = async () => {
    setLoading(true);

    try {
      // Check if both email and password are provided
      if (!email || !password) {
        toast.error("Please provide both email and password.");
        setLoading(false);
        return;
      }

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

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
            <Col lg="6" className="m-auto">
              <h3 className="fw-bold mb-4">ADMIN LOGIN</h3>

              <Form className="auth__form">
                <FormGroup>
                  <Label for="email" className="label">Email</Label>
                  <Input
                    type="email"
                    id="email" placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password" className="label">Password</Label>
                  <Input
                    type="password"
                    id="password" placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <Button
                  type="button"
                  className="buy__btn auth__btn"
                  onClick={handleEmailAndPasswordLogin}
                  disabled={loading}
                >
                  LOGIN
                </Button>

                {/* <Button
                  type="button"
                  className="buy__btn auth__btn"
                  onClick={handleEmailAndPasswordSignUp}
                  disabled={loading}
                >
                  SIGN UP
                </Button> */}
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
