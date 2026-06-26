import hillImg from "../assets/hill.jpg";

function TourHero() {
  return (
    <section className="relative">
      {/* Background Image Container */}
      <div
        className="h-[480px] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${hillImg})`,
        }}
      >
        {/* Soft shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60"></div>
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-400 bg-amber-950/40 px-4 py-1.5 rounded-full border border-amber-400/20 backdrop-blur-sm">
            Epic Himalayan Journeys
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-md">
            Ladakh Adventure Tour
          </h1>
          <p className="text-gray-200 max-w-xl mx-auto text-sm md:text-base font-light">
            Journey through high altitude passes, serene valleys, and historic Buddhist monasteries.
          </p>
        </div>
      </div>

      {/* Floating Info Details Card */}
      <div className="bg-white border border-gray-100 shadow-xl rounded-2xl max-w-6xl mx-auto p-6 md:p-8 -mt-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-6 text-center items-center">
          <div className="space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Duration</p>
            <p className="font-bold text-gray-800 text-lg">7 Days / 6 Nights</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Tour Type</p>
            <p className="font-bold text-gray-800 text-lg">Guided Group Tour</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Starting Price</p>
            <p className="font-bold text-[#1F4027] text-2xl font-display">₹45,000</p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
            <button className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3.5 rounded-full font-medium transition duration-300 shadow-md hover:shadow-lg text-sm">
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourHero;
