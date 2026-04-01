import { createContext, useState, useCallback, useEffect } from "react";
import API from "../services/api.js";

// Create the context
const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Register
  const register = useCallback(async (name, email, password, role) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        role: role.toLowerCase(),
      });
      const { user: newUser } = res.data;
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post("/auth/login", { email, password });
      const { user: userData, token: authToken } = res.data;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(userData));
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  const value = {
    user,
    setUser,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
