import { useState, useEffect } from "react";
import defaultArticleImg from "../assets/castle.jpg";
import hillImg from "../assets/hill.jpg";
import { useNotification } from "../context/NotificationContext";
import { useCart } from "../context/CartContext";

function Shop() {
  const { showToast, showPopup } = useNotification();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartCount, setIsCartOpen } = useCart();

  const teaProducts = [
    {
      id: 1,
      name: "Karuya Darjeeling Gold",
      category: "Single Origin Black Tea",
      price: 499,
      weight: "250g",
      rating: "4.9 (42 reviews)",
      desc: "First flush Darjeeling whole leaf tea, offering a delicate floral aroma and signature muscatel grape note.",
      image: defaultArticleImg
    },
    {
      id: 2,
      name: "Karuya Spiced Masala Chai",
      category: "Spiced Tea Blend",
      price: 349,
      weight: "250g",
      rating: "4.8 (38 reviews)",
      desc: "Robust Assam CTC tea blended with fresh cardamom, cinnamon, cloves, ginger, and black pepper.",
      image: hillImg
    },
    {
      id: 3,
      name: "Himalayan Organic Green Tea",
      category: "Pure Green Tea",
      price: 399,
      weight: "150g",
      rating: "4.7 (24 reviews)",
      desc: "High-altitude organic green tea leaves packed with antioxidants, featuring a clean grassy finish.",
      image: defaultArticleImg
    },
    {
      id: 4,
      name: "Chamomile Herbal Infusion",
      category: "Caffeine-Free Herbal",
      price: 450,
      weight: "100g",
      rating: "4.8 (19 reviews)",
      desc: "Whole dried German chamomile flowers, brewing a sweet apple-like profile perfect for a bedtime steep.",
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
          setProducts(teaProducts);
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
        setProducts(teaProducts);
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

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">

      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div className="text-left space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Karuya Organics</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Our Organic Tea Shop
          </h1>
          <div className="w-12 h-0.5 bg-[#1F4027]"></div>
          <p className="text-gray-500 font-light text-base">
            Taste organic single-origin loose leaves and traditional spiced chais sourced from premium estates.
          </p>
        </div>

        {/* Cart Status Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-3 bg-white border border-gray-100 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition text-left focus:outline-none"
        >
          <span className="text-xl">🛒</span>
          <div>
            <p className="text-xs text-gray-400 font-medium">Your Cart</p>
            <p className="font-bold text-gray-800 text-sm">{cartCount} items</p>
          </div>
        </button>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {products.map((product) => (
          <div
            key={product._id || product.id}
            className="bg-white border border-gray-100/80 shadow-md hover:shadow-xl rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
          >
            {/* Image Box */}
            <div className="h-48 overflow-hidden relative bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 bg-[#FAF8F5] border border-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                {product.weight}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{product.category}</span>
                  <span className="text-amber-800 font-medium">{product.rating || "4.8 (Local)"}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-amber-800 transition leading-snug">
                  {product.name}
                </h3>
                {product.productId && (
                  <div className="text-[10px] text-amber-700 font-mono font-semibold uppercase tracking-wider">
                    ID: {product.productId}
                  </div>
                )}
                <p className="text-gray-500 text-xs leading-relaxed font-light line-clamp-3">
                  {product.description || product.desc}
                </p>
              </div>

              <div className="pt-3.5 border-t border-gray-50 flex items-center justify-between">
                <span className="font-bold text-xl text-gray-900 font-display">₹{product.price}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-4 py-2 rounded-full font-medium transition text-xs shadow-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Contact Banner */}
      <div className="max-w-4xl mx-auto mt-20 bg-white border border-gray-100 rounded-3xl p-8 md:p-12 text-center shadow-md space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Interested in Bulk Corporate Orders?</h3>
        <p className="text-gray-500 text-sm font-light max-w-lg mx-auto">
          We provide custom branded gift hampers blending Darjeeling loose leaf tins and wellness accessories for your team or corporate clients.
        </p>
        <div className="pt-2">
          <button
            onClick={() => showPopup({
              title: "Bulk Inquiries",
              message: "Please leave a query on our Contact page or WhatsApp us directly at +91 9220829392. We will provide catalog options and wholesale pricing within 24 hours.",
              type: "info"
            })}
            className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3 rounded-full font-semibold transition text-sm shadow-sm"
          >
            Inquire Bulk Rates
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shop;
