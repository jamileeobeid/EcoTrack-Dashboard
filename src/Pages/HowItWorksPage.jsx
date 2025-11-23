import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../components/LandingPage.css";

export default function HowItWorksPage() {
  return (
    <div className="landing-root">
      <section className="hero-section">
        <Container>
          <Row className="mb-4">
            <Col>
              <p className="hero-badge text-success text-uppercase fw-semibold mb-2">
                Theme A · EcoTrack
              </p>
              <h1 className="hero-title fw-bold mb-3">
                How EcoTrack Works
              </h1>
              <p className="hero-subtitle text-muted">
                EcoTrack brings together carbon, energy, and weather data into a
                single, readable dashboard so users can quickly understand their
                environmental impact.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold mb-2">1. Collect</h5>
                  <p className="text-muted small mb-0">
                    EcoTrack pulls data from public carbon, energy, and weather
                    APIs. These sources provide live or frequently updated
                    numbers for emissions, temperature, and renewable energy
                    share.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold mb-2">2. Process</h5>
                  <p className="text-muted small mb-0">
                    The raw data is cleaned, normalized, and aligned by time and
                    location. We compute daily footprints, weekly trends, and
                    summary indicators that are easier to interpret.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold mb-2">3. Visualize</h5>
                  <p className="text-muted small mb-0">
                    The dashboard turns numbers into charts, tiles, and color-
                    coded badges (low/medium/high). Users can scan their
                    footprint at a glance instead of reading through tables.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5 g-4">
            <Col md={6}>
              <Card className="overview-card shadow border-0 h-100">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">User Workflow</h5>
                  <ol className="small text-muted mb-0 ps-3">
                    <li>Open EcoTrack and land on the overview dashboard.</li>
                    <li>
                      View today&apos;s estimated footprint and weekly trend.
                    </li>
                    <li>
                      Check the weather and renewable energy tiles for context.
                    </li>
                    <li>
                      Navigate to deeper views (e.g., emissions by region) for
                      more detail.
                    </li>
                  </ol>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="overview-card shadow border-0 h-100">
                <Card.Body>
                  <h5 className="fw-semibold mb-3">Design Principles</h5>
                  <ul className="small text-muted mb-0 ps-3">
                    <li>Minimal text, strong visual hierarchy.</li>
                    <li>Consistent color coding for status and trends.</li>
                    <li>
                      Group related indicators into cards to reduce cognitive
                      load.
                    </li>
                    <li>
                      Make it easy to compare “today vs this week” at a glance.
                    </li>
                  </ul>
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