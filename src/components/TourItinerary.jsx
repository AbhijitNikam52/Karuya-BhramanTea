function TourItinerary() {
  const downloadItinerary = () => {
    const link = document.createElement("a");
    link.href = "/itinerary.pdf";
    link.download = "Ladakh-Tour-Itinerary.pdf";
    link.click();
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Tour Itinerary</h2>

        <button
          onClick={downloadItinerary}
          className="bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Download Itinerary (PDF)
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Day 1 – Arrival in Leh</h3>
          <p className="text-gray-600 mt-2">
            Arrival at Leh airport. Transfer to hotel and rest for
            acclimatization.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Day 2 – Local Sightseeing</h3>
          <p className="text-gray-600 mt-2">
            Visit monasteries, Magnetic Hill and local attractions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TourItinerary;
