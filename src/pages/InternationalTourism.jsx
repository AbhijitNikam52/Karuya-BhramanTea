import { Link } from "react-router-dom";
import defaultArticleImg from "../assets/castle.jpg";
import hillImg from "../assets/hill.jpg";

function InternationalTourism() {
  const internationalTours = [
    {
      id: 1,
      name: "Kingdom of Bhutan: Land of Thunder Dragon",
      region: "Himalayas / Asia",
      image: hillImg,
      highlights: ["Paro Taktsang (Tiger's Nest)", "Thimphu Dzong", "Punakha Valley", "Dochula Pass"],
      desc: "Bhutan is globaly unique as a carbon-negative kingdom prioritizing Gross National Happiness. Explore high mountain shrines, grand fortresses (Dzongs), and lush valley trails."
    },
    {
      id: 2,
      name: "Cambodia: Temples & Lost Kingdoms",
      region: "Southeast Asia",
      image: defaultArticleImg,
      highlights: ["Angkor Wat", "Bayon Faces", "Ta Prohm Ruins", "Phnom Penh Palace"],
      desc: "Unveil centuries of history wrapped in tree roots. From the gigantic bas-reliefs of Angkor Wat to the giant stone faces of Bayon, Cambodia is a spiritual wonder."
    },
    {
      id: 3,
      name: "Vietnam: Heritage & Coastline Explorer",
      region: "Southeast Asia",
      image: defaultArticleImg,
      highlights: ["Ha Long Bay Cruise", "Hoi An Ancient Town", "Hanoi Old Quarter", "Mekong Delta"],
      desc: "Taste gourmet street foods, sail past limestone pillars in emerald bays, explore lantern-lit ancient trading ports, and discover a nation of vibrant history."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Global Horizons</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          International Tourism
        </h1>
        <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-500 font-light text-lg">
          Cross borders to explore ancient stone ruins, wellness escapes, and majestic mountain peaks.
        </p>
      </div>

      {/* Tours Grid */}
      <div className="max-w-6xl mx-auto space-y-12 text-left">
        {internationalTours.map((tour, index) => (
          <div
            key={tour.id}
            className={`bg-white border border-gray-100/80 shadow-md rounded-3xl p-6 md:p-8 flex flex-col ${
              index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            } gap-8 items-center hover:shadow-xl transition-all duration-300`}
          >
            {/* Image Column */}
            <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
            </div>

            {/* Content Column */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-700">{tour.region}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight font-display">{tour.name}</h3>
                <div className="w-12 h-0.5 bg-[#1F4027]"></div>
              </div>

              <p className="text-gray-500 text-base leading-relaxed font-light">
                {tour.desc}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Attractions</p>
                <div className="flex flex-wrap gap-2">
                  {tour.highlights.map((h, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-[#1F4027]/5 text-[#1F4027] border border-[#1F4027]/10">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <Link
                  to="/contact"
                  className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3 rounded-full font-medium transition text-sm shadow-sm"
                >
                  Inquire Now
                </Link>
                <Link
                  to="/contact"
                  className="text-amber-700 font-semibold hover:underline text-sm"
                >
                  Customize Itinerary ➔
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InternationalTourism;
