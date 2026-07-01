import { useState, useEffect } from "react";
import { FaShoppingBag, FaStar } from "react-icons/fa";
import defaultArticleImg from "../assets/castle.jpg";
import hillImg from "../assets/hill.jpg";
import { useNotification } from "../context/NotificationContext";
import { useCart } from "../context/CartContext";

function Shop() {
  const { showToast, showPopup } = useNotification();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartCount, setIsCartOpen } = useCart();

  const apparelProducts = [
    {
      id: 1,
      name: "Karuya Signature Polo Shirt",
      category: "Shirts",
      price: 899,
      rating: "4.9",
      desc: "Premium organic cotton polo shirt with the signature Karuya logo embroidered on the chest. Breathable and standard fit.",
      image: defaultArticleImg
    },
    {
      id: 2,
      name: "Adventure Travel Sun Cap",
      category: "Caps",
      price: 399,
      rating: "4.8",
      desc: "Breathable and lightweight adventure sun cap, featuring adjustable strap and quick-dry fabric, ideal for outdoor treks.",
      image: hillImg
    },
    {
      id: 3,
      name: "Comfort Fit Utility Trek Pants",
      category: "Pants",
      price: 1299,
      rating: "4.7",
      desc: "Durable and weather-resistant utility trek pants with multi-pocket storage and elastic waistband for active travel.",
      image: defaultArticleImg
    },
    {
      id: 4,
      name: "Karuya Breathable Tracksuit",
      category: "Tracksuits",
      price: 1999,
      rating: "4.8",
      desc: "Cozy and breathable dual-tone travel tracksuit. Designed for ultimate warmth and stretch during high-altitude travel.",
      image: hillImg
    }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("http://localhost:4010/api/products");
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setProducts(data.data);
        } else {
          setProducts(apparelProducts);
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
        setProducts(apparelProducts);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, "success");
  };

  const getCategoryBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case "shirts":
        return "bg-emerald-50 text-emerald-800 border-emerald-100/60";
      case "caps":
        return "bg-amber-50 text-amber-800 border-amber-100/60";
      case "pants":
        return "bg-sky-50 text-sky-800 border-sky-100/60";
      case "tracksuits":
        return "bg-indigo-50 text-indigo-800 border-indigo-100/60";
      case "accessories":
        return "bg-purple-50 text-purple-800 border-purple-100/60";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100/60";
    }
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">

      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div className="text-left space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Karuya Merchandise</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Our Premium Shop
          </h1>
          <div className="w-12 h-0.5 bg-[#1F4027]"></div>
          <p className="text-gray-500 font-light text-base max-w-xl">
            Explore our curated selection of high-quality travel wear, custom embroidered shirts, and premium adventure gear.
          </p>
        </div>

        {/* Cart Status Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-3 bg-white border border-gray-100 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-700/10 transition text-left focus:outline-none"
        >
          <span className="text-xl">🛒</span>
          <div>
            <p className="text-xs text-gray-400 font-medium">Your Cart</p>
            <p className="font-bold text-gray-800 text-sm">{cartCount} items</p>
          </div>
        </button>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
        {products.map((product) => (
          <div
            key={product._id || product.id}
            className="bg-white border border-gray-100/80 shadow-md hover:shadow-2xl rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2"
          >
            {/* Image Box */}
            <div className="h-56 overflow-hidden relative bg-gray-50/50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Category tag */}
              <span className={`absolute top-4 left-4 border text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm ${getCategoryBadgeClass(product.category)}`}>
                {product.category || "General"}
              </span>

              {/* Stock status indicator */}
              <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${
                (product.quantity !== undefined ? product.quantity : 10) > 0
                  ? "bg-white/95 text-emerald-800 border border-emerald-100"
                  : "bg-red-500 text-white border border-red-600"
              }`}>
                {(product.quantity !== undefined ? product.quantity : 10) > 0
                  ? `${product.quantity !== undefined ? product.quantity : 10} Left`
                  : "Sold Out"}
              </span>

              {/* Hover shade overlay */}
              <div className="absolute inset-0 bg-[#1F4027]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content Body */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    <FaStar size={12} />
                    <span className="font-bold">{product.rating || "4.8"}</span>
                  </div>
                  {product.productId && (
                    <span className="text-[10px] text-gray-400 font-mono">
                      #{product.productId}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-gray-900 group-hover:text-amber-800 transition duration-300 leading-snug line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-xs leading-relaxed font-light line-clamp-3">
                  {product.description || product.desc}
                </p>
              </div>

              {/* Bottom Price/Button */}
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Price</span>
                  <span className="font-extrabold text-xl text-gray-900 font-mono">₹{product.price}</span>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={(product.quantity !== undefined ? product.quantity : 10) <= 0}
                  className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 text-xs shadow-sm flex items-center gap-1.5 cursor-pointer ${
                    (product.quantity !== undefined ? product.quantity : 10) > 0
                      ? "bg-[#1F4027] hover:bg-amber-700 text-white hover:scale-105 active:scale-95 hover:shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  <FaShoppingBag size={11} />
                  <span>{(product.quantity !== undefined ? product.quantity : 10) > 0 ? "Add to Cart" : "Sold Out"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Contact Banner */}
      <div className="max-w-4xl mx-auto mt-24 bg-white border border-gray-100 rounded-3xl p-8 md:p-12 text-center shadow-lg space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Interested in Bulk Corporate Orders?</h3>
        <p className="text-gray-500 text-sm font-light max-w-lg mx-auto">
          We provide custom branded corporate apparel hampers blending embroidered polo shirts, adventure caps, and travel accessories for your team or corporate clients.
        </p>
        <div className="pt-2">
          <button
            onClick={() => showPopup({
              title: "Bulk Inquiries",
              message: "Please leave a query on our Contact page or WhatsApp us directly at +91 9220829392. We will provide catalog options and wholesale pricing within 24 hours.",
              type: "info"
            })}
            className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3 rounded-full font-semibold transition text-sm shadow-sm hover:shadow-md hover:scale-102"
          >
            Inquire Bulk Rates
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shop;
