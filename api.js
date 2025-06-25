import axios from "axios";

export const BASE_URL = "https://68337cba464b499636ff9eac.mockapi.io";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// You can add interceptors here for handling tokens, errors globally
api.interceptors.request.use(
  (config) => {
    // Example: Add a token to headers if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Example: Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access, redirecting to login...");
      // Optionally redirect to login: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
