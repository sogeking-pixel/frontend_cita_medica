import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ConfirmarCorreo from "../pages/ConfirmarCorreo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ForgetPassword from "../pages/ForgetPassword";
// Componente de ruta protegida
import { ProtectedRoute } from "./ProtectedRoute";



function AppRouter() {
  return (
    <Routes>
      {/* --- Rutas Públicas --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirmar-correo" element={<ConfirmarCorreo />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />

      {/* --- Rutas Protegidas --- */}
      {/* Cualquier ruta dentro de ProtectedRoute requerirá autenticación */}
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
  );
}

export default AppRouter;