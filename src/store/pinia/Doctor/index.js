import { defineStore } from "pinia";
import { getAllDoctors, getDoctorById } from "../../../FackApi/api/Doctor";

export const useDoctorStore = defineStore("doctorStore", {
  state: () => ({
    doctors: [],
    doctor: null,
  }),
  actions: {
    async fetchDoctors() {
      try {
        const response = await getAllDoctors();
        this.doctors = response;
      } catch (error) {
        console.error("Error fetching doctors:", error);
        this.doctors = [];
      }
    },
    async fetchDoctorById(user_id, date_joined) {
      try {
        const response = await getDoctorById(user_id, date_joined);
        this.doctor = response;
        return response;
      } catch (error) {
        console.error("Error fetching doctor by user_id:", error);
        return null;
      }
    },
  },
});
