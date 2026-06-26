import { useState } from "react";
import { useNotification } from "../context/NotificationContext";

function TourCallBack() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
  });
  const { showPopup } = useNotification();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Callback Request:", formData);
    showPopup({
      title: "Request Received",
      message: "Your request for a callback has been received. We will contact you on WhatsApp shortly!",
      type: "success"
    });
    setFormData({ name: "", whatsapp: "" });
  };

  return (
    <section className="bg-[#FAF8F5] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-12 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Need Assistance?</span>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Want a call from us?</h2>
            <p className="text-gray-500 text-sm font-light">Leave your WhatsApp number and we will reach out to help plan your trek.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-3 gap-6 items-end"
          >
            {/* Name */}
            <div className="flex flex-col text-left space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
                placeholder="Enter your name"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="flex flex-col text-left space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">WhatsApp Number</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50"
                placeholder="Enter WhatsApp number"
              />
            </div>

            {/* Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3.5 rounded-xl font-medium transition duration-300 shadow-md hover:shadow-lg text-sm"
              >
                Request Call Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TourCallBack;
