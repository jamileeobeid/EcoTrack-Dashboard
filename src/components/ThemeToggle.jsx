import React from "react";
import Button from "react-bootstrap/Button";
import { useTheme } from "../contexts/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <Button
      variant="outline-secondary"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Current: ${theme} mode - Click to switch to ${nextTheme} mode`}
    >
      {theme === "light" ? "Toggle dark theme" : "Toggle light theme"}
    </Button>
  );
}
