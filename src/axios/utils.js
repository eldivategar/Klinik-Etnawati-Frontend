import axiosInstance from ".";
import { useAuthStore } from "@/store/pinia/Auth";

const refreshAccessToken = async () => {
  const authStore = useAuthStore();
  try {
    const response = await axiosInstance.post("account/auth/login/refresh", {
      refresh: localStorage.getItem("refresh"),
    });
    const token = response.data.access;
    localStorage.setItem("access", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    authStore.isAuthenticated = true;
    return token;
  } catch (refreshError) {
    // console.error("Refresh token error:", refreshError);
    alert("Sesi login Anda telah habis. Silakan login kembali.");
    authStore.logoutWithoutRefresh();
    window.location.href = "/auth/login";
    return Promise.reject(refreshError);
  }
};

export { refreshAccessToken };
