import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/queries.css";

const Queries = () => {
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
                <a
                  href="https://api.whatsapp.com/send?phone=27825354271"
                  className="whatsapp-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Chat
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Queries;
