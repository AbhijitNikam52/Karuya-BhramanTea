function TourItinerary() {
  const downloadItinerary = () => {
    const link = document.createElement("a");
    link.href = "/itinerary.pdf";
    link.download = "Ladakh-Tour-Itinerary.pdf";
    link.click();
  };

  const itineraryDays = [
    {
      day: "Day 1",
      title: "Arrival in Leh & Acclimatization",
      desc: "Touch down at Leh Airport (3,500m). Transfer to your hotel for check-in. Rest for the entire day to allow your body to adapt to the high altitude. Enjoy warm Ladakhi tea in the evening."
    },
    {
      day: "Day 2",
      title: "Leh Local Sightseeing",
      desc: "Explore historic Leh. Visit the Leh Palace, Shanti Stupa for panoramic sunset vistas, and experience the gravitational phenomenon at Magnetic Hill. Conclude the day with monastery exploration."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Planned Route</span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight font-display">Tour Itinerary</h2>
          <div className="w-12 h-0.5 bg-[#1F4027]"></div>
        </div>

        <button
          onClick={downloadItinerary}
          className="bg-transparent border border-[#1F4027] text-[#1F4027] hover:bg-[#1F4027] hover:text-white px-5 py-2.5 rounded-full font-medium transition duration-300 shadow-sm text-sm"
        >
          Download Itinerary (PDF)
        </button>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-gray-100 space-y-8 text-left max-w-4xl">
        {itineraryDays.map((item, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#1F4027] shadow-sm"></div>
            
            {/* Itinerary Card */}
            <div className="bg-white border border-gray-100/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 space-y-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 uppercase tracking-wider">
                {item.day}
              </span>
              <h3 className="font-bold text-lg text-gray-900 pt-1">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TourItinerary;
