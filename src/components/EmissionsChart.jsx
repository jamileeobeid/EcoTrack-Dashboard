import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function EmissionsChart({ data }) {
  console.log("CHART INPUT:", data);

  if (!data) return null;

  if (data.error) {
    return (
      <div className="alert alert-danger mt-3" role="alert">
        No insights exist. Invalid flight data
      </div>
    );
  }
  let chartData = [];

  // Typical flight
  if (data.typicalFlightEmissions) {
    chartData = data.typicalFlightEmissions.map((item) => ({
      route: `${item.market.origin} → ${item.market.destination}`,
      economy: item.emissionsGramsPerPax.economy,
      premiumEconomy: item.emissionsGramsPerPax.premiumEconomy,
      business: item.emissionsGramsPerPax.business,
      first: item.emissionsGramsPerPax.first,
    }));
  }

  // Actual flight
  else if (data.flightEmissions) {
    const f = data.flightEmissions[0];
    chartData = [
      {
        route: `${f.flight.origin} → ${f.flight.destination}`,
        economy: f.emissionsGramsPerPax?.economy ?? 0,
        premiumEconomy: f.emissionsGramsPerPax?.premiumEconomy ?? 0,
        business: f.emissionsGramsPerPax?.business ?? 0,
        first: f.emissionsGramsPerPax?.first ?? 0,
      },
    ];
  }

  //  Handle errors
  if (!Array.isArray(chartData)) return null;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="route" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="economy" fill="#8884d8" />
        <Bar dataKey="premiumEconomy" fill="#82ca9d" />
        <Bar dataKey="business" fill="#ffc658" />
        <Bar dataKey="first" fill="#ff8042" />
      </BarChart>
    </ResponsiveContainer>
  );
}
