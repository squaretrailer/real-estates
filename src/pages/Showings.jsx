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

  // FETCH DATA
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

  // HELPERS
  const getProperty = (id) =>
    properties.find((p) => String(p.id) === String(id));

  const getClient = (id) => clients.find((c) => String(c.id) === String(id));

  const getAgent = (id) => agents.find((a) => String(a.id) === String(id));

  // INPUT HANDLER
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD SHOWING
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

  // DELETE SHOWING
  const deleteShowing = async (id) => {
    await axios.delete(`http://localhost:3001/showings/${id}`);
    setShowings(showings.filter((s) => s.id !== id));
  };

  // UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    await axios.patch(`http://localhost:3001/showings/${id}`, {
      status: newStatus,
    });

    const res = await axios.get("http://localhost:3001/showings");
    setShowings(res.data);
  };

  // MARK PROPERTY AS SOLD
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
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Showings</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? "Close Form" : "+ Add Showing"}
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by property, client, agent or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-lg w-full mb-6 focus:ring-2 focus:ring-cyan-400 outline-none"
      />

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-6 grid gap-4"
        >
          <select
            name="propertyId"
            value={form.propertyId}
            onChange={handleChange}
            className="border p-3 rounded"
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
            className="border p-3 rounded"
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
            className="border p-3 rounded"
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
            className="border p-3 rounded"
            required
          />

          <button className="bg-green-600 text-white p-3 rounded">
            Save Showing
          </button>
        </form>
      )}

      {/* CARDS */}
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
            // <div
            //   key={s.id}
            //   className="bg-white rounded-2xl shadow-md overflow-hidden border"
            // >
            //   {/* IMAGE */}
            //   <img
            //     src={property?.image || "https://placehold.co/600x400"}
            //     className="w-full h-52 object-cover"
            //     alt="property"
            //   />

            //   {/* CONTENT */}
            //   <div className="p-5">
            //     {/* TITLE + STATUS */}
            //     <div className="flex justify-between items-start">
            //       <h2 className="text-xl font-bold">
            //         {property?.title || "Unknown Property"}
            //       </h2>

            //       <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            //         {s.status}
            //       </span>
            //     </div>

            //     {/* DETAILS */}
            //     <p className="text-gray-500 mt-2">
            //       📍 {property?.location || "No location"}
            //     </p>

            //     <p className="text-2xl font-bold mt-3 text-cyan-900">
            //       Ksh {Number(property?.price || 0).toLocaleString()}
            //     </p>

            //     <p className="mt-3 text-gray-700">
            //       <strong>Client:</strong> {client?.name || "Unknown"}
            //     </p>

            //     <p className="text-gray-700">
            //       <strong>Agent:</strong> {agent?.name || "Unknown"}
            //     </p>

            //     <p className="text-gray-700">
            //       <strong>Date:</strong> {s.date}
            //     </p>

            //     {/* STATUS */}
            //     <div className="mt-4">
            //       <select
            //         value={s.status}
            //         onChange={(e) => updateStatus(s.id, e.target.value)}
            //         className="border p-2 rounded w-full"
            //       >
            //         <option value="scheduled">Scheduled</option>
            //         <option value="completed">Completed</option>
            //         <option value="cancelled">Cancelled</option>
            //       </select>
            //     </div>

            //     {/* MARK AS SOLD */}
            //     {property?.status === "Sold" ? (
            //       <div className="mt-3 bg-green-100 text-green-700 px-4 py-2 rounded-lg w-full text-center font-semibold">
            //         SOLD
            //       </div>
            //     ) : (
            //       s.status === "completed" &&
            //       property?.id && (
            //         <button
            //           onClick={() => markPropertyAsSold(property.id)}
            //           className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded-lg w-full hover:bg-emerald-700"
            //         >
            //           Mark Property as Sold
            //         </button>
            //       )
            //     )}

            //     {/* DELETE */}
            //     <button
            //       onClick={() => deleteShowing(s.id)}
            //       className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            //     >
            //       Delete
            //     </button>
            //   </div>
            // </div>

            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border group">
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={property?.image || "https://placehold.co/600x400"}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                />

                {/* STATUS BADGE */}
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

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-800">
                  {property?.title}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {property?.location}
                </p>

                <p className="text-xl font-bold mt-3 text-cyan-900">
                  Ksh {Number(property?.price || 0).toLocaleString()}
                </p>

                {/* DETAILS GRID */}
                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p>
                    <strong>Client:</strong> {client?.name}
                  </p>

                  <p>
                    <strong>Agent:</strong> {agent?.name}
                  </p>

                  <p>
                    <strong>Date:</strong> {s.date}
                  </p>
                </div>

                {/* STATUS SELECT */}
                <div className="mt-4">
                  <select
                    value={s.status}
                    onChange={(e) => updateStatus(s.id, e.target.value)}
                    className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 outline-none"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* SOLD BUTTON */}
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

                {/* DELETE */}
                <button
                  onClick={() => deleteShowing(s.id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full transition"
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
