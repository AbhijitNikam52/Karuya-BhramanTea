import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";

function CartDrawer() {
  const {
    cart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { showToast, showPopup } = useNotification();

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    // Deduct stock for database products
    const dbItems = cart
      .filter(
        (item) =>
          item.product._id && /^[0-9a-fA-F]{24}$/.test(item.product._id)
      )
      .map((item) => ({
        id: item.product._id,
        quantity: item.quantity,
      }));

    if (dbItems.length > 0) {
      try {
        await fetch("http://localhost:4010/api/products/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: dbItems }),
        });
      } catch (err) {
        console.error("Failed to deduct stock:", err);
      }
    }

    showPopup({
      title: "Order Placed Successfully! 🛍️",
      message: `Thank you for shopping with Karuya Merchandise! Your order for a total of ₹${cartTotal} has been placed. We have processed your order and updated our inventory.`,
      type: "success",
      onClose: () => {
        clearCart();
        setIsCartOpen(false);
        // Force reload to refresh stock numbers on the shop page
        window.location.reload();
      },
    });
  };

  return (
    <>
      {/* Background Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sliding Drawer Container */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h2 className="text-lg font-bold text-gray-900">Your Shopping Cart</h2>
            <span className="bg-[#1F4027] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400 font-light">
              <span className="text-5xl">🍵</span>
              <div className="space-y-1">
                <p className="font-semibold text-gray-700">Your cart is empty</p>
                <p className="text-xs">Explore our premium selection of organic loose leaf teas and chais.</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow transition mt-2"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const productKey = item.product._id || item.product.id;
                return (
                  <div
                    key={productKey}
                    className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:border-amber-700/20 transition duration-200 bg-white"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl bg-gray-50 flex-shrink-0"
                    />

                    <div className="flex-grow min-w-0 space-y-1 text-left">
                      <h3 className="font-bold text-sm text-gray-900 truncate hover:text-amber-800 transition">
                        {item.product.name}
                      </h3>
                      {item.product.productId && (
                        <p className="text-[10px] text-amber-700 font-mono font-semibold uppercase">
                          ID: {item.product.productId}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {item.product.weight} • {item.product.category}
                      </p>

                      <div className="flex justify-between items-center pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-100 rounded-full bg-gray-50/50">
                          <button
                            onClick={() => updateQuantity(productKey, -1)}
                            className="px-2 py-0.5 hover:bg-gray-100 rounded-l-full text-xs text-gray-500 font-bold transition"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-bold text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(productKey, 1)}
                            className="px-2 py-0.5 hover:bg-gray-100 rounded-r-full text-xs text-gray-500 font-bold transition"
                          >
                            +
                          </button>
                        </div>

                        {/* Price Calculations */}
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block font-mono">
                            ₹{item.product.price} each
                          </span>
                          <span className="text-sm font-bold text-[#1F4027] font-mono">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(productKey)}
                      className="text-gray-300 hover:text-red-600 transition p-1.5 hover:bg-red-50 rounded-lg self-start"
                      title="Remove Item"
                    >
                      🗑️
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-[#FAF8F5] space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 font-medium">Subtotal</p>
                <p className="text-xs text-gray-400 font-light">Taxes & shipping calculated at checkout</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900 font-mono">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 py-3 rounded-full text-xs font-semibold transition"
              >
                Close Cart
              </button>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white py-3 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition duration-300"
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
