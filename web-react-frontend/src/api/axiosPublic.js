import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-SECRET": import.meta.env.VITE_API_BACKEND_KEY,
  },
});

export default axiosPublic;
