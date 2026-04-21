import { useState } from "react";

function TourCallBack() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Callback Request:", formData);

    // Later we will connect backend here

    alert("We will call you shortly!");
    setFormData({ name: "", whatsapp: "" });
  };

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Want a call from us?
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-3 gap-6 items-end"
          >
            {/* Name */}
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Enter your name"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="flex flex-col">
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Enter your WhatsApp number"
              />
            </div>

            {/* Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900 transition"
              >
                Request a Call Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TourCallBack;
