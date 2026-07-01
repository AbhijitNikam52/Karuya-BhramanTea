import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import ImageCropperModal from "../components/ImageCropperModal";

function AdminShop() {
  const { user, token, isAdmin } = useAuth();
  const { showToast, showPopup } = useNotification();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Shirts");
  const [quantity, setQuantity] = useState("10");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Cropper State
  const [cropFile, setCropFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4010/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        showToast(data.message || "Failed to fetch products", "error");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast("Could not load products. Make sure backend is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      // Not an admin, don't fetch anything
      setLoading(false);
      return;
    }
    fetchProducts();
  }, [isAdmin]);

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("Please upload an image file.", "error");
        return;
      }
      setCropFile(file);
      setShowCropper(true);
      // Reset input element value so same file triggers change again if selected
      e.target.value = "";
    }
  };

  // Handle cropped image
  const handleCroppedImage = (croppedFile) => {
    setImageFile(croppedFile);
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(croppedFile);
    
    // Close cropper modal
    setShowCropper(false);
    setCropFile(null);
    showToast("Image cropped successfully!", "success");
  };

  // Form Submit (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId.trim() || !name.trim() || !price || !description.trim()) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    if (!editingProduct && !imageFile) {
      showToast("Please select an image file to upload.", "error");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("productId", productId.trim());
    formData.append("name", name.trim());
    formData.append("price", price);
    formData.append("description", description.trim());
    formData.append("category", category);
    formData.append("quantity", quantity);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const url = editingProduct
        ? `http://localhost:4010/api/products/${editingProduct._id}`
        : "http://localhost:4010/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(
          editingProduct ? "Product updated successfully!" : "Product uploaded successfully!",
          "success"
        );
        // Reset form
        setProductId("");
        setName("");
        setPrice("");
        setDescription("");
        setCategory("Shirts");
        setQuantity("10");
        setImageFile(null);
        setImagePreview(null);
        setEditingProduct(null);
        // Refresh product list
        fetchProducts();
      } else {
        showToast(data.message || "Failed to save product", "error");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      showToast("An error occurred during save. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Select product for editing
  const handleEditSelect = (product) => {
    setEditingProduct(product);
    setProductId(product.productId);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description || product.desc || "");
    setCategory(product.category || "Shirts");
    setQuantity(product.quantity !== undefined ? product.quantity.toString() : "10");
    setImageFile(null);
    setImagePreview(product.image);

    // Scroll smoothly to the form container
    const formElement = document.getElementById("productFormContainer");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setProductId("");
    setName("");
    setPrice("");
    setDescription("");
    setCategory("Shirts");
    setQuantity("10");
    setImageFile(null);
    setImagePreview(null);
  };

  // Delete product
  const handleDelete = async (id, customId) => {
    showPopup({
      title: "Delete Product?",
      message: `Are you sure you want to delete product '${customId}'? This action cannot be undone.`,
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:4010/api/products/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok && data.success) {
            showToast("Product deleted successfully", "success");
            fetchProducts();
          } else {
            showToast(data.message || "Failed to delete product", "error");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          showToast("Failed to delete product. Please try again.", "error");
        }
      },
    });
  };

  // Restrict access if not logged in as admin
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-xl font-medium text-gray-500">Loading shop panel...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FAF8F5] px-6 text-center space-y-6">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-4xl shadow-sm">
          ⚠️
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-3xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-500 font-light text-sm">
            You do not have administrative privileges to access this panel. Please login with an administrator account.
          </p>
        </div>
        <Link
          to="/login"
          className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-3 rounded-full font-semibold transition shadow-sm text-sm"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-left space-y-2 border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Admin Controls</span>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Shop Management</h1>
            <div className="w-12 h-0.5 bg-[#1F4027]"></div>
          </div>
          <div className="text-sm text-gray-500 font-light">
            Logged in as: <span className="font-semibold text-[#1F4027]">{user?.name}</span> ({user?.role})
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div id="productFormContainer" className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-lg space-y-6 text-left">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2">
                {editingProduct ? (
                  <>
                    <span>✏️</span> Edit Product
                  </>
                ) : (
                  <>
                    <span>➕</span> Add New Product
                  </>
                )}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product ID */}
                <div>
                  <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Product ID / Code (Unique)*
                  </label>
                  <input
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="e.g. DARJ-GOLD-001"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50 text-sm"
                    required
                  />
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Karuya Darjeeling Gold"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50 text-sm"
                    required
                  />
                </div>

                {/* Price & Quantity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                      Price (INR)*
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 499"
                      min="0"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                      Quantity / Stock*
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 10"
                      min="0"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50 text-sm"
                  >
                    <option value="Shirts">Shirts</option>
                    <option value="Caps">Caps</option>
                    <option value="Pants">Pants</option>
                    <option value="Tracksuits">Tracksuits</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Description*
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the product notes, flavor, and source..."
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] transition bg-gray-50/50 text-sm"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-700 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Product Image*
                  </label>
                  <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-[#1F4027] transition cursor-pointer relative bg-gray-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required={!imageFile && !editingProduct}
                    />
                    
                    {imagePreview ? (
                      <div className="space-y-2 text-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-28 w-28 object-cover rounded-lg mx-auto shadow"
                        />
                        <p className="text-xs text-gray-500 font-medium">Click or drag to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-center">
                        <span className="text-3xl text-gray-400">🖼️</span>
                        <div className="flex text-sm text-gray-600">
                          <span className="font-semibold text-amber-700 hover:text-amber-800">Upload a file</span>
                        </div>
                        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1F4027] hover:bg-[#152e1c] text-white py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm mt-6"
                >
                  {submitting
                    ? (editingProduct ? "Updating Product..." : "Uploading Product...")
                    : (editingProduct ? "Update Product" : "Save Product")}
                </button>

                {editingProduct && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-3.5 rounded-full font-semibold shadow-sm transition duration-300 text-sm mt-2"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: List of products (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-lg space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2">
                <span>📦</span> Current Products ({products.length})
              </h2>

              {products.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-light text-sm space-y-2">
                  <span className="text-4xl">🍵</span>
                  <p>No products uploaded yet.</p>
                  <p className="text-xs">Add your first product using the form on the left.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:border-amber-700/30 transition duration-300 items-start bg-white shadow-sm"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-xl bg-gray-50 flex-shrink-0"
                      />
                      
                      <div className="flex-grow min-w-0 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-gray-900 truncate hover:text-amber-800 transition">
                            {product.name}
                          </h3>
                          <span className="text-sm font-bold text-gray-900 font-mono">
                            ₹{product.price}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                            ID: {product.productId}
                          </span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {product.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${
                            (product.quantity !== undefined ? product.quantity : 10) > 0 
                              ? "bg-emerald-50 text-emerald-800" 
                              : "bg-red-50 text-red-800"
                          }`}>
                            Stock: {product.quantity !== undefined ? product.quantity : 10}
                          </span>
                        </div>

                        <p className="text-gray-500 text-xs font-light line-clamp-2 pt-1">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 self-start">
                        <button
                          onClick={() => handleEditSelect(product)}
                          className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition duration-200"
                          title="Edit Product"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.productId)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                          title="Delete Product"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally Render Image Cropper Modal */}
      {showCropper && cropFile && (
        <ImageCropperModal
          file={cropFile}
          onCrop={handleCroppedImage}
          onClose={() => {
            setShowCropper(false);
            setCropFile(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminShop;
