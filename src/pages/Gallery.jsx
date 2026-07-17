import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tigerImg from "../assets/tiger.jpg";
import lionImg from "../assets/lion.jpg";
import hillImg from "../assets/hill.jpg";
import castleImg from "../assets/castle.jpg";
import img9722 from "../assets/20180926220246_IMG_9722 copy.jpg";
import img9552 from "../assets/20190603083248_IMG_9552 copy.jpg";

function Gallery() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dbItems, setDbItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Mountains", "Wildlife", "Culture & Heritage"];

  // Preloaded static items as visual fallback
  const staticItems = [
    {
      _id: "static-1",
      image: tigerImg,
      title: "Royal Bengal Tiger",
      location: "Tadoba National Park, India",
      category: "Wildlife",
      description: "Capturing the raw majesty of Tadoba's finest predator in its natural habitat."
    },
    {
      _id: "static-2",
      image: hillImg,
      title: "Nubra Valley Hills",
      location: "Ladakh, India",
      category: "Mountains",
      description: "An endless vista of rugged, wind-carven hills touching high-altitude clouds."
    },
    {
      _id: "static-3",
      image: img9722,
      title: "Himalayan Serenity",
      location: "Spiti Valley, India",
      category: "Mountains",
      description: "Small hamlets nesting under towering snow caps, evoking silent peace."
    },
    {
      _id: "static-4",
      image: lionImg,
      title: "Asiatic Lion",
      location: "Gir National Park, India",
      category: "Wildlife",
      description: "A rare sighting of the pride of Gir lounging in the dry deciduous scrub forest."
    },
    {
      _id: "static-5",
      image: castleImg,
      title: "Heritage Fortress",
      location: "Rajasthan, India",
      category: "Culture & Heritage",
      description: "Stunning architecture preserved through centuries, narrating tales of valor."
    },
    {
      _id: "static-6",
      image: img9552,
      title: "Monastery Heights",
      location: "Leh Ladakh, India",
      category: "Mountains",
      description: "Perched high on rocky cliffs, monastic walls echo with chants and bells."
    }
  ];

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4010/api/v1/gallery");
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setDbItems(data.data);
      } else {
        setDbItems([]);
      }
    } catch (e) {
      console.warn("Failed to fetch gallery from backend, using static fallback", e);
      setDbItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const galleryItems = dbItems.length > 0 ? dbItems : staticItems;

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-amber-700">Visual Journeys</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Our Gallery</h1>
        <div className="w-24 h-0.5 bg-amber-700/40 mx-auto mt-4"></div>
        <p className="text-gray-600 text-lg">
          Explore captured moments from our wildlife safaris, mountain expeditions, and cultural tours.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              selectedCategory === category
                ? "bg-[#1F4027] text-white shadow-md scale-105"
                : "bg-white text-gray-700 border border-gray-200/80 hover:border-amber-700 hover:text-amber-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1F4027] border-t-transparent" />
          <p className="text-gray-500 text-sm">Loading gallery photos...</p>
        </div>
      ) : (
        /* Gallery Grid */
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            // Support both legacy single image or new images array
            const coverImage = item.images && item.images.length > 0 ? item.images[0] : item.image;
            const photoCount = item.images && item.images.length > 0 ? item.images.length : (item.image ? 1 : 0);

            return (
              <div
                key={item._id}
                onClick={() => navigate(`/gallery/${item._id}`)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col animate-scaleIn"
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                  <img
                    src={coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] px-2.5 py-1 rounded-full font-semibold">
                    📁 {photoCount} Photos
                  </span>
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold leading-tight mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-300 flex items-center gap-1 mb-2">
                    <span>📍</span> {item.location || "Location Unavailable"}
                  </p>
                  <p className="text-sm text-gray-200 line-clamp-2 font-light">
                    {item.description || item.desc || "Click to view full photo album."}
                  </p>
                </div>

                {/* Static Bottom Title */}
                <div className="p-5 border-t border-gray-55 flex justify-between items-center bg-white">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-base">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.location || "N/A"}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No photos found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default Gallery;
