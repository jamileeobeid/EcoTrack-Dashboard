import { useState, useEffect } from "react";
import "../assets/ActivityFilter.css";
import useFormValidation from "../hooks/useFormValidation";
import { validators } from "../utils/validators";
import airportsfile from "../assets/major_airports.json";
import FlightEmissions from "./FlightEmissions"; // Component to display results
import EmissionsChart from "./EmissionsChart.jsx"; // Component for insights chart
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

// Theme context and toggle button
import { useTheme } from "../contexts/ThemeContext.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

export default function FlightForm() {
  // Tracks selected flight type
  const [flight, setFlight] = useState("");

  // Market array for typical flights (multiple routes allowed)
  const [market, setMarket] = useState([{ origin: "", destination: "" }]);

  // Stores API response (success or error)
  const [emissionsResults, setEmissionsResults] = useState(null);

  // Controls visibility of insights chart after results load
  const [showInsights, setShowInsights] = useState(false);

  // Handles input validation using custom hook
  const { values, errors, handleChange } = useFormValidation(
    {
      origin: "",
      destination: "",
      airline_code: "",
      flight_number: "",
      departure_day: "",
      departure_month: "",
      departure_year: "",
    },
    validators
  );

  // Theme handling
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Clear old results when flight type changes
  useEffect(() => {
  setEmissionsResults(null);
  setShowInsights(false);
  }, [flight]);

  /**
   * updateMarket()
   * Updates a specific origin/destination field for a typical flight
   * Also performs per-field validation instantly
   */
  function updateMarket(index, field, value) {
    const updated = [...market];
    updated[index][field] = value;

    // Validate origin field
    if (field === "origin") {
      updated[index].originError = airportsfile.airports.includes(
        value.trim().toUpperCase()
      )
        ? ""
        : "Invalid Airport Code";
    }

    // Validate destination field
    if (field === "destination") {
      updated[index].destinationError = airportsfile.airports.includes(
        value.trim().toUpperCase()
      )
        ? ""
        : "Invalid Airport Code";
    }



    setMarket(updated);
  }

  /**
   * addMarket()
   * Adds a new empty origin/destination row
   */
  function addMarket() {
    setMarket([...market, { origin: "", destination: "" }]);
  }

  /**
   * handleSubmit()
   * Handles API request for either:
   * - Typical Flight Emissions
   * - Actual Flight Emissions
   * Also performs error handling and stores results for display
   */
  async function handleSubmit(e) {
    e.preventDefault(); // Prevents page from automatic reload and allows us to handle form submission
    setShowInsights(false); // Reset chart when new data arrives

    let payload = {};
    let endpoint = "";

    // Payload for typical flight
    if (flight === "typical-flight") {
      endpoint =
        "/flight/v1/flights:computeTypicalFlightEmissions?key=AIzaSyB--bHPz5HFAID1l083Fqw-SqYGrDTxGNs";

        // Creating payload block (array) that API expects 
      payload.markets = market.map((m) => ({
        origin: m.origin.toUpperCase(),
        destination: m.destination.toUpperCase(),
      }));
    }

    // Payload for actual flight
    else if (flight === "actual-flight") {
      endpoint =
        "/flight/v1/flights:computeFlightEmissions?key=AIzaSyB--bHPz5HFAID1l083Fqw-SqYGrDTxGNs";

      payload.flights = [
        {
          origin: values.origin.toUpperCase(),
          destination: values.destination.toUpperCase(),
          operatingCarrierCode: values.airline_code.toUpperCase(),
          flightNumber: Number(values.flight_number),
          departureDate: {
            year: Number(values.departure_year),
            month: Number(values.departure_month),
            day: Number(values.departure_day),
          },
        },
      ];
    }

    // Make request
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setEmissionsResults(data); // Store API response
      console.log(data);

      // Additional validation: actual flight must return emissions
      if (flight === "actual-flight") {
        if (
          !data.flightEmissions[0].emissionsGramsPerPax ||
          data.flightEmissions[0].emissionsGramsPerPax.length === 0
        ) {
          throw new Error(
            "Error sending request: Actual flight doesn't exist or API returned no data."
          );
        }
      }
    } catch (error) {
      // Store error message so the component can display it
      setEmissionsResults({ error: error.message });
    }
  }

  return (
    <div
      className={isDark ? "dark-mode" : ""}
      style={{
        minHeight: "100vh",
        paddingTop: "4rem",
        paddingBottom: "3rem",
        backgroundColor: isDark ? "#020617" : "#f5f7fb",
        color: isDark ? "#e5e7eb" : "#0f172a",
      }}
    >
      {/* Inline style overrides for dark mode */}
      <style>
        {`
      .dark-mode input::placeholder,
      .dark-mode textarea::placeholder {
        color: #94a3b8;
      }

      .dark-mode .form-control,
      .dark-mode .form-select {
        background-color: #020617;
        color: #e5e7eb;
        border-color: #1f2937;
      }

      .dark-mode .form-control:focus,
      .dark-mode .form-select:focus {
        background-color: #020617;
        color: #e5e7eb;
        border-color: #22c55e;
        box-shadow: 0 0 0 0.2rem rgba(34, 197, 94, 0.25);
      }

      .dark-mode label {
        color: #cbd5f5;
      }
    `}
      </style>

      {/* Header row containing Back button, title, and theme toggle */}
      <div className="container d-flex justify-content-between align-items-center mb-3">
        <Button
          as={Link}
          to="/dashboard"
          variant="success"
          size="lg"
          className="btn btn-link p-0 text-decoration-none back-btn"
        >
          ← Back
        </Button>

        <h1 className="h5 mb-0">Flight Emissions Calculator</h1>

        <ThemeToggle />
      </div>

      {/* Main form wrapper */}
      <form
        className="container p-4 border rounded shadow-sm"
        onSubmit={handleSubmit}
        style={{
          backgroundColor: isDark ? "#0b1220" : "#ffffff",
          color: isDark ? "#e5e7eb" : "#0f172a",
          borderColor: isDark ? "#1f2937" : "rgba(0,0,0,0.125)",
        }}
      >
        {/* Flight Type Dropdown */}
        <div className="mb-3">
          <label className="form-label fw-bold">Select Flight Type</label>
          <select
            value={flight}
            onChange={(e) => setFlight(e.target.value)}
            className="form-select"
          >
            <option value="">- Select a Flight Type -</option>
            <option value="typical-flight">Typical Flight</option>
            <option value="actual-flight">Actual Flight</option>
          </select>
        </div>

        {/* Typical Flight Section */}
        {flight === "typical-flight" && (
          <>
            {market.map((market, index) => (
              <div
                key={index}
                className="border rounded p-3 mb-3"
                style={{
                  backgroundColor: isDark ? "#020617" : "#f8f9fa",
                  color: isDark ? "#e5e7eb" : "#0f172a",
                  borderColor: isDark ? "#1f2937" : "#dee2e6",
                }}
              >
                <h6 className="fw-bold mb-3">Market {index + 1}</h6>

                {/* Origin Input */}
                <div className="mb-3">
                  <label className="form-label">Origin</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Origin Airport"
                    value={market.origin || ""}
                    onChange={(e) =>
                      updateMarket(index, "origin", e.target.value)
                      
                    }
                    required
                  />
                  {market.originError && (
                    <div className="text-danger small mt-1">
                      {market.originError}
                    </div>
                  )}
                </div>

                {/* Destination Input */}
                <div className="mb-3">
                  <label className="form-label">Destination</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Destination Airport"
                    value={market.destination || ""}
                    onChange={(e) =>
                      updateMarket(index, "destination", e.target.value)
                    }
                    required
                  />
                  {market.destinationError && (
                    <div className="text-danger small mt-1">
                      {market.destinationError}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Add Market Button */}
            <button
              type="button"
              onClick={addMarket}
              className="btn btn-outline-primary mb-3"
            >
              + Add Market
            </button>
          </>
        )}

        {/* Actual Flight Section */}
        {flight === "actual-flight" && (
          <>
            {/* Origin */}
            <div className="mb-3">
              <label className="form-label">Origin</label>
              <input
                name="origin"
                className="form-control"
                type="text"
                placeholder="Enter origin IATA code (e.g., DXB)"
                value={values.origin || ""}
                onChange={handleChange}
                required
              />
              {errors.origin && (
                <div className="text-danger small mt-1">{errors.origin}</div>
              )}
            </div>

            {/* Destination */}
            <div className="mb-3">
              <label className="form-label">Destination</label>
              <input
                name="destination"
                className="form-control"
                type="text"
                placeholder="Enter destination IATA code (e.g., LAX)"
                value={values.destination || ""}
                onChange={handleChange}
                required
              />
              {errors.destination && (
                <div className="text-danger small mt-1">
                  {errors.destination}
                </div>
              )}
            </div>

            {/* Airline Code */}
            <div className="mb-3">
              <label className="form-label">Airline Code</label>
              <input
                name="airline_code"
                className="form-control"
                type="text"
                placeholder="2-letter IATA (e.g., EK, AF, BA)"
                value={values.airline_code || ""}
                onChange={handleChange}
                required
              />
              {errors.airline_code && (
                <div className="text-danger small mt-1">
                  {errors.airline_code}
                </div>
              )}
            </div>

            {/* Flight Number */}
            <div className="mb-3">
              <label className="form-label">Flight Number</label>
              <input
                name="flight_number"
                className="form-control"
                type="number"
                placeholder="e.g., 52, 334, 1115"
                value={values.flight_number || ""}
                onChange={handleChange}
                required
              />
              {errors.flight_number && (
                <div className="text-danger small mt-1">
                  {errors.flight_number}
                </div>
              )}
            </div>

            {/* Date Inputs */}
            <div className="row">
              {/* Day */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Day</label>
                <input
                  name="departure_day"
                  className="form-control"
                  type="number"
                  placeholder="1–31"
                  value={values.departure_day || ""}
                  onChange={handleChange}
                  required
                />
                {errors.departure_day && (
                  <div className="text-danger small mt-1">
                    {errors.departure_day}
                  </div>
                )}
              </div>

              {/* Month */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Month</label>
                <input
                  name="departure_month"
                  className="form-control"
                  type="number"
                  placeholder="1–12"
                  value={values.departure_month || ""}
                  onChange={handleChange}
                  required
                />
                {errors.departure_month && (
                  <div className="text-danger small mt-1">
                    {errors.departure_month}
                  </div>
                )}
              </div>

              {/* Year */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Year</label>
                <input
                  name="departure_year"
                  className="form-control"
                  type="number"
                  placeholder="e.g., 2025"
                  value={values.departure_year || ""}
                  onChange={handleChange}
                  required
                />
                {errors.departure_year && (
                  <div className="text-danger small mt-1">
                    {errors.departure_year}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100 mt-3">
          Calculate Emissions
        </button>
      </form>

      {/* Show Emissions Data */}
      {emissionsResults && (
        <div className="container mt-4">
          <FlightEmissions results={emissionsResults} isDark={isDark} />
        </div>
      )}

      {/* Show "Insights" button if results exist but chart not shown yet */}
      {emissionsResults && !showInsights && (
        <div className="container mt-3">
          <button
            className="btn btn-primary btn-success w-100"
            onClick={() => setShowInsights(true)}
          >
            Show Insights
          </button>
        </div>
      )}

      {/* Show Chart once insights are toggled on */}
      {showInsights && (
        <div className="container mt-4">
          <EmissionsChart data={emissionsResults} />
        </div>
      )}
    </div>
  );
}
