import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();
  const [generatedCaptcha, setGeneratedCaptcha] = useState(
    Math.random().toString(36).substring(2, 6)
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (captcha !== "1234") {
      alert("Invalid Captcha");
      return;
    }

    alert("Login Successful");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email / Mobile Number"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border px-4 py-3 rounded-lg"
              required
            />
            <span
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-3 cursor-pointer text-gray-600"
>
  {showPassword ? (
    // Eye Slash (Hide)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
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
      width="22"
      height="22"
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

          {/* CAPTCHA */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="bg-gray-200 px-4 py-2 rounded-lg font-mono tracking-widest text-lg select-none">
                {generatedCaptcha}
              </div>

              <button
                type="button"
                onClick={() =>
                  setGeneratedCaptcha(
                    Math.random().toString(36).substring(2, 6)
                  )
                }
                className="text-sm text-blue-600"
              >
                Refresh
              </button>
            </div>

            <input
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              placeholder="Enter Captcha"
              className="w-full border px-4 py-3 rounded-lg"
              required
            />
          </div>

          <div className="flex justify-between text-sm">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>

            <Link to="/forgot-password" className="text-blue-600">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-green-800 text-white py-3 rounded-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>

        {/* SOCIAL LOGIN */}
        <div className="mt-6 space-y-3">

  <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg">
    <FcGoogle size={20} /> Continue with Google
  </button>

  <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg text-blue-600">
    <FaFacebookF /> Continue with Facebook
  </button>

  <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg text-sky-500">
    <FaTwitter /> Continue with Twitter
  </button>

</div>
      </div>
    </div>
  );
}

export default Login;
