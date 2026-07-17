import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { FaTrash, FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt, FaUpload, FaUser, FaLink, FaChevronDown, FaSearch, FaEdit } from "react-icons/fa";

function AdminDocuments() {
  const { token, isAdmin } = useAuth();
  const { showToast, showPopup } = useNotification();

  const [documents, setDocuments] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [docName, setDocName] = useState("");
  const [category, setCategory] = useState("Brochure");
  const [uploadedFor, setUploadedFor] = useState(""); // empty means general / company brochure
  const [docFile, setDocFile] = useState(null);

  // Filters
  const [selectedClientFilter, setSelectedClientFilter] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

  // Tour Package Selectors
  const [tourPackages, setTourPackages] = useState([]);
  const [tourPackage, setTourPackage] = useState("");

  // CRUD Update State
  const [editingDoc, setEditingDoc] = useState(null);

  const handleEditSelect = (doc) => {
    setEditingDoc(doc);
    setDocName(doc.name);
    setCategory(doc.category);
    setUploadedFor(doc.uploadedFor?._id || doc.uploadedFor || "");
    setTourPackage(doc.tourPackage?._id || doc.tourPackage || "");
    setDocFile(null); // optional new file on edit
  };

  const handleCancelEdit = () => {
    setEditingDoc(null);
    setDocName("");
    setCategory("Brochure");
    setUploadedFor("");
    setTourPackage("");
    setDocFile(null);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch all documents
      let docUrl = "http://localhost:4010/api/v1/documents";
      const params = [];
      if (selectedClientFilter) params.push(`clientId=${selectedClientFilter}`);
      if (selectedCategoryFilter) params.push(`category=${selectedCategoryFilter}`);
      if (params.length > 0) docUrl += "?" + params.join("&");

      const docRes = await fetch(docUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const docData = await docRes.json();
      if (docData.success) {
        setDocuments(docData.data);
      }

      // Fetch clients list for selector
      const clientRes = await fetch("http://localhost:4010/api/v1/admin/clients", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const clientData = await clientRes.json();
      if (clientData.success) {
        setClients(clientData.clients || clientData.data || []);
      }

      // Fetch packages list for selector
      const pkgRes = await fetch("http://localhost:4010/api/v1/packages", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const pkgData = await pkgRes.json();
      if (pkgData.success) {
        setTourPackages(pkgData.packages || []);
      }
    } catch (error) {
      console.error("Error fetching documents data:", error);
      showToast("Failed to load documents, clients or package list.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, selectedClientFilter, selectedCategoryFilter]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocFile(file);
      if (!docName) {
        // Pre-fill document name field with file name (without extension)
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
    showToast(editingDoc ? "Saving document updates..." : "Uploading document file to cloud...", "info");

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
          throw new Error(uploadData.message || "Failed to upload file");
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
        uploadedFor: uploadedFor || null,
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
        showToast(editingDoc ? "Document updated successfully!" : "Document saved successfully!", "success");
        handleCancelEdit();
        fetchData();
      } else {
        showToast(saveData.message || "Failed to save document record.", "error");
      }
    } catch (error) {
      console.error("Document submit error:", error);
      showToast(error.message || "Error saving document.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id, name) => {
    showPopup({
      title: "Delete Document?",
      message: `Are you sure you want to delete '${name}'? This will remove the file from database and cloud storage.`,
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
            fetchData();
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
        <div className="border-b border-gray-200 pb-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700">Digital Document Library</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-1">Document Management</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Upload Form (Left Column) */}
          <div className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
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
                      <p className="text-[10px] text-gray-400 mt-0.5">PDF, DOCX, XLSX, TXT (Max 10MB)</p>
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
                  placeholder="e.g., Tour Brochure PDF"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none text-sm transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Category *</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none appearance-none bg-white pr-8 text-xs font-semibold"
                    >
                      <option value="Brochure">Brochure</option>
                      <option value="Itinerary">Itinerary</option>
                      <option value="Ticket">Ticket</option>
                      <option value="Passport">Passport Copy</option>
                      <option value="Visa">Visa Doc</option>
                      <option value="Other">Other</option>
                    </select>
                    <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Target Client</label>
                  <div className="relative">
                    <select
                      value={uploadedFor}
                      onChange={(e) => setUploadedFor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none appearance-none bg-white pr-8 text-xs"
                    >
                      <option value="">General (All / Public)</option>
                      {clients.map(client => (
                        <option key={client._id} value={client._id}>{client.name}</option>
                      ))}
                    </select>
                    <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]" />
                  </div>
                </div>
              </div>

              {/* Associated Tour Package */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Associated Tour Package</label>
                <div className="relative">
                  <select
                    value={tourPackage}
                    onChange={(e) => {
                      setTourPackage(e.target.value);
                      if (e.target.value && !docName) {
                        const selectedPkg = tourPackages.find(p => p._id === e.target.value);
                        if (selectedPkg) {
                          setDocName(`${selectedPkg.title} Itinerary`);
                        }
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1F4027] outline-none appearance-none bg-white pr-8 text-xs"
                  >
                    <option value="">None (General Brochure)</option>
                    {tourPackages.map(pkg => (
                      <option key={pkg._id} value={pkg._id}>{pkg.title}</option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]" />
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

          {/* Documents List & Filters (Right Columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters Dashboard */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center flex-grow">
                <div className="relative flex items-center">
                  <FaSearch className="absolute left-3.5 text-gray-400 text-xs" />
                  <select
                    value={selectedClientFilter}
                    onChange={(e) => setSelectedClientFilter(e.target.value)}
                    className="pl-9 pr-8 py-2.5 rounded-full border border-gray-200 outline-none text-xs font-semibold bg-[#FAF8F5] text-gray-600 appearance-none min-w-[180px]"
                  >
                    <option value="">All Clients Filter</option>
                    {clients.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3.5 text-gray-400 pointer-events-none text-[9px]" />
                </div>

                <div className="relative flex items-center">
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="pl-4 pr-8 py-2.5 rounded-full border border-gray-200 outline-none text-xs font-semibold bg-[#FAF8F5] text-gray-600 appearance-none min-w-[150px]"
                  >
                    <option value="">All Categories Filter</option>
                    <option value="Brochure">Brochure</option>
                    <option value="Itinerary">Itinerary</option>
                    <option value="Ticket">Ticket</option>
                    <option value="Passport">Passport Copy</option>
                    <option value="Visa">Visa Doc</option>
                    <option value="Other">Other</option>
                  </select>
                  <FaChevronDown className="absolute right-3.5 text-gray-400 pointer-events-none text-[9px]" />
                </div>
              </div>
              
              {(selectedClientFilter || selectedCategoryFilter) && (
                <button
                  onClick={() => {
                    setSelectedClientFilter("");
                    setSelectedCategoryFilter("");
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/70 border border-red-100 px-3.5 py-1.5 rounded-full transition"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* List */}
            {loading ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1F4027] border-t-transparent" />
                <p className="text-gray-500 text-sm">Querying document catalog...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-2">
                <p className="text-gray-400 text-base">No matching documents found in the database.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
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
                          <span className="flex items-center gap-1">
                            <FaUser size={10} className="text-gray-300" />
                            <span>Uploaded by {doc.uploadedBy?.name || "System"}</span>
                          </span>
                        </div>
                        {doc.uploadedFor && (
                          <div className="mt-1.5 text-xs text-emerald-800 bg-emerald-50/80 px-2.5 py-0.5 rounded-full border border-emerald-100/30 w-fit flex items-center gap-1">
                            <span className="text-[10px]">👤</span>
                            <span>Client Specific: <strong>{doc.uploadedFor?.name}</strong></span>
                          </div>
                        )}
                        {doc.tourPackage && (
                          <div className="mt-1.5 text-xs text-amber-900 bg-amber-50/85 px-2.5 py-0.5 rounded-full border border-amber-200/30 w-fit flex items-center gap-1 font-medium">
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
                        className="px-4 py-2 border border-gray-300 rounded-full font-semibold text-xs text-gray-600 hover:bg-gray-50 transition flex items-center gap-1.5"
                      >
                        <FaLink size={10} /> View / Download
                      </a>
                      <button
                        onClick={() => handleEditSelect(doc)}
                        className="p-2.5 text-gray-400 hover:text-[#1F4027] hover:bg-gray-50 rounded-xl transition"
                        title="Edit Document"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(doc._id, doc.name)}
                        className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                        title="Delete Document"
                      >
                        <FaTrash size={12} />
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
  );
}

export default AdminDocuments;
