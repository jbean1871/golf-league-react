import React from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "../styles/navigation.css";

export default function Navigation(user) {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/golf-dev-2471d.appspot.com/o/spl_logo_2022.svg?alt=media&token=1091d7cb-dbd0-4e84-b391-9a2bf57c8c1f"
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Seacoast Premiere League - 2022"
          />
          <h3>SPL</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/Leaderboard">Leaderboard</Nav.Link>
            <Nav.Link href="/schedule">Schedule</Nav.Link>
          </Nav>
          <p>UserName Here</p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
