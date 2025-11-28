import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./components/Dashboard";
import WeatherPage from "./components/WeatherPage";
import FlightForm from "./components/FlightForm";
import { ThemeProvider } from "../src/contexts/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/page-weather" element={<WeatherPage />} />
        <Route path="/flight-form" element={<FlightForm />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
