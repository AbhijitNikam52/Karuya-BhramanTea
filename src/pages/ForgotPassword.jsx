import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { showToast, showPopup } = useNotification();

  const verifyCode = () => {
    if (code === "1234") {
      setStep(2);
      showToast("Code verified successfully", "success");
    } else {
      showToast("Invalid Verification Code", "error");
    }
  };

  const changePassword = () => {
    showPopup({
      title: "Password Changed",
      message: "Your password has been reset successfully. Please login with your new credentials.",
      type: "success",
      onClose: () => navigate("/login")
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#FAF8F5] px-6 py-12">
      <div className="bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Account Recovery</span>
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <div className="w-10 h-0.5 bg-[#1F4027] mx-auto mt-1"></div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                Email / Mobile Number
              </label>
              <input
                type="text"
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                Verification Code (Try 1234)
              </label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Code"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
              />
            </div>

            <button
              onClick={verifyCode}
              className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Verify Code
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
              />
            </div>

            <button
              onClick={changePassword}
              className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Change Password
            </button>
          </div>
        )}

        <div className="pt-2 text-center text-sm text-gray-500">
          <Link to="/login" className="text-amber-700 font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
