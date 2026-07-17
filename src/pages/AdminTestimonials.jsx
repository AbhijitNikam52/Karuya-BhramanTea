import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { FaTrash, FaCheck, FaTimes, FaStar, FaChevronDown, FaEdit, FaUserCircle } from "react-icons/fa";

function AdminTestimonials() {
  const { token, isAdmin } = useAuth();
  const { showToast, showPopup } = useNotification();

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Edit fields (moderators can adjust spam/typos)
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isActive, setIsActive] = useState(false);
  
  // CRUD editing review reference
  const [editingReview, setEditingReview] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4010/api/v1/testimonials?all=true", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      showToast("Failed to load reviews list.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchTestimonials();
    }
  }, [isAdmin]);

  const handleEditSelect = (review) => {
    setEditingReview(review);
    setName(review.name);
    setMessage(review.message);
    setRating(review.rating);
    setIsActive(review.isActive);
    setShowEditForm(true);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setName("");
    setMessage("");
    setRating(5);
    setIsActive(false);
    setShowEditForm(false);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      showToast("Name and review message are required.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`http://localhost:4010/api/v1/testimonials/${editingReview._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          rating,
          isActive
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast("Review details updated successfully!", "success");
        handleCancelEdit();
        fetchTestimonials();
      } else {
        showToast(data.message || "Failed to update review.", "error");
      }
    } catch (error) {
      console.error("Review update error:", error);
      showToast("Error updating review details.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleApproval = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:4010/api/v1/testimonials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showToast(currentStatus ? "Review visibility hidden." : "Review approved & published to home page!", "success");
        fetchTestimonials();
      } else {
        showToast(data.message || "Failed to toggle review status.", "error");
      }
    } catch (e) {
      console.error("Toggle testimonial error:", e);
    }
  };

  const handleDelete = (id, clientName) => {
    showPopup({
      title: "Delete Testimonial?",
      message: `Are you sure you want to permanently delete the review by ${clientName}?`,
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:4010/api/v1/testimonials/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok && data.success) {
            showToast("Review deleted successfully.", "success");
            fetchTestimonials();
          } else {
            showToast(data.message || "Failed to delete review.", "error");
          }
        } catch (error) {
          console.error("Delete review error:", error);
          showToast("Error deleting review.", "error");
        }
      }
    });
  };

  const renderStars = (starRating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar 
        key={i} 
        className={`text-xs ${i < starRating ? "text-amber-400" : "text-gray-250"}`} 
      />
    ));
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
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700">Client Reviews Moderation</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-1">Testimonials Management</h1>
          <p className="text-sm text-gray-500 mt-2">
            Approve passenger reviews before they display on the home page slider, or edit/delete review texts.
          </p>
        </div>

        {/* Edit Review Form */}
        {showEditForm && (
          <form onSubmit={handleSubmitEdit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <h2 className="text-xl font-bold text-[#1F4027] flex items-center gap-2">
                <FaEdit />
                <span>Edit Testimonial Details</span>
              </h2>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Client Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-sm transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Review Text *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-sm transition resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Rating Score (1-5 Stars)</label>
                  <div className="relative">
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-sm bg-white pr-8 transition appearance-none"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                      <option value={2}>2 Stars (Poor)</option>
                      <option value={1}>1 Star (Bad)</option>
                    </select>
                    <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Approval Status</label>
                  <label className="flex items-center gap-2 pt-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="rounded text-[#1F4027] focus:ring-[#1F4027] h-4.5 w-4.5 border-gray-300"
                    />
                    <span className="text-sm text-gray-600 font-medium">Publish on Home Slider</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-50">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-5 py-2.5 rounded-full border border-gray-300 font-semibold text-xs text-gray-750 hover:bg-gray-55 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-full font-semibold text-xs shadow transition min-w-[120px] flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Testimonials List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Submitted Passenger Reviews ({testimonials.length})</h2>

          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1F4027] border-t-transparent" />
              <p className="text-gray-500 font-medium">Loading reviews...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-gray-450">
              <p>No testimonials submitted yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((review) => (
                <div key={review._id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="flex gap-4 items-start">
                    {/* User Avatar */}
                    {review.avatar || review.user?.avatar ? (
                      <img
                        src={review.avatar || review.user?.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100/50 flex items-center justify-center text-[#c5a880] flex-shrink-0">
                        <FaUserCircle size={24} />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-gray-800 text-sm md:text-base leading-snug">{review.name}</h4>
                        <span className="flex gap-0.5">{renderStars(review.rating)}</span>
                        
                        {review.tourPackage && (
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100/20">
                            Trip: {review.tourPackage?.title || review.tourPackage}
                          </span>
                        )}
                      </div>

                      <p className="text-xs md:text-sm text-gray-500 font-light italic leading-relaxed">
                        "{review.message}"
                      </p>

                      <div className="pt-0.5">
                        <button
                          onClick={() => handleToggleApproval(review._id, review.isActive)}
                          className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition ${
                            review.isActive
                              ? "bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-800 border-amber-100 hover:bg-amber-100"
                          }`}
                        >
                          {review.isActive ? "Approved & Live" : "Pending Verification"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50 flex-shrink-0">
                    <button
                      onClick={() => handleEditSelect(review)}
                      className="p-2.5 text-gray-400 hover:text-[#1F4027] hover:bg-gray-50 rounded-xl transition cursor-pointer"
                      title="Edit Review"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id, review.name)}
                      className="p-2.5 text-red-400 hover:text-red-650 hover:bg-red-50 rounded-xl transition cursor-pointer"
                      title="Delete Review"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminTestimonials;
