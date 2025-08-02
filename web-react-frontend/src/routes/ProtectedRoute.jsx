import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRoute } from "./routesConfig";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; 
  if (!user) return <Navigate to={getRoute('Login').path} replace />;
  return children;
};