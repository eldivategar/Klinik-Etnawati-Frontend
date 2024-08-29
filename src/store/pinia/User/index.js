// store/pinia/User.js
import { defineStore } from "pinia";
import axiosInstance from "../../../axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUserData() {
      try {
        const response = await axiosInstance.get("account/users/info");
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        this.user = null;
      }
    },
  },
});
