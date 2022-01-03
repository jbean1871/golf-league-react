import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/hero.css";

export default function Hero() {
  return (
    <Container fluid>
      <Row className="spl_hero">
        <Col>
          <Container>
            <Row>
              <Col>
                <h5 className="text-white">2022 Season</h5>
                <h1 className="text-white">Seacoast Premiere League</h1>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
