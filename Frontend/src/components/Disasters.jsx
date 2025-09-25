import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "./shared/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { DISASTER_API_END_POINT } from "@/utils/constants";

export default function Disasters() {
  const { user } = useSelector((store) => store.auth);
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Create disaster form state
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    severity: "low",
    location: { lat: "", lng: "" },
  });
  const [creating, setCreating] = useState(false);

  // Fetch disasters
  const fetchDisasters = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${DISASTER_API_END_POINT}/getD`);
      setDisasters(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisasters();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lat" || name === "lng") {
      setFormData((prev) => ({ ...prev, location: { ...prev.location, [name]: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Create disaster
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.type || !formData.location.lat || !formData.location.lng) {
      setError("Type and location are required");
      return;
    }
    setCreating(true);
    setError("");
    try {
      const res = await axios.post(`${DISASTER_API_END_POINT}/create`, formData);
      setDisasters((prev) => [res.data.data, ...prev]);
      setFormData({ type: "", description: "", severity: "low", location: { lat: "", lng: "" } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create disaster");
    } finally {
      setCreating(false);
    }
  };

  // Delete disaster (admin only)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${DISASTER_API_END_POINT}/delete/${id}`);
      setDisasters((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Update disaster status (admin only)
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.put(`${DISASTER_API_END_POINT}/update/${id}`, { status });
      setDisasters((prev) => prev.map((d) => (d._id === id ? res.data.data : d)));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Active Disasters</h1>

        {/* Admin Create Disaster Form */}
        {user?.role === "admin" && (
          <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create New Disaster</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2 w-full"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2 w-full"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Severity</label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2 w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Latitude</label>
                  <input
                    type="number"
                    name="lat"
                    value={formData.location.lat}
                    onChange={handleChange}
                    step="any"
                    className="border rounded-xl px-4 py-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Longitude</label>
                  <input
                    type="number"
                    name="lng"
                    value={formData.location.lng}
                    onChange={handleChange}
                    step="any"
                    className="border rounded-xl px-4 py-2 w-full"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={creating}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl"
              >
                {creating ? "Creating..." : "Create Disaster"}
              </button>
            </form>
          </div>
        )}

        {/* Disasters List */}
        {loading ? (
          <p>Loading disasters...</p>
        ) : disasters.length === 0 ? (
          <p className="text-gray-600">No active disasters found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {disasters.map((d) => (
              <Card key={d._id} className="shadow-md border rounded-2xl">
                <CardContent className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold">{d.type}</h2>
                  <p className="text-gray-700">{d.description}</p>
                  <p className="text-sm text-gray-600">
                    📍 Lat: {d.location.lat}, Lng: {d.location.lng}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Severity:</span> {d.severity}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> {d.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Created At:</span>{" "}
                    {new Date(d.createdAt).toLocaleString()}
                  </p>

                  {/* Admin Actions */}
                  {user?.role === "admin" && (
                    <div className="flex gap-2 mt-2">
                      {d.status !== "resolved" && (
                        <button
                          onClick={() => handleUpdateStatus(d._id, "resolved")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Mark Resolved
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(d._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
