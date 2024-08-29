import { defineStore } from "pinia";
import axiosInstance from "@/axios";
import { getActivePinia } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: !!localStorage.getItem("access"),
  }),
  getters: {
    isAdmin: () => {
      const token = localStorage.getItem("access");
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.role === "admin";
      }
      return false;
    },
  },
  actions: {
    async login(username, password, rememberMe) {
      try {
        const response = await axiosInstance.post("account/auth/login", {
          username,
          password,
          rememberMe,
        });
        const { access, refresh } = response.data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        this.isAuthenticated = true;
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: error.response.data.message || error.response.data.detail,
        });
      }
    },
    async logout() {
      try {
        await axiosInstance.post("account/auth/logout", {
          refresh_token: localStorage.getItem("refresh"),
        });
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        this.isAuthenticated = false;
        getActivePinia()._s.forEach((store) => store.$reset());
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
    logoutWithoutRefresh() {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      this.isAuthenticated = false;
      getActivePinia()._s.forEach((store) => store.$reset());
    },
  },
});
