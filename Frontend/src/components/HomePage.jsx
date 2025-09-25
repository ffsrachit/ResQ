export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full text-center bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1603398938378-3b8d8e63f39f')] bg-cover bg-center text-white p-6">
        <div className="bg-black/50 p-6 rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Disaster Relief When It Matters Most</h1>
          <p className="text-lg md:text-xl mb-6">Providing resources, shelter, and hope to those affected by natural calamities.</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg">Donate Now</button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl shadow-lg">Volunteer With Us</button>
          </div>
        </div>
      </section>

      {/* Live Alerts */}
      <section className="w-full bg-red-600 text-white py-3 overflow-hidden">
        <marquee behavior="scroll" direction="left" className="text-lg font-medium">
          🌊 Flood Alert – Assam (Updated 2 hrs ago) | 🌪 Cyclone Relief in Odisha – Ongoing | 🌍 Earthquake Victims Support – Nepal Border
        </marquee>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 max-w-5xl">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg mb-8">We work to deliver emergency relief, coordinate volunteers, and distribute resources quickly during disasters.</p>
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
          “Thanks to timely aid, we had shelter after the floods.” – <b>Rani Devi, Bihar</b>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl">Subscribe</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-6 mt-10">
        <p>📞 +91-9876543210 | ✉️ contact@relief.org</p>
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