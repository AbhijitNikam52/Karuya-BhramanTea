import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import ImageCropperModal from "../components/ImageCropperModal";
import { FaEdit, FaTrash, FaPlus, FaBookOpen, FaTimes, FaSpinner, FaInfoCircle } from "react-icons/fa";

function AdminBlogs() {
  const { user, token, isAdmin } = useAuth();
  const { showToast, showPopup } = useNotification();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Tea Culture"); // Default category
  const [author, setAuthor] = useState(""); // Defaulted to current user name
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  // Cropper State
  const [cropFile, setCropFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4010/api";
      const response = await fetch(`${apiUrl}/v1/blogs`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      } else {
        showToast(data.message || "Failed to fetch blogs", "error");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      showToast("Could not load blogs. Make sure backend is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    fetchBlogs();
  }, [isAdmin]);

  // Set default author when user changes
  useEffect(() => {
    if (user && !author) {
      setAuthor(user.name);
    }
  }, [user]);

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
      // Reset input element value so same file triggers change again
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

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      showToast("Please fill in all required fields: Title, Excerpt, Content.", "error");
      return;
    }

    if (!editingBlog && !imageFile) {
      showToast("Please select an image file to upload for the blog.", "error");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("subtitle", subtitle.trim());
    formData.append("category", category); // Automatically tea culture
    formData.append("excerpt", excerpt.trim());
    formData.append("content", content.trim());
    formData.append("author", author.trim() || user?.name || "Admin");
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4010/api";
      const url = editingBlog
        ? `${apiUrl}/v1/blogs/${editingBlog._id}`
        : `${apiUrl}/v1/blogs`;
      const method = editingBlog ? "PUT" : "POST";

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
          editingBlog ? "Blog post updated successfully!" : "Blog post published successfully!",
          "success"
        );
        
        // Reset form
        handleCancelEdit();
        // Refresh blogs list
        fetchBlogs();
      } else {
        showToast(data.message || "Failed to save blog post", "error");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      showToast("An error occurred during save. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Select blog for editing
  const handleEditSelect = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setSubtitle(blog.subtitle || "");
    setCategory(blog.category || "Tea Culture");
    setAuthor(blog.author || user?.name || "Admin");
    setExcerpt(blog.excerpt || "");
    setContent(blog.content || "");
    setImageFile(null);
    setImagePreview(blog.image);

    // Scroll smoothly to the form container
    const formElement = document.getElementById("blogFormContainer");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingBlog(null);
    setTitle("");
    setSubtitle("");
    setCategory("Tea Culture");
    setAuthor(user?.name || "");
    setExcerpt("");
    setContent("");
    setImageFile(null);
    setImagePreview(null);
  };

  // Delete blog
  const handleDelete = async (id, customTitle) => {
    showPopup({
      title: "Delete Blog Post?",
      message: `Are you sure you want to delete blog '${customTitle}'? This action cannot be undone.`,
      type: "warning",
      onConfirm: async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4010/api";
          const response = await fetch(`${apiUrl}/v1/blogs/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok && data.success) {
            showToast("Blog post deleted successfully", "success");
            fetchBlogs();
          } else {
            showToast(data.message || "Failed to delete blog post", "error");
          }
        } catch (error) {
          console.error("Error deleting blog:", error);
          showToast("Failed to delete blog. Please try again.", "error");
        }
      },
    });
  };

  // Restrict access if not logged in as admin
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center space-y-4">
          <FaSpinner className="animate-spin text-4xl text-[#1F4027] mx-auto" />
          <div className="text-xl font-medium text-gray-500">Loading blog panel...</div>
        </div>
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
    <div className="min-h-screen bg-[#FAF8F5] pb-24 pt-10 px-4 md:px-8 text-left">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span className="text-[#c5a880]">🍵</span> Blog Management
          </h1>
          <p className="text-gray-500 text-sm font-light mt-1">
            Create, update, and manage stories, organic tea culture insights, and reviews.
          </p>
        </div>
        <div>
          <a
            href="#blogFormContainer"
            className="inline-flex items-center gap-2 bg-[#1F4027] hover:bg-[#152e1c] text-white px-5 py-2.5 rounded-full font-medium transition text-xs shadow-sm"
          >
            <FaPlus size={10} /> Add New Blog
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Form Container */}
        <div 
          id="blogFormContainer" 
          className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8 space-y-6 scroll-mt-6"
        >
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaBookOpen className="text-[#c5a880]" />
              <span>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {editingBlog ? `Modifying ID: ${editingBlog._id}` : "Publish a new article to the website"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Title */}
              <div className="space-y-1.5 text-left md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Secrets of Brewing Organic Darjeeling First Flush"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027]"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Master the water temperature and steeping duration"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027]"
                />
              </div>

              {/* Image upload */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Cover Image <span className="text-red-500">{editingBlog ? "" : "*"}</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#1F4027]/10 file:text-[#1F4027] hover:file:bg-[#1F4027]/20 file:cursor-pointer cursor-pointer border border-gray-200 rounded-xl px-2.5 py-1.5"
                />
              </div>

            </div>

            {/* Excerpt */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Excerpt / Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="Write a brief, catchy summary of the blog post (shown in listings)..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027]"
              />
            </div>

            {/* Content Body */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex justify-between">
                <span>Blog Content <span className="text-red-500">*</span></span>
              </label>
              <textarea
                required
                rows={12}
                placeholder="Write your article details here. Use formatting syntax detailed below..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F4027]/40 focus:border-[#1F4027] font-mono"
              />
            </div>

            {/* Formatting Help Box */}
            <div className="bg-[#FAF8F5] border border-gray-200 rounded-2xl p-5 text-left space-y-3">
              <h4 className="text-xs font-bold text-[#1F4027] uppercase tracking-wider flex items-center gap-1.5">
                <FaInfoCircle /> Content Formatting Tips
              </h4>
              <p className="text-xs text-gray-500 font-light">
                You can write structured, rich text using simple symbols. Separate paragraphs by leaving a blank line (press Enter twice).
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-light text-gray-600">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-700">Headers (Sub-points):</p>
                  <p className="font-mono text-[11px] bg-white border border-gray-150 px-1.5 py-0.5 rounded inline-block">## Your Header</p>
                  <p className="text-[11px] text-gray-400">Renders as a broad, bold sub-point title.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-700">Bold text:</p>
                  <p className="font-mono text-[11px] bg-white border border-gray-150 px-1.5 py-0.5 rounded inline-block">**bold words**</p>
                  <p className="text-[11px] text-gray-400">Makes words appear bold inline.</p>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <p className="font-semibold text-gray-700">Point-by-Point Lists:</p>
                  <p className="font-mono text-[11px] bg-white border border-gray-150 px-1.5 py-0.5 rounded inline-block">- First point<br />- Second point</p>
                  <p className="text-[11px] text-gray-400">Creates an unordered bulleted list.</p>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <p className="font-semibold text-gray-700">Numbered Lists:</p>
                  <p className="font-mono text-[11px] bg-white border border-gray-150 px-1.5 py-0.5 rounded inline-block">1. First step<br />2. Second step</p>
                  <p className="text-[11px] text-gray-400">Creates an ordered numbered list.</p>
                </div>
              </div>
            </div>

            {/* Crop Preview */}
            {imagePreview && (
              <div className="text-left space-y-2">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Cover Image Preview</p>
                <div className="relative w-48 h-28 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                  <img src={imagePreview} alt="Blog Cover" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition cursor-pointer"
                    title="Remove Image"
                  >
                    <FaTimes size={10} />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-100 justify-end">
              {editingBlog && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-8 py-2.5 rounded-full font-semibold transition text-sm shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" /> Saving...
                  </>
                ) : editingBlog ? (
                  "Update Post"
                ) : (
                  "Publish Post"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Blogs List */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-bold text-lg text-gray-900">
              Published Blogs ({blogs.length})
            </h3>
            <p className="text-xs text-gray-400 mt-1">Existing articles in the database</p>
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {blogs.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No articles found. Use the form to write one!</p>
            ) : (
              blogs.map((b) => (
                <div
                  key={b._id}
                  className={`p-4 rounded-2xl border text-left flex gap-3 transition ${
                    editingBlog?._id === b._id ? "border-[#c5a880] bg-[#c5a880]/5" : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-50 border border-gray-100 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider truncate max-w-[120px]">
                          {b.category}
                        </span>
                        <span className="text-[9px] text-gray-400 flex-shrink-0 font-sans">
                          {b.readTime}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 truncate mt-0.5" title={b.title}>
                        {b.title}
                      </h4>
                      <p className="text-gray-400 text-[11px] font-light mt-0.5 truncate">
                        By {b.author}
                      </p>
                    </div>

                    <div className="flex gap-2.5 mt-2 justify-end">
                      <button
                        onClick={() => handleEditSelect(b)}
                        className="text-xs text-[#1F4027] hover:text-[#152e1c] font-semibold flex items-center gap-1 transition cursor-pointer"
                        title="Edit Blog"
                      >
                        <FaEdit size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b._id, b.title)}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 transition cursor-pointer"
                        title="Delete Blog"
                      >
                        <FaTrash size={11} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Image Cropper Modal */}
      {showCropper && (
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

export default AdminBlogs;
