import { Link } from "react-router-dom";
import hillImg from "../assets/hill.jpg";
import tigerImg from "../assets/tiger.jpg";
import defaultArticleImg from "../assets/castle.jpg";

function Packages() {
  const packagesList = [
    {
      id: 1,
      title: "Ladakh Adventure & Monastery Trek",
      duration: "7 Days / 6 Nights",
      price: "₹45,000",
      rating: "4.9 (120 reviews)",
      desc: "An ultimate guide-led group tour covering Leh, Pangong Tso Lake, Nubra sand dunes, and high-altitude passes.",
      image: hillImg,
      link: "/tours/ladakh-adventure",
      badge: "Best Seller"
    },
    {
      id: 2,
      title: "Tadoba Tiger Safari & Wildlife Explorer",
      duration: "4 Days / 3 Nights",
      price: "₹28,500",
      rating: "4.8 (85 reviews)",
      desc: "Spot the magnificent Bengal Tigers in Maharashtra's finest reserve, with stays in nature cottages and open gypsy rides.",
      image: tigerImg,
      link: "/contact",
      badge: "Top Wildlife"
    },
    {
      id: 3,
      title: "Darjeeling Tea Estates & Heritage Retreat",
      duration: "5 Days / 4 Nights",
      price: "₹32,000",
      rating: "4.7 (64 reviews)",
      desc: "Walk through organic green hills, experience heritage toy train runs, and taste gourmet tea right at the source.",
      image: defaultArticleImg,
      link: "/contact",
      badge: "Culture & Tea"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Curated Packages</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Explore Our Travel Packages
        </h1>
        <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-500 font-light text-lg">
          Handpicked itineraries designed to immerse you in nature, adventure, and local hospitality.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packagesList.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white border border-gray-100/80 shadow-md hover:shadow-xl rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
          >
            {/* Image Box */}
            <div className="h-60 overflow-hidden relative">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-amber-50/90 backdrop-blur-sm text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {pkg.badge}
              </span>
              <span className="absolute bottom-4 right-4 bg-[#1F4027]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {pkg.duration}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-amber-800 font-semibold">{pkg.rating}</span>
                  <span className="text-gray-400">Starting Price</span>
                </div>
                
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-800 transition leading-snug">
                  {pkg.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3">
                  {pkg.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Package rate</p>
                  <p className="font-bold text-xl text-gray-900 font-display">{pkg.price}</p>
                </div>
                <Link
                  to={pkg.link}
                  className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-5 py-2.5 rounded-full font-medium transition text-xs shadow-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Packages;
