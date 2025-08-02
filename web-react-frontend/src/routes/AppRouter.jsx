import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";

import { AuthProvider } from "../context/AuthContext";
// Componente de ruta protegida
import { ProtectedRoute } from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { publicRoutes, protectedRoutes, freeRoutes } from "./routesConfig";


function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        {/* --- Rutas Libres --- */}
        {freeRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* --- Rutas Públicas --- */}
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PublicRoute>{route.element}</PublicRoute>}
          />
        ))}

        {/* --- Rutas Públicas --- */}
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}

        {/* --- Ruta para Páginas no Encontradas --- */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </AuthProvider>
  );
}

export default AppRouter;