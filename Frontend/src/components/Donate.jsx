import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";

export default function Donate() {
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    type: "money",
    amount: "",
    resourceName: "",
    resourceQuantity: "",
  });

  // Fetch all donations
  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/donation/getDono");
      setDonations(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle donation submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload =
        formData.type === "money"
          ? { type: "money", amount: Number(formData.amount) }
          : {
              type: "resource",
              resourceDetails: {
                name: formData.resourceName,
                quantity: Number(formData.resourceQuantity),
              },
            };

      const res = await axios.post(
        "http://localhost:8000/api/v1/donation/createDono",
        payload
      );

      setDonations((prev) => [...prev, res.data.data]);
      setFormData({
        type: "money",
        amount: "",
        resourceName: "",
        resourceQuantity: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Update donation status
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/donation/updateDono/${id}`,
        { status }
      );
      setDonations((prev) =>
        prev.map((d) => (d._id === id ? res.data.data : d))
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Delete donation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/donation/deleteDono/${id}`);
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Donations</h1>

        {/* Donation Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option value="money">Money</option>
              <option value="resource">Resource</option>
            </select>

            {formData.type === "money" && (
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3"
              />
            )}

            {formData.type === "resource" && (
              <>
                <input
                  type="text"
                  name="resourceName"
                  placeholder="Resource Name"
                  value={formData.resourceName}
                  onChange={handleChange}
                  required
                  className="border rounded-xl px-4 py-3"
                />
                <input
                  type="number"
                  name="resourceQuantity"
                  placeholder="Quantity"
                  value={formData.resourceQuantity}
                  onChange={handleChange}
                  required
                  className="border rounded-xl px-4 py-3"
                />
              </>
            )}
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
          >
            Add Donation
          </button>
        </form>

        {/* Donations Table */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">All Donations</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Amount / Resource</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((d) => (
                  <tr key={d._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 capitalize">{d.type}</td>
                    <td className="border px-4 py-2">
                      {d.type === "money"
                        ? `$${d.amount}`
                        : `${d.resourceDetails.name} (${d.resourceDetails.quantity})`}
                    </td>
                    <td className="border px-4 py-2 capitalize">{d.status}</td>
                    <td className="border px-4 py-2 space-x-2">
                      {d.status !== "completed" && (
                        <button
                          onClick={() => handleUpdateStatus(d._id, "completed")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Mark Completed
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(d._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border px-4 py-6 text-gray-500 italic text-center">
                    No donations available
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
