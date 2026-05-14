import { useEffect, useState } from "react";
import axios from "axios";

import StatCard from "../components/dashboard/Statcard";
import RevenueChart from "../components/dashboard/RevenueChart";
import PropertyPerformance from "../components/dashboard/PropertyPerformance";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH ALL DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesRes, agentsRes, clientsRes] = await Promise.all([
          axios.get("http://localhost:3001/properties"),
          axios.get("http://localhost:3001/agents"),
          axios.get("http://localhost:3001/clients"),
        ]);

        setProperties(propertiesRes.data);
        setAgents(agentsRes.data);
        setClients(clientsRes.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // PROPERTY STATS
  const availableProperties = properties.filter(
    (p) => p.status?.toLowerCase() === "available"
  ).length;

  const soldProperties = properties.filter(
    (p) => p.status?.toLowerCase() === "sold"
  ).length;

  const totalRevenue = properties
    .filter((p) => p.status?.toLowerCase() === "sold")
    .reduce((total, property) => total + Number(property.price || 0), 0);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* PAGE TITLE */}
      <div className="mb-8">
        <h1 className="text-4xl text-amber-50 font-bold">Dashboard Overview</h1>
        <p className="text-gray-300 mt-2">
          Monitor your properties, clients, and agents.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Properties"
          value={properties.length}
        />

        <StatCard
          title="Available Properties"
          value={availableProperties}
        />

        <StatCard
          title="Total Clients"
          value={clients.length}
        />

        <StatCard
          title="Active Agents"
          value={agents.length}
        />
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Sold Properties"
          value={soldProperties}
        />

        <StatCard
          title="Revenue"
          value={`Ksh ${totalRevenue.toLocaleString()}`}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* REVENUE CHART */}
        <div className="lg:col-span-2 bg-black rounded-xl shadow-md p-4">
          <RevenueChart properties={properties} />
        </div>

        {/* PROPERTY PERFORMANCE */}
        <div className="bg-black rounded-xl shadow-md p-4">
          <PropertyPerformance properties={properties} />
        </div>
      </div>
    </div>
  );
}