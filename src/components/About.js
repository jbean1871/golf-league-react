import React from "react";
import Navigation from "./Navigation";
import { Container, Row, Col } from "react-bootstrap";

import "../styles/about.css";

export default function About() {
  return (
    <>
      <Navigation />
      <Container>
        <Row className="spl_history-row">
          <Col className="spl_history-img-container">
            <img
              className="history-img"
              src="https://firebasestorage.googleapis.com/v0/b/golf-dev-2471d.appspot.com/o/spl_founders.png?alt=media&token=34b68ab2-5954-4d71-97b6-ce7907e7adab"
              alt="spl founders photo"
            ></img>
          </Col>
          <Col>
            <h2>History</h2>
            <p>
              The Seacoast Premiere League (SPL), organization formed in the
              United States in 2020 at the instigation of Kyle towle, Alex James
              and Luke Boria, with the stated purpose of promoting interest in
              shitty golf, elevating the standards of the game, and drinking on
              the course. The annual SPL championship is hosted every year after
              the 14 round season comes to an end.
            </p>
            <p>The SPL headquarters are located in beautiful New Hampshire.</p>
          </Col>
        </Row>
        <Row className="spl_champ-row">
          <h3 className="text-center mb-5">Past Champions</h3>
          <Col className="spl_champs">
            <div className="spl_champ-pending"></div>
            <h5 className="spl_champ-year">2022</h5>
            <h4>Could Be You</h4>
          </Col>
          <Col className="spl_champs">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/golf-dev-2471d.appspot.com/o/champs_chuck-dave.jpg?alt=media&token=e495b0f1-f7b5-4d79-9c76-3996b230aa6b9"
              className="spl_champ-photo"
            ></img>
            <h5 className="spl_champ-year">2021</h5>
            <h4>Chuck & Dave</h4>
          </Col>
          <Col className="spl_champs">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/golf-dev-2471d.appspot.com/o/champs_dan-eric.jpg?alt=media&token=39475857-e4a1-40e7-833d-7ba0aed433d9"
              className="spl_champ-photo"
            ></img>
            <h5 className="spl_champ-year">2020</h5>
            <h4>Eric & Dan</h4>
          </Col>
        </Row>
      </Container>
    </>
  );
}
