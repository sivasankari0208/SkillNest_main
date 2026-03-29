import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home           from "./pages/Home";
import AddServicePage from "./pages/AddServicePage";
import ReviewPage     from "./pages/ReviewPage";
import BookingsPage   from "./pages/BookingsPage";
import LoginPage      from "./pages/LoginPage";
import RegisterPage   from "./pages/RegisterPage";

import Navbar  from "./components/Navbar";
import Footer  from "./components/Footer";

import "./App.css";

// ── Protected Route ──────────────────────────────────────
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "provider" ? "/add-service" : "/"} replace />;
  }
  return children;
}

function AppRoutes({ darkMode, setDarkMode }) {
  return (
    <div className={darkMode ? "dark" : "light"}>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="page-wrapper">
          <Routes>
            {/* Public */}
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reviews"  element={<ReviewPage />} />

            {/* Customer only */}
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <BookingsPage />
                </ProtectedRoute>
              }
            />

            {/* Provider only */}
            <Route
              path="/add-service"
              element={
                <ProtectedRoute allowedRoles={["provider"]}>
                  <AddServicePage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <AuthProvider>
      <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
    </AuthProvider>
  );
}

export default App;
