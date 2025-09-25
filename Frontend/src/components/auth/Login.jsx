import React, {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice"; // adjust path

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user and loading state from Redux
  const { user, loading } = useSelector((store) => store.auth);
  const isLoggedIn = !!user; // true if user exists

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData,{
                headers: {
                    "Content-Type": "application/json"
                },
         withCredentials: true }
      );

      setMessage(response.data.message || "Logged in successfully!");
      dispatch(setUser(response.data.data.user)); // set user in Redux

      setTimeout(() => {
        navigate("/"); // redirect
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid email or password");
    } finally {
      dispatch(setLoading(false));
    }
  };

 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message.includes("successfully") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {!isLoggedIn ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <button
                type="submit"
                disabled={loading} // use loading from Redux
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            
          </>
        ) : (
            <div className="text-center text-green-500">You are already logged in!</div>
        )}
      </div>
    </div>
  );
}
