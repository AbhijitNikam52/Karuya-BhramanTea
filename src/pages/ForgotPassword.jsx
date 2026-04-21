import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const verifyCode = () => {
    if (code === "1234") {
      setStep(2);
    } else {
      alert("Invalid Code");
    }
  };

  const changePassword = () => {
    alert("Password Changed Successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Email / Mobile"
              className="w-full border px-4 py-3 rounded-lg mb-4"
            />

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter Verification Code (1234)"
              className="w-full border px-4 py-3 rounded-lg mb-4"
            />

            <button
              onClick={verifyCode}
              className="w-full bg-green-800 text-white py-3 rounded-lg"
            >
              Verify Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              className="w-full border px-4 py-3 rounded-lg mb-4"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border px-4 py-3 rounded-lg mb-4"
            />

            <button
              onClick={changePassword}
              className="w-full bg-green-800 text-white py-3 rounded-lg"
            >
              Change Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
