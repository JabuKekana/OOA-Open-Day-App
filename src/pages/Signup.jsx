import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../styles/login.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import useAuth from "../custom-hooks/useAuth";
import botImg from "../assets/images/CHATBOT-02 1.png";
import logoImg from "../assets/images/landing-page-img.png";
// import CircleAnimation from "../components/UI/backgroundAnimation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); 
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleEmailAndPasswordSignUp = async () => {
    setLoading(true);

    try {
      // Check if all required fields are provided
      if (!fullName || !email || !password || !numberOfChildren) {
        toast.error("Please provide all required information.");
        setLoading(false);
        return;
      }

      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user in Firestore with additional information
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: fullName,
        email: user.email,
        photoURL: user.photoURL,
        coupon: 1,
        numberOfChildren: parseInt(numberOfChildren),
        isAdmin: false,
        isMarshal: false,
      });

      // Create a coupon document for the user
      await setDoc(doc(db, "coupons", user.uid), {
        uid: user.uid,
      });

      setLoading(false);
      toast.success("Successfully signed up");
      navigate("/home");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleEmailAndPasswordLogin = async () => {
    setLoading(true);

    try {
      // Check if email and password are provided
      if (!email || !password) {
        toast.error("Please provide both email and password.");
        setLoading(false);
        return;
      }

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      setLoading(false);
      toast.success("Successfully logged in");
      navigate("/home");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // Toggle between sign-up and login forms
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Helmet title={isSignUp ? "Sign Up" : "Login"}>
      <section className="landing__header">
        <div className="landing__header__img">
          <img src={logoImg} alt="Header" className="header-image" />
        </div>
      </section>
      <section className="signup__page">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4 animate">Welcome <br/>to our Open Day App</h3>
              <img className="bot-image" src={botImg} alt="Background" />
              <Form className="auth__form">
                {isSignUp && (
                  <FormGroup>
                    <Label for="fullName">Full Name</Label>
                    <Input className="input__field"
                      type="text"
                      id="fullName" placeholder="Enter Full Name(s)"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </FormGroup>
                )}
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input className="input__field"
                    type="email"
                    id="email" placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input className="input__field"
                    type="password"
                    id="password" placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                {isSignUp && (
                  <FormGroup>
                    <Label for="numberOfChildren">Number of Children</Label>
                    <Input className="input__field"
                      type="number"
                      id="numberOfChildren" placeholder="Enter No. of children"
                      value={numberOfChildren}
                      onChange={(e) => setNumberOfChildren(e.target.value)}
                    />
                  </FormGroup>
                )}
                <Button
                  type="button"
                  className={isSignUp ? "sign-up-button" : "login-button"}
                  onClick={isSignUp ? handleEmailAndPasswordSignUp : handleEmailAndPasswordLogin}
                  disabled={loading}
                >
                  {isSignUp ? "SIGN UP" : "LOGIN"}
                </Button>
                <div className="toggle-link" onClick={toggleForm}>
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
