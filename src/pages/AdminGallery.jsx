import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { FaTrash, FaImages, FaPlus, FaMapMarkerAlt, FaUpload, FaChevronDown, FaTimes, FaEdit } from "react-icons/fa";

function AdminGallery() {
  const { token, isAdmin } = useAuth();
  const { showToast, showPopup } = useNotification();

  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Mountains");
  
  // Album Images State
  const [images, setImages] = useState([]);
  const [publicIds, setPublicIds] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // CRUD Edit State
  const [editingAlbum, setEditingAlbum] = useState(null);

  const handleEditSelect = (album) => {
    setEditingAlbum(album);
    setTitle(album.title);
    setDescription(album.description || "");
    setLocation(album.location || "");
    setCategory(album.category);
    setImages(album.images || (album.image ? [album.image] : []));
    setPublicIds(album.publicIds || (album.publicId ? [album.publicId] : []));
    setShowForm(true);
  };

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4010/api/v1/gallery");
      const data = await response.json();
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      showToast("Failed to load gallery items.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchGalleryItems();
    }
  }, [isAdmin]);

  // Handle Uploading Multiple Images
  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = files.filter(f => f.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      showToast("Only image files are allowed.", "warning");
    }

    if (validFiles.length === 0) return;

    setUploadingImages(true);
    showToast(`Uploading ${validFiles.length} photos...`, "info");

    const formData = new FormData();
    validFiles.forEach(file => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:4010/api/v1/media/upload/multiple-images?folder=gallery", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Extract URLs and publicIds
        const uploadedUrls = data.urls || [];
        const uploadedIds = (data.data || []).map(item => item.publicId || null);

        setImages(prev => [...prev, ...uploadedUrls]);
        setPublicIds(prev => [...prev, ...uploadedIds]);
        showToast("Photos uploaded successfully!", "success");
      } else {
        showToast(data.message || "Failed to upload photos", "error");
      }
    } catch (error) {
      console.error("Error uploading gallery images:", error);
      showToast("Failed to upload photos. Check backend server.", "error");
    } finally {
      setUploadingImages(false);
      e.target.value = ""; // Reset file input
    }
  };

  // Remove single image from uploaded list
  const handleRemoveImage = async (index) => {
    const url = images[index];
    const publicId = publicIds[index];

    try {
      // Best-effort delete from storage API
      await fetch("http://localhost:4010/api/v1/media/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ url, publicId })
      });
    } catch (e) {
      console.warn("Soft failed deleting media from storage:", e);
    }

    setImages(prev => prev.filter((_, idx) => idx !== index));
    setPublicIds(prev => prev.filter((_, idx) => idx !== index));
    showToast("Photo removed from album.", "info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !category || images.length === 0) {
      showToast("Please provide a title, category, and upload at least one image.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const url = editingAlbum 
        ? `http://localhost:4010/api/v1/gallery/${editingAlbum._id}` 
        : "http://localhost:4010/api/v1/gallery";
      
      const method = editingAlbum ? "PUT" : "POST";

      // Post gallery album details
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          location: location.trim(),
          category,
          images,
          publicIds
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(editingAlbum ? "Gallery album updated successfully!" : "Gallery album published successfully!", "success");
        resetForm();
        fetchGalleryItems();
      } else {
        showToast(data.message || "Failed to publish gallery album.", "error");
      }
    } catch (error) {
      console.error("Gallery submit error:", error);
      showToast("Error saving gallery album details.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAlbum = (id, albumTitle) => {
    showPopup({
      title: "Delete Gallery Album?",
      message: `Are you sure you want to delete '${albumTitle}'? This will permanently delete all associated photos from storage and database.`,
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:4010/api/v1/gallery/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok && data.success) {
            showToast("Gallery album deleted.", "success");
            fetchGalleryItems();
          } else {
            showToast(data.message || "Failed to delete gallery album.", "error");
          }
        } catch (error) {
          console.error("Delete gallery album error:", error);
          showToast("Error deleting gallery album.", "error");
        }
      }
    });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setCategory("Mountains");
    setImages([]);
    setPublicIds([]);
    setEditingAlbum(null);
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
    <div className="min-h-screen py-16 px-6 md:px-12 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-700">Visual Assets Manager</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-1">Gallery Album Management</h1>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer w-fit"
            >
              <FaPlus /> Create Album
            </button>
          )}
        </div>

        {/* Upload Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6 max-w-3xl mx-auto animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-55 pb-4">
              <h2 className="text-xl font-bold text-[#1F4027] flex items-center gap-2">
                <FaImages />
                <span>{editingAlbum ? "Edit Gallery Album" : "Create New Gallery Album"}</span>
              </h2>
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Album Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Tadoba Wildlife Safari"
                  className="w-full px-5 py-2.5 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category *</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-2.5 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition appearance-none bg-white pr-10 text-sm"
                  >
                    <option value="Mountains">Mountains</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Culture & Heritage">Culture & Heritage</option>
                    <option value="Other">Other</option>
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location / Venue</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Maharashtra, India"
                    className="w-full pl-11 pr-5 py-2.5 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Short Description / Caption</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Photos from our wildlife safari"
                  className="w-full px-5 py-2.5 rounded-2xl border border-gray-200 focus:border-[#1F4027] outline-none transition text-sm"
                />
              </div>
            </div>

            {/* Multi-Image Upload Box */}
            <div className="space-y-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Album Photos Uploader *</label>
              
              <div className="border-2 border-dashed border-[#c5a880]/50 hover:border-[#1F4027] transition rounded-2xl p-6 text-center bg-[#FAF8F5]/50 relative group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImagesUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  disabled={uploadingImages}
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="p-3 bg-white rounded-full border border-gray-100 shadow-sm group-hover:scale-105 transition">
                    <FaUpload className="text-[#c5a880] text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-700">Click to upload or drag & drop multiple photos</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">JPEG, PNG, WEBP. Max 5MB per file.</p>
                  </div>
                </div>
              </div>

              {uploadingImages && (
                <div className="flex items-center gap-2.5 text-xs text-[#1F4027] font-semibold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50 w-fit">
                  <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#1F4027] border-t-transparent" />
                  <span>Uploading photos...</span>
                </div>
              )}

              {/* Photo Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 pt-2">
                  {images.map((url, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 shadow-sm group animate-scaleIn">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1.5 right-1.5 bg-red-600/90 text-white p-1.5 rounded-full hover:bg-red-700 transition opacity-0 group-hover:opacity-100"
                      >
                        <FaTimes size={8} />
                      </button>
                      <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-[8px] text-center py-0.5 truncate">
                        Photo {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-50">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-full border border-gray-300 font-semibold text-xs text-gray-700 hover:bg-gray-55 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || uploadingImages}
                className="px-6 py-2.5 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-full font-semibold text-xs shadow-md hover:shadow-lg transition min-w-[120px] flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent" />
                    <span>{editingAlbum ? "Saving..." : "Publishing..."}</span>
                  </>
                ) : (
                  <span>{editingAlbum ? "Save Changes" : "Publish Album"}</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Gallery items list */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Gallery Albums ({galleryItems.length})</h2>
          
          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1F4027] border-t-transparent" />
              <p className="text-gray-500 font-medium">Loading albums...</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <p className="text-gray-400 text-lg">No albums created yet.</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md transition"
              >
                Create Album
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => {
                // Support both legacy single image or new images array
                const coverImage = item.images && item.images.length > 0 ? item.images[0] : item.image;
                const photoCount = item.images && item.images.length > 0 ? item.images.length : (item.image ? 1 : 0);

                return (
                  <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow group flex flex-col justify-between">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                      <img
                        src={coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-amber-50 text-amber-800 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow">
                        {item.category}
                      </span>
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                        📁 {photoCount} Photos
                      </span>
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm line-clamp-1 leading-snug">{item.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">📍 {item.location || "N/A"}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-50 flex justify-end gap-2">
                        <button
                          onClick={() => handleEditSelect(item)}
                          className="text-gray-400 hover:text-[#1F4027] p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                          title="Edit Album"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteAlbum(item._id, item.title)}
                          className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                          title="Delete Album"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminGallery;
