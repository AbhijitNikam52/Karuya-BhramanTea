import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-[#1f2b3a] text-gray-300">
      {/* ===== MAIN FOOTER GRID ===== */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        {/* Column 1 - Navbar Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Home</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">Kashmir</li>
            <li className="hover:text-orange-400 cursor-pointer">
              Himachal Pradesh
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Uttar Pradesh
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Lakshadweep
            </li>
            <li className="hover:text-orange-400 cursor-pointer">Kerala</li>
            <li className="hover:text-orange-400 cursor-pointer">Rajasthan</li>
            <li className="hover:text-orange-400 cursor-pointer">Sikkim</li>
          </ul>
        </div>

        {/* Column 2 - About Us */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">About Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Deliver industry-relevant learning</li>
            <li>Bridge academic and professional gaps</li>
            <li>Skilling programs with hands-on learning</li>
            <li>Industry-oriented internships</li>
            <li>Real-time project development</li>
            <li>Technical consultancy and expert guidance</li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-orange-400 font-medium">📍 Our Address</p>
              <p>Karuya Bhramanti Pvt. Ltd.</p>
              <p>123 Tourism Plaza</p>
              <p>Nashik, Maharashtra - 422002</p>
            </div>

            <div>
              <p>Pune Branch</p>
              <p>2nd Floor, Travel Hub</p>
              <p>FC Road, Pune - 411005</p>
            </div>
          </div>
        </div>

        {/* Column 4 - Services */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Services</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">
              Domestic Tours
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              International Tours
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Customized Packages
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Group Tours
            </li>
            <li className="hover:text-orange-400 cursor-pointer">
              Honeymoon Packages
            </li>
          </ul>
        </div>
      </div>

      {/* ===== LOGO + DESCRIPTION ===== */}
      <div className="max-w-7xl mx-auto px-6 pb-10 flex flex-col md:flex-row items-center gap-6">
        <img src={logo} alt="Karuya Bhramanti" className="h-16" />

        <p className="text-sm text-gray-400 max-w-3xl">
          Karuya Bhramanti is a passionate travel company dedicated to creating
          unforgettable journeys across India and beyond. We specialize in
          curated travel experiences, customized tour packages, and seamless
          travel planning designed to help you explore the world with comfort
          and confidence.
        </p>
      </div>

      {/* ===== CONTACT STRIP ===== */}
      <div className="border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <FaPhoneAlt /> +91 8485014800
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope /> info@karuyabhramanti.com
            </div>

            <div className="flex items-center gap-2 text-green-500">
              <FaWhatsapp /> WhatsApp
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg">
            <FaTwitter className="hover:text-orange-400 cursor-pointer" />
            <FaInstagram className="hover:text-orange-400 cursor-pointer" />
            <FaFacebookF className="hover:text-orange-400 cursor-pointer" />
            <FaYoutube className="hover:text-orange-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-orange-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ===== COPYRIGHT ===== */}
      <div className="bg-[#16202d] py-3 text-center text-sm text-gray-400">
        © 2026 Karuya Bhramanti. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
