import React, { createContext, useContext, useState, useEffect } from "react";
import axiosPublic from "../api/axiosPublic";
import apiClient from "../api/axiosPrivate";
import { getRoute } from "../routes/routesConfig";
import 
{
  saveTokens,
  clearTokens,
  getAccessToken,
  decodeToken
} from "../utils/jwt";

export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    // Verificamos el token y obtenemos datos de usuario
    apiClient
      .get("/me/")
      .then((res) => {
        console.log('esto es una prueba')
        setUser(res.data);
      })
      .catch(() => {
        clearTokens()
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials) => {
   
    try {
      const res = await axiosPublic.post("/auth/login/", credentials);
      const { access, refresh} = res.data;
      saveTokens(access, refresh)
      const userData = decodeToken(access);
      if (!userData) throw new Error("No refresh token available");        
      setUser(userData);
      return { success: true };
    }
    catch (error) {
      console.error("Error al iniciar sesión:", error);
      clearTokens();
      return { success: false, message: error.response?.data?.detail || "Error al iniciar sesión." };
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    window.location.href = getRoute("Login").path; 
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}