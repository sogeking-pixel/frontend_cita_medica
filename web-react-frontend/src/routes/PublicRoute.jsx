import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getRoute } from "./routesConfig";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) {
    return <Navigate to={getRoute("Dashboard").path} replace />;
  }

  return children;
}


