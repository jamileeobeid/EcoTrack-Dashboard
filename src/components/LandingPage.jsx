import "./LandingPage.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Navbar, Nav, Card } from "react-bootstrap";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-root">
      {/* Navbar */}
      <Navbar
        bg="white"
        expand="lg"
        className="shadow-sm sticky-top eco-navbar"
      >
        <Container>
          <Navbar.Brand href="#" className="fw-bold text-success">
            EcoTrack
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="ecotrack-navbar" />
          <Navbar.Collapse id="ecotrack-navbar">
            <Nav className="ms-auto eco-nav-links">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link as={Link} to="/how-it-works">How it Works</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center g-4">
            {/* Left text */}
            <Col md={6}>
              <p className="hero-badge text-success text-uppercase fw-semibold mb-2">
                Theme A · EcoTrack
              </p>
              <h1 className="hero-title fw-bold mb-3">
                Track Your Impact.
                <br />
                <span className="text-success">Live Smarter, Greener.</span>
              </h1>
              <p className="hero-subtitle text-muted mb-4">
                EcoTrack is a sustainable living dashboard that helps users
                monitor carbon emissions, renewable energy usage, and key
                environmental indicators through clear, data-driven visuals.
              </p>
              <div className="hero-buttons mb-3">
                      <Link to="/weather" style={{ textDecoration: "none" }}>
                        <Button variant="success" size="lg">
                          Enter Dashboard
                        </Button>
                      </Link>
                <Button variant="outline-success" size="lg">
                  Learn More
                </Button>
              </div>
              <p className="text-muted small mb-0">
                Built with React, Vite, and React Bootstrap · Powered by public
                carbon, energy, and weather APIs.
              </p>
            </Col>

            {/* Right card */}
            <Col md={6}>
              <Card className="overview-card shadow border-0">
                <Card.Body className="p-4">
                  <p className="text-uppercase small text-muted mb-2">
                    Preview Snapshot
                  </p>
                  <h5 className="fw-semibold mb-3">
                    Sustainable Living Overview
                  </h5>

                  <div className="mb-3">
                    <p className="small text-muted mb-1">
                      Today&apos;s Estimated Footprint
                    </p>
                    <h3 className="fw-bold mb-0">
                      5.3 kg CO₂e
                      <span className="badge bg-success ms-2">Low</span>
                    </h3>
                  </div>

                  <div className="mb-3">
                    <p className="small text-muted mb-1">
                      Weekly Emissions Trend
                    </p>
                    <div className="fake-chart-wrapper">
                      <div className="fake-chart">
                        <div className="chart-bar bar-1" />
                        <div className="chart-bar bar-2" />
                        <div className="chart-bar bar-3" />
                        <div className="chart-bar bar-4" />
                        <div className="chart-bar bar-5" />
                        <div className="chart-bar bar-6" />
                        <div className="chart-bar bar-7" />
                      </div>
                      <p className="small text-muted mt-1 mb-0">
                        Placeholder chart – to be replaced with real
                        visualizations.
                      </p>
                    </div>
                  </div>

                  <Row className="g-3">
                    <Col xs={6}>
                      <div className="info-tile">
                        <p className="small text-muted mb-1">
                          Weather Context
                        </p>
                        <p className="mb-0 small">
                          27°C · Clear skies
                          <br />
                          Suitable for outdoor activities.
                        </p>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="info-tile">
                        <p className="small text-muted mb-1">
                          Renewable Energy Share
                        </p>
                        <p className="mb-0 small">
                          38% from renewables
                          <br />
                          Up from 32% last week.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <Container>
          <h2 className="section-heading text-center fw-bold mb-3">
            What EcoTrack Offers
          </h2>
          <p className="text-center text-muted mb-5">
            A focused, data-driven dashboard that turns complex environmental
            metrics into clear insights.
          </p>

          <Row className="g-4">
            <Col md={4}>
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold mb-2">
                    Carbon Footprint Insights
                  </h5>
                  <p className="text-muted mb-0 small">
                    Explore emissions by country, region, or activity, powered
                    by live carbon APIs.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold mb-2">Weather-Aware Context</h5>
                  <p className="text-muted mb-0 small">
                    Align environmental indicators with current weather to
                    better explain usage patterns.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-semibold mb-2">Clean Visual Dashboards</h5>
                  <p className="text-muted mb-0 small">
                    Use charts, cards, and color-coded cues to make trends easy
                    to read at a glance.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer id="about" className="footer">
        <Container className="footer-inner">
          <span>Group 2 · ISTE 340 – Client Programming · Fall 2025</span>
          <span>Theme A · React · Vite · React Bootstrap</span>
        </Container>
      </footer>
    </div>
  );
}
