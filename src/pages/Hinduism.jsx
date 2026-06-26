import { Link } from "react-router-dom";
import defaultArticleImg from "../assets/castle.jpg";
import hillImg from "../assets/hill.jpg";

function Hinduism() {
  const spiritualTrails = [
    {
      id: 1,
      name: "Varanasi & Rishikesh spiritual trail",
      location: "Ganga River / North India",
      image: hillImg,
      highlights: ["Ganga Aarti at Dashashwamedh Ghat", "Yoga retreats in Rishikesh", "Kashi Vishwanath Temple", "Sarnath excursions"],
      desc: "Experience ancient spiritual rituals. Attend grand fire aartis on the bank of the Ganges, learn yoga in global capital retreats, and feel the divine energy."
    },
    {
      id: 2,
      name: "Southern Temple Architecture: Madurai & Tanjore",
      location: "Tamil Nadu, India",
      image: defaultArticleImg,
      highlights: ["Meenakshi Amman Temple", "Brihadisvara Temple", "Ranganathaswamy Temple", "Traditional handicraft tours"],
      desc: "Marvel at gigantic Gopurams, stone pillared corridors, and granite carvings built by the Chola, Chera, and Pandya dynasties."
    },
    {
      id: 3,
      name: "Ruins of Hampi: Empire of Vijayanagara",
      location: "Karnataka, India",
      image: defaultArticleImg,
      highlights: ["Virupaksha Temple", "Stone Chariot", "Vittala Temple musical pillars", "Tungabhadra coracle rides"],
      desc: "Walk through an open-air museum of granite boulders and ruins. Hampi tells the tales of one of the richest Hindu empires in history."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Exploring Culture</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Hinduism & Spiritual Trails
        </h1>
        <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-500 font-light text-lg">
          Immerse yourself in rich heritage, sacred temple carvings, and serene yoga wellness retreats.
        </p>
      </div>

      {/* Trails List */}
      <div className="max-w-6xl mx-auto space-y-12 text-left">
        {spiritualTrails.map((trail, index) => (
          <div
            key={trail.id}
            className={`bg-white border border-gray-100/80 shadow-md rounded-3xl p-6 md:p-8 flex flex-col ${
              index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            } gap-8 items-center hover:shadow-xl transition-all duration-300`}
          >
            {/* Image Column */}
            <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <img src={trail.image} alt={trail.name} className="w-full h-full object-cover" />
            </div>

            {/* Content Column */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-700">{trail.location}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight font-display">{trail.name}</h3>
                <div className="w-12 h-0.5 bg-[#1F4027]"></div>
              </div>

              <p className="text-gray-500 text-base leading-relaxed font-light">
                {trail.desc}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Spiritual Highlights</p>
                <div className="flex flex-wrap gap-2">
                  {trail.highlights.map((h, i) => (
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
                  Book Spiritual Tour
                </Link>
                <span className="text-xs text-amber-700 font-medium">Guide Included</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hinduism;
