import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col xs={12} md={6} className="text-center text-md-right">
            <a
              href="mailto:mink_hugues@outlook.com"
              className="text-light mx-2"
            >
              Email us
            </a>
            |
            <a href="https://wa.me/+22879632772" className="text-light mx-2">
              Reach out on WhatsApp
            </a>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-left">
            &copy; 2023 Global Shop
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
