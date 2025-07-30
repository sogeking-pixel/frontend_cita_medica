import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const tasksApi = axios.create({
  baseURL: `${URL}/`,
});

export const setAuthToken = (token) => {
  if (token) {
    tasksApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else {
    delete tasksApi.defaults.headers.common["Authorization"];
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await tasksApi.post("auth/register-paciente/", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await tasksApi.post("auth/login/", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}
