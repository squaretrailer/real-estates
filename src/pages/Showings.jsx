import { useEffect, useState } from "react";
import axios from "axios";

export default function Showings() {
  const [showings, setShowings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [clients, setClients] = useState([]);
  const [agents, setAgents] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    propertyId: "",
    clientId: "",
    agentId: "",
    date: "",
    status: "scheduled",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [s, p, c, a] = await Promise.all([
        axios.get("http://localhost:3001/showings"),
        axios.get("http://localhost:3001/properties"),
        axios.get("http://localhost:3001/clients"),
        axios.get("http://localhost:3001/agents"),
      ]);

      setShowings(s.data);
      setProperties(p.data);
      setClients(c.data);
      setAgents(a.data);
    };

    fetchData();
  }, []);

  const getProperty = (id) =>
    properties.find((p) => String(p.id) === String(id));

  const getClient = (id) => clients.find((c) => String(c.id) === String(id));

  const getAgent = (id) => agents.find((a) => String(a.id) === String(id));

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3001/showings", form);

    const res = await axios.get("http://localhost:3001/showings");
    setShowings(res.data);

    setForm({
      propertyId: "",
      clientId: "",
      agentId: "",
      date: "",
      status: "scheduled",
    });

    setShowForm(false);
  };

  const deleteShowing = async (id) => {
    await axios.delete(`http://localhost:3001/showings/${id}`);
    setShowings(showings.filter((s) => s.id !== id));
  };

  const updateStatus = async (id, newStatus) => {
    await axios.patch(`http://localhost:3001/showings/${id}`, {
      status: newStatus,
    });

    const res = await axios.get("http://localhost:3001/showings");
    setShowings(res.data);
  };

  const markPropertyAsSold = async (propertyId) => {
    await axios.patch(`http://localhost:3001/properties/${propertyId}`, {
      status: "Sold",
    });

    const [p, s] = await Promise.all([
      axios.get("http://localhost:3001/properties"),
      axios.get("http://localhost:3001/showings"),
    ]);

    setProperties(p.data);
    setShowings(s.data);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-amber-50 font-bold">Showings</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? "Close Form" : "+ Add Showing"}
        </button>
      </div>

      <div className="relative flex-1 text-amber-50 sm:flex-none">
        <input
          type="text"
          placeholder="Search by property, client, agent or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-500 p-3 rounded w-full mb-6 focus:ring-2 outline-none"
        />
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-amber-50 p-6 rounded mb-6 grid gap-4"
        >
          <select
            name="propertyId"
            value={form.propertyId}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded"
            required
          >
            <option value="">Select Property</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          <select
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded"
            required
          >
            <option value="">Select Client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="agentId"
            value={form.agentId}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded"
            required
          >
            <option value="">Select Agent</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded"
            required
          />

          <button className="flex-1 bg-linear-to-r from-cyan-800 to-cyan-500 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl">
            Save Showing
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showings
          .filter((s) => {
            const q = search.toLowerCase();
            const property = getProperty(s.propertyId);
            const client = getClient(s.clientId);
            const agent = getAgent(s.agentId);
            return (
              property?.title?.toLowerCase().includes(q) ||
              client?.name?.toLowerCase().includes(q) ||
              agent?.name?.toLowerCase().includes(q) ||
              s.status?.toLowerCase().includes(q) ||
              s.date?.includes(q)
            );
          })
          .map((s) => {
            const property = getProperty(s.propertyId);
            const client = getClient(s.clientId);
            const agent = getAgent(s.agentId);

            return (
              <div className="bg-gray-900 overflow-hidden">
                <div className="relative">
                  <img
                    src={property?.image || "https://placehold.co/600x400"}
                    className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                  />

                  <div
                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                      s.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : s.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {s.status}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-amber-50">
                    {property?.title}
                  </h2>

                  <p className="text-gray-300 text-sm mt-1">
                    {property?.location}
                  </p>

                  <p className="text-xl font-bold mt-3 text-cyan-500">
                   <span className="text-sm text-cyan-900"> Ksh </span>{Number(property?.price || 0).toLocaleString()}
                  </p>

                  <div className="mt-4 space-y-1 text-sm text-gray-300">
                    <p>
                      <strong>CLIENT:</strong> {client?.name}
                    </p>

                    <p>
                      <strong>AGENT:</strong> {agent?.name}
                    </p>

                    <p>
                      <strong>Date:</strong> {s.date}
                    </p>
                  </div>

                  <div className="mt-4">
                    <select
                      value={s.status}
                      onChange={(e) => updateStatus(s.id, e.target.value)}
                      className="border border-gray-300 p-2 rounded w-full bg-amber-50 outline-none"
                    >
                      <option className="bg-blue-300" value="scheduled">Scheduled</option>
                      <option className="bg-green-300" value="completed">Completed</option>
                      <option className="bg-red-300" value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {property?.status === "Sold" ? (
                    <div className="mt-3 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center font-semibold">
                      SOLD
                    </div>
                  ) : (
                    s.status === "completed" &&
                    property?.id && (
                      <button
                        onClick={() => markPropertyAsSold(property.id)}
                        className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg w-full transition"
                      >
                        Mark Property as Sold
                      </button>
                    )
                  )}

                  <button
                    onClick={() => deleteShowing(s.id)}
                    className="mt-3 bg-red-100 hover:bg-red-600 text-red-500 px-4 py-2 rounded-lg w-full transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
