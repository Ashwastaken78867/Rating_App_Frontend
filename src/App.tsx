import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import UserDashboard from "./pages/user/UserDashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const validRoles = ["admin", "owner", "user"];
  const isAuthenticated = Boolean(token) && role && validRoles.includes(role);

  // Sync with localStorage when login/logout happens
  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : role === "owner" ? (
              <Navigate to="/owner/dashboard" replace />
            ) : (
              <Navigate to="/user/dashboard" replace />
            )
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
        />

        {/* Dashboards */}
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/owner/dashboard"
          element={
            isAuthenticated && role === "owner" ? (
              <OwnerDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/user/dashboard"
          element={
            isAuthenticated && role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={<div className="p-8 text-center">404 - Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
