function TourPricing() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Dates & Pricing</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Departure Date</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Availability</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4">10 May 2026</td>
                <td className="p-4">₹45,000</td>
                <td className="p-4 text-green-600">Available</td>
              </tr>
              <tr className="border-t">
                <td className="p-4">24 May 2026</td>
                <td className="p-4">₹47,000</td>
                <td className="p-4 text-red-600">Limited Seats</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default TourPricing;
