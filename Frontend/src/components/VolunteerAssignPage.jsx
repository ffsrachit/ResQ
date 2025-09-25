import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";

export default function VolunteerAssignPage() {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    disasterId: "",
    task: "",
    status: "pending",
  });
  const [editId, setEditId] = useState(null);

  const BASE_URL = "http://localhost:8000/api/v1/volunteer-assignment";

  // Fetch all assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/all`);
        setAssignments(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAssignments();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, disasterId, task, status } = formData;

    try {
      if (editId) {
        // Update assignment
        const res = await axios.put(`${BASE_URL}/${editId}`, {
          userId,
          disasterId,
          task,
          status,
        });
        setAssignments((prev) =>
          prev.map((a) => (a._id === editId ? res.data.data : a))
        );
        setEditId(null);
      } else {
        // Create assignment
        const res = await axios.post(`${BASE_URL}/create`, {
          userId,
          disasterId,
          task,
        });
        setAssignments((prev) => [res.data.data, ...prev]);
      }

      setFormData({ userId: "", disasterId: "", task: "", status: "pending" });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Delete assignment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setAssignments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Edit assignment
  const handleEdit = (a) => {
    setFormData({
      userId: a.userId?._id || a.userId,
      disasterId: a.disasterId?._id || a.disasterId,
      task: a.task,
      status: a.status || "pending",
    });
    setEditId(a._id);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Volunteer Assignments</h1>

        {/* Assignment Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="userId"
              placeholder="Volunteer ID"
              value={formData.userId}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3"
            />
            <input
              type="text"
              name="disasterId"
              placeholder="Disaster ID"
              value={formData.disasterId}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3"
            />
            <input
              type="text"
              name="task"
              placeholder="Task description"
              value={formData.task}
              onChange={handleChange}
              required
              className="border rounded-xl px-4 py-3"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
          >
            {editId ? "Update Assignment" : "Add Assignment"}
          </button>
        </form>

        {/* Assignment List */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Assignments</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Volunteer</th>
                <th className="border px-4 py-2">Disaster</th>
                <th className="border px-4 py-2">Task</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map((a) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{a.userId?.name || a.userId}</td>
                    <td className="border px-4 py-2">{a.disasterId?.type || a.disasterId}</td>
                    <td className="border px-4 py-2">{a.task}</td>
                    <td className="border px-4 py-2 capitalize">{a.status}</td>
                    <td className="border px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-xl"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a._id)}
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
                    No assignments available
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
