import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [popup, setPopup] = useState(null);

  // Generate unique IDs for toasts
  const showToast = (message, type = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  // Close popup modal
  const closePopup = () => {
    if (popup?.onClose) popup.onClose();
    setPopup(null);
  };

  // Trigger popup modal
  const showPopup = ({ title, message, type = "success", onConfirm, onClose }) => {
    setPopup({ title, message, type, onConfirm, onClose });
  };

  // Handle toast auto-dismiss
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  return (
    <NotificationContext.Provider value={{ showToast, showPopup }}>
      {children}

      {/* ================= GLOBAL TOASTS CONTAINER ================= */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          let badgeColor = "bg-white border-gray-200 text-gray-800 shadow-lg";
          let icon = "ℹ️";
          
          if (t.type === "success") {
            badgeColor = "bg-white border-emerald-100 text-emerald-800 shadow-xl shadow-emerald-500/5";
            icon = "✓";
          } else if (t.type === "error") {
            badgeColor = "bg-white border-rose-100 text-rose-800 shadow-xl shadow-rose-500/5";
            icon = "✕";
          } else if (t.type === "warning") {
            badgeColor = "bg-white border-amber-100 text-amber-800 shadow-xl shadow-amber-500/5";
            icon = "⚠";
          }

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-300 transform translate-x-0 animate-slideIn ${badgeColor}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                t.type === "success" ? "bg-emerald-50 text-emerald-800" :
                t.type === "error" ? "bg-rose-50 text-rose-800" :
                t.type === "warning" ? "bg-amber-50 text-amber-800" :
                "bg-gray-50 text-gray-800"
              }`}>
                {icon}
              </span>
              <p className="text-sm font-semibold leading-snug">{t.message}</p>
            </div>
          );
        })}
      </div>

      {/* ================= GLOBAL CUSTOM POPUP MODAL ================= */}
      {popup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300">
          <div className="bg-[#FAF8F5] border border-gray-100/60 max-w-sm w-full p-8 rounded-3xl shadow-2xl space-y-6 text-center transform scale-100 transition-transform duration-300 animate-scaleIn">
            
            {/* Styled Icon Header */}
            <div className="flex justify-center">
              <span className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                popup.type === "success" ? "bg-emerald-50 text-emerald-800" :
                popup.type === "error" ? "bg-rose-50 text-rose-800" :
                popup.type === "warning" ? "bg-amber-50 text-amber-800" :
                "bg-blue-50 text-blue-800"
              }`}>
                {popup.type === "success" && "✓"}
                {popup.type === "error" && "✕"}
                {popup.type === "warning" && "⚠"}
                {popup.type === "info" && "ℹ️"}
              </span>
            </div>

            {/* Title & Message */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {popup.title}
              </h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {popup.message}
              </p>
            </div>

            {/* Buttons Layout */}
            <div className="flex gap-3 pt-2">
              {popup.onConfirm ? (
                <>
                  <button
                    onClick={closePopup}
                    className="flex-1 py-3 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      popup.onConfirm();
                      closePopup();
                    }}
                    className="flex-1 py-3 rounded-full bg-[#1F4027] hover:bg-[#152e1c] text-white text-sm font-semibold shadow-md hover:shadow-lg transition"
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <button
                  onClick={closePopup}
                  className="w-full py-3 rounded-full bg-[#1F4027] hover:bg-[#152e1c] text-white text-sm font-semibold shadow-md hover:shadow-lg transition"
                >
                  OK
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
