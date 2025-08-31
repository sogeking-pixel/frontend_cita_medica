import axios from "axios";
import { getRoute } from "../routes/routesConfig";
import {
  setAccessToken,
  clearTokens,
  getAccessToken,
  getRefreshToken,
  decodeToken,
} from "../utils/jwt";
import axiosPublic from "./axiosPublic"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-SECRET": import.meta.env.VITE_API_BACKEND_KEY,
  },
  timeout: 15000,
});

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

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

    if (
      originalRequest.url &&
      originalRequest.url.includes("/auth/token/refresh/")
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }
      isRefreshing = true;
      try {
        // Intentamos refrescar el token
        const refresh = getRefreshToken();

        if (!refresh) throw new Error("No refresh token available");

        const rs = await axiosPublic.post(`/auth/token/refresh/`, {
          refresh: refresh,
        });

        const { access } = rs.data;
        if (!access) throw new Error("No access token returned");
        setAccessToken(access);
        onRefreshed(access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (_error) {
        console.error("Session expired. Please login again.");
        clearTokens();
        window.location.href = getRoute("Login").path;
        return Promise.reject(_error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
