import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "4rem",
        backgroundColor: isDark ? "#020617" : "#f5f7fb",
        color: isDark ? "#e5e7eb" : "#0f172a",
      }}
    >
      <Container>
        {/* Top row with title + theme toggle */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button
            as={Link}
            to="/"
            variant="success"
            size="lg"
            className="btn btn-link p-0 text-decoration-none back-btn"
          >
            ← Back
          </Button>
          <h1 className="h4 mb-0">EcoTrack Dashboard</h1>
          <ThemeToggle />
        </div>

        <Card
          className="overview-card p-4"
          style={{
            backgroundColor: isDark ? "#0b1220" : "#ffffff",
            color: isDark ? "#e5e7eb" : "#0f172a",
            borderColor: isDark ? "#1f2937" : "rgba(0,0,0,0.125)",
          }}
        >
          <Button
            as={Link}
            to="/flight-form"
            variant="success"
            size="lg"
            className="w-100 shadow-sm mb-3"
          >
            Greenhouse Gas Emissions
          </Button>

          <Button
            as={Link}
            to="/page-weather"
            variant={isDark ? "outline-light" : "outline-success"}
            size="lg"
            className="w-100 shadow-sm"
          >
            Weather
          </Button>
        </Card>
      </Container>
      <footer
        style={{
          backgroundColor: isDark ? "#020617" : "#f8fafc",
          color: isDark ? "#9ca3af" : "#475569",
          borderTop: isDark ? "1px solid #1f2937" : "1px solid #e5e7eb",
          padding: "1rem 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.9rem",
          }}
        >
          <span>Group 2 · ISTE 340 – Client Programming · Fall 2025</span>
          <span>Theme A · React · Vite · React Bootstrap</span>
        </div>
      </footer>

    </div>
  );
}
