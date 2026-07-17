import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { FaTrash, FaEdit, FaPlus, FaTimes, FaQuestionCircle, FaChevronDown, FaCheck } from "react-icons/fa";

function AdminFAQ() {
  const { token, isAdmin } = useAuth();
  const { showToast, showPopup } = useNotification();

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form Fields
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // CRUD Editing State
  const [editingFaq, setEditingFaq] = useState(null);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      // Fetch all FAQs (including inactive ones)
      const response = await fetch("http://localhost:4010/api/v1/faqs?all=true", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setFaqs(data.data);
      }
    } catch (error) {
      console.error("Error fetching admin FAQs:", error);
      showToast("Failed to load FAQs.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchFaqs();
    }
  }, [isAdmin]);

  const handleEditSelect = (faq) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(faq.order || 0);
    setIsActive(faq.isActive);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setOrder(0);
    setIsActive(true);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      showToast("Question and answer are required.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const url = editingFaq 
        ? `http://localhost:4010/api/v1/faqs/${editingFaq._id}` 
        : "http://localhost:4010/api/v1/faqs";
      
      const method = editingFaq ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          question: question.trim(),
          answer: answer.trim(),
          order: Number(order),
          isActive
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(editingFaq ? "FAQ updated successfully!" : "FAQ created successfully!", "success");
        handleCancelEdit();
        fetchFaqs();
      } else {
        showToast(data.message || "Failed to save FAQ.", "error");
      }
    } catch (error) {
      console.error("FAQ save error:", error);
      showToast("Error saving FAQ details.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id, faqQuestion) => {
    showPopup({
      title: "Delete FAQ?",
      message: `Are you sure you want to delete this FAQ? "${faqQuestion.substring(0, 40)}..."`,
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:4010/api/v1/faqs/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok && data.success) {
            showToast("FAQ deleted.", "success");
            fetchFaqs();
          } else {
            showToast(data.message || "Failed to delete FAQ.", "error");
          }
        } catch (error) {
          console.error("Delete FAQ error:", error);
          showToast("Error deleting FAQ.", "error");
        }
      }
    });
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:4010/api/v1/faqs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showToast("FAQ visibility status toggled.", "success");
        fetchFaqs();
      } else {
        showToast(data.message || "Failed to toggle status.", "error");
      }
    } catch (e) {
      console.error("Toggle FAQ status error:", e);
    }
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
        <div className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-700">FAQ Content Locker</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-1">FAQ Management</h1>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                handleCancelEdit();
                setShowForm(true);
              }}
              className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3 rounded-full font-semibold text-sm shadow transition flex items-center gap-2 cursor-pointer w-fit"
            >
              <FaPlus /> Create FAQ
            </button>
          )}
        </div>

        {/* FAQ Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6 max-w-2xl mx-auto animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <h2 className="text-xl font-bold text-[#1F4027] flex items-center gap-2">
                <FaQuestionCircle />
                <span>{editingFaq ? "Edit FAQ Item" : "Create New FAQ"}</span>
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
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Question *</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., What is your cancellation policy?"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-sm transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Answer *</label>
                <textarea
                  required
                  rows={4}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Provide the detailed explanation here..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-sm transition resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Ordering Index</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-sm transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Active Visibility</label>
                  <label className="flex items-center gap-2 pt-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="rounded text-[#1F4027] focus:ring-[#1F4027] h-4.5 w-4.5 border-gray-300"
                    />
                    <span className="text-sm text-gray-600 font-medium">Visible to clients</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form actions */}
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
                  <span>{editingFaq ? "Save Changes" : "Publish FAQ"}</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* FAQs List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Questions Catalog ({faqs.length})</h2>

          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1F4027] border-t-transparent" />
              <p className="text-gray-500 font-medium">Loading FAQs...</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-gray-450">
              <p>No FAQ questions published yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <FaQuestionCircle className="text-amber-700 text-sm" />
                      <button
                        onClick={() => handleToggleStatus(faq._id, faq.isActive)}
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border transition ${
                          faq.isActive
                            ? "bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100"
                            : "bg-red-50 text-red-800 border-red-100 hover:bg-red-100"
                        }`}
                      >
                        {faq.isActive ? "Published" : "Hidden"}
                      </button>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base leading-snug">{index + 1}. {faq.question}</h3>
                    <p className="text-xs text-gray-400 font-light line-clamp-2">{faq.answer}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50 flex-shrink-0">
                    <button
                      onClick={() => handleEditSelect(faq)}
                      className="p-2.5 text-gray-400 hover:text-[#1F4027] hover:bg-gray-50 rounded-xl transition cursor-pointer"
                      title="Edit FAQ"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id, faq.question)}
                      className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                      title="Delete FAQ"
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

export default AdminFAQ;
