import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const teamRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        teamRef.current.value
      );
      history("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className="auth-container">
      <div>
        <Card
          className="auth-card auth-card-container"
          style={{ width: "20rem" }}
        >
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" id="fname">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" ref={firstNameRef} required />
              </Form.Group>
              <Form.Group className="mb-4" id="team">
                <Form.Label>Team</Form.Label>
                <Form.Select type="select" ref={teamRef} required>
                  <option value="" disabled selected hidden>
                    Select Your Team
                  </option>
                  <option value="alex-mike">Alex &amp; Mike</option>
                  <option value="chuck-dave">Chuck &amp; Dave</option>
                  <option value="eric-dan">Eric &amp; Dan</option>
                  <option value="greg-nano">Greg &amp; Nano</option>
                  <option value="jeff-jason">Jeff &amp; Jason</option>
                  <option value="kyle-sean">Kyle &amp; Sean</option>
                  <option value="luke-jake">Luke &amp; Jake</option>
                  <option value="tim-ross">Tim &amp; Ross</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group className="mb-4" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
                <Form.Text className="text-muted">
                  Must contain more then 6 characters
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-4" id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
