import Navbar from "./shared/Navbar";

export default function About() {
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center w-full text-center bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="w-full h-[40vh] flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1524492449090-1a065f2b90f1')] bg-cover bg-center text-white p-6">
        <div className="bg-black/50 p-6 rounded-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl">Working together to provide hope and relief in times of disaster.</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 max-w-5xl">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <p className="text-lg leading-relaxed">
          Founded with the mission to help those affected by natural and man-made disasters, our organization has been at the forefront of relief operations for years. We bring together volunteers, donors, and communities to deliver food, shelter, and medical assistance to those in urgent need.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3">🌍 Our Mission</h3>
          <p>
            To provide immediate disaster relief and long-term recovery support by mobilizing resources, volunteers, and technology to reach communities in crisis.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3">✨ Our Vision</h3>
          <p>
            A world where every individual affected by disaster has access to timely aid, resources, and the opportunity to rebuild their lives with dignity.
          </p>
        </div>
      </section>

     

      {/* Call to Action */}
      <section className="py-16 px-6 max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6">Join Us in Making a Difference</h2>
        <p className="text-lg mb-6">
          Whether through donations, volunteering, or partnerships, your support helps us bring relief to those who need it most.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl">Donate Now</button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl">Become a Volunteer</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-6 mt-10 text-center">
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
    </>
  );
}