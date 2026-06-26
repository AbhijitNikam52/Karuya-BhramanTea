import { useState } from "react";
import { Link } from "react-router-dom";
import tigerImg from "../assets/tiger.jpg";
import lionImg from "../assets/lion.jpg";
import hillImg from "../assets/hill.jpg";
import castleImg from "../assets/castle.jpg";
import img9722 from "../assets/20180926220246_IMG_9722 copy.jpg";
import img9552 from "../assets/20190603083248_IMG_9552 copy.jpg";

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeImage, setActiveImage] = useState(null);

  const categories = ["All", "Mountains", "Wildlife", "Culture & Heritage"];

  const galleryItems = [
    {
      id: 1,
      image: tigerImg,
      title: "Royal Bengal Tiger",
      location: "Tadoba National Park, India",
      category: "Wildlife",
      desc: "Capturing the raw majesty of Tadoba's finest predator in its natural habitat."
    },
    {
      id: 2,
      image: hillImg,
      title: "Nubra Valley Hills",
      location: "Ladakh, India",
      category: "Mountains",
      desc: "An endless vista of rugged, wind-carven hills touching high-altitude clouds."
    },
    {
      id: 3,
      image: img9722,
      title: "Himalayan Serenity",
      location: "Spiti Valley, India",
      category: "Mountains",
      desc: "Small hamlets nesting under towering snow caps, evoking silent peace."
    },
    {
      id: 4,
      image: lionImg,
      title: "Asiatic Lion",
      location: "Gir National Park, India",
      category: "Wildlife",
      desc: "A rare sighting of the pride of Gir lounging in the dry deciduous scrub forest."
    },
    {
      id: 5,
      image: castleImg,
      title: "Heritage Fortress",
      location: "Rajasthan, India",
      category: "Culture & Heritage",
      desc: "Stunning architecture preserved through centuries, narrating tales of valor."
    },
    {
      id: 6,
      image: img9552,
      title: "Monastery Heights",
      location: "Leh Ladakh, India",
      category: "Mountains",
      desc: "Perched high on rocky cliffs, monastic walls echo with chants and bells."
    }
  ];

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
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
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#1F4027] text-white shadow-md scale-105"
                : "bg-white text-gray-700 border border-gray-200/80 hover:border-amber-700 hover:text-amber-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                {item.category}
              </span>
              <h3 className="text-xl font-bold leading-tight mb-1">{item.title}</h3>
              <p className="text-xs text-gray-300 flex items-center gap-1 mb-2">
                <span>📍</span> {item.location}
              </p>
              <p className="text-sm text-gray-200 line-clamp-2 font-light">
                {item.desc}
              </p>
            </div>

            {/* Static Bottom Title */}
            <div className="p-5 border-t border-gray-50 flex justify-between items-center bg-white">
              <div>
                <h4 className="font-semibold text-gray-800 text-base">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.location}</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 uppercase tracking-wider">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No photos found in this category.</p>
        </div>
      )}

      {/* Image Modal Lightbox */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white text-3xl hover:text-amber-400 transition"
          >
            ✕
          </button>
          
          <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl transition-all">
            <div className="md:w-3/5 bg-black flex items-center justify-center aspect-[4/3] md:aspect-auto md:max-h-[75vh]">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="md:w-2/5 p-8 flex flex-col justify-between bg-white text-gray-800">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1.5 rounded-full">
                    {activeImage.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mt-4 tracking-tight text-gray-900">
                    {activeImage.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                    <span>📍</span> {activeImage.location}
                  </p>
                </div>
                
                <p className="text-gray-600 leading-relaxed font-light">
                  {activeImage.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveImage(null)}
                  className="px-6 py-2.5 rounded-full border border-gray-300 font-medium text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <Link
                  to="/tours/ladakh-adventure"
                  onClick={() => setActiveImage(null)}
                  className="px-6 py-2.5 rounded-full bg-[#1F4027] text-white font-medium text-sm hover:bg-[#152e1c] transition"
                >
                  View Related Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
