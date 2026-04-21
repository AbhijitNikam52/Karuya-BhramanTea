function TourInclusions() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Inclusions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Hotel Accommodation</li>
            <li>Daily Breakfast & Dinner</li>
            <li>All transfers & sightseeing</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Exclusions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Airfare</li>
            <li>Personal expenses</li>
            <li>Travel insurance</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TourInclusions;
