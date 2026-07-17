import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { FaTrash, FaUpload, FaImage, FaSpinner, FaTimes } from "react-icons/fa";

function AdminBanners() {
  const { token, isAdmin } = useAuth();
  const { showToast, showPopup } = useNotification();

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Multiple File uploads state
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState("");

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4010/api/v1/banners?all=true", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setBanners(data.data);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      showToast("Failed to load banner list.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchBanners();
    }
  }, [isAdmin]);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageFiles = files.filter(file => file.type.startsWith("image/"));

    if (validImageFiles.length !== files.length) {
      showToast("Some selected files were not images and were filtered out.", "warning");
    }

    if (validImageFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validImageFiles]);
      const newPreviews = validImageFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      showToast("Please choose at least one banner image to upload.", "warning");
      return;
    }

    setSubmitting(true);
    let successCount = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setUploadProgress(`Uploading slide ${i + 1} of ${selectedFiles.length}...`);

      try {
        // 1. Upload file to media storage
        const formData = new FormData();
        formData.append("image", file);

        const uploadRes = await fetch("http://localhost:4010/api/v1/media/upload/image?folder=banners", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });

        const uploadData = await uploadRes.json();

        if (uploadRes.ok && uploadData.success) {
          // 2. Post banner details to backend
          const saveRes = await fetch("http://localhost:4010/api/v1/banners", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              image: uploadData.url,
              publicId: uploadData.publicId,
              title: "",
              subtitle: "",
              link: "/packages",
              order: banners.length + successCount,
              isActive: true
            })
          });

          const saveData = await saveRes.json();
          if (saveRes.ok && saveData.success) {
            successCount++;
          }
        }
      } catch (err) {
        console.error("Bulk upload item error:", err);
      }
    }

    setSubmitting(false);
    setUploadProgress("");
    
    if (successCount === selectedFiles.length) {
      showToast(`Successfully uploaded all ${successCount} banner slides!`, "success");
    } else if (successCount > 0) {
      showToast(`Uploaded ${successCount} of ${selectedFiles.length} slides successfully.`, "warning");
    } else {
      showToast("Failed to upload banner slides.", "error");
    }

    setSelectedFiles([]);
    setPreviews([]);
    fetchBanners();
  };

  const handleDelete = (id) => {
    showPopup({
      title: "Delete Slide?",
      message: "Are you sure you want to permanently delete this banner slide image?",
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:4010/api/v1/banners/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok && data.success) {
            showToast("Banner slide deleted.", "success");
            fetchBanners();
          } else {
            showToast(data.message || "Failed to delete slide.", "error");
          }
        } catch (error) {
          console.error("Delete slide error:", error);
          showToast("Error deleting slide.", "error");
        }
      }
    });
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
        <div className="border-b border-gray-200 pb-6 text-left">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700">Home Slider Manager</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-1">Banner Management</h1>
          <p className="text-sm text-gray-500 mt-2">
            Upload multiple photos to slide on the homepage hero section using the Ken Burns effect. No text parameters required.
          </p>
        </div>

        {/* Dropzone & Preview Block */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-[#1F4027] border-b border-gray-50 pb-3 flex items-center gap-2">
            <FaImage />
            <span>Upload New Banner Slides</span>
          </h2>

          <div className="space-y-4">
            {/* Multiple File drop box */}
            <div className="border border-dashed border-[#c5a880]/40 rounded-2xl p-6 text-center hover:border-[#1F4027] transition relative bg-[#FAF8F5]/30 h-44 flex flex-col items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center justify-center space-y-2.5 py-1">
                <FaUpload className="text-[#c5a880] text-2xl" />
                <p className="font-semibold text-sm text-gray-700">Select or Drag Multiple Images</p>
                <p className="text-xs text-gray-400">landscape format (1920x1080) works best</p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>

            {/* Selected Previews Grid */}
            {previews.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 text-left">Queue to Upload ({previews.length})</h3>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {previews.map((src, index) => (
                    <div key={index} className="relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-250/60 bg-gray-50 group">
                      <img src={src} alt="Upload preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeSelectedFile(index)}
                        className="absolute top-1 right-1 bg-red-650/95 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow hover:bg-red-750 flex items-center justify-center"
                        title="Remove"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Upload Action Button */}
                <div className="flex justify-end pt-3">
                  <button
                    onClick={handleBulkUpload}
                    disabled={submitting}
                    className="px-6 py-3 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-full font-semibold text-xs shadow transition min-w-[150px] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>{uploadProgress}</span>
                      </>
                    ) : (
                      <span>Upload Banners</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Existing Active Banners list */}
        <div className="space-y-6 text-left">
          <h2 className="text-2xl font-bold text-gray-900">Current Homepage Slide Banners ({banners.length})</h2>

          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#1F4027] border-t-transparent" />
              <p className="text-gray-500 font-medium">Loading slider banners...</p>
            </div>
          ) : banners.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-gray-450">
              <p>No homepage banners uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {banners.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md group transition relative">
                  
                  {/* Aspect ratio block */}
                  <div className="aspect-[16/9] bg-gray-50 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt="Banner slide" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>

                  {/* Delete button overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-650 hover:bg-red-750 text-white px-5 py-2.5 rounded-full font-semibold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <FaTrash size={12} /> Delete Slide
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

export default AdminBanners;
