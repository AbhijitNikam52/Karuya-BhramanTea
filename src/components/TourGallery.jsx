import hillImg from "../assets/hill.jpg";
import img9722 from "../assets/20180926220246_IMG_9722 copy.jpg";
import img9552 from "../assets/20190603083248_IMG_9552 copy.jpg";

function TourGallery() {
  const images = [
    { src: hillImg, title: "Nubra Valley Hills" },
    { src: img9722, title: "Himalayan Sunrise" },
    { src: img9552, title: "Key Monastery Heights" }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
      <div className="text-left space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Trek Memories</span>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight font-display">Tour Gallery</h2>
        <div className="w-12 h-0.5 bg-[#1F4027]"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={index} className="group relative h-64 overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-md transition duration-300">
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Visual overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <span className="text-white text-sm font-semibold">{img.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TourGallery;
