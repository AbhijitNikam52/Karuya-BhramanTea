import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaImages, FaThList, FaCalendarAlt } from "react-icons/fa";

// Visual fallback imports for static previews
import tigerImg from "../assets/tiger.jpg";
import lionImg from "../assets/lion.jpg";
import hillImg from "../assets/hill.jpg";
import castleImg from "../assets/castle.jpg";
import img9722 from "../assets/20180926220246_IMG_9722 copy.jpg";
import img9552 from "../assets/20190603083248_IMG_9552 copy.jpg";

function GalleryDetails() {
  const { id } = useParams();
  
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Preloaded static items lookup table
  const staticItems = [
    {
      _id: "static-1",
      images: [tigerImg, lionImg], 
      title: "Royal Bengal Tiger",
      location: "Tadoba National Park, India",
      category: "Wildlife",
      description: "Capturing the raw majesty of Tadoba's finest predator in its natural habitat."
    },
    {
      _id: "static-2",
      images: [hillImg, img9722, img9552],
      title: "Nubra Valley Hills",
      location: "Ladakh, India",
      category: "Mountains",
      description: "An endless vista of rugged, wind-carven hills touching high-altitude clouds."
    },
    {
      _id: "static-3",
      images: [img9722, hillImg],
      title: "Himalayan Serenity",
      location: "Spiti Valley, India",
      category: "Mountains",
      description: "Small hamlets nesting under towering snow caps, evoking silent peace."
    },
    {
      _id: "static-4",
      images: [lionImg, tigerImg],
      title: "Asiatic Lion",
      location: "Gir National Park, India",
      category: "Wildlife",
      description: "A rare sighting of the pride of Gir lounging in the dry deciduous scrub forest."
    },
    {
      _id: "static-5",
      images: [castleImg],
      title: "Heritage Fortress",
      location: "Rajasthan, India",
      category: "Culture & Heritage",
      description: "Stunning architecture preserved through centuries, narrating tales of valor."
    },
    {
      _id: "static-6",
      images: [img9552, img9722],
      title: "Monastery Heights",
      location: "Leh Ladakh, India",
      category: "Mountains",
      description: "Perched high on rocky cliffs, monastic walls echo with chants and bells."
    }
  ];

  const fetchAlbum = async () => {
    if (id && id.startsWith("static-")) {
      const matchedStatic = staticItems.find(item => item._id === id);
      setAlbum(matchedStatic || null);
      setActiveIndex(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4010/api/v1/gallery/${id}`);
      const data = await response.json();
      if (data.success) {
        setAlbum(data.data);
        setActiveIndex(0);
      } else {
        console.error("Failed to load album data:", data.message);
      }
    } catch (error) {
      console.error("Error loading gallery details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  const albumPhotos = album?.images && album.images.length > 0 ? album.images : (album?.image ? [album.image] : []);

  const handlePrevSlide = () => {
    setActiveIndex(prev => (prev === 0 ? albumPhotos.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveIndex(prev => (prev === albumPhotos.length - 1 ? 0 : prev + 1));
  };

  // Autoplay slideshow
  useEffect(() => {
    if (albumPhotos.length <= 1) return;
    
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [activeIndex, albumPhotos.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1F4027] border-t-transparent" />
        <p className="text-gray-500 font-medium">Loading album details...</p>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] gap-4">
        <p className="text-gray-500 text-lg font-medium">Gallery album not found.</p>
        <Link to="/gallery" className="text-[#1F4027] font-semibold underline">
          Back to Gallery
        </Link>
      </div>
    );
  }

  const activePhoto = albumPhotos[activeIndex] || hillImg;

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Embed Ken Burns CSS Animation */}
      <style>{`
        @keyframes kenburns {
          0% {
            transform: scale(1.0) translate(0, 0);
          }
          100% {
            transform: scale(1.10) translate(-0.5%, -0.5%);
          }
        }
        .animate-kenburns {
          animation: kenburns 5.2s ease-out forwards;
        }
      `}</style>

      {/* 1. Hero Header Section (TourHero Style) */}
      <section className="relative">
        <div
          className="h-[480px] bg-cover bg-center flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${activePhoto})`,
          }}
        >
          {/* Blurred background backing */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-md opacity-25 scale-105"
            style={{ backgroundImage: `url(${activePhoto})` }}
          />
          {/* Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60"></div>
          
          {/* Hero text overlay */}
          <div className="relative z-10 text-center space-y-4 px-6 max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-400 bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-sm">
              {album.category} Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-md">
              {album.title}
            </h1>
            <p className="text-gray-200 max-w-xl mx-auto text-sm md:text-base font-light">
              Visual memoirs carven through paths of nature, heritage, and expeditions.
            </p>
          </div>
        </div>

        {/* 2. Floating Info Details Card */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl max-w-5xl mx-auto p-6 md:p-8 -mt-16 relative z-10">
          <div className="grid md:grid-cols-4 gap-6 text-center items-center">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Location</p>
              <p className="font-bold text-gray-800 text-base md:text-lg flex items-center justify-center gap-1">
                <FaMapMarkerAlt className="text-amber-700 text-sm" />
                <span>{album.location || "Spiti, India"}</span>
              </p>
            </div>
            
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Album Category</p>
              <p className="font-bold text-gray-800 text-base md:text-lg">{album.category}</p>
            </div>

            <div className="space-y-1 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Photo Count</p>
              <p className="font-bold text-[#1F4027] text-xl font-display">📁 {albumPhotos.length} Items</p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
              <Link 
                to="/gallery"
                className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3.5 rounded-full font-medium transition duration-300 shadow-md hover:shadow-lg text-xs md:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FaChevronLeft size={10} /> Back to Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Album Overview Details Section (TourOverview Style) */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-6">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* Main Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="text-left space-y-1">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Expedition Notes</span>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight font-display">Album Overview</h2>
              <div className="w-12 h-0.5 bg-[#1F4027]"></div>
            </div>
            
            <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
              {album.description || "No description provided for this visual collection. These images capture the serene natural habitats, high altitude mountain valleys, and cultural heritage sites encountered during our custom tours."}
            </p>
          </div>

          {/* Quick Info / Callout sidebar */}
          <div className="bg-amber-50/40 border border-amber-100/50 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-[#1F4027] text-sm uppercase tracking-wider">Visual Assets</h3>
            <ul className="space-y-3.5 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-[#1F4027] font-semibold">✓</span> High Resolution Visuals
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1F4027] font-semibold">✓</span> Natural Habitats & Wildlife
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1F4027] font-semibold">✓</span> Monasteries & Forts
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Slideshow / Gallery Section (TourGallery / Interactive Slideshow Style) */}
      {albumPhotos.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20 space-y-6">
          <div className="text-left space-y-1">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Slide Memories</span>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight font-display">Interactive Film View</h2>
            <div className="w-12 h-0.5 bg-[#1F4027]"></div>
          </div>

          {/* Slideshow Player */}
          <div className="relative w-full h-[300px] sm:h-[450px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-black flex items-center justify-center group select-none">
            
            {/* Blurred Background backing */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-45 scale-105"
              style={{ backgroundImage: `url(${activePhoto})` }}
            />

            {/* Main Active Image with Ken Burns zoom animation */}
            <img
              src={activePhoto}
              alt={`${album.title} slide ${activeIndex + 1}`}
              className="relative max-h-full max-w-full object-contain z-10 animate-kenburns"
              key={activeIndex}
            />

            {/* Navigation Arrows */}
            {albumPhotos.length > 1 && (
              <>
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full shadow backdrop-blur-sm transition hover:scale-105 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center border border-white/10"
                >
                  <FaChevronLeft size={16} />
                </button>
                
                <button
                  onClick={handleNextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full shadow backdrop-blur-sm transition hover:scale-105 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center border border-white/10"
                >
                  <FaChevronRight size={16} />
                </button>
              </>
            )}

            {/* Indicator badge overlay */}
            <div className="absolute bottom-4 left-6 z-25 bg-black/65 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full border border-white/10">
              Photo {activeIndex + 1} of {albumPhotos.length}
            </div>
          </div>

          {/* Film Strip Thumbnails */}
          {albumPhotos.length > 1 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 pl-1">Photos Film Strip</h3>
              
              <div className="flex gap-4 overflow-x-auto pb-3 pt-1 px-1 scrollbar-thin">
                {albumPhotos.map((photoUrl, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-103 ${
                        isActive 
                          ? "border-[#1F4027] scale-103 shadow-md shadow-[#1f4027]/10" 
                          : "border-gray-200 hover:border-amber-700/40"
                      }`}
                    >
                      <img
                        src={photoUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {!isActive && (
                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default GalleryDetails;
