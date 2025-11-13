import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";


// ✅ Leer la variable del entorno (.env)
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:8000/api"
    : "https://django-react-full-stack-v1.onrender.com/api");

// Crear una instancia global de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos de espera máxima
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor para incluir el token automáticamente en las peticiones
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

// ✅ Si el token expira, intentar refrescar automáticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem(REFRESH_TOKEN);

      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/token/refresh/`, { refresh });
        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest); // 🔁 Reintentar con el nuevo token
        }
      } catch (refreshError) {
        console.error("❌ No se pudo refrescar el token:", refreshError);
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    // Otros errores (network, etc.)
    if (error.message === "Network Error") {
      console.error("🚫 No se pudo conectar con el servidor backend.");
    }

    return Promise.reject(error);
  }
);

export default api;