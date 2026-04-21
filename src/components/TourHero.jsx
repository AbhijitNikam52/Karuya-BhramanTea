function TourHero() {
  return (
    <section className="relative">
      <div className="h-[450px] bg-gray-300 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Ladakh Adventure Tour
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl max-w-6xl mx-auto p-6 -mt-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold">7 Days / 6 Nights</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tour Type</p>
            <p className="font-semibold">Group Tour</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Starting Price</p>
            <p className="font-semibold text-green-700">₹45,000</p>
          </div>
          <div>
            <button className="bg-green-700 text-white px-6 py-3 rounded-lg">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TourHero;
