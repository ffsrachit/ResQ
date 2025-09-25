import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  // Fetch live alerts from API
  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/alert/all");
      setAlerts(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
    // Optional: Refresh alerts every 5 minutes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full text-center bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1603398938378-3b8d8e63f39f')] bg-cover bg-center text-white p-6">
        <div className="bg-black/50 p-6 rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Disaster Relief When It Matters Most
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Providing resources, shelter, and hope to those affected by natural
            calamities.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate('/donate')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg">
              Donate Now
            </button>
            
          </div>
        </div>
      </section>

      {/* Live Alerts */}
      <section className="w-full bg-red-600 text-white py-3 overflow-hidden">
        {alerts.length > 0 ? (
          <marquee behavior="scroll" direction="left" className="text-lg font-medium">
            {alerts.map((alert, index) => {
              const disasterName = alert.disasterId?.type || "General Alert";
              const message = alert.message;
              return (
                <span key={alert._id}>
                  {message} – {disasterName}{" "}
                  {index !== alerts.length - 1 && "| "}
                </span>
              );
            })}
          </marquee>
        ) : (
          <p className="text-center font-medium">No live alerts currently</p>
        )}
      </section>

      {/* About Section */}
      <section className="py-16 px-6 max-w-5xl">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg mb-8">
          We work to deliver emergency relief, coordinate volunteers, and
          distribute resources quickly during disasters.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold">15,000+</h3>
            <p>Families Helped</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold">6,000+</h3>
            <p>Volunteers</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold">70+</h3>
            <p>Relief Operations</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 max-w-6xl">
        <h2 className="text-3xl font-bold mb-10">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <span className="text-4xl">🚑</span>
            <h3 className="text-xl font-semibold mt-3">Emergency Aid</h3>
            <p>Food, water, shelter</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <span className="text-4xl">🏥</span>
            <h3 className="text-xl font-semibold mt-3">Medical Support</h3>
            <p>First aid, medicines</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <span className="text-4xl">📦</span>
            <h3 className="text-xl font-semibold mt-3">Essential Supplies</h3>
            <p>Clothes, hygiene kits</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <span className="text-4xl">📡</span>
            <h3 className="text-xl font-semibold mt-3">Information Hub</h3>
            <p>Safety guides & updates</p>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-6 max-w-5xl">
        <h2 className="text-3xl font-bold mb-8">How You Can Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Donate</h3>
            <p>Support by donating money, food, or supplies.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
            <p>Join relief operations or contribute remotely.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">Stories of Hope</h2>
        <div className="bg-white p-6 rounded-2xl shadow-md italic">
          “Thanks to timely aid, we had shelter after the floods.” –{" "}
          <b>Rani Devi, Bihar</b>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-6 mt-10">
        <p>📞 +91-12345678 | ✉️ contact@relief.org</p>
        <div className="flex gap-4 justify-center mt-2">
          <span>🌐</span>
          <span>📘</span>
          <span>🐦</span>
          <span>📸</span>
        </div>
        <p className="mt-4 text-sm">© 2025 Disaster Relief Network. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
