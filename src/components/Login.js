import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "../styles/auth.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch {
      setError("Failed to sign in");
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
            <div className="login-header text-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/golf-dev-2471d.appspot.com/o/spl_logo_2022.svg?alt=media&token=1091d7cb-dbd0-4e84-b391-9a2bf57c8c1f"
                width="150"
                height="150"
                className="d-inline-block align-top"
                alt="Seacoast Premiere League - 2022"
              />
              <h2 className="mb-4 mt-0">Login</h2>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group className="mb-4" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Login
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an Account <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
