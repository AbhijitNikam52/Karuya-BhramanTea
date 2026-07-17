import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { 
  FaPlus, FaTrash, FaEdit, FaBox, FaMapMarkerAlt, FaClock, 
  FaDollarSign, FaUsers, FaCheck, FaTimes, FaUpload, FaChevronDown,
  FaFilePdf
} from "react-icons/fa";
import { generateItineraryPDF } from "../utils/pdfGenerator";

function AdminPackages() {
  const { token, isAdmin } = useAuth();
  const { showToast, showPopup } = useNotification();

  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);

  // Form Fields State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("1");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // Inclusions and Exclusions
  const [inclusionInput, setInclusionInput] = useState("");
  const [inclusions, setInclusions] = useState([]);
  const [exclusionInput, setExclusionInput] = useState("");
  const [exclusions, setExclusions] = useState([]);

  // Itinerary
  const [itinerary, setItinerary] = useState([]);
  const [newDayTitle, setNewDayTitle] = useState("");
  const [newDayDesc, setNewDayDesc] = useState("");

  // Uploaded Images
  const [images, setImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Fetch Packages and Categories
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch packages (using admin route or public route)
      const pkgRes = await fetch("http://localhost:4010/api/v1/packages", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const pkgData = await pkgRes.json();
      if (pkgData.success) {
        setPackages(pkgData.packages);
      }

      // Fetch Categories
      const catRes = await fetch("http://localhost:4010/api/v1/categories");
      const catData = await catRes.json();
      if (catData.success) {
        setCategories(catData.data);
        if (catData.data.length > 0 && !category) {
          setCategory(catData.data[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching admin packages data:", error);
      showToast("Failed to load packages or categories.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  // Handle Multi-Image Upload
  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Filter files
    const validFiles = files.filter(f => f.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      showToast("Only image files are allowed.", "warning");
    }

    if (validFiles.length === 0) return;

    setUploadingImages(true);
    showToast(`Uploading ${validFiles.length} images...`, "info");

    const formData = new FormData();
    validFiles.forEach(file => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:4010/api/v1/media/upload/multiple-images?folder=packages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setImages(prev => [...prev, ...data.urls]);
        showToast("Images uploaded successfully!", "success");
      } else {
        showToast(data.message || "Failed to upload images", "error");
      }
    } catch (error) {
      console.error("Error uploading multiple images:", error);
      showToast("Failed to upload images. Check backend server.", "error");
    } finally {
      setUploadingImages(false);
      e.target.value = ""; // Reset
    }
  };

  // Remove an uploaded image from package
  const handleRemoveImage = async (urlIndex) => {
    const url = images[urlIndex];
    
    // Optional: Call delete from storage API
    try {
      await fetch("http://localhost:4010/api/v1/media/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ url })
      });
    } catch (e) {
      console.warn("Soft failed deleting media from storage:", e);
    }

    setImages(prev => prev.filter((_, idx) => idx !== urlIndex));
    showToast("Image removed.", "info");
  };

  // Add Inclusion
  const handleAddInclusion = () => {
    if (inclusionInput.trim()) {
      setInclusions(prev => [...prev, inclusionInput.trim()]);
      setInclusionInput("");
    }
  };

  // Remove Inclusion
  const handleRemoveInclusion = (index) => {
    setInclusions(prev => prev.filter((_, idx) => idx !== index));
  };

  // Add Exclusion
  const handleAddExclusion = () => {
    if (exclusionInput.trim()) {
      setExclusions(prev => [...prev, exclusionInput.trim()]);
      setExclusionInput("");
    }
  };

  // Remove Exclusion
  const handleRemoveExclusion = (index) => {
    setExclusions(prev => prev.filter((_, idx) => idx !== index));
  };

  // Add Itinerary Day
  const handleAddItineraryDay = () => {
    if (newDayTitle.trim() && newDayDesc.trim()) {
      const nextDay = itinerary.length + 1;
      setItinerary(prev => [
        ...prev, 
        { day: nextDay, title: newDayTitle.trim(), description: newDayDesc.trim() }
      ]);
      setNewDayTitle("");
      setNewDayDesc("");
    } else {
      showToast("Itinerary Day requires both title and description.", "warning");
    }
  };

  // Remove Itinerary Day
  const handleRemoveItineraryDay = (index) => {
    const updated = itinerary
      .filter((_, idx) => idx !== index)
      .map((item, idx) => ({ ...item, day: idx + 1 })); // Recalculate day number
    setItinerary(updated);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !category || !destination.trim() || !duration.trim() || !price) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setSubmitting(true);
    const payload = {
      title: title.trim(),
      category,
      destination: destination.trim(),
      duration: duration.trim(),
      price: parseFloat(price),
      discountPrice: discountPrice ? parseFloat(discountPrice) : 0,
      maxPeople: parseInt(maxPeople) || 1,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      images,
      inclusions,
      exclusions,
      itinerary,
      isFeatured
    };

    try {
      const url = editingPackageId
        ? `http://localhost:4010/api/v1/packages/${editingPackageId}`
        : "http://localhost:4010/api/v1/packages";
      const method = editingPackageId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(
          editingPackageId ? "Tour package updated successfully!" : "Tour package created successfully!",
          "success"
        );
        resetForm();
        fetchData();
      } else {
        showToast(data.message || "Failed to save tour package.", "error");
      }
    } catch (error) {
      console.error("Error saving package:", error);
      showToast("Error saving package. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Select package for editing
  const handleEditSelect = (pkg) => {
    setEditingPackageId(pkg._id);
    setTitle(pkg.title);
    setCategory(pkg.category?._id || pkg.category || "");
    setDestination(pkg.destination);
    setDuration(pkg.duration);
    setPrice(pkg.price);
    setDiscountPrice(pkg.discountPrice || "");
    setMaxPeople(pkg.maxPeople?.toString() || "1");
    setShortDescription(pkg.shortDescription || "");
    setDescription(pkg.description);
    setImages(pkg.images || []);
    setInclusions(pkg.inclusions || []);
    setExclusions(pkg.exclusions || []);
    setItinerary(pkg.itinerary || []);
    setIsFeatured(pkg.isFeatured || false);
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toggle status (Active / Inactive)
  const handleToggleStatus = async (pkgId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:4010/api/v1/packages/${pkgId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showToast("Package status updated.", "success");
        fetchData();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Failed to toggle status.", "error");
    }
  };

  // Delete Package
  const handleDelete = (pkgId, pkgTitle) => {
    showPopup({
      title: "Delete Tour Package?",
      message: `Are you sure you want to delete '${pkgTitle}'? All linked assets will be removed.`,
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:4010/api/v1/packages/${pkgId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok && data.success) {
            showToast("Package deleted successfully.", "success");
            fetchData();
          } else {
            showToast(data.message || "Failed to delete package.", "error");
          }
        } catch (error) {
          console.error("Delete package error:", error);
          showToast("Error deleting package.", "error");
        }
      }
    });
  };

  const resetForm = () => {
    setEditingPackageId(null);
    setTitle("");
    setCategory(categories[0]?._id || "");
    setDestination("");
    setDuration("");
    setPrice("");
    setDiscountPrice("");
    setMaxPeople("1");
    setShortDescription("");
    setDescription("");
    setInclusions([]);
    setExclusions([]);
    setItinerary([]);
    setImages([]);
    setIsFeatured(false);
    setShowForm(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <p className="text-gray-500 text-lg font-medium">Access Denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 md:px-12 bg-[#FAF8F5] ml-0 transition-all duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-700">CRM Tour Manager</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-1">Tour Packages Management</h1>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer w-fit"
            >
              <FaPlus /> Add New Package
            </button>
          )}
        </div>

        {/* Create / Edit Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <h2 className="text-2xl font-bold text-[#1F4027] flex items-center gap-2">
                <FaBox />
                <span>{editingPackageId ? "Edit Tour Package" : "Create Tour Package"}</span>
              </h2>
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition p-1.5 rounded-lg hover:bg-gray-50"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Package Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Majestic Ladakh Expedition"
                  className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category *</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition appearance-none bg-white pr-10"
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                </div>
              </div>
            </div>

            {/* Travel Details */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination *</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Leh, Ladakh"
                    className="w-full pl-11 pr-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration *</label>
                <div className="relative">
                  <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 6 Days / 5 Nights"
                    className="w-full pl-11 pr-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price ($) *</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="w-full pl-11 pr-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Discount Price ($)</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="Discount Price"
                    className="w-full pl-11 pr-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Max People and Featured checkbox */}
            <div className="flex flex-wrap gap-8 items-center bg-[#FAF8F5] p-5 rounded-2xl border border-gray-100/50">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Max Capacity (People)</label>
                <div className="relative flex items-center">
                  <FaUsers className="absolute left-4 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    value={maxPeople}
                    onChange={(e) => setMaxPeople(e.target.value)}
                    className="w-36 pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none transition bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  id="featured-pkg"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#1F4027] cursor-pointer"
                />
                <label htmlFor="featured-pkg" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  Feature this package on homepage
                </label>
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Short Description (Search cards)</label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Summary of the experience (1-2 sentences)"
                  className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Detailed Description</label>
                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed tour itinerary details, highlights, and description..."
                  className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition resize-y"
                />
              </div>
            </div>

            {/* Inclusions and Exclusions Arrays */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div className="space-y-4 bg-emerald-50/20 border border-emerald-100/60 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-800 text-lg">Inclusions List</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inclusionInput}
                    onChange={(e) => setInclusionInput(e.target.value)}
                    placeholder="e.g., 3-Star Hotel Stay"
                    className="flex-grow px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none bg-white transition"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddInclusion())}
                  />
                  <button
                    type="button"
                    onClick={handleAddInclusion}
                    className="p-3 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-xl transition flex items-center justify-center cursor-pointer"
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
                <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {inclusions.map((inc, index) => (
                    <li key={index} className="flex justify-between items-center bg-white px-3 py-2 rounded-lg text-sm text-gray-700 border border-gray-100">
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-700">✓</span> {inc}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInclusion(index)}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        <FaTrash size={12} />
                      </button>
                    </li>
                  ))}
                  {inclusions.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-4">No inclusions added yet.</p>
                  )}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="space-y-4 bg-red-50/20 border border-red-100/40 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-800 text-lg">Exclusions List</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={exclusionInput}
                    onChange={(e) => setExclusionInput(e.target.value)}
                    placeholder="e.g., Flight Tickets"
                    className="flex-grow px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none bg-white transition"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddExclusion())}
                  />
                  <button
                    type="button"
                    onClick={handleAddExclusion}
                    className="p-3 bg-red-950/60 hover:bg-red-900/80 text-white rounded-xl transition flex items-center justify-center cursor-pointer"
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
                <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {exclusions.map((exc, index) => (
                    <li key={index} className="flex justify-between items-center bg-white px-3 py-2 rounded-lg text-sm text-gray-700 border border-gray-100">
                      <span className="flex items-center gap-2">
                        <span className="text-red-600">✕</span> {exc}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExclusion(index)}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        <FaTrash size={12} />
                      </button>
                    </li>
                  ))}
                  {exclusions.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-4">No exclusions added yet.</p>
                  )}
                </ul>
              </div>
            </div>

            {/* Itinerary Steps */}
            <div className="space-y-4 border border-gray-100 p-6 rounded-3xl">
              <h3 className="font-bold text-gray-800 text-lg">Detailed Daily Itinerary</h3>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl space-y-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Add Itinerary Day {itinerary.length + 1}</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <input
                      type="text"
                      value={newDayTitle}
                      onChange={(e) => setNewDayTitle(e.target.value)}
                      placeholder="Day Title (e.g. Arrival in Leh)"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none bg-white transition text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={newDayDesc}
                      onChange={(e) => setNewDayDesc(e.target.value)}
                      placeholder="Detailed description of activities..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none bg-white transition text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="px-5 py-2 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaPlus size={10} /> Add Day {itinerary.length + 1}
                  </button>
                </div>
              </div>

              {/* Render Days */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1 mt-4">
                {itinerary.map((day, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group">
                    <div className="w-12 h-12 bg-amber-50 rounded-full flex flex-col items-center justify-center text-amber-800 flex-shrink-0 border border-amber-100/50">
                      <span className="text-[10px] uppercase font-bold tracking-tighter">Day</span>
                      <span className="font-bold text-lg -mt-1">{day.day}</span>
                    </div>
                    <div className="flex-grow space-y-1">
                      <h4 className="font-bold text-gray-800 text-base">{day.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-light">{day.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItineraryDay(idx)}
                      className="text-red-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg self-center"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
                {itinerary.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-6">No itinerary days added yet. Click above to define tour activities.</p>
                )}
              </div>
            </div>

            {/* Premium Multi-Image Uploader */}
            <div className="space-y-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Tour Images Uploader</label>
              
              {/* Drag and Drop Box */}
              <div className="border-2 border-dashed border-[#c5a880]/50 hover:border-[#1F4027] transition rounded-3xl p-8 text-center bg-[#FAF8F5]/50 relative group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImagesUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  disabled={uploadingImages}
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-4 bg-white rounded-full shadow-sm border border-gray-100 group-hover:scale-105 transition">
                    <FaUpload className="text-[#c5a880] text-2xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Drag & Drop images here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">Accepts JPEG, PNG, WEBP. Max 5MB per file.</p>
                  </div>
                </div>
              </div>

              {/* Uploading Spinner */}
              {uploadingImages && (
                <div className="flex items-center gap-2.5 text-sm text-[#1F4027] font-semibold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50 w-fit">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#1F4027] border-t-transparent" />
                  <span>Processing image uploads...</span>
                </div>
              )}

              {/* Thumbnail Strip */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 pt-2">
                  {images.map((url, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 shadow-sm group">
                      <img
                        src={url}
                        alt={`Tour thumbnail ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-600/90 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition opacity-0 group-hover:opacity-100"
                      >
                        <FaTimes size={10} />
                      </button>
                      <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] text-center py-1">
                        Image {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-full border border-gray-300 font-semibold text-sm hover:bg-gray-50 text-gray-700 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting || uploadingImages}
                className="px-8 py-3.5 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition min-w-[150px] flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{editingPackageId ? "Update Package" : "Publish Package"}</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Packages List */}
        {!showForm && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Active Tour Packages ({packages.length})</h2>
            
            {loading ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1F4027] border-t-transparent" />
                <p className="text-gray-500 font-medium">Loading packages list...</p>
              </div>
            ) : packages.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <p className="text-gray-400 text-lg">No tour packages found. Let's create your first one!</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md transition"
                >
                  Create Package
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                  <div key={pkg._id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col">
                    {/* Image Area */}
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                      {pkg.images && pkg.images.length > 0 ? (
                        <img
                          src={pkg.images[0]}
                          alt={pkg.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-amber-50/20 text-[#c5a880]">
                          🖼️ No Images
                        </div>
                      )}
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-100 shadow-md px-3.5 py-1.5 rounded-full font-bold text-[#1F4027] text-sm">
                        ${pkg.price}
                      </div>

                      {pkg.isFeatured && (
                        <span className="absolute top-4 left-4 bg-amber-700 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Description Area */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-amber-700 bg-amber-50/70 px-2 py-0.5 rounded">
                            {pkg.category?.name || "Tour Category"}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">{pkg.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-1">{pkg.title}</h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <span>📍</span> {pkg.destination}
                        </p>
                        <p className="text-sm text-gray-500 font-light line-clamp-2 pt-1">
                          {pkg.shortDescription || pkg.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                        {/* Status Toggle Button */}
                        <button
                          onClick={() => handleToggleStatus(pkg._id, pkg.isActive)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border transition cursor-pointer ${
                            pkg.isActive
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                              : "bg-red-50 text-red-800 border-red-200 hover:bg-red-100"
                          }`}
                        >
                          {pkg.isActive ? "Active" : "Inactive"}
                        </button>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => generateItineraryPDF(pkg)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition cursor-pointer"
                            title="Download PDF Itinerary"
                          >
                            <FaFilePdf size={16} />
                          </button>
                          <button
                            onClick={() => handleEditSelect(pkg)}
                            className="p-2 text-gray-500 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition cursor-pointer"
                            title="Edit Tour Package"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(pkg._id, pkg.title)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                            title="Delete Tour Package"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPackages;
