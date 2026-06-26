import { Link } from "react-router-dom";
import hillImg from "../assets/hill.jpg";
import tigerImg from "../assets/tiger.jpg";
import defaultArticleImg from "../assets/castle.jpg";

function NationalTourism() {
  const destinations = [
    {
      id: 1,
      name: "Leh Ladakh & Spiti Valley",
      region: "Himalayas / North India",
      image: hillImg,
      highlights: ["Pangong Tso Lake", "Key Monastery", "Khardung La Pass", "Chandra Taal Lake"],
      desc: "Adventure into high-altitude deserts, rugged gorges, ancient Buddhist monasteries, and breath-taking deep blue lakes."
    },
    {
      id: 2,
      name: "Royal Rajasthan Heritage Trails",
      region: "Desert / West India",
      image: defaultArticleImg,
      highlights: ["Jaipur Forts", "Udaipur Lakes", "Jaisalmer Dunes", "Pushkar Camel Fair"],
      desc: "Immerse yourself in history. Walk through majestic sandstone fortresses, colorful royal Havelis, and experience folk desert camps."
    },
    {
      id: 3,
      name: "Tadoba-Andhari Tiger Reserve",
      region: "Forests / Central India",
      image: tigerImg,
      highlights: ["Tiger Safaris", "Lake Wildlife Birds", "Forest Lodging", "Gypsy Excursions"],
      desc: "Explore dry deciduous forests known as the land of tigers. Tadoba offers the highest sighting probabilities in Central India."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Incredible India</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          National Tourism
        </h1>
        <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-500 font-light text-lg">
          Embark on unforgettable journeys across our country's finest landscapes, historical forts, and tiger reserves.
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-6xl mx-auto space-y-12 text-left">
        {destinations.map((dest, index) => (
          <div
            key={dest.id}
            className={`bg-white border border-gray-100/80 shadow-md rounded-3xl p-6 md:p-8 flex flex-col ${
              index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            } gap-8 items-center hover:shadow-xl transition-all duration-300`}
          >
            {/* Visual Column */}
            <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
            </div>

            {/* Content Column */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-700">{dest.region}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight font-display">{dest.name}</h3>
                <div className="w-12 h-0.5 bg-[#1F4027]"></div>
              </div>

              <p className="text-gray-500 text-base leading-relaxed font-light">
                {dest.desc}
              </p>

              {/* Highlights Chips */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Attractions</p>
                <div className="flex flex-wrap gap-2">
                  {dest.highlights.map((h, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-[#1F4027]/5 text-[#1F4027] border border-[#1F4027]/10">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <Link
                  to="/packages"
                  className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3 rounded-full font-medium transition text-sm shadow-sm"
                >
                  View Packages
                </Link>
                <Link
                  to="/contact"
                  className="text-amber-700 font-semibold hover:underline text-sm"
                >
                  Request Custom Quote ➔
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NationalTourism;
