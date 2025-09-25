import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
    skills: [],
    lat: "",
    lng: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setFormData({ ...formData, skills: value.split(",").map((s) => s.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      role: formData.role,
      skills: formData.skills,
      location: {
        lat: parseFloat(formData.lat) || 0,
        lng: parseFloat(formData.lng) || 0,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        payload
      );

      // Show success message (optional)
      setMessage(response.data.message || "User registered successfully!");

      // Redirect to login page after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);

      // Clear form
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "user",
        skills: [],
        lat: "",
        lng: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {message && <div className="mb-4 text-center text-sm text-red-500">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
          
          <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
            <option value="user">User</option>
            <option value="volunteer">Volunteer</option>
            <option value="ngo">NGO</option>
            <option value="donor">Donor</option>
            <option value="admin">Admin</option>
          </select>

          <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills.join(", ")} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

          <div className="flex gap-2">
            <input type="number" step="any" name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-md" />
            <input type="number" step="any" name="lng" placeholder="Longitude" value={formData.lng} onChange={handleChange} className="w-1/2 px-4 py-2 border rounded-md" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
