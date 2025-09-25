// src/components/Alert.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";

const Alert = () => {
  const { user } = useSelector((store) => store.auth); // get user from Redux
  const isAdmin = user?.role === "admin"; // only admins can create alerts

  const [alerts, setAlerts] = useState([]);
  const [audience, setAudience] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newAlert, setNewAlert] = useState({
    message: "",
    disasterId: "",
    audience: "all",
  });
  const [creating, setCreating] = useState(false);

  // Fetch alerts
  const fetchAlerts = async (audienceType = "all") => {
    setLoading(true);
    setError("");
    try {
      const url =
        audienceType === "all"
          ? "http://localhost:8000/api/v1/alert/all"
          : `http://localhost:8000/api/v1/alert/audience/${audienceType}`;
      const res = await axios.get(url);
      setAlerts(res.data.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlert((prev) => ({ ...prev, [name]: value }));
  };

  // Create new alert
  const handleCreateAlert = async (e) => {
    e.preventDefault();
    if (!newAlert.message) {
      setError("Message is required");
      return;
    }
    setCreating(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/alert/create",
        newAlert
      );
      setAlerts((prev) => [res.data.data, ...prev]);
      setNewAlert({ message: "", disasterId: "", audience: "all" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create alert");
    }
    setCreating(false);
  };

  useEffect(() => {
    fetchAlerts(audience);
  }, [audience]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Alerts</h1>

        {/* Create Alert Form (Admins only) */}
        {isAdmin && (
          <div className="border p-4 rounded mb-6 shadow">
            <h2 className="text-xl font-semibold mb-3">Create New Alert</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleCreateAlert} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Message</label>
                <textarea
                  name="message"
                  value={newAlert.message}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Disaster ID</label>
                <input
                  type="text"
                  name="disasterId"
                  value={newAlert.disasterId}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Audience</label>
                <select
                  name="audience"
                  value={newAlert.audience}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                >
                  <option value="all">All</option>
                  <option value="volunteers">Volunteers</option>
                  <option value="admins">Admins</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                disabled={creating}
              >
                {creating ? "Creating..." : "Create Alert"}
              </button>
            </form>
          </div>
        )}

        {/* Filter by Audience */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Filter by Audience:</label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="volunteers">Volunteers</option>
            <option value="admins">Admins</option>
          </select>
        </div>

        {/* Alerts List */}
        {loading && <p>Loading alerts...</p>}
        {!loading && alerts.length === 0 && <p>No alerts found.</p>}

        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li
              key={alert._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <p className="font-semibold text-lg">{alert.message}</p>
              {alert.disasterId && (
                <p className="text-sm text-gray-600 mt-1">
                  Disaster: {alert.disasterId.type || "N/A"} -{" "}
                  {alert.disasterId.location
                    ? typeof alert.disasterId.location === "object"
                      ? `Lat: ${alert.disasterId.location.lat}, Lng: ${alert.disasterId.location.lng}`
                      : alert.disasterId.location
                    : "N/A"}{" "}
                  ({alert.disasterId.severity || "N/A"})
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Audience: {alert.audience}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Created at: {new Date(alert.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Alert;
