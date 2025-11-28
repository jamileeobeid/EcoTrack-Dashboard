export default function FlightEmissions({ results, isDark = false }) {
  // If no results were passed in, render nothing
  if (!results) return null;

  // Dynamic styling for light vs. dark mode container
  const containerStyle = {
    backgroundColor: isDark ? "#0b1220" : "#ffffff",
    color: isDark ? "#e5e7eb" : "#0f172a",
    borderColor: isDark ? "#1f2937" : "rgba(0,0,0,0.125)",
  };

  // If results contain an error message, show Bootstrap alert
  if (results.error) {
    return (
      <div className="alert alert-danger mt-3" role="alert">
        {results.error}
      </div>
    );
  }

  // If the API returned *typical flight* emissions, display the list
  if (results.typicalFlightEmissions) {
    return (
      <div className="mt-4 p-3 border rounded" style={containerStyle}>
        <h5>Typical Flight Emissions</h5>

        {results.typicalFlightEmissions.map((item, i) => (
          // Render each market segment (origin → destination)
          <div key={i} className="mb-3">
            <strong>
              {item.market.origin} → {item.market.destination}
            </strong>

            {/* Show emissions for all cabin classes */}
            <ul>
              <li>Economy: {item.emissionsGramsPerPax.economy} g</li>
              <li>
                Premium Economy: {item.emissionsGramsPerPax.premiumEconomy} g
              </li>
              <li>Business: {item.emissionsGramsPerPax.business} g</li>
              <li>First: {item.emissionsGramsPerPax.first} g</li>
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // If the API returned an actual flight emission response
  if (results.flightEmissions) {
    // Actual flights only return one flight, so use index 0
    const f = results.flightEmissions[0];

    return (
      <div className="mt-4 p-3 border rounded" style={containerStyle}>
        <h5>Actual Flight Emissions</h5>

        {/* Display route: origin → destination */}
        <p>
          <strong>
            {f.flight.origin} → {f.flight.destination}
          </strong>
        </p>

        {/* Show emissions for each cabin class */}
        <ul>
          <li>Economy: {f.emissionsGramsPerPax.economy} g</li>
          <li>Premium Economy: {f.emissionsGramsPerPax.premiumEconomy} g</li>
          <li>Business: {f.emissionsGramsPerPax.business} g</li>
          <li>First: {f.emissionsGramsPerPax.first} g</li>
        </ul>
      </div>
    );
  }

  // Fallback if none of the above matched
  return null;
}
