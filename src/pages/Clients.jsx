import { useEffect, useState } from "react";
import axios from "axios";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);

  // FETCH
  const fetchClients = async () => {
    const res = await axios.get(
      "http://localhost:3001/clients"
    );

    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD
const handleSubmit = async (e) => {
  e.preventDefault();

  if (editingId) {
    await axios.put(
      `http://localhost:3001/clients/${editingId}`,
      form
    );
  } else {
    await axios.post(
      "http://localhost:3001/clients",
      form
    );
  }

  fetchClients();

  setEditingId(null);

  setForm({
    name: "",
    email: "",
    phone: "",
  });

  setShowForm(false);
};

  //EDIT
  const editClient = (client) => {
  setForm(client);
  setEditingId(client.id);
  setShowForm(true);
};

  // DELETE
  const deleteClient = async (id) => {
    await axios.delete(
      `http://localhost:3001/clients/${id}`
    );

    fetchClients();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Clients
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
        >
          {showForm
            ? "Close Form"
            : "+ Add Client"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md border mb-6 grid gap-4 max-w-xl"
        >
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <button className="bg-cyan-600 text-white p-3 rounded-lg">
            Save Client
          </button>
        </form>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-medium">
                  {client.name}
                </td>

                <td className="p-4">
                  {client.email}
                </td>

                <td className="p-4">
                  {client.phone}
                </td>

                <td className="p-4">
                  <td className="p-4 space-x-2">

  <button
    onClick={() => editClient(client)}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteClient(client.id)}
    className="bg-red-500 text-white px-4 py-2 rounded-lg"
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