import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaGlobe, FaPlane, FaBus, FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

/* Static Images Fallbacks */
import tigerImg from "../assets/tiger.jpg";
import lionImg from "../assets/lion.jpg";
import hillImg from "../assets/hill.jpg";
import defaultArticleImg from "../assets/castle.jpg";

function Home() {
  const navigate = useNavigate();

  const statsBannerImg = lionImg;
  const getReadyImg = hillImg;

  // Banners & Testimonials dynamic states
  const [banners, setBanners] = useState([]);
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  
  const [loading, setLoading] = useState(true);

  // Fallback Testimonials
  const fallbackTestimonials = [
    {
      _id: "fallback-test-1",
      name: "Abhijit Nikam",
      message: "The Ladakh monastery trek was organized with immaculate planning. Every detail from guides to warm accommodations was taken care of. 10/10!",
      rating: 5,
      tourPackage: { title: "Ladakh Monastery Trek" }
    },
    {
      _id: "fallback-test-2",
      name: "Ajinkya Nikam",
      message: "Spotted three Bengal Tigers on our Tadoba safaris! The luxury nature cottage was beautiful, and the naturalists were extremely knowledgeable.",
      rating: 5,
      tourPackage: { title: "Tadoba Tiger Safaris" }
    },
    {
      _id: "fallback-test-3",
      name: "Ajay G.",
      message: "Outstanding customer service. They helped us customize our Rajasthan family retreat down to the hour. Elegant hotels and very polite drivers.",
      rating: 5,
      tourPackage: { title: "Heritage Fortress Tour" }
    }
  ];

  // Fetch Banners & Testimonials from Backend
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch active banners
      const bannerRes = await fetch("http://localhost:4010/api/v1/banners");
      const bannerData = await bannerRes.json();
      if (bannerData.success && bannerData.data.length > 0) {
        setBanners(bannerData.data);
      }

      // 2. Fetch approved testimonials
      const testRes = await fetch("http://localhost:4010/api/v1/testimonials");
      const testData = await testRes.json();
      if (testData.success && testData.data.length > 0) {
        setTestimonials(testData.data);
      }
    } catch (error) {
      console.warn("Failed to fetch home slider details, using preloaded defaults.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Autoplay Banner Slider (changes every 6 seconds)
  useEffect(() => {
    const totalBanners = banners.length > 0 ? banners.length : 1;
    if (totalBanners <= 1) return;

    const timer = setInterval(() => {
      setActiveBannerIdx(prev => (prev === totalBanners - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [activeBannerIdx, banners.length]);

  // Autoplay Testimonial Slider (changes every 6 seconds)
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  useEffect(() => {
    if (displayTestimonials.length <= 1) return;

    const timer = setInterval(() => {
      setActiveTestimonialIdx(prev => (prev === displayTestimonials.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [activeTestimonialIdx, displayTestimonials.length]);

  // Fallback banner details if DB is empty
  const defaultBanners = [
    {
      _id: "default-banner-1",
      image: tigerImg,
      title: "Explore the World with Karuya BhramanTea",
      subtitle: "Unveiling the beauty of national safaris and international wonders, one thoughtfully crafted journey at a time.",
      link: "/tours/ladakh-adventure"
    }
  ];

  const activeBannersList = banners.length > 0 ? banners : defaultBanners;
  const currentBanner = activeBannersList[activeBannerIdx] || defaultBanners[0];

  const articles = [
    {
      id: 1,
      title: "Welcome to Karuya BhramanTea : Celebrate New Year",
      description:
        "The merry season is not far and celebrating the New Year in a new way is truly a great experience.",
      category: "Celebrations",
      date: "October 25, 2018",
      image: defaultArticleImg,
    },
    {
      id: 2,
      title: "Top Wildlife Tours You Must Experience in India",
      description:
        "Explore unforgettable wildlife journeys across India's finest national parks and sanctuaries.",
      category: "Wildlife",
      date: "November 10, 2018",
      image: tigerImg,
    },
  ];

  return (
    <div className="bg-[#FAF8F5] overflow-x-hidden">
      
      {/* Ken Burns Stylesheet */}
      <style>{`
        @keyframes kenburnsHero {
          0% {
            transform: scale(1.0) translate(0, 0);
          }
          100% {
            transform: scale(1.08) translate(-0.2%, -0.2%);
          }
        }
        .hero-kenburns {
          animation: kenburnsHero 6.2s ease-out forwards;
        }
      `}</style>

      {/* ================= HERO BANNER SLIDER (Ken Burns & Autoplay) ================= */}
      <section className="relative h-[85vh] md:h-[90vh] bg-black overflow-hidden flex items-center justify-center">
        
        {/* Active Banner Image with Ken Burns Zoom */}
        <div 
          className="absolute inset-0 bg-cover bg-center hero-kenburns"
          key={activeBannerIdx} // Resets Ken Burns animation on index switch
          style={{
            backgroundImage: `url(${currentBanner.image})`,
          }}
        />
        
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75"></div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto space-y-6 animate-fadeIn">
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-amber-400 bg-amber-950/50 px-4 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-sm">
            Curated Travel Experiences
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            {currentBanner.title}
          </h1>

          {currentBanner.subtitle && (
            <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              {currentBanner.subtitle}
            </p>
          )}

          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => navigate(currentBanner.link || "/packages")}
              className="w-full sm:w-auto bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3.5 rounded-full font-semibold transition duration-300 shadow-lg hover:shadow-xl text-sm"
            >
              Explore Packages
            </button>
            <button
              onClick={() => navigate("/gallery")}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold transition duration-300 backdrop-blur-sm text-sm"
            >
              Explore Gallery
            </button>
          </div>
        </div>

        {/* Slider Indicator Bullets (Only shown if multiple banners exist) */}
        {activeBannersList.length > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
            {activeBannersList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveBannerIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeBannerIdx === idx ? "bg-amber-400 scale-125 w-6" : "bg-white/40"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 text-[10px] tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-0.5 h-6 bg-gradient-to-b from-white/60 to-transparent rounded-full animate-bounce"></div>
        </div>
      </section>

      {/* ================= ABOUT TEXT SECTION ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Crafting Trips that Fill <br />
              <span className="text-amber-850 font-display">Your Soul with Stories</span>
            </h2>
            <div className="w-16 h-1 bg-[#1F4027] rounded-full"></div>

            <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-6 font-light">
              <p>
                Karuya BhramanTea is a venture built around a simple dream: to fulfill your 
                <strong> "Dreams To Travel The World"</strong>.
              </p>
              <p>
                We vision to bring the world to you in baby steps, leaving your footprints in sweet memories. 
                Whether you seek corporate retreats, family holidays, or solo wildlife explorations, 
                we arrange deals, distinctive experiences, and packages to fit your vision.
              </p>
              <p>
                Started in 2018, Karuya BhramanTea blends the excitement of national safaris with 
                exotic international destinations. We are your well-travelled friend—the one with elegant 
                style and handpicked recommendations.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 text-[#1F4027] hover:text-amber-855 font-semibold text-sm transition group"
              >
                <span>Read Our Full Story</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">➔</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-amber-500/10 rounded-2xl -rotate-2 z-0"></div>
            <div className="relative z-10 bg-white p-3 rounded-2xl shadow-xl">
              <img
                src={defaultArticleImg}
                alt="Travel experiences"
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1F4027] text-white p-6 rounded-2xl shadow-xl hidden sm:block">
              <p className="text-3xl font-bold font-display">8+</p>
              <p className="text-xs uppercase tracking-widest text-emerald-250 mt-1">Years Experiencing</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= STATS COUNTER ================= */}
      <section
        className="relative py-24 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${statsBannerImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-400">Our Milestones</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">BhramanTea By The Numbers</h2>
            <p className="text-gray-300 max-w-xl mx-auto font-light">Every travel experience counts. Here is our footprints tracker.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center transition hover:bg-white/10">
              <div className="p-4 bg-amber-500/10 rounded-full text-amber-400">
                <FaUsers size={28} />
              </div>
              <h3 className="text-4xl font-extrabold mt-4 font-display">1,200+</h3>
              <p className="mt-2 text-sm text-gray-300 uppercase tracking-wider font-light">Happy Customers</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center transition hover:bg-white/10">
              <div className="p-4 bg-amber-500/10 rounded-full text-amber-400">
                <FaGlobe size={28} />
              </div>
              <h3 className="text-4xl font-extrabold mt-4 font-display">150+</h3>
              <p className="mt-2 text-sm text-gray-300 uppercase tracking-wider font-light">Trips Hosted</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center transition hover:bg-white/10">
              <div className="p-4 bg-amber-500/10 rounded-full text-amber-400">
                <FaPlane size={28} />
              </div>
              <h3 className="text-4xl font-extrabold mt-4 font-display">15+</h3>
              <p className="mt-2 text-sm text-gray-300 uppercase tracking-wider font-light">Destinations</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center transition hover:bg-white/10">
              <div className="p-4 bg-amber-500/10 rounded-full text-amber-400">
                <FaBus size={28} />
              </div>
              <h3 className="text-4xl font-extrabold mt-4 font-display">40+</h3>
              <p className="mt-2 text-sm text-gray-300 uppercase tracking-wider font-light">Safaris Organized</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SLIDER SECTION ================= */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Passenger Words</span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">What Our Travelers Say</h2>
          <div className="w-16 h-0.5 bg-amber-700/40 mx-auto mt-2"></div>
        </div>

        {/* Testimonials Slideshow Box */}
        <div className="relative bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm max-w-3xl mx-auto flex flex-col items-center space-y-6 animate-scaleIn">
          <FaQuoteLeft className="text-[#1F4027]/10 text-5xl md:text-6xl absolute top-6 left-8" />
          
          <div className="relative z-10 space-y-4">
            {/* Stars */}
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < displayTestimonials[activeTestimonialIdx].rating ? "text-amber-400" : "text-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Review text */}
            <p className="text-gray-600 text-sm md:text-base italic leading-relaxed font-light max-w-2xl mx-auto">
              "{displayTestimonials[activeTestimonialIdx].message}"
            </p>

            {/* Profile detail */}
            <div className="flex flex-col items-center space-y-1 pt-2">
              <h4 className="font-bold text-gray-800 text-sm md:text-base">
                {displayTestimonials[activeTestimonialIdx].name}
              </h4>
              {displayTestimonials[activeTestimonialIdx].tourPackage && (
                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest bg-amber-50/75 px-3 py-0.5 rounded-full border border-amber-100/20">
                  Reviewed: {displayTestimonials[activeTestimonialIdx].tourPackage?.title || displayTestimonials[activeTestimonialIdx].tourPackage}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          {displayTestimonials.length > 1 && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTestimonialIdx(prev => (prev === 0 ? displayTestimonials.length - 1 : prev - 1))}
                className="p-2 border border-gray-250 hover:border-[#1F4027] text-gray-400 hover:text-[#1F4027] rounded-full transition cursor-pointer"
                title="Previous Review"
              >
                <FaChevronLeft size={10} />
              </button>
              
              <div className="flex gap-1.5">
                {displayTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonialIdx(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition ${
                      activeTestimonialIdx === idx ? "bg-[#1F4027] scale-125" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveTestimonialIdx(prev => (prev === displayTestimonials.length - 1 ? 0 : prev + 1))}
                className="p-2 border border-gray-250 hover:border-[#1F4027] text-gray-400 hover:text-[#1F4027] rounded-full transition cursor-pointer"
                title="Next Review"
              >
                <FaChevronRight size={10} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= GET READY BANNER ================= */}
      <section
        className="relative py-28 bg-cover bg-center text-white text-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${getReadyImg})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/45"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Ready to Begin <br />
            <span className="text-amber-400 font-display">Your Next Great Adventure?</span>
          </h2>

          <p className="text-lg text-gray-300 font-light max-w-xl mx-auto">
            Pull up your socks, book your seats, and get ready to experience travel like never before.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate("/packages")}
              className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3.5 rounded-full font-semibold transition duration-300 shadow-xl hover:scale-105"
            >
              BROWSE PACKAGES
            </button>
          </div>
        </div>
      </section>

      {/* ================= LATEST ARTICLES ================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Our Journal</span>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Latest Articles & Stories</h2>
          <div className="w-16 h-0.5 bg-amber-700/40 mx-auto mt-2"></div>
          <p className="text-gray-500 max-w-md mx-auto font-light">Get useful travel tips and read reports from our recent expeditions.</p>
        </div>

        {/* Dynamic Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden flex flex-col text-left group transition-all duration-300 border border-gray-100"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-amber-50/90 backdrop-blur-sm text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 font-medium">{article.date}</p>
                  <h3 className="font-bold text-xl text-gray-800 group-hover:text-amber-800 transition">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/magazine/${article.id === 1 ? "6a591cda08d74d8142db7a7a" : "6a591cda08d74d8142db7a7b"}`)}
                    className="text-[#1F4027] font-semibold text-sm hover:underline"
                  >
                    Read Article ➔
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="pt-6">
          <button
            onClick={() => navigate("/magazine")}
            className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3.5 rounded-full font-semibold transition duration-300 shadow-md hover:shadow-lg text-sm"
          >
            View All Posts
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
