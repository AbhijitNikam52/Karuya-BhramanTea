import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaBars, 
  FaTimes, 
  FaStore, 
  FaBoxOpen, 
  FaTags, 
  FaClipboardList, 
  FaBookOpen, 
  FaUsers, 
  FaSignOutAlt, 
  FaUserShield,
  FaGlobe
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { showToast } = useNotification();
  const location = useLocation();

  const isAdminPath = location.pathname.startsWith("/admin");

  if (!isAdmin || !isAdminPath) return null;

  const handlePlaceholderClick = (pageName) => {
    showToast(`${pageName} Management module is coming soon!`, "info");
    setIsOpen(false);
  };

  const menuItems = [
    {
      name: "View Website",
      path: "/",
      icon: <FaGlobe className="text-lg" />,
      isPlaceholder: false,
    },
    {
      name: "Shop Management",
      path: "/admin/shop",
      icon: <FaStore className="text-lg" />,
      isPlaceholder: false,
    },
    {
      name: "Packages Management",
      icon: <FaBoxOpen className="text-lg" />,
      isPlaceholder: true,
    },
    {
      name: "Categories Management",
      icon: <FaTags className="text-lg" />,
      isPlaceholder: true,
    },
    {
      name: "Enquiries Management",
      icon: <FaClipboardList className="text-lg" />,
      isPlaceholder: true,
    },
    {
      name: "Bookings Management",
      icon: <FaBookOpen className="text-lg" />,
      isPlaceholder: true,
    },
    {
      name: "Clients Management",
      icon: <FaUsers className="text-lg" />,
      isPlaceholder: true,
    },
  ];

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    showToast("Logged out successfully", "success");
  };

  return (
    <>
      {/* Floating Hamburger Toggle Button - only visible when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-6 top-6 z-[60] bg-[#1F4027] hover:bg-[#152e1c] text-white p-3.5 rounded-full shadow-xl border border-[#c5a880]/30 transition duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
          title="Open Dashboard Menu"
        >
          <FaBars className="text-lg" />
        </button>
      )}

      {/* Slide-out Sidebar Drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-[#1F4027] text-white shadow-2xl z-[55] transition-all duration-300 ease-in-out flex flex-col justify-between border-r border-[#c5a880]/20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-grow relative">
          
          {/* Close button in the top-right corner of the sidebar drawer */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-5 text-white hover:text-[#c5a880] transition duration-300 hover:rotate-90 cursor-pointer p-1.5 rounded-lg hover:bg-white/5"
            title="Close Menu"
          >
            <FaTimes className="text-lg" />
          </button>

          {/* Logo & Header */}
          <div className="p-6 border-b border-white/10 mt-14">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-[#c5a880]">🍵</span> Karuya BhramanTea
            </h2>
            <p className="text-xs text-[#c5a880] uppercase tracking-widest font-semibold mt-1">
              Admin Dashboard
            </p>
          </div>

          {/* User Profile Summary */}
          <div className="p-6 bg-white/5 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c5a880]/20 rounded-full flex items-center justify-center text-white border border-[#c5a880]/30">
              <FaUserShield className="text-lg text-[#c5a880]" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate text-white">{user?.name}</p>
              <p className="text-xs text-gray-300 capitalize">{user?.role?.replace("_", " ")}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 flex-grow space-y-1.5 overflow-y-auto">
            {menuItems.map((item, index) => {
              const isActive = !item.isPlaceholder && location.pathname === item.path;

              if (item.isPlaceholder) {
                return (
                  <button
                    key={index}
                    onClick={() => handlePlaceholderClick(item.name)}
                    className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm text-white/70 hover:text-white hover:bg-white/5 transition duration-200 border border-transparent"
                  >
                    <span className="text-white/50">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-auto text-[10px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                      Soon
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-200 border ${
                    isActive
                      ? "bg-[#c5a880] text-[#1F4027] border-[#c5a880] shadow-md shadow-[#c5a880]/10"
                      : "text-white/90 hover:text-white hover:bg-white/5 border-transparent"
                  }`}
                >
                  <span className={isActive ? "text-[#1F4027]" : "text-[#c5a880]"}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section - Logout */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-white border border-red-500/20 hover:border-red-500/40 rounded-xl text-sm font-medium transition duration-200"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Semi-transparent Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[50] transition-opacity duration-300"
        />
      )}
    </>
  );
}

export default AdminSidebar;
