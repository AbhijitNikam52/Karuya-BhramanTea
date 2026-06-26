import { useNavigate } from "react-router-dom";
import { FaUsers, FaGlobe, FaPlane, FaBus } from "react-icons/fa";

/* Images */
import heroImg from "../assets/tiger.jpg";

/* Stats Banner Image */
import statsBannerImg from "../assets/lion.jpg";

/* NEW Get Ready Banner Image */
import getReadyImg from "../assets/hill.jpg";

/* OPTIONAL Default Article Image */
import defaultArticleImg from "../assets/castle.jpg";

function Home() {
  const navigate = useNavigate();

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
      image: heroImg, // uses tiger.jpg
    },
  ];

  return (
    <div className="bg-[#FAF8F5]">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-400 bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-sm">
            Curated Travel Experiences
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Explore the World with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
              Karuya BhramanTea
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Unveiling the beauty of national safaris and international wonders,
            one thoughtfully crafted journey at a time.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => navigate("/tours/ladakh-adventure")}
              className="w-full sm:w-auto bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3.5 rounded-full font-medium transition duration-300 shadow-lg hover:shadow-xl text-base"
            >
              Featured Tour
            </button>
            <button
              onClick={() => navigate("/gallery")}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full font-medium transition duration-300 backdrop-blur-sm text-base"
            >
              Explore Gallery
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-1 h-8 bg-gradient-to-b from-white/60 to-transparent rounded-full animate-bounce"></div>
        </div>
      </section>

      {/* ================= ABOUT TEXT SECTION ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Crafting Trips that Fill <br />
              <span className="text-amber-800 font-display">Your Soul with Stories</span>
            </h2>
            <div className="w-16 h-1 bg-[#1F4027] rounded-full"></div>

            <div className="text-gray-600 text-lg leading-relaxed space-y-6 font-light">
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
                className="inline-flex items-center gap-2 text-[#1F4027] hover:text-amber-800 font-semibold text-base transition group"
              >
                <span>Read Our Full Story</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">➔</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-amber-500/10 rounded-2xl -rotate-2 z-0"></div>
            <div className="relative z-10 bg-white p-3 rounded-2xl shadow-xl">
              <img
                src={defaultArticleImg}
                alt="Travel experiences"
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
            {/* Tiny accent badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#1F4027] text-white p-6 rounded-2xl shadow-xl hidden sm:block">
              <p className="text-3xl font-bold font-display">8+</p>
              <p className="text-xs uppercase tracking-widest text-emerald-200 mt-1">Years Experiencing</p>
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
        {/* Deep overlay */}
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-400">Our Milestones</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">BhramanTea By The Numbers</h2>
            <p className="text-gray-300 max-w-xl mx-auto font-light">Every travel experience counts. Here is our footprints tracker.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stat Card 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center transition hover:bg-white/10">
              <div className="p-4 bg-amber-500/10 rounded-full text-amber-400">
                <FaUsers size={28} />
              </div>
              <h3 className="text-4xl font-extrabold mt-4 font-display">1,200+</h3>
              <p className="mt-2 text-sm text-gray-300 uppercase tracking-wider font-light">Happy Customers</p>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center transition hover:bg-white/10">
              <div className="p-4 bg-amber-500/10 rounded-full text-amber-400">
                <FaGlobe size={28} />
              </div>
              <h3 className="text-4xl font-extrabold mt-4 font-display">150+</h3>
              <p className="mt-2 text-sm text-gray-300 uppercase tracking-wider font-light">Trips Hosted</p>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center transition hover:bg-white/10">
              <div className="p-4 bg-amber-500/10 rounded-full text-amber-400">
                <FaPlane size={28} />
              </div>
              <h3 className="text-4xl font-extrabold mt-4 font-display">15+</h3>
              <p className="mt-2 text-sm text-gray-300 uppercase tracking-wider font-light">Destinations</p>
            </div>

            {/* Stat Card 4 */}
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
              onClick={() => navigate("/tours/ladakh-adventure")}
              className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3.5 rounded-full font-medium transition duration-300 shadow-xl hover:scale-105"
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
              {/* Image Container with Zoom */}
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

              {/* Card Body */}
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
                    onClick={() => navigate("/magazine")}
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
            className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3.5 rounded-full font-medium transition duration-300 shadow-md hover:shadow-lg text-sm"
          >
            View All Posts
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
