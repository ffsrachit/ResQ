import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import { RESOURCE_API_END_POINT } from "@/utils/constants";

export default function Resource() {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    lat: "",
    lng: "",
    status: "available",
  });
  const [editId, setEditId] = useState(null); // ID of resource being edited

  // Fetch all resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get(`${RESOURCE_API_END_POINT}/all`);
        setResources(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResources();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, quantity, lat, lng, status } = formData;

      if (editId) {
        // Update resource
        const response = await axios.put(
          `${RESOURCE_API_END_POINT}/${editId}`,
          {
            name,
            quantity: Number(quantity),
            location: {
              lat: lat ? parseFloat(lat) : null,
              lng: lng ? parseFloat(lng) : null,
            },
            status,
          }
        );
        setResources((prev) =>
          prev.map((res) => (res._id === editId ? response.data.data : res))
        );
        setEditId(null);
      } else {
        // Create resource
        const response = await axios.post(
          `${RESOURCE_API_END_POINT}/create`,
          {
            name,
            quantity: Number(quantity),
            location: {
              lat: lat ? parseFloat(lat) : null,
              lng: lng ? parseFloat(lng) : null,
            },
            status,
          }
        );
        setResources((prev) => [...prev, response.data.data]);
      }

      // Reset form
      setFormData({ name: "", quantity: "", lat: "", lng: "", status: "available" });
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  // Delete resource
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      await axios.delete(`${RESOURCE_API_END_POINT}/${id}`);
      setResources((prev) => prev.filter((res) => res._id !== id));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  // Edit resource (load data into form)
  const handleEdit = (res) => {
    setFormData({
      name: res.name,
      quantity: res.quantity,
      lat: res.location?.lat || "",
      lng: res.location?.lng || "",
      status: res.status,
    });
    setEditId(res._id);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Resource Management</h1>

        {/* Resource Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Resource Name (e.g., Food, Medicine)"
              value={formData.name}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3"
            />
            <input
              type="text"
              name="lat"
              placeholder="Latitude"
              value={formData.lat}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />
            <input
              type="text"
              name="lng"
              placeholder="Longitude"
              value={formData.lng}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option value="available">Available</option>
              <option value="allocated">Allocated</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl disabled:opacity-50"
            disabled={!formData.name || !formData.quantity}
          >
            {editId ? "Update Resource" : "Add Resource"}
          </button>
        </form>

        {/* Resource List */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Available Resources</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.length > 0 ? (
                resources.map((res) => (
                  <tr key={res._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{res.name}</td>
                    <td className="border px-4 py-2">{res.quantity}</td>
                    <td className="border px-4 py-2">
                      {res.location?.lat}, {res.location?.lng}
                    </td>
                    <td className="border px-4 py-2 capitalize">{res.status}</td>
                    <td className="border px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(res)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-xl"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(res._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border px-4 py-6 text-gray-500 italic text-center">
                    No resources available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
