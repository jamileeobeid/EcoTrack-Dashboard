import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../components/LandingPage.css";

export default function AboutPage() {
  return (
    <div className="landing-root">
      <section className="hero-section">
        <Container>
          <Row className="mb-4">
            <Col>
              <p className="hero-badge text-success text-uppercase fw-semibold mb-2">
                Theme A · EcoTrack
              </p>
              <h1 className="hero-title fw-bold mb-3">About EcoTrack</h1>
              <p className="hero-subtitle text-muted">
                EcoTrack is a course project for ISTE 340 that explores how
                client-side applications can present environmental data in a
                clear, meaningful way.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6}>
              <Card className="overview-card shadow border-0 h-100">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">Project Goals</h5>
                  <ul className="small text-muted mb-0 ps-3">
                    <li>
                      Integrate multiple public APIs (carbon, energy, weather)
                      into a single dashboard.
                    </li>
                    <li>
                      Practice building reusable React components using React
                      Bootstrap.
                    </li>
                    <li>
                      Experiment with data visualization ideas for sustainable
                      living.
                    </li>
                    <li>
                      Deliver a clean, responsive interface suitable for desktop
                      and mobile.
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="overview-card shadow border-0 h-100">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">Tech Stack</h5>
                  <ul className="small text-muted mb-3 ps-3">
                    <li>React + Vite for the frontend.</li>
                    <li>React Router for navigation between pages.</li>
                    <li>React Bootstrap for layout and UI components.</li>
                    <li>
                      Public APIs for environmental and weather information.
                    </li>
                  </ul>
                  <p className="small text-muted mb-0">
                    This project is built by Group 2 for{" "}
                    <strong>ISTE 340 – Client Programming</strong>, Fall 2025.
                    It focuses on good front-end structure, routing, and
                    visualization rather than perfect scientific accuracy.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={12}>
              <Card className="feature-card border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold mb-2">The Team</h5>
                  <p className="small text-muted mb-0">
                    Jamile Obeid, ID: 762004935<br />
                    Sara Hijazi, ID: 387006935<br />
                    Lana Kendakji, ID: 757001591<br />
                    Majd Abo Kalam, ID: 781003348<br />
                    Dimash Aidarbek, ID: 399002527
                </p>

                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="mt-5">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="success" size="lg">
                Back to Landing Page
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}