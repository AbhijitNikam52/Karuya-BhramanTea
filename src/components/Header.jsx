import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#f4f1ed] shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* LEFT - LOGO */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center space-x-10 text-gray-800 font-medium">
          {/* HOME DROPDOWN */}
          <div className="relative group">
            <button className="hover:text-amber-800 py-2">Home</button>

            <div className="absolute left-0 top-full pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
              <div className="bg-white shadow-lg rounded-lg w-48 p-3 space-y-2">
                <Link to="/about" className="block hover:text-amber-800">
                  About Us
                </Link>
                <Link to="/contact" className="block hover:text-amber-800">
                  Contact Us
                </Link>
                <Link to="/gallery" className="block hover:text-amber-800">
                  Gallery
                </Link>
              </div>
            </div>
          </div>

          {/* MAGAZINE */}
          <div className="relative group">
            <button className="hover:text-amber-800 py-2">Magazine</button>

            <div className="absolute left-0 top-full pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
              <div className="bg-white shadow-lg rounded-lg w-40 p-3">
                <Link to="/magazine" className="block hover:text-amber-800">
                  Blogs
                </Link>
              </div>
            </div>
          </div>

          {/* KARUYA */}
          <div className="relative group">
            <button className="hover:text-amber-800 py-2">
              Karuya BhramanTea
            </button>

            {/* FIRST LEVEL DROPDOWN */}
            <div className="absolute left-0 top-full pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              <div className="bg-white shadow-lg rounded-lg w-64 p-3 space-y-2">
                {/* TOURS WITH SECOND LEVEL */}
                <div className="relative group">
                  <button className="w-full text-left hover:text-amber-800 flex justify-between items-center">
                    Tours
                    <span>›</span>
                  </button>

                  {/* SECOND LEVEL */}
                  <div className="absolute left-full top-0 ml-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                    <div className="bg-white shadow-lg rounded-lg w-56 p-3">
                      <Link
                        to="/tours/ladakh-adventure"
                        className="block hover:text-amber-800"
                      >
                        Ladakh Adventure Tour
                      </Link>
                    </div>
                  </div>
                </div>

                <Link to="/packages" className="block hover:text-amber-800">
                  Packages
                </Link>

                <Link
                  to="/national-tourism"
                  className="block hover:text-amber-800"
                >
                  National Tourism
                </Link>

                <Link
                  to="/international-tourism"
                  className="block hover:text-amber-800"
                >
                  International Tourism
                </Link>

                <Link
                  to="/state-tourism"
                  className="block hover:text-amber-800"
                >
                  State Tourism
                </Link>

                <Link to="/hinduism" className="block hover:text-amber-800">
                  Hinduism (Exploring the Culture)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE DESKTOP */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/shop" className="text-xl hover:text-amber-800">
            🛒
          </Link>

          <Link to="/login" className="hover:text-amber-800">
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-green-800 text-white px-4 py-2 rounded-lg"
          >
            Signup
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
{isOpen && (
  <div className="md:hidden fixed top-[72px] left-0 w-full bg-white shadow-lg z-40 max-h-[80vh] overflow-y-auto">

    <div className="px-6 py-4 space-y-4 text-gray-800">

      {/* HOME */}
      <details className="border-b pb-2">
        <summary className="cursor-pointer font-medium py-2">
          Home
        </summary>

        <div className="pl-4 mt-2 space-y-2 text-sm">
          <Link to="/about" onClick={() => setIsOpen(false)} className="block">
            About Us
          </Link>

          <Link to="/contact" onClick={() => setIsOpen(false)} className="block">
            Contact Us
          </Link>

          <Link to="/gallery" onClick={() => setIsOpen(false)} className="block">
            Gallery
          </Link>
        </div>
      </details>

      {/* MAGAZINE */}
      <details className="border-b pb-2">
        <summary className="cursor-pointer font-medium py-2">
          Magazine
        </summary>

        <div className="pl-4 mt-2 text-sm">
          <Link to="/magazine" onClick={() => setIsOpen(false)} className="block">
            Blogs
          </Link>
        </div>
      </details>

      {/* KARUYA */}
      <details className="border-b pb-2">
        <summary className="cursor-pointer font-medium py-2">
          Karuya BhramanTea
        </summary>

        <div className="pl-4 mt-2 space-y-2 text-sm">

          {/* Tours nested */}
          <details>
            <summary className="cursor-pointer py-1">
              Tours
            </summary>

            <div className="pl-4 mt-2">
              <Link
                to="/tours/ladakh-adventure"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                Ladakh Adventure Tour
              </Link>
            </div>
          </details>

          <Link to="/packages" onClick={() => setIsOpen(false)} className="block">
            Packages
          </Link>

          <Link to="/national-tourism" onClick={() => setIsOpen(false)} className="block">
            National Tourism
          </Link>

          <Link to="/international-tourism" onClick={() => setIsOpen(false)} className="block">
            International Tourism
          </Link>

          <Link to="/state-tourism" onClick={() => setIsOpen(false)} className="block">
            State Tourism
          </Link>

          <Link to="/hinduism" onClick={() => setIsOpen(false)} className="block">
            Hinduism (Exploring the Culture)
          </Link>

        </div>
      </details>

      {/* Bottom Links */}

      <div className="pt-4 space-y-3">

        <Link to="/shop" onClick={() => setIsOpen(false)} className="block">
          🛒 Shop
        </Link>

        <Link to="/login" onClick={() => setIsOpen(false)} className="block">
          Login
        </Link>

        <Link
          to="/signup"
          onClick={() => setIsOpen(false)}
          className="block bg-green-800 text-white px-4 py-2 rounded-lg text-center"
        >
          Signup
        </Link>

      </div>

    </div>

  </div>
)}
    </header>
  );
}

export default Header;