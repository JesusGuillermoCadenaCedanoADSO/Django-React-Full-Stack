import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
// import PrivateRoute from "./components/PrivateRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ redirige raíz al login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        {/* ✅ ruta protegida (solo si hay token) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ✅ logout */}
        <Route path="/logout" element={<Logout />} />

        {/* ✅ 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
