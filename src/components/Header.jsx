import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `nav-link-underline py-2 text-gray-800 hover:text-amber-700 transition duration-300 font-medium ${
      isActive(path) ? "text-amber-700 font-semibold" : ""
    }`;

  return (
    <header className="bg-[#FAF8F5]/85 backdrop-blur-md border-b border-gray-100/60 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* LEFT - LOGO */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center space-x-8 text-gray-800">
          {/* HOME */}
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>

          {/* ABOUT US */}
          <Link to="/about" className={navLinkClass("/about")}>
            About Us
          </Link>

          {/* CONTACT US */}
          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact Us
          </Link>

          {/* GALLERY */}
          <Link to="/gallery" className={navLinkClass("/gallery")}>
            Gallery
          </Link>

          {/* MAGAZINE */}
          <div className="relative group">
            <button className="hover:text-amber-700 py-2 flex items-center gap-1 font-medium transition duration-300">
              Magazine
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
            </button>

            <div className="absolute left-0 top-full pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="glass-dropdown rounded-xl w-44 p-2.5 space-y-1">
                <Link
                  to="/magazine"
                  className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition duration-200"
                >
                  Blogs
                </Link>
              </div>
            </div>
          </div>

          {/* KARUYA BHRAMANTEA */}
          <div className="relative group">
            <button className="hover:text-amber-700 py-2 flex items-center gap-1 font-medium transition duration-300">
              Karuya BhramanTea
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
            </button>

            {/* FIRST LEVEL DROPDOWN */}
            <div className="absolute left-0 top-full pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="glass-dropdown rounded-xl w-64 p-3 space-y-1.5">
                {/* TOURS WITH SECOND LEVEL */}
                <div className="relative group/sub">
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 flex justify-between items-center transition duration-200">
                    <span>Tours</span>
                    <span className="text-xs">▶</span>
                  </button>

                  {/* SECOND LEVEL */}
                  <div className="absolute left-full top-0 ml-2 pt-0 invisible opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 transition-all duration-300 translate-x-2 group-hover/sub:translate-x-0">
                    <div className="glass-dropdown rounded-xl w-56 p-2.5 space-y-1">
                      <Link
                        to="/tours/ladakh-adventure"
                        className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition duration-200"
                      >
                        Ladakh Adventure Tour
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  to="/packages"
                  className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition duration-200"
                >
                  Packages
                </Link>

                <Link
                  to="/national-tourism"
                  className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition duration-200"
                >
                  National Tourism
                </Link>

                <Link
                  to="/international-tourism"
                  className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition duration-200"
                >
                  International Tourism
                </Link>

                <Link
                  to="/state-tourism"
                  className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition duration-200"
                >
                  State Tourism
                </Link>

                <Link
                  to="/hinduism"
                  className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition duration-200"
                >
                  Hinduism (Exploring Culture)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE DESKTOP */}
        <div className="hidden lg:flex items-center space-x-5">
          <Link
            to="/shop"
            className="text-xl p-2 rounded-full hover:bg-amber-50 text-gray-700 hover:text-amber-800 transition duration-300"
            title="Cart"
          >
            🛒
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-amber-800 font-medium transition duration-300"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-5 py-2.5 rounded-full font-medium transition duration-300 shadow-sm hover:shadow-md text-sm"
          >
            Signup
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-2xl p-2 focus:outline-none text-gray-800 hover:text-amber-800 transition duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden fixed top-[73px] left-0 w-full bg-[#FAF8F5] border-b border-gray-100 shadow-lg z-40 max-h-[85vh] overflow-y-auto transition-all duration-300">
          <div className="px-6 py-6 space-y-4 text-gray-800">
            {/* DIRECT LINKS */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block font-medium py-2 border-b border-gray-100 hover:text-amber-800 transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block font-medium py-2 border-b border-gray-100 hover:text-amber-800 transition"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block font-medium py-2 border-b border-gray-100 hover:text-amber-800 transition"
            >
              Contact Us
            </Link>

            <Link
              to="/gallery"
              onClick={() => setIsOpen(false)}
              className="block font-medium py-2 border-b border-gray-100 hover:text-amber-800 transition"
            >
              Gallery
            </Link>

            {/* MAGAZINE */}
            <details className="border-b border-gray-100 pb-2">
              <summary className="cursor-pointer font-medium py-2 hover:text-amber-800 focus:outline-none">
                Magazine
              </summary>
              <div className="pl-4 mt-2 text-sm">
                <Link
                  to="/magazine"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-600 hover:text-amber-800"
                >
                  Blogs
                </Link>
              </div>
            </details>

            {/* KARUYA */}
            <details className="border-b border-gray-100 pb-2">
              <summary className="cursor-pointer font-medium py-2 hover:text-amber-800 focus:outline-none">
                Karuya BhramanTea
              </summary>

              <div className="pl-4 mt-2 space-y-1 text-sm">
                {/* Tours nested */}
                <details className="py-1">
                  <summary className="cursor-pointer text-gray-700 hover:text-amber-800 focus:outline-none">
                    Tours
                  </summary>

                  <div className="pl-4 mt-2">
                    <Link
                      to="/tours/ladakh-adventure"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-gray-600 hover:text-amber-800"
                    >
                      Ladakh Adventure Tour
                    </Link>
                  </div>
                </details>

                <Link
                  to="/packages"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-amber-800"
                >
                  Packages
                </Link>

                <Link
                  to="/national-tourism"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-amber-800"
                >
                  National Tourism
                </Link>

                <Link
                  to="/international-tourism"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-amber-800"
                >
                  International Tourism
                </Link>

                <Link
                  to="/state-tourism"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-amber-800"
                >
                  State Tourism
                </Link>

                <Link
                  to="/hinduism"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-amber-800"
                >
                  Hinduism (Exploring Culture)
                </Link>
              </div>
            </details>

            {/* Bottom Links */}
            <div className="pt-4 space-y-3">
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 font-medium py-2 text-gray-700 hover:text-amber-800"
              >
                🛒 Shop
              </Link>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="border border-gray-300 py-2.5 rounded-full text-center font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#1F4027] hover:bg-[#152e1c] text-white py-2.5 rounded-full text-center font-medium transition"
                >
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;