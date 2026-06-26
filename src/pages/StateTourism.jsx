import { Link } from "react-router-dom";
import tigerImg from "../assets/tiger.jpg";
import defaultArticleImg from "../assets/castle.jpg";
import hillImg from "../assets/hill.jpg";

function StateTourism() {
  const stateHighlights = [
    {
      id: 1,
      name: "Nashik: Vineyard Retreats & Spiritual Ghats",
      category: "Wine & Culture",
      image: defaultArticleImg,
      desc: "Known as the Wine Capital of India and a historic pilgrim center, Nashik hosts vineyard tours, grape stomping, and serene walks by the Godavari River Ghats."
    },
    {
      id: 2,
      name: "Konkan: Coastal Forts & Pristine Beaches",
      category: "Coastal Escapes",
      image: hillImg,
      desc: "Discover white sand beaches, dolphin watching at Murud Janjira, scuba diving in Malvan, and fresh Konkani seafood delicacies along the Arabian Sea."
    },
    {
      id: 3,
      name: "Western Ghats: Sahyadri Treks & Monsoon Streams",
      category: "Adventure & Monsoons",
      image: tigerImg,
      desc: "Treks like Kalsubai Peak, Harihar Fort, and Devkund waterfall hikes. The Sahyadri range transforms into lush, misty green valleys during the monsoon season."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Explore Maharashtra</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          State Tourism
        </h1>
        <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-500 font-light text-lg">
          Uncover the scenic treasures, monsoon hill forts, coastal marine life, and vineyard retreats of Maharashtra.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {stateHighlights.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100/80 shadow-md hover:shadow-xl rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
          >
            {/* Image Box */}
            <div className="h-56 overflow-hidden relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-amber-50/90 backdrop-blur-sm text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-800 transition leading-snug">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <Link
                  to="/contact"
                  className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-5 py-2.5 rounded-full font-medium transition text-xs shadow-sm"
                >
                  Plan Weekend Trip
                </Link>
                <span className="text-xs text-amber-700 font-medium">Nashik / Pune / Mumbai</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StateTourism;
