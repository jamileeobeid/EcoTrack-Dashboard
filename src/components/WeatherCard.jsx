import React from "react";

export default function WeatherCard({ data, label, isDark = false }) {
  if (!data) return null;

  const tempC = (data.main.temp - 273.15).toFixed(1);

  const cardStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    borderRadius: "16px",
    padding: "2em",
    border: isDark ? "1px solid #1f2937" : "1px solid #e0e0e0",
    background: isDark ? "#0b1220cc" : "#ffffff10",
    backdropFilter: "blur(8px)",
    color: isDark ? "#e5e7eb" : "#0f172a",
  };

  const baseLabelColor = isDark ? "#e5e7eb" : "#555";

  return (
    <div className="card mt-4" style={cardStyle}>
      {/* Optional label for comparisons */}
      {label && (
        <h5
          style={{
            marginBottom: "5px",
            color: label.toLowerCase().includes("hot")
              ? "#ff4d4f" // red for hot
              : label.toLowerCase().includes("cold")
              ? "#4da6ff" // blue for cold
              : baseLabelColor, // default
          }}
        >
          {label}
        </h5>
      )}

      {/* City/Region name */}
      <h3 style={{ marginTop: 0, marginBottom: "10px" }}>{data.name}</h3>

      {/* Temperature */}
      <h2 style={{ marginTop: 0, marginBottom: "5px" }}>{tempC}°C</h2>

      {/* Weather description */}
      <p className="text-capitalize" style={{ marginBottom: "8px" }}>
        {data.weather[0].description}
      </p>

      {/* Humidity */}
      <p style={{ color: isDark ? "#9ca3af" : "#888" }}>
        <strong>Humidity:</strong> {data.main.humidity}%
      </p>
    </div>
  );
}
