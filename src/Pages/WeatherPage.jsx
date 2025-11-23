import { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import { Button } from "react-bootstrap";


export default function WeatherPage() {
 // Gulf region list
 const gulfRegions = [
   { name: "UAE (Dubai)", lat: 25.276987, lon: 55.296249 },
   { name: "Saudi Arabia (Riyadh)", lat: 24.7136, lon: 46.6753 },
   { name: "Kuwait", lat: 29.3759, lon: 47.9774 },
   { name: "Qatar (Doha)", lat: 25.2854, lon: 51.5310 },
   { name: "Bahrain", lat: 26.0667, lon: 50.5577 },
   { name: "Oman (Muscat)", lat: 23.5880, lon: 58.3829 },
 ];


 const [weatherData, setWeatherData] = useState(null);
 const [selectedRegion, setSelectedRegion] = useState("");
 const [allWeather, setAllWeather] = useState([]);


 const API_KEY = "2618d24e26f8a5ca7a35a6cf9bae9d94";


 // Fetch single region
 const handleSelect = async (e) => {
   const name = e.target.value;
   setSelectedRegion(name);


   const region = gulfRegions.find((r) => r.name === name);
   if (!region) return;


   const { lat, lon } = region;
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;


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
           `https://api.openweathermap.org/data/2.5/weather?lat=${r.lat}&lon=${r.lon}&appid=${API_KEY}`
         );
         return res.json();
       })
     );
     setAllWeather(dataList);
   } catch (err) {
     console.error("Fetch all regions error:", err);
   }
 };


 // Determine hottest and coldest regions
 const hottest = allWeather.length
   ? allWeather.reduce((a, b) => a.main.temp > b.main.temp ? a : b)
   : null;


 const coldest = allWeather.length
   ? allWeather.reduce((a, b) => a.main.temp < b.main.temp ? a : b)
   : null;


 return (
   <div className="container mt-4">
     <h2 className="mb-3">Weather Checker</h2>


     {/* Dropdown for single region */}
     <select
       className="form-select w-50"
       value={selectedRegion}
       onChange={handleSelect}
     >
       <option value="" disabled>Select a region</option>
       {gulfRegions.map((r) => (
         <option key={r.name} value={r.name}>{r.name}</option>
       ))}
     </select>


     {/* Weather Card for selected region */}
     {weatherData && <WeatherCard data={weatherData} />}


     {/* Button to fetch all regions */}
     <div className="mt-3">
       <Button variant="outline-success" onClick={fetchAllRegions}>
         Show Region Comparisons
       </Button>
     </div>


     {/* Comparison Cards */}
     {allWeather.length > 0 && (
        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
        {hottest && <WeatherCard data={hottest} label="Hottest Region" />}
        {coldest && <WeatherCard data={coldest} label="Coldest Region" />}
       </div>
       )}
   </div>
 );
}
