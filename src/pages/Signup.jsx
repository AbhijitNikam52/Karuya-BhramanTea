import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";

function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { showPopup } = useNotification();

  const handleSignup = (e) => {
    e.preventDefault();
    showPopup({
      title: "Signup Successful",
      message: "Your account has been created. Please log in.",
      type: "success",
      onClose: () => navigate("/login")
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#FAF8F5] px-6 py-12">
      <div className="bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Join Us Today</span>
          <h2 className="text-3xl font-bold text-gray-900">Signup</h2>
          <div className="w-10 h-0.5 bg-[#1F4027] mx-auto mt-1"></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
              required
            />
          </div>

          {/* MOBILE NUMBER */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50 pr-12"
                required
              />

              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
              >
                {showPass ? (
                  // Eye Slash
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.77 21.77 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.77 21.77 0 0 1-4.24 5.06" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Eye Open
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-6 11-6 11 6 11 6-4 6-11 6S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50 pr-12"
                required
              />

              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
              >
                {showConfirm ? (
                  // Eye Slash
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.77 21.77 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.77 21.77 0 0 1-4.24 5.06" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Eye Open
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-6 11-6 11 6 11 6-4 6-11 6S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <label className="flex items-center text-sm text-gray-600 cursor-pointer pt-1">
            <input type="checkbox" className="mr-2 rounded text-[#1F4027] focus:ring-[#1F4027]/40" required />
            I agree to the Terms & Conditions
          </label>

          <button className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300">
            Create Account
          </button>
        </form>

        <div className="relative text-center py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">Or Join With</span>
        </div>

        {/* SOCIAL SIGNUP */}
        <div className="grid grid-cols-3 gap-3">
          <button className="flex items-center justify-center py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition" title="Google">
            <FcGoogle size={20} />
          </button>

          <button className="flex items-center justify-center py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-blue-600 transition" title="Facebook">
            <FaFacebookF size={18} />
          </button>

          <button className="flex items-center justify-center py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-sky-500 transition" title="Twitter">
            <FaTwitter size={18} />
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-[#1F4027] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
