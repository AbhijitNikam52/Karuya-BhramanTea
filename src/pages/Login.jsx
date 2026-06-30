import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("client");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();
  const { showToast, showPopup } = useNotification();
  const { login } = useAuth();
  const [generatedCaptcha, setGeneratedCaptcha] = useState(
    Math.random().toString(36).substring(2, 6)
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (captcha.toLowerCase() !== generatedCaptcha.toLowerCase()) {
      showToast("Invalid Captcha Code", "error");
      return;
    }

    try {
      const user = await login(email, password, loginType);
      
      showPopup({
        title: "Welcome Back!",
        message: `You have logged in successfully as ${user.name}.`,
        type: "success",
        onClose: () => {
          if (user.loginType === "admin" || user.role === "system_owner") {
            navigate("/admin/shop");
          } else {
            navigate("/");
          }
        }
      });
    } catch (err) {
      showToast(err.message || "Login failed. Please check your credentials.", "error");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#FAF8F5] px-6 py-12">
      <div className="bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Welcome Back</span>
          <h2 className="text-3xl font-bold text-gray-900">Login</h2>
          <div className="w-10 h-0.5 bg-[#1F4027] mx-auto mt-1"></div>
        </div>

        {/* Login Type Tabs */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-2">
          <button
            type="button"
            onClick={() => setLoginType("client")}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
              loginType === "client" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Client Login
          </button>
          <button
            type="button"
            onClick={() => setLoginType("admin")}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
              loginType === "admin" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Admin Login
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* USERNAME */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Email / Mobile Number
            </label>
            <input
              type="text"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50 pr-12"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? (
                  // Eye Slash (Hide)
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
                  // Eye Open (Show)
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

          {/* CAPTCHA */}
          <div>
            <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
              Verification Captcha
            </label>
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="bg-gray-100 px-5 py-2.5 rounded-xl font-mono tracking-widest text-lg select-none border border-gray-200/50 flex-grow text-center text-gray-700">
                {generatedCaptcha}
              </div>

              <button
                type="button"
                onClick={() =>
                  setGeneratedCaptcha(
                    Math.random().toString(36).substring(2, 6)
                  )
                }
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline"
              >
                Refresh Code
              </button>
            </div>

            <input
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              placeholder="Enter Captcha Code"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
              required
            />
          </div>

          {/* CHECKBOX & FORGOT LINK */}
          <div className="flex justify-between items-center text-sm py-1">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded text-[#1F4027] focus:ring-[#1F4027]/40" />
              Remember Me
            </label>

            <Link to="/forgot-password" className="text-amber-700 hover:underline font-medium">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300">
            Login
          </button>
        </form>

        <div className="relative text-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">Or Connect With</span>
        </div>

        {/* SOCIAL LOGIN */}
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
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#1F4027] font-semibold hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
