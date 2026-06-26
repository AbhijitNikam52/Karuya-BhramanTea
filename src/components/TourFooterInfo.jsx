function TourFooterInfo() {
  const policies = [
    { period: "30+ Days before departure", fee: "10% of total tour package cost" },
    { period: "15 to 30 Days before departure", fee: "50% of total tour package cost" },
    { period: "Less than 15 Days before departure", fee: "100% of total tour package cost" }
  ];

  return (
    <section className="bg-[#FAF8F5] py-16 border-t border-gray-100/50 text-left">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700 font-sans">Refund Terms</span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight font-display">Cancellation Policy</h2>
          <div className="w-12 h-0.5 bg-[#1F4027]"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {policies.map((item, index) => (
            <div key={index} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-2">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{item.period}</p>
              <p className="font-bold text-[#1F4027] text-lg font-display">{item.fee}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TourFooterInfo;
