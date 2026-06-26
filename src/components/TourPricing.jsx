function TourPricing() {
  const dates = [
    { departure: "10 May 2026", price: "₹45,000", status: "Available", color: "bg-emerald-50 text-emerald-800" },
    { departure: "24 May 2026", price: "₹47,000", status: "Limited Seats", color: "bg-amber-50 text-amber-800" }
  ];

  return (
    <section className="bg-white py-16 border-y border-gray-100/50">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="text-left space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Fair Pricing</span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dates & Pricing</h2>
          <div className="w-12 h-0.5 bg-[#1F4027]"></div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-gray-100">
                <th className="p-5 font-semibold text-gray-700 text-sm uppercase tracking-wider">Departure Date</th>
                <th className="p-5 font-semibold text-gray-700 text-sm uppercase tracking-wider">Price per Person</th>
                <th className="p-5 font-semibold text-gray-700 text-sm uppercase tracking-wider">Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dates.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition">
                  <td className="p-5 text-gray-800 font-medium">{item.departure}</td>
                  <td className="p-5 font-semibold text-gray-900 font-display text-lg">{item.price}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${item.color}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default TourPricing;
