function TourGallery() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">Gallery</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="h-60 bg-gray-300 rounded-lg"></div>
        <div className="h-60 bg-gray-300 rounded-lg"></div>
        <div className="h-60 bg-gray-300 rounded-lg"></div>
      </div>
    </section>
  );
}

export default TourGallery;
