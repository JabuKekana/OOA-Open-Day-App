import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library
import "../styles/add-user.css";

// Function to generate a random password
const generateRandomPassword = () => {
  const length = 8; // You can adjust the length as needed
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const AddUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = async () => {
    try {
      // Check if both Full Name and Email are provided
      if (!fullName || !email) {
        toast.error("Please provide Full Name and Email.");
        return;
      }

      // Generate a random password
      const generatedPassword = generateRandomPassword();

      // Create a new user with email and generated password
      const userCredential = await createUserWithEmailAndPassword(auth, email, generatedPassword);
      const user = userCredential.user;

      // Store user in Firestore with display name and generated UID
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: fullName,
        email,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/open-day-18e43.appspot.com/o/productImages%2Flogo.png?alt=media&token=a8995d2e-42c5-4828-ae30-5e90aede4eae",
        coupon: 0, // You can set the default coupon value here
      });

      // Create a coupon document for the user
      await setDoc(doc(db, "coupons", user.uid), {
        uid: user.uid,
        // Other coupon-related fields can be added here
      });

      toast.success("User added successfully");

      // Clear the input fields
      setFullName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("An error occurred while adding the user.");
    }
  };

  return (
    <section className="add-user-section">
    <Container>
      <Row>
          <h2>Manually Add User</h2>
          <Form>
            <FormGroup className="form-group">
              <Label for="fullName">Full Name</Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Label for="email">Email Address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <Button color="primary add-user-btn" onClick={handleAddUser}>
              Add User
            </Button>
          </Form>
      </Row>
    </Container>
    </section>
  );
};

export default AddUser;
