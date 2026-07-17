import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { FaUser, FaPhone, FaMapMarkerAlt, FaLock, FaUpload, FaUserShield } from "react-icons/fa";
import ImageCropperModal from "../components/ImageCropperModal";

function Profile() {
  const { user, token, updateUser } = useAuth();
  const { showToast } = useNotification();

  // Basic Info Form State
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [state, setState] = useState(user?.state || "");
  const [country, setCountry] = useState(user?.country || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  
  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Image Cropper State
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("Please select an image file.", "error");
        return;
      }
      setSelectedFile(file);
      setShowCropper(true);
      e.target.value = ""; // Clear input
    }
  };

  const handleCroppedImage = async (croppedFile) => {
    setShowCropper(false);
    setSelectedFile(null);
    setUpdatingProfile(true);

    const formData = new FormData();
    formData.append("image", croppedFile);

    try {
      showToast("Uploading profile image...", "info");
      const response = await fetch("http://localhost:4010/api/v1/media/upload/image?folder=profiles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Now save the image URL to user profile
        const updateResponse = await fetch("http://localhost:4010/api/v1/profile/me", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profileImage: data.url }),
        });

        const updateData = await updateResponse.json();

        if (updateResponse.ok && updateData.success) {
          setProfileImage(data.url);
          updateUser(updateData.user);
          showToast("Profile image updated successfully!", "success");
        } else {
          showToast(updateData.message || "Failed to update profile image", "error");
        }
      } else {
        showToast(data.message || "Failed to upload image", "error");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      showToast("Error uploading image. Make sure server is running.", "error");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Name is required.", "error");
      return;
    }

    setUpdatingProfile(true);
    try {
      const response = await fetch("http://localhost:4010/api/v1/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        updateUser(data.user);
        showToast("Profile details updated successfully!", "success");
      } else {
        showToast(data.message || "Failed to update profile", "error");
      }
    } catch (error) {
      console.error("Error updating profile details:", error);
      showToast("Error updating profile. Please try again.", "error");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("All password fields are required.", "error");
      return;
    }

    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    setUpdatingPassword(true);
    try {
      const response = await fetch("http://localhost:4010/api/v1/profile/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast("Password updated successfully!", "success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast(data.message || "Failed to update password", "error");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      showToast("Error changing password. Please try again.", "error");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const getInitials = (userName) => {
    if (!userName) return "?";
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Please log in to view your profile settings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-700">Account Preferences</span>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mt-1">Profile Settings</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#1F4027] font-semibold bg-emerald-50 border border-emerald-100/60 px-4 py-2 rounded-full">
            <FaUserShield />
            <span>Role: {user.role?.replace("_", " ").toUpperCase()}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Image Card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col items-center text-center space-y-6 shadow-sm">
            <div className="relative group">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={user.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-amber-50 shadow-md transition group-hover:opacity-85"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-amber-50 border-2 border-dashed border-[#c5a880]/50 flex items-center justify-center text-amber-800 font-bold text-4xl shadow-inner group-hover:bg-amber-100/50 transition">
                  {getInitials(user.name)}
                </div>
              )}

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-1 right-1 bg-[#1F4027] hover:bg-[#152e1c] text-white p-3 rounded-full cursor-pointer shadow-lg border border-[#c5a880]/30 transition hover:scale-105 active:scale-95 flex items-center justify-center"
                title="Change Avatar"
              >
                <FaUpload size={14} />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{user.email}</p>
            </div>

            <div className="w-full pt-4 border-t border-gray-50 text-xs text-gray-400 leading-relaxed font-light">
              Upload a JPG, PNG, or WEBP image. Use the crop tool to position your avatar nicely.
            </div>
          </div>

          {/* Right Column: Edit Forms */}
          <div className="md:col-span-2 space-y-8">
            {/* Details Form */}
            <form onSubmit={handleUpdateProfile} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2">
                <FaUser className="text-[#c5a880] text-lg" />
                <span>Personal Information</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200/80 focus:border-[#1F4027] outline-none text-gray-800 transition bg-[#FAF8F5]/30 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full pl-12 pr-5 py-3 rounded-2xl border border-gray-200/80 focus:border-[#1F4027] outline-none text-gray-800 transition bg-[#FAF8F5]/30 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-2 pt-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#c5a880] text-lg" />
                <span>Address Details</span>
              </h2>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter street address"
                  className="w-full px-5 py-3 rounded-2xl border border-gray-200/80 focus:border-[#1F4027] outline-none text-gray-800 transition bg-[#FAF8F5]/30 focus:bg-white"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200/80 focus:border-[#1F4027] outline-none text-gray-800 transition bg-[#FAF8F5]/30 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">State / Province</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200/80 focus:border-[#1F4027] outline-none text-gray-800 transition bg-[#FAF8F5]/30 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200/80 focus:border-[#1F4027] outline-none text-gray-800 transition bg-[#FAF8F5]/30 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={updatingProfile}
                  className="px-8 py-3.5 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center min-w-[140px] disabled:opacity-70"
                >
                  {updatingProfile ? "Saving..." : "Save Details"}
                </button>
              </div>
            </form>

            {/* Password Form - only for local login provider */}
            {user.authProvider === "local" && (
              <form onSubmit={handleChangePassword} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-50 pb-3 flex items-center gap-2">
                  <FaLock className="text-[#c5a880] text-lg" />
                  <span>Update Password</span>
                </h2>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200/80 focus:border-[#1F4027] outline-none text-gray-800 transition bg-[#FAF8F5]/30 focus:bg-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200/80 focus:border-[#1F4027] outline-none text-gray-800 transition bg-[#FAF8F5]/30 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200/80 focus:border-[#1F4027] outline-none text-gray-800 transition bg-[#FAF8F5]/30 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={updatingPassword}
                    className="px-8 py-3.5 bg-[#1F4027] hover:bg-[#152e1c] text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center min-w-[140px] disabled:opacity-70"
                  >
                    {updatingPassword ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {showCropper && selectedFile && (
        <ImageCropperModal
          file={selectedFile}
          onCrop={handleCroppedImage}
          onClose={() => {
            setShowCropper(false);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
}

export default Profile;
