import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧠 Thêm Interceptor để gắn token tự động
axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("token123", token);
    }
  }
  return config;
});

// 🔁 Interceptor phản hồi lỗi (VD: token hết hạn)
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Nếu gặp lỗi 401 (Unauthorized)
    if (error.response?.status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ!");
      // Có thể xử lý refresh token ở đây
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
