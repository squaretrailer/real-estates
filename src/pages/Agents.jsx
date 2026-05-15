import { useEffect, useState } from "react";
import axios from "axios";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchAgents = async () => {
    const res = await axios.get("http://localhost:3001/agents");

    setAgents(res.data);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`http://localhost:3001/agents/${editingId}`, form);
    } else {
      await axios.post("http://localhost:3001/agents", form);
    }

    fetchAgents();

    setEditingId(null);

    setForm({
      name: "",
      email: "",
      phone: "",
    });

    setShowForm(false);
  };

  const editAgents = (agent) => {
    setForm(agent);
    setEditingId(agent.id);
    setShowForm(true);
  };

  const deleteAgents = async (id) => {
    await axios.delete(`http://localhost:3001/agents/${id}`);

    fetchAgents();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-amber-50 font-bold">Agents</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-600 text-amber-50 px-4 py-2 rounded-lg"
        >
          {showForm ? "Close Form" : "+ Add Agent"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-amber-50 border-gray-200 p-6 rounded border mb-6 grid gap-4 max-w-xl"
        >
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 border-gray-300 rounded"
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 border-gray-300 rounded-lg"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-3 border-gray-300 rounded-lg"
            required
          />

          <button className="flex-1 bg-linear-to-r from-cyan-800 to-cyan-500 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl">
            Save Agent
          </button>
        </form>
      )}

      <div className="bg-gray-900 text-amber-50 rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-t">
                <td className="p-4 font-medium">{agent.name}</td>

                <td className="p-4">{agent.email}</td>

                <td className="p-4">{agent.phone}</td>

                <td className="p-4">
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => editAgents(agent)}
                      className="bg-cyan-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteAgents(agent.id)}
                      className="bg-white text-red-500 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


