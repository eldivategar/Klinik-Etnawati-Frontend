import { defineStore } from "pinia";
import { getSchedules } from "../../../FackApi/api/Doctor";

export const useScheduleStore = defineStore("scheduleStore", {
  state: () => ({
    schedules: [],
    todaySchedules: [],
  }),
  actions: {
    async fetchSchedules() {
      try {
        const response = await getSchedules();
        this.schedules = response;
      } catch (error) {
        console.error("Error fetching schedules:", error);
        this.schedules = [];
      }
    },

    async fetchTodaySchedules() {
      const daysInIndonesian = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      try {
        const response = await getSchedules();
        const today = new Date().getDay();
        this.todaySchedules = response.filter(
          (res) => res.day === daysInIndonesian[today]
        );
      } catch (error) {
        console.error("Error fetching schedules:", error);
        this.todaySchedules = [];
      }
    },
  },
});
