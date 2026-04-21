import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

function Contact() {
  return (
    <div className="container mx-auto px-6 py-16 space-y-14">
      {/* Heading Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold text-amber-900">Contact Us</h2>

        <p className="text-gray-700 text-lg">
          We would love to help you plan your next journey.
        </p>

        <p className="text-gray-600">
          Whether you are looking for wildlife safaris, international tours,
          pilgrim trips, or customized travel experiences, feel free to reach
          out to us.
        </p>

        <h3 className="text-2xl font-semibold text-green-800">
          BhramanTea Tours
        </h3>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Address */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <div className="text-3xl mb-4 text-green-800">
            <FaMapMarkerAlt />
          </div>

          <h3 className="text-xl font-semibold mb-3">Address</h3>

          <p className="text-gray-600">Shop 1, Swapnapurti,</p>

          <p className="text-gray-600">Pujya Sri Sri Ravishankar Marg,</p>

          <p className="text-gray-600">beside Biryanisht,</p>

          <p className="text-gray-600">Nashik Road, Nashik</p>

          <p className="text-gray-600">Maharashtra 422006</p>
        </div>

        {/* Contact Numbers */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <div className="text-3xl mb-4 text-green-800">
            <FaPhoneAlt />
          </div>

          <h3 className="text-xl font-semibold mb-3">Phone / WhatsApp</h3>

          <p className="text-gray-600 flex items-center justify-center gap-2">
            <FaWhatsapp className="text-green-600" />
            Nashik : +91 9220829392
          </p>

          <p className="text-gray-600 flex items-center justify-center gap-2 mt-2">
            <FaWhatsapp className="text-green-600" />
            Mumbai : +91 9702001661
          </p>
        </div>

        {/* Email & Social */}
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <div className="text-3xl mb-4 text-green-800">
            <FaEnvelope />
          </div>

          <h3 className="text-xl font-semibold mb-3">Email & Social</h3>

          <p className="text-gray-600 mb-4">bhramantea@gmail.com</p>

          <div className="flex justify-center gap-4 text-xl">
            <a
              href="https://www.instagram.com/bhramantea"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 hover:scale-110 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/bhramantea"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:scale-110 transition"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className="max-w-3xl mx-auto text-center text-gray-700 text-lg">
        <p>
          Our team will respond as quickly as possible to assist you with tour
          details, bookings, and travel guidance.
        </p>
      </div>

      {/* Map Section */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <iframe
          title="map"
          className="w-full h-96"
          src="https://www.google.com/maps?q=Shop%201%20Swapnapurti%20Ravishankar%20Marg%20Nashik&output=embed"
        ></iframe>
      </div>

      {/* Schedule Call Form */}
      <div className="max-w-2xl mx-auto bg-[#f4f1ed] p-10 rounded-2xl shadow-lg space-y-6">
        <h3 className="text-2xl font-semibold text-center text-amber-900">
          Send Us a Message
        </h3>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
        />

        <textarea
          placeholder="Message"
          rows="4"
          className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
        ></textarea>

        <button className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-900 transition">
          Send Message
        </button>
      </div>
    </div>
  );
}

export default Contact;
