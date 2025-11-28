import airportfile from "../assets/major_airports.json";
import airlinefile from "../assets/major_airlines.json";

// Dictionary of validation functions used by the form fields
export const validators = {
  // Validate origin airport: must exist in our airports JSON list
  origin: (v) =>
    v.trim() === "" ? "Required" :airportfile.airports.includes(v.toUpperCase().trim()) ? "" : "Invalid Airport Code",

  // Validate destination airport: same rule as origin
  destination: (v) =>
    v.trim() === "" ? "Required" : airportfile.airports.includes(v.toUpperCase().trim()) ? "" : "Invalid Airport Code",
    
  

  // Validate airline code: must exist in our airline JSON list
  airline_code: (v) =>
    v.trim() === "" ? "Required" : airlinefile.airlines.includes(v.toUpperCase().trim())
      ? ""
      : "Invalid Airline Code",

  // Validate flight number: must be a positive number
  flight_number: (v) => ( v.trim() === "" ? "Required" : v.trim() > 0 ? "" : "Must be a positive number"),

  // Validate departure day: must be between 1 and 31
  departure_day: (v) =>
   (  v.trim() === "" ? "Required" : 1 <= v.trim() && v.trim() <= 31 ? "" : "Invalid day (1–31 required)"),

  // Validate departure month: must be between 1 and 12
  departure_month: (v) =>
   ( v.trim() === "" ? "Required": 1 <= v.trim() && v.trim() <= 12 ? "" : "Invalid month (1–12 required)"),

  // Validate departure year: must be current year or next year
  departure_year: (v) => {
    if (!v) return "Year is required";
    const year = Number(v.trim());
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    return year >= currentYear && year <= nextYear
      ? ""
      : `Invalid year (${currentYear}–${nextYear} allowed)`;
  },
};
