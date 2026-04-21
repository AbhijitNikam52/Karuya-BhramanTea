import { FaUsers, FaGlobeAsia, FaMountain, FaLeaf } from "react-icons/fa";
import travelImage from "../assets/20180926220246_IMG_9722 copy.jpg";

function About() {
  return (
    <div className="container mx-auto px-6 py-16 space-y-16">
      {/* Page Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold text-amber-900">
          About Us – BhramanTea
        </h2>

        <p className="text-lg text-gray-700">
          BhramanTea was created with a simple philosophy —
          <span className="font-semibold text-green-800">
            {" "}
            travel should be meaningful, immersive, and memorable.
          </span>
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="space-y-6 text-gray-700 text-lg">
          <p>
            We design journeys that go beyond sightseeing. Whether it is
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

        {/* Right Visual Placeholder */}

<div className="bg-[#f4f1ed] h-80 rounded-2xl flex items-center justify-center text-gray-500 text-lg shadow-inner">
  <img
    src={travelImage}
    alt="Travel"
    className="h-full w-full object-cover rounded-2xl"
  />
</div>
      </div>

      {/* Experience Section */}
      <div className="max-w-4xl mx-auto text-center text-lg text-gray-700">
        <p>
          Over the years, BhramanTea has organized tours across India and
          internationally, covering wildlife expeditions, leisure holidays,
          pilgrim journeys, and cultural explorations.
        </p>
      </div>

      {/* Highlights Section */}
      <div className="grid md:grid-cols-4 gap-8">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <div className="text-3xl text-green-800 mb-4">
            <FaGlobeAsia />
          </div>

          <h3 className="font-semibold text-lg mb-2">International Tours</h3>

          <p className="text-gray-600 text-sm">
            Cambodia, Bhutan, Vietnam, Sri Lanka and more.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <div className="text-3xl text-green-800 mb-4">
            <FaMountain />
          </div>

          <h3 className="font-semibold text-lg mb-2">Adventure & Wildlife</h3>

          <p className="text-gray-600 text-sm">
            From Himalayan journeys to jungle safaris.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <div className="text-3xl text-green-800 mb-4">
            <FaLeaf />
          </div>

          <h3 className="font-semibold text-lg mb-2">Cultural Experiences</h3>

          <p className="text-gray-600 text-sm">
            Explore traditions, temples and heritage.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <div className="text-3xl text-green-800 mb-4">
            <FaUsers />
          </div>

          <h3 className="font-semibold text-lg mb-2">Travel Community</h3>

          <p className="text-gray-600 text-sm">
            Many travelers return and become family.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-[#f4f1ed] p-12 rounded-2xl text-center shadow-lg max-w-4xl mx-auto">
        <p className="text-xl text-gray-700 leading-relaxed">
          What makes our journeys special is the community we build. Many of our
          travelers return again and again, becoming part of the BhramanTea
          travel family.
        </p>

        <p className="text-2xl font-semibold text-green-800 mt-6">
          Because for us, travel is not just about destinations.
          <br />
          It is about the stories you bring back.
        </p>
      </div>

      {/* Contact Form Section */}
<div className="bg-[#f4f1ed] p-8 rounded-2xl text-center shadow-lg max-w-2xl mx-auto">
  
  <h3 className="text-xl font-bold text-green-800 mb-6">
    Want to schedule call with us?
  </h3>

  <form className="space-y-4 text-left max-w-md mx-auto">

    {/* Name */}
    <div>
      <label className="block text-gray-700 mb-1 text-sm font-medium">
        Name
      </label>
      <input
        type="text"
        placeholder="Enter your name"
        className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
      />
    </div>

    {/* WhatsApp Number */}
    <div>
      <label className="block text-gray-700 mb-1 text-sm font-medium">
        WhatsApp Number
      </label>
      <input
        type="tel"
        placeholder="Enter WhatsApp number"
        className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
      />
    </div>

    {/* Query */}
    <div>
      <label className="block text-gray-700 mb-1 text-sm font-medium">
        Query
      </label>
      <textarea
        rows="3"
        placeholder="Write your query..."
        className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
      ></textarea>
    </div>

    {/* Submit Button */}
    <div className="text-center pt-2">
      <button
        type="submit"
        className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-900 transition"
      >
        Submit
      </button>
    </div>

  </form>

</div>

</div>
  );
}

export default About;
