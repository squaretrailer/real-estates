import { useEffect, useState } from "react";
import axios from "axios";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    status: "",
    image: "",
  });

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:3001/properties");
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      price: "",
      status: "",
      image: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/properties/${editingId}`, {
          ...formData,
          price: Number(formData.price),
        });
      } else {
        await axios.post("http://localhost:3001/properties", {
          ...formData,
          price: Number(formData.price),
        });
      }
      fetchProperties();
      resetForm();
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const startEditing = (property) => {
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price,
      status: property.status,
      image: property.image || "",
    });
    setEditingId(property.id);
    setShowForm(true);
  };

  const filteredProperties = properties.filter((property) => {
    const term = searchTerm.toLowerCase();
    return (
      property.title.toLowerCase().includes(term) ||
      property.location.toLowerCase().includes(term)
    );
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-700";
      case "sold":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl text-amber-50 font-bold">Properties</h1>
        
        <div className="flex gap-3 w-full sm:w-auto">

          <div className="relative flex-1 text-amber-50 sm:flex-none">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-500 rounded focus:border-transparent outline-none w-full sm:w-64"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-cyan-600 text-amber-50 px-4 py-2 rounded-lg whitespace-nowrap"
          >
            {showForm ? "Close Form" : "+ Add Property"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-amber-50 rounded border border-gray-200 p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold bg-linear-to-r from-cyan-800 to-cyan-600 bg-clip-text text-transparent mb-6">
            {editingId ? " Edit Property" : " Add New Property"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (Ksh)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL (optional)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                placeholder="https://placehold.co/600x400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none bg-white"
                required
              >
                <option className="text-cyan-800" value="" disabled>Select status</option>
                <option className="text-cyan-800 bg-green-100" value="Available">Available</option>
                <option className="text-cyan-800 bg-red-100" value="Sold">Sold</option>
                <option className="text-cyan-800 bg-yellow-100" value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 bg-linear-to-r from-cyan-800 to-cyan-500 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl"
            >
              {editingId ? "Update Property" : " Save Property"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-lg">No properties match your search.</p>
          <p className="text-gray-400 text-sm mt-1">Try a different keyword or clear the search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-gray-900 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image || "https://placehold.co/600x400"}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                  alt={property.title}
                />
                <div
                  className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold text-amber-50">
                  {property.title}
                </h2>
                <p className="text-gray-100 text-sm mt-1">{property.location}</p>
                <p className="text-2xl font-bold mt-3 text-cyan-400">
                  <span className="text-cyan-800 text-sm"> Ksh </span> {Number(property.price).toLocaleString()}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => deleteProperty(property.id)}
                    className="bg-white text-red-500 px-4 py-2 rounded w-full"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => startEditing(property)}
                    className="bg-cyan-600 text-white px-4 py-2 rounded w-full"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}