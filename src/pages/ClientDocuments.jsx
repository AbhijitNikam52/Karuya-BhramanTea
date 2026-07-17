import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { FaTrash, FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt, FaUpload, FaLink, FaUserShield, FaClock } from "react-icons/fa";

function ClientDocuments() {
  const { token, user } = useAuth();
  const { showToast, showPopup } = useNotification();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [docName, setDocName] = useState("");
  const [category, setCategory] = useState("Passport");
  const [docFile, setDocFile] = useState(null);

  // Tour Package selectors
  const [tourPackages, setTourPackages] = useState([]);
  const [tourPackage, setTourPackage] = useState("");

  // CRUD Update State
  const [editingDoc, setEditingDoc] = useState(null);

  // Tab State & Testimonial Fields
  const [activeTab, setActiveTab] = useState("documents"); // "documents" or "review"
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewTour, setReviewTour] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewMessage.trim()) {
      showToast("Please enter a review message.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:4010/api/v1/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: user.name,
          message: reviewMessage.trim(),
          rating: reviewRating,
          tourPackage: reviewTour || null
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message || "Review submitted for verification!", "success");
        setReviewMessage("");
        setReviewTour("");
        setReviewRating(5);
        setActiveTab("documents");
      } else {
        showToast(data.message || "Failed to submit review.", "error");
      }
    } catch (err) {
      console.error("Submit testimonial error:", err);
      showToast("Error submitting review.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSelect = (doc) => {
    setEditingDoc(doc);
    setDocName(doc.name);
    setCategory(doc.category);
    setTourPackage(doc.tourPackage?._id || doc.tourPackage || "");
    setDocFile(null); // optional new file on edit
  };

  const handleCancelEdit = () => {
    setEditingDoc(null);
    setDocName("");
    setCategory("Passport");
    setTourPackage("");
    setDocFile(null);
  };

  const fetchMyDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4010/api/v1/documents/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setDocuments(data.data);
      }
    } catch (error) {
      console.error("Error fetching client documents:", error);
      showToast("Failed to load your documents.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const pkgRes = await fetch("http://localhost:4010/api/v1/packages", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const pkgData = await pkgRes.json();
        if (pkgData.success) {
          setTourPackages(pkgData.packages || []);
        }
      } catch (error) {
        console.warn("Failed to load tour packages for selection", error);
      }
    };
    
    if (user) {
      fetchMyDocuments();
      fetchTours();
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocFile(file);
      if (!docName) {
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf("."));
        setDocName(nameWithoutExt);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingDoc && !docFile) {
      showToast("Please select a file to upload.", "error");
      return;
    }
    if (!docName.trim() || !category) {
      showToast("Document name and category are required.", "error");
      return;
    }

    setSubmitting(true);
    showToast(editingDoc ? "Saving document updates..." : "Uploading document to secure servers...", "info");

    try {
      let uploadData = {};

      // 1. Upload to Storage if new file is selected
      if (docFile) {
        const formData = new FormData();
        formData.append("document", docFile);

        const uploadRes = await fetch("http://localhost:4010/api/v1/media/upload/document?folder=documents", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });

        uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.message || "Upload failed");
        }
        showToast("File uploaded! Saving details...", "info");
      }

      // 2. Save or Update Document Record
      const url = editingDoc 
        ? `http://localhost:4010/api/v1/documents/${editingDoc._id}` 
        : "http://localhost:4010/api/v1/documents";
      
      const method = editingDoc ? "PUT" : "POST";

      const payload = {
        name: docName.trim(),
        category,
        uploadedFor: user._id, // uploaded for self
        tourPackage: tourPackage || null
      };

      if (docFile && uploadData.success) {
        payload.url = uploadData.url;
        payload.publicId = uploadData.publicId;
        payload.fileSize = uploadData.size || docFile.size;
        payload.mimeType = uploadData.mimeType || docFile.type;
      }

      const saveRes = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const saveData = await saveRes.json();

      if (saveRes.ok && saveData.success) {
        showToast(editingDoc ? "Document updated successfully!" : "Document uploaded and saved successfully!", "success");
        handleCancelEdit();
        e.target.reset();

        fetchMyDocuments();
      } else {
        showToast(saveData.message || "Failed to save document details.", "error");
      }
    } catch (error) {
      console.error("Client document submit error:", error);
      showToast(error.message || "Failed to upload document.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id, name) => {
    showPopup({
      title: "Delete Document?",
      message: `Are you sure you want to delete '${name}'? This action cannot be undone.`,
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:4010/api/v1/documents/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok && data.success) {
            showToast("Document deleted successfully.", "success");
            fetchMyDocuments();
          } else {
            showToast(data.message || "Failed to delete document.", "error");
          }
        } catch (error) {
          console.error("Delete document error:", error);
          showToast("Error deleting document.", "error");
        }
      }
    });
  };

  const getFileIcon = (mimeType, name = "") => {
    const ext = name.split(".").pop().toLowerCase();
    if (mimeType.includes("pdf") || ext === "pdf") return <FaFilePdf className="text-red-600 text-2xl" />;
    if (mimeType.includes("word") || ext === "doc" || ext === "docx") return <FaFileWord className="text-blue-600 text-2xl" />;
    if (mimeType.includes("excel") || mimeType.includes("spreadsheet") || ext === "xls" || ext === "xlsx") return <FaFileExcel className="text-emerald-600 text-2xl" />;
    return <FaFileAlt className="text-amber-600 text-2xl" />;
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <p className="text-gray-500 text-lg font-medium">Please log in to manage your documents.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 md:px-12 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
          <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-700">Passenger Document Locker</span>
              <h1 className="text-4xl font-bold text-gray-900 mt-1">My Travel Documents</h1>
              <p className="text-sm text-gray-500 mt-2">
                Securely upload your identity papers (Passports, Visas) and download booking vouchers or itineraries shared by our travel agents.
              </p>
            </div>
            
            {/* Tabs Trigger switcher */}
            <div className="flex bg-gray-150 p-1 rounded-full border border-gray-200/40 w-fit self-start">
              <button
                onClick={() => setActiveTab("documents")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition ${
                  activeTab === "documents"
                    ? "bg-[#1F4027] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#1F4027]"
                }`}
              >
                📁 Document Locker
              </button>
              <button
                onClick={() => setActiveTab("review")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition ${
                  activeTab === "review"
                    ? "bg-[#1F4027] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#1F4027]"
                }`}
              >
                ⭐ Submit Tour Review
              </button>
            </div>
          </div>

        {activeTab === "documents" ? (
          <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Upload Form (1 Column) */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#1F4027] border-b border-gray-50 pb-3 flex items-center gap-2">
              <FaUpload />
              <span>{editingDoc ? "Edit Document" : "Upload Document"}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  {editingDoc ? "Replace Document File (Optional)" : "Document File *"}
                </label>
                <div className="border border-dashed border-[#c5a880]/40 rounded-2xl p-4 text-center hover:border-[#1F4027] transition relative bg-[#FAF8F5]/30">
                  <input
                    type="file"
                    required={!editingDoc}
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
                    <FaUpload className="text-[#c5a880] text-lg" />
                    <div>
                      <p className="font-semibold text-xs text-gray-700">
                        {docFile ? docFile.name : "Select File"}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">PDF, DOCX, Images (Max 10MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Document Name *</label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g., My Passport Copy"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-sm transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Document Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none bg-white text-xs font-semibold"
                >
                  <option value="Passport">Passport Copy</option>
                  <option value="Visa">Visa Copy</option>
                  <option value="Ticket">Flight / Train Ticket</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Associate with a Tour */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Link to Tour Package</label>
                <div className="relative">
                  <select
                    value={tourPackage}
                    onChange={(e) => setTourPackage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none bg-white text-xs"
                  >
                    <option value="">None (General file)</option>
                    {tourPackages.map(pkg => (
                      <option key={pkg._id} value={pkg._id}>{pkg.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                {editingDoc && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold text-sm transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-full font-semibold text-sm shadow transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>{editingDoc ? "Saving..." : "Uploading..."}</span>
                    </>
                  ) : (
                    <span>{editingDoc ? "Save Changes" : "Upload Document"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* List of Documents (2 Columns) */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-bold text-gray-800 text-xl">My Document Catalog</h3>

            {loading ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1F4027] border-t-transparent" />
                <p className="text-gray-500 text-sm">Loading documents...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-gray-450">
                <p>You have no documents uploaded or shared yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => {
                  const isUploadedByMe = doc.uploadedBy === user._id || doc.uploadedBy?._id === user._id;

                  return (
                    <div key={doc._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex gap-4 items-start sm:items-center">
                        <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100/40 flex-shrink-0">
                          {getFileIcon(doc.mimeType, doc.name)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-gray-800 text-sm md:text-base truncate leading-snug">{doc.name}</h4>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 font-light mt-1">
                            <span className="font-semibold text-amber-800 bg-amber-50/70 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">
                              {doc.category}
                            </span>
                            <span>{formatBytes(doc.fileSize)}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                              {isUploadedByMe ? (
                                <span>Uploaded by me</span>
                              ) : (
                                <span className="text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                                  <FaUserShield size={9} /> Agent Shared
                                </span>
                              )}
                            </span>
                          </div>
                          
                          <div className="text-[10px] text-gray-400 font-light mt-1.5 flex items-center gap-1">
                            <FaClock size={10} />
                            <span>Added: {new Date(doc.createdAt).toLocaleDateString()}</span>
                          </div>
                          
                          {doc.tourPackage && (
                            <div className="mt-1.5 text-xs text-amber-905 bg-amber-50/80 px-2.5 py-0.5 rounded-full border border-amber-200/30 w-fit flex items-center gap-1 font-medium">
                              <span>🗺️</span>
                              <span>Linked Tour: <strong>{doc.tourPackage?.title || doc.tourPackage}</strong></span>
                            </div>
                          )}
                        </div>
                      </div>

                       <div className="flex items-center justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 border border-gray-300 rounded-full font-semibold text-xs text-gray-600 hover:bg-gray-55 transition flex items-center gap-1.5"
                        >
                          <FaLink size={10} /> View / Download
                        </a>
                        
                        {isUploadedByMe && (
                          <>
                            <button
                              onClick={() => handleEditSelect(doc)}
                              className="p-2.5 text-gray-400 hover:text-[#1F4027] hover:bg-gray-50 rounded-xl transition"
                              title="Edit Document"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(doc._id, doc.name)}
                              className="p-2.5 text-red-400 hover:text-red-650 hover:bg-red-50 rounded-xl transition"
                              title="Delete Document"
                            >
                              <FaTrash size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        ) : (
          /* Testimonials Submission Form Tab */
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm max-w-xl mx-auto space-y-6 animate-fadeIn">
            <div className="border-b border-gray-50 pb-4">
              <h2 className="text-xl font-bold text-[#1F4027] flex items-center gap-2">
                <span>⭐</span>
                <span>Write a Tour Review</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1 font-light">Share your trip experiences and help other travelers plan their dreams.</p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Your Name</label>
                <input
                  type="text"
                  disabled
                  value={user.name}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Trip Category / Tour</label>
                  <select
                    value={reviewTour}
                    onChange={(e) => setReviewTour(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-xs bg-white"
                  >
                    <option value="">None (General Feedback)</option>
                    {tourPackages.map(pkg => (
                      <option key={pkg._id} value={pkg._id}>{pkg.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Rating Score</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-xs bg-white font-semibold text-amber-700"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                    <option value={3}>⭐⭐⭐ 3 Stars</option>
                    <option value={2}>⭐⭐ 2 Stars</option>
                    <option value={1}>⭐ 1 Star</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Your Review Message *</label>
                <textarea
                  required
                  rows={5}
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                  placeholder="Tell us about the accommodation, guides, sights, and overall experience..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-sm transition resize-none font-light leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-full font-semibold text-sm shadow transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Review for Approval</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientDocuments;
