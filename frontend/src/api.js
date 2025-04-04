import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "https://ea02c024-7e9b-42de-8638-87e7d9d5b191-dev.e1-us-east-azure.choreoapis.dev/django-react-tutorial/backend/v1";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL
//   });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;