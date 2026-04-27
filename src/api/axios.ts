import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔹 REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // ⚠️ Next.js SSR muammosini oldini olish
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 🔹 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    // success response
    return response;
  },
  (error) => {
    // ❌ ERROR HANDLING
    if (error.response) {
      const status = error.response.status;

      // 🔥 Unauthorized (token eskirgan / noto‘g‘ri)
      if (status === 401) {
        console.log("Unauthorized! Token o‘chirilmoqda...");

        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/login"; // redirect
        }
      }

      // 🔥 Server error
      if (status === 500) {
        console.log("Server error");
      }
    }

    return Promise.reject(error);
  },
);
