function TourOverview() {
  const highlights = [
    "Pangong Tso Lake excursion",
    "Nubra Valley & sand dunes camel ride",
    "Magnetic Hill gravitational phenomenon",
    "Historic Buddhist monastery tours",
    "Khardung La high-altitude pass crossing",
    "Authentic Ladakhi cultural exploration"
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
      <div className="text-left space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">What to Expect</span>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Tour Highlights</h2>
        <div className="w-12 h-0.5 bg-[#1F4027]"></div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="flex items-center gap-3.5 bg-white border border-gray-100 p-4.5 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-left"
          >
            <span className="w-6 h-6 rounded-full bg-emerald-50 text-[#1F4027] flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </span>
            <span className="text-gray-700 text-base font-light">{highlight}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TourOverview;
