import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Signup Successful");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showPass ? (
                // Eye Slash
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
                // Eye Open
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

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            >
              {showConfirm ? (
                // Eye Slash
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
                // Eye Open
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

          <label className="text-sm">
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>

          <button className="w-full bg-green-800 text-white py-3 rounded-lg">
            Signup
          </button>
        </form>

        {/* SOCIAL */}
        <div className="mt-6 space-y-3">

  <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg">
    <FcGoogle size={20} /> Signup with Google
  </button>

  <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg text-blue-600">
    <FaFacebookF /> Signup with Facebook
  </button>

  <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg text-sky-500">
    <FaTwitter /> Signup with Twitter
  </button>

</div>
      </div>
    </div>
  );
}

export default Signup;
