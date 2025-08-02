import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ConfirmarCorreo from "../pages/ConfirmarCorreo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ForgetPassword from "../pages/ForgetPassword";
import CreateNewPassword from "../pages/CreateNewPassword";
import { AuthProvider } from "../context/AuthContext";
// Componente de ruta protegida
import { ProtectedRoute } from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";


function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        {/* --- Rutas Públicas --- */}
        <Route path="/confirmar-correo" element={<ConfirmarCorreo />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgetpassword"
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />

        {/* --- Rutas Protegidas --- */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* --- Ruta para Páginas no Encontradas --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default AppRouter;