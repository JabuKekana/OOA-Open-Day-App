import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/queries.css";

const Queries = () => {
  const [inputText, setInputText] = useState("");
  const [responses, setResponses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSendMessage = () => {
    if (formData.message.trim() !== "") {
      setResponses([...responses, { message: formData.message, sender: "user" }]);
      setFormData({ ...formData, message: "" }); // Clear the message field
      // Simulate a response from an agent after a brief delay
      setTimeout(() => {
        setResponses([...responses, { message: "Thank you for your message!", sender: "agent" }]);
      }, 1000);
    }
  };

  return (
    <Helmet title={"Queries"}>
      <section className="queries__section">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="section__title">Queries</h2>
              <p className="section__subtitle">
                Welcome to our queries page. If you have any questions or need assistance, feel free to reach out to us.
              </p>
              <div className="queries__content">
                <div className="messages">
                  {responses.map((response, index) => (
                    <div
                      key={index}
                      className={`message ${response.sender === "user" ? "user" : "agent"}`}
                    >
                      {response.message}
                    </div>
                  ))}
                </div>
                <form className="input-container">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  <button type="button" onClick={handleSendMessage}>Send</button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Queries;
