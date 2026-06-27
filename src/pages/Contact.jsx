import { useState } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";

function Contact() {
  const { showToast } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4010/api";
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(data.message || "Thank you for reaching out! We will reply to your email shortly.", "success");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        showToast(data.message || "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      console.error("API Error submitting form:", error);
      showToast("Failed to connect to backend server. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 space-y-16">
      {/* Heading Section */}
      <div className="text-center max-w-3xl mx-auto px-6 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Get In Touch</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Contact Us</h1>
        <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          We would love to help you plan your next journey. Whether you are looking for wildlife safaris, 
          international tours, pilgrim trips, or customized travel experiences, feel free to reach out.
        </p>
        <h3 className="text-2xl font-bold text-[#1F4027] font-display">
          BhramanTea Tours
        </h3>
      </div>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Address */}
        <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-[#1F4027] rounded-full flex items-center justify-center text-xl mx-auto mb-6">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Our Address</h3>
            <div className="text-gray-500 text-sm font-light space-y-1 leading-relaxed">
              <p className="font-semibold text-gray-700">Shop 1, Swapnapurti,</p>
              <p>Pujya Sri Sri Ravishankar Marg,</p>
              <p>beside Biryanisht, Nashik Road,</p>
              <p>Nashik, Maharashtra 422006</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-50 text-xs text-amber-700 font-medium uppercase tracking-wider">
            Main Office
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-[#1F4027] rounded-full flex items-center justify-center text-xl mx-auto mb-6">
              <FaPhoneAlt />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Phone / WhatsApp</h3>
            <div className="space-y-4 text-gray-600 text-sm font-light">
              <div className="flex items-center justify-center gap-2.5">
                <FaWhatsapp className="text-green-600 text-lg" />
                <div>
                  <p className="text-xs text-gray-400 font-medium text-left">Nashik Office</p>
                  <p className="font-semibold text-gray-700">+91 9220829392</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <FaWhatsapp className="text-green-600 text-lg" />
                <div>
                  <p className="text-xs text-gray-400 font-medium text-left">Mumbai Office</p>
                  <p className="font-semibold text-gray-700">+91 9702001661</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-50 text-xs text-amber-700 font-medium uppercase tracking-wider">
            Quick Connect
          </div>
        </div>

        {/* Email & Social */}
        <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-[#1F4027] rounded-full flex items-center justify-center text-xl mx-auto mb-6">
              <FaEnvelope />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Email & Social</h3>
            <p className="text-gray-600 font-medium mb-6">bhramantea@gmail.com</p>
            
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/bhramantea"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-pink-600 hover:bg-pink-50 hover:scale-105 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/bhramantea"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:scale-105 transition"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-50 text-xs text-amber-700 font-medium uppercase tracking-wider">
            Online Support
          </div>
        </div>
      </div>

      {/* Message & Form Section */}
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Side: Map & Note */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="bg-white/60 border border-gray-100 p-8 rounded-3xl shadow-sm text-left">
            <h4 className="font-bold text-lg text-gray-900 mb-2">Our Service Commitment</h4>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              Our travel specialists will respond as quickly as possible (usually within 2 hours during business hours) 
              to assist you with customized itineraries, booking advice, and details.
            </p>
          </div>
          <div className="flex-grow rounded-3xl overflow-hidden shadow-lg border border-gray-100 min-h-[300px]">
            <iframe
              title="map"
              className="w-full h-full min-h-[300px]"
              src="https://www.google.com/maps?q=Shop%201%20Swapnapurti%20Ravishankar%20Marg%20Nashik&output=embed"
            ></iframe>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-6 bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">
            Send Us a Message
          </h3>

          <form onSubmit={handleSendMessage} className="space-y-5 text-left">
            <div>
              <label className="block text-gray-700 mb-1.5 text-sm font-semibold">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition-all bg-gray-50/50 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1.5 text-sm font-semibold">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition-all bg-gray-50/50 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1.5 text-sm font-semibold">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="4"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition-all bg-gray-50/50 disabled:opacity-50"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white py-3.5 rounded-full font-semibold transition shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
