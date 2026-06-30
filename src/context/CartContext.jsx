import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bhramantea_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Failed to parse saved cart:", err);
        localStorage.removeItem("bhramantea_cart");
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("bhramantea_cart", JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(
      (item) => (item.product._id || item.product.id) === (product._id || product.id)
    );

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      saveCart(newCart);
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, amount) => {
    const existingItemIndex = cart.findIndex(
      (item) => (item.product._id || item.product.id) === productId
    );

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      const newQuantity = newCart[existingItemIndex].quantity + amount;
      
      if (newQuantity <= 0) {
        newCart.splice(existingItemIndex, 1);
      } else {
        newCart[existingItemIndex].quantity = newQuantity;
      }
      saveCart(newCart);
    }
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => (item.product._id || item.product.id) !== productId);
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
