import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

// 🔹 Leer variable de entorno (.env)
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:8000/api"
    : "https://django-react-full-stack-v1.onrender.com/api");


// 🔹 Función global para cerrar sesión y avisar a ProtectedRoute
export function logoutAndRedirect() {
  localStorage.clear();
  window.dispatchEvent(new Event("tokenExpired")); // Notificar a React
}

// 🔹 Crear una instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor para incluir el access token en las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Interceptor para refrescar token automáticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem(REFRESH_TOKEN);
      if (!refresh) {
        logoutAndRedirect();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/token/refresh/`, { refresh });

        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest); // 🔁 Reintentar petición
        }
      } catch (refreshError) {
        console.error("Error refrescando token:", refreshError);
        logoutAndRedirect();
      }
    }

    // Otros errores
    return Promise.reject(error);
  }
);

export default api;
