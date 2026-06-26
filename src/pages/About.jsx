import { FaUsers, FaGlobeAsia, FaMountain, FaLeaf } from "react-icons/fa";
import travelImage from "../assets/20180926220246_IMG_9722 copy.jpg";
import { useNotification } from "../context/NotificationContext";

function About() {
  const { showPopup } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    showPopup({
      title: "Request Received",
      message: "Your callback request has been submitted. A travel specialist will call you shortly!",
      type: "success"
    });
    e.target.reset();
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 space-y-20">
      {/* Page Heading */}
      <div className="text-center max-w-3xl mx-auto px-6 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Our Story</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          About Us – Karuya BhramanTea
        </h1>
        <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
          BhramanTea was created with a simple philosophy — 
          <span className="font-semibold text-[#1F4027]"> travel should be meaningful, immersive, and memorable.</span>
        </p>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light text-left">
          <p>
            We design journeys that go beyond simple sightseeing. Whether it is
            tracking a tiger in the forests of Tadoba, exploring ancient temples
            in Cambodia, walking through Himalayan monasteries in Bhutan, or
            experiencing the culture of Vietnam and Sri Lanka, every BhramanTea
            tour is curated with attention to detail and passion for
            exploration.
          </p>

          <p>
            Our focus is on small groups, well-planned itineraries, and
            authentic experiences. We believe travel should connect people with
            nature, culture, and themselves.
          </p>
        </div>

        {/* Right Visual Image */}
        <div className="relative">
          <div className="absolute -inset-3 bg-amber-500/5 rounded-3xl rotate-1"></div>
          <div className="relative bg-white p-3 rounded-3xl shadow-xl">
            <img
              src={travelImage}
              alt="Travel"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white/60 backdrop-blur-md border border-gray-100 p-10 md:p-14 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#1F4027]"></div>
          <p className="text-xl text-gray-700 leading-relaxed font-light italic">
            "What makes our journeys special is the community we build. Many of our
            travelers return again and again, becoming part of the BhramanTea
            travel family."
          </p>

          <p className="text-2xl font-bold text-amber-900 mt-6 font-display">
            Because for us, travel is not just about destinations.<br />
            It is about the stories you bring back.
          </p>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Highlight Card 1 */}
        <div className="bg-white border border-gray-100/60 shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-2xl text-[#1F4027] mx-auto mb-6 group-hover:scale-110 transition duration-300">
            <FaGlobeAsia />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">International Tours</h3>
          <p className="text-gray-500 text-sm font-light">
            Cambodia, Bhutan, Vietnam, Sri Lanka and more.
          </p>
        </div>

        {/* Highlight Card 2 */}
        <div className="bg-white border border-gray-100/60 shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-2xl text-[#1F4027] mx-auto mb-6 group-hover:scale-110 transition duration-300">
            <FaMountain />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Adventure & Wildlife</h3>
          <p className="text-gray-500 text-sm font-light">
            From Himalayan journeys to jungle safaris.
          </p>
        </div>

        {/* Highlight Card 3 */}
        <div className="bg-white border border-gray-100/60 shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-2xl text-[#1F4027] mx-auto mb-6 group-hover:scale-110 transition duration-300">
            <FaLeaf />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Cultural Experiences</h3>
          <p className="text-gray-500 text-sm font-light">
            Explore traditions, temples and heritage.
          </p>
        </div>

        {/* Highlight Card 4 */}
        <div className="bg-white border border-gray-100/60 shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-2xl text-[#1F4027] mx-auto mb-6 group-hover:scale-110 transition duration-300">
            <FaUsers />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Travel Community</h3>
          <p className="text-gray-500 text-sm font-light">
            Many travelers return and become family.
          </p>
        </div>

      </div>

      {/* Contact Form Section */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              Want to Schedule a Call with Us?
            </h3>
            <p className="text-gray-500 text-sm font-light">
              Leave your details below and a travel planner will connect with you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1.5 text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition-all bg-gray-50/50"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-gray-700 mb-1.5 text-sm font-semibold">
                WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="Enter WhatsApp number"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition-all bg-gray-50/50"
              />
            </div>

            {/* Query */}
            <div>
              <label className="block text-gray-700 mb-1.5 text-sm font-semibold">
                Query
              </label>
              <textarea
                rows="3"
                placeholder="Write your query..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition-all bg-gray-50/50"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-full bg-[#1F4027] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#152e1c] shadow-md hover:shadow-lg transition-all duration-300"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default About;
