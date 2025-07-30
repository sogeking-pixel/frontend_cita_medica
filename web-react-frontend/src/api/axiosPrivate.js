import axios from "axios";

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
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentamos refrescar el token
        const refreshToken = localStorage.getItem("refreshToken");
        const rs = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/token/refresh/`,
          {
            refreshToken: refreshToken,
          }
        );

        const { accessToken } = rs.data;
        localStorage.setItem("accessToken", accessToken);

        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (_error) {
        console.error("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Redirección forzada
        window.location.href = "/login/";
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
