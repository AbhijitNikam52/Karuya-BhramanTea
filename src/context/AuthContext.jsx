import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage on mount
    const savedUser = localStorage.getItem("bhramantea_user");
    const savedToken = localStorage.getItem("bhramantea_token");

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        localStorage.removeItem("bhramantea_user");
        localStorage.removeItem("bhramantea_token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, loginType) => {
    try {
      const response = await fetch("http://localhost:4010/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, loginType, rememberMe: true }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("bhramantea_user", JSON.stringify(data.user));
      localStorage.setItem("bhramantea_token", data.token);

      return data.user;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Best-effort logout call to backend
      await fetch("http://localhost:4010/api/v1/auth/logout", {
        method: "POST",
      }).catch((e) => console.warn("Failed to call logout endpoint", e));
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("bhramantea_user");
      localStorage.removeItem("bhramantea_token");
    }
  };

  const isAdmin = user && (user.loginType === "admin" || user.role === "system_owner");

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
