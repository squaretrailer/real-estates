import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function RevenueChart({ properties }) {
  // GROUP SOLD PROPERTIES BY STATUS
  const soldRevenue = properties
    ?.filter(
      (property) =>
        property.status?.toLowerCase() === "sold"
    )
    .reduce(
      (total, property) =>
        total + Number(property.price || 0),
      0
    );

  const availableRevenue = properties
    ?.filter(
      (property) =>
        property.status?.toLowerCase() === "available"
    )
    .reduce(
      (total, property) =>
        total + Number(property.price || 0),
      0
    );

  const data = [
    {
      name: "Available",
      revenue: availableRevenue,
    },
    {
      name: "Sold",
      revenue: soldRevenue,
    },
  ];

  return (
    <div className="bg-cyan-800 p-6 rounded-2xl shadow-sm h-[400px]">
      <h2 className="text-xl font-semibold mb-6">
        Revenue Overview
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <Tooltip />

          <Bar
            dataKey="revenue"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;