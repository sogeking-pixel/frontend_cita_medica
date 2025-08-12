import React, { createContext, useContext, useState, useEffect } from "react";
import axiosPublic from "../api/axiosPublic";
import apiClient from "../api/axiosPrivate";
import { getRoute } from "../routes/routesConfig";

export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    // Verificamos el token y obtenemos datos de usuario
    apiClient
      .get("/me/")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        // Si el token es inválido, limpiamos y forzamos logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials) => {
   
    try {
      const res = await axiosPublic.post("/auth/login/", credentials);
      const { accessToken, refreshToken, user: userData } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(userData);
      return { success: true };
    }
    catch (error) {
      console.error("Error al iniciar sesión:", error);
      return { success: false, message: error.response?.data?.detail || "Error al iniciar sesión." };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = getRoute("Login").path; 
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}