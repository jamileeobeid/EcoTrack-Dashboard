import { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import { Button } from "react-bootstrap";

// ✅ import theme + toggle
import { useTheme } from "../contexts/ThemeContext.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { Link } from "react-router-dom";


export default function WeatherPage() {
  // Gulf region list
  const gulfRegions = [
    { name: "UAE (Dubai)", lat: 25.276987, lon: 55.296249 },
    { name: "Saudi Arabia (Riyadh)", lat: 24.7136, lon: 46.6753 },
    { name: "Kuwait", lat: 29.3759, lon: 47.9774 },
    { name: "Qatar (Doha)", lat: 25.2854, lon: 51.531 },
    { name: "Bahrain", lat: 26.0667, lon: 50.5577 },
    { name: "Oman (Muscat)", lat: 23.588, lon: 58.3829 },
  ];

  // State for single selected region
  const [weatherData, setWeatherData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

  // State for all-weather comparison
  const [allWeather, setAllWeather] = useState([]);

  // OpenWeatherMap API key
  const API_KEY = "2618d24e26f8a5ca7a35a6cf9bae9d94";

  // ✅ get current theme
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Fetch single region
  const handleSelect = async (e) => {
    const name = e.target.value;
    setSelectedRegion(name);

    // Find region by name in list
    const region = gulfRegions.find((r) => r.name === name);
    if (!region) return;

    const { lat, lon } = region;

    // Using Vite proxy
    const url = `/weather/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Fetch all regions for comparisons
  const fetchAllRegions = async () => {
    try {
      const dataList = await Promise.all(
        gulfRegions.map(async (r) => {
          const res = await fetch(
            `/weather/data/2.5/weather?lat=${r.lat}&lon=${r.lon}&appid=${API_KEY}`
          );
          return await res.json();
        })
      );

      setAllWeather(dataList);
    } catch (err) {
      console.error("Fetch all regions error:", err);
    }
  };

  // Determine hottest and coldest regions
  const hottest = allWeather.length
    ? allWeather.reduce((a, b) => (a.main.temp > b.main.temp ? a : b))
    : null;

  const coldest = allWeather.length
    ? allWeather.reduce((a, b) => (a.main.temp < b.main.temp ? a : b))
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "4rem",
        paddingBottom: "3rem",
        backgroundColor: isDark ? "#020617" : "#f5f7fb",
        color: isDark ? "#e5e7eb" : "#0f172a",
      }}
    >
      <style>
  {`
    .dark-select {
      background-color: #020617;
      color: #e5e7eb;
      border-color: #1f2937;
    }

    .dark-select option {
      background-color: #020617;
      color: #e5e7eb;
    }

    .dark-select:focus {
      background-color: #020617;
      color: #e5e7eb;
      border-color: #22c55e;
      box-shadow: 0 0 0 0.2rem rgba(34, 197, 94, 0.25);
    }
  `}
</style>

      <div className="container">
        {/* header + theme toggle */}
        <div className="d-flex justify-content-between align-items-center mb-3">
           <Button
            as={Link}
            to="/dashboard"
            variant="success"
            size="lg"
            className="btn btn-link p-0 text-decoration-none back-btn"
          >
            ← Back
          </Button>
          <h2 className="mb-0">Weather Checker</h2>
          <ThemeToggle />
        </div>

        {/* Dropdown for single region */}
        <select
          className={`form-select w-50 ${isDark ? "dark-select" : ""}`}
          value={selectedRegion}
          onChange={handleSelect}
        >
          <option value="" disabled>
            Select a region
          </option>
          {gulfRegions.map((r) => (
            <option key={r.name} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>

        {/* Weather Card for selected region */}
        {weatherData && <WeatherCard data={weatherData} isDark={isDark} />}

        {/* Button to fetch all regions */}
        <div className="mt-3">
          <Button
            variant={isDark ? "outline-light" : "outline-success"}
            onClick={fetchAllRegions}
          >
            Show Region Comparisons & Insights
          </Button>
        </div>

        {/* Comparison Cards */}
        {allWeather.length > 0 && (
          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            {hottest && (
              <WeatherCard data={hottest} label="Hottest Region" isDark={isDark} />
            )}
            {coldest && (
              <WeatherCard data={coldest} label="Coldest Region" isDark={isDark} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
