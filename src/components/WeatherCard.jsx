
import React from "react";


export default function WeatherCard({ data, label }) {
 if (!data) return null;


 const tempC = (data.main.temp - 273.15).toFixed(1);


 return (
   <div
     className="card mt-4"
     style={{
       maxWidth: "400px",
       margin: "0 auto",
       borderRadius: "16px",
       border: "1px solid #e0e0e0",
       padding: "2em",
       background: "#ffffff10",
       backdropFilter: "blur(8px)",
     }}
   >
     {/* Optional label for comparisons */}
     {label && (
       <h5
           style={{
           marginBottom: "5px",
           color:
               label.toLowerCase().includes("hot") ? "#ff4d4f" : // red for hot
               label.toLowerCase().includes("cold") ? "#4da6ff" : // blue for cold
               "#555", // default
           }}>
           {label}
       </h5>
       )}


     {/* City/Region name */}
     <h3 style={{ marginTop: "0", marginBottom: "10px" }}>{data.name}</h3>


     {/* Temperature */}
     <h2 style={{ marginTop: "0", marginBottom: "5px" }}>{tempC}°C</h2>


     {/* Weather description */}
     <p className="text-capitalize" style={{ marginBottom: "8px" }}>
       {data.weather[0].description}
     </p>


     {/* Humidity */}
     <p style={{ color: "#888" }}>
       <strong>Humidity:</strong> {data.main.humidity}%
     </p>
   </div>
 );
}



