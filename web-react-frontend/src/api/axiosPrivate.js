import axios from "axios";
import { getRoute } from "../routes/routesConfig";
import {
  setAccessToken,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  decodeToken,
} from "../utils/jwt";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) return Promise.reject(error);

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentamos refrescar el token
        const refresh = getRefreshToken();

        if (!refresh) throw new Error("No refresh token available");

        const rs = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/token/refresh/`,
          {
            refresh: refresh,
          }
        );

        const { access} = rs.data;
        setAccessToken(access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);

      } catch (_error) {
        console.error("Session expired. Please login again.");
        clearTokens()
        // Redirección forzada
        window.location.href = getRoute("Login").path;
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
