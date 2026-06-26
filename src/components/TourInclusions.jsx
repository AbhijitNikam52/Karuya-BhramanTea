function TourInclusions() {
  const inclusions = [
    "Hotel accommodation on double sharing basis",
    "Daily breakfast and dinner (MAP plan)",
    "All airport transfers and local sightseeing in private SUVs",
    "Inner line permit fees and environment fees"
  ];

  const exclusions = [
    "Airfare or train tickets to/from Leh",
    "Personal expenses (laundry, tips, phone calls, mineral water)",
    "Travel insurance & emergency evacuation fees",
    "Any activities not listed in the itinerary"
  ];

  return (
    <section className="bg-white py-16 border-b border-gray-100/50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        
        {/* Inclusions Card */}
        <div className="bg-[#FAF8F5]/50 border border-gray-100 p-8 rounded-3xl space-y-6 text-left shadow-sm">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-800">What is Covered</span>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-display">Inclusions</h3>
            <div className="w-12 h-0.5 bg-emerald-700"></div>
          </div>
          
          <ul className="space-y-3">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions Card */}
        <div className="bg-[#FAF8F5]/50 border border-gray-100 p-8 rounded-3xl space-y-6 text-left shadow-sm">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-bold text-red-800">What is Not Covered</span>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-display">Exclusions</h3>
            <div className="w-12 h-0.5 bg-red-700"></div>
          </div>

          <ul className="space-y-3">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

export default TourInclusions;
