import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/navigation.css";
import { useData } from "../contexts/DataContext";

export default function Navigation() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const { userData } = useData();
  const history = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }

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
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/Leaderboard">Leaderboard</Nav.Link>
            <Nav.Link href="../Schedule">Schedule</Nav.Link>
            <Nav.Link href="../About">About</Nav.Link>
          </Nav>
          <Nav style={{ maxHeight: "100px" }} navbarScroll>
            <NavDropdown
              title={userData && userData.firstName}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="../update-profile">
                Update Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
