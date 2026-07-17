import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hillImg from "../assets/hill.jpg";
import tigerImg from "../assets/tiger.jpg";
import defaultArticleImg from "../assets/castle.jpg";
import { generateItineraryPDF } from "../utils/pdfGenerator";
import { FaFilePdf } from "react-icons/fa";

function Packages() {
  const [dbPackages, setDbPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Preloaded sample packages with complete itinerary details for PDF generation
  const staticPackages = [
    {
      _id: "static-pkg-1",
      title: "Ladakh Adventure & Monastery Trek",
      duration: "7 Days / 6 Nights",
      price: 540, // converted for USD display consistency
      discountPrice: 620,
      maxPeople: 10,
      destination: "Leh Ladakh, India",
      rating: "4.9 (120 reviews)",
      shortDescription: "An ultimate guide-led group tour covering Leh, Pangong Tso Lake, Nubra sand dunes, and high-altitude passes.",
      description: "Experience the ultimate adventure in high altitudes. This tour covers Leh town, the stunning magnetic hill, monasteries, camel safaris at Hunder sand dunes, and overnight stays by the deep blue Pangong Tso lake.",
      inclusions: ["Guides & Oxygen Cylinders", "Premium Double-sharing Camps", "Airport transfers", "Permits & Entry Fees"],
      exclusions: ["Flight tickets", "Tips & Gratitude", "Personal medications & Insurance"],
      itinerary: [
        { day: 1, title: "Acclimatize in Leh", description: "Check-in at the hotel. Rest for the day to adjust to high altitudes. Short stroll to Leh market in the evening." },
        { day: 2, title: "Confluence & Magnetic Hill", description: "Visit Hall of Fame, Magnetic Hill, Gurudwara Pathar Sahib, and the beautiful Sangam (confluence of Indus and Zanskar rivers)." },
        { day: 3, title: "Leh to Nubra Valley via Khardung La", description: "Drive across the Khardung La Pass (highest motorable road at 18,380 ft). Enjoy a double-humped Bactrian camel ride at Hunder sand dunes." },
        { day: 4, title: "Nubra Valley to Pangong Lake", description: "Drive along the Shyok river to the breathtaking high-altitude saltwater Pangong Tso Lake, spanning across borders." }
      ],
      image: hillImg,
      link: "/tours/ladakh-adventure",
      badge: "Best Seller"
    },
    {
      _id: "static-pkg-2",
      title: "Tadoba Tiger Safari & Wildlife Explorer",
      duration: "4 Days / 3 Nights",
      price: 340,
      discountPrice: 0,
      maxPeople: 6,
      destination: "Chandrapur, India",
      rating: "4.8 (85 reviews)",
      shortDescription: "Spot the magnificent Bengal Tigers in Maharashtra's finest reserve, with stays in nature cottages and open gypsy rides.",
      description: "Venture deep into Tadoba Andhari Tiger Reserve, Maharashtra's oldest national park. It offers high tiger-sighting ratios, bamboo forests, marsh crocodiles, leopards, sloth bears, and rich birdwatching activities.",
      inclusions: ["3 Open Gypsy Safaris", "Forest Department Permits & Guide", "Luxury Wildlife Resort Stay", "All Buffet Meals"],
      exclusions: ["Camera charges at park", "Alcoholic beverages", "Travel expenses to Nagpur"],
      itinerary: [
        { day: 1, title: "Nagpur to Tadoba & Evening Safari", description: "Drive from Nagpur airport/station to Tadoba. Post lunch, head out for your first open-gypsy safari in search of big cats." },
        { day: 2, title: "Morning & Afternoon Safaris", description: "Two safaris today to maximize chances. Explore deep zones like Moharli and Kolara, guided by local trackers." },
        { day: 3, title: "Birdwatching & Lake Walk", description: "Spend the morning at Irai lake watching waterfowl, mugger crocodiles, and taking a nature trail walk with our naturalist." }
      ],
      image: tigerImg,
      link: "/contact",
      badge: "Top Wildlife"
    },
    {
      _id: "static-pkg-3",
      title: "Darjeeling Tea Estates & Heritage Retreat",
      duration: "5 Days / 4 Nights",
      price: 390,
      discountPrice: 450,
      maxPeople: 8,
      destination: "Darjeeling, India",
      rating: "4.7 (64 reviews)",
      shortDescription: "Walk through organic green hills, experience heritage toy train runs, and taste gourmet tea right at the source.",
      description: "Retreat to the scenic views of Kanchenjunga. Learn tea leaf picking at a colonial-era estate, enjoy tea tasting sessions, and explore local culture including Himalayan Mountaineering Institute and Ghoom Monastery.",
      inclusions: ["Private SUV Transfers", "Heritage Tea Estate Villa Stay", "Gourmet Tea Tasting Sessions", "Toy Train Joyride Tickets"],
      exclusions: ["Lunch & Dinners", "Adventure sport expenses", "Porterage fees"],
      itinerary: [
        { day: 1, title: "Bagdogra to Darjeeling Estate", description: "Drive through loops of pine forests. Settle in your heritage tea estate bungalow and enjoy an evening warm tea pot." },
        { day: 2, title: "Tea Picking & Factory Tour", description: "Join local estate workers to pick first-flush tea leaves. Visit the factory to see processing steps: drying, rolling, and packaging." },
        { day: 3, title: "Tiger Hill Sunrise & Monastery", description: "Wake up early for sunrise over Mt. Kanchenjunga at Tiger Hill. Visit Ghoom Monastery and Batasia Loop toy train track." }
      ],
      image: defaultArticleImg,
      link: "/contact",
      badge: "Culture & Tea"
    }
  ];

  const fetchActivePackages = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4010/api/v1/packages/active");
      const data = await response.json();
      if (data.success && data.packages && data.packages.length > 0) {
        setDbPackages(data.packages);
      } else {
        setDbPackages([]);
      }
    } catch (e) {
      console.warn("Failed to fetch packages from backend, using static fallback", e);
      setDbPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivePackages();
  }, []);

  const displayPackages = dbPackages.length > 0 ? dbPackages : staticPackages;

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Curated Packages</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Explore Our Travel Packages
        </h1>
        <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-500 font-light text-lg mt-2">
          Handpicked itineraries designed to immerse you in nature, adventure, and local hospitality.
        </p>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1F4027] border-t-transparent" />
          <p className="text-gray-500 text-sm">Loading travel itineraries...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPackages.map((pkg) => {
            // Support both local assets (image) and database arrays (images)
            const coverImage = pkg.images && pkg.images.length > 0 ? pkg.images[0] : (pkg.image || "");
            const displayPrice = typeof pkg.price === "number" ? `$${pkg.price}` : pkg.price;
            const itemBadge = pkg.badge || (pkg.category?.name || "Premium Tour");

            return (
              <div
                key={pkg._id || pkg.id}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-lg rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 animate-scaleIn"
              >
                {/* Image Box */}
                <div className="h-60 overflow-hidden relative bg-gray-100">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-700 font-bold bg-amber-50/20">
                      🍵 Karuya Tours
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-amber-50/90 backdrop-blur-sm text-amber-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {itemBadge}
                  </span>
                  <span className="absolute bottom-4 right-4 bg-[#1F4027]/90 text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {pkg.duration}
                  </span>
                </div>

                {/* Content Body */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-amber-850 font-bold">{pkg.rating || "4.8 (Highly Rated)"}</span>
                      <span className="text-gray-400">Starting Price</span>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-amber-850 transition leading-snug line-clamp-1">
                      {pkg.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-2 pt-1">
                      {pkg.shortDescription || pkg.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-gray-400">Package rate</p>
                      <p className="font-bold text-lg text-gray-900 font-display leading-tight">{displayPrice}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* jsPDF Download Button */}
                      <button
                        onClick={() => generateItineraryPDF(pkg)}
                        className="border border-red-200 hover:border-red-300 text-red-650 hover:bg-red-50 p-2.5 rounded-full transition cursor-pointer"
                        title="Download PDF Itinerary Brochure"
                      >
                        <FaFilePdf size={14} />
                      </button>
                      
                      <Link
                        to={pkg.link || `/tours/ladakh-adventure`}
                        className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-4.5 py-2.5 rounded-full font-semibold transition text-xs shadow-sm hover:shadow"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Packages;
