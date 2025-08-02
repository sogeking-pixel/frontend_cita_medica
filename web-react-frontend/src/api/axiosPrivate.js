import axios from "axios";
import { getRoute } from "../routes/routesConfig";


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) throw new Error("No refresh token available");

        const rs = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/token/refresh/`,
          {
            refreshToken: refreshToken,
          }
        );

        const { accessToken } = rs.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return apiClient(originalRequest);
      } catch (_error) {
        console.error("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Redirección forzada
        window.location.href = getRoute("Login").path;
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
