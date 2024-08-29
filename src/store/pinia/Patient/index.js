import { defineStore } from "pinia";
import axiosInstance from "../../../axios";
import axios from "axios";

export const usePatientStore = defineStore("patientStore", {
  state: () => ({
    patients: [],
    count: 0,
    patientsOverview: [],
    patientsOverviewCount: 0,
    controller: null, // Tambahkan ini untuk menyimpan AbortController
  }),
  actions: {
    async fetchPatients(page = 1) {
      try {
        // Jika ada controller yang lama, batalkan request-nya
        if (this.controller) {
          this.controller.abort();
        }

        // Buat controller baru
        this.controller = new AbortController();
        const signal = this.controller.signal;

        const response = await axiosInstance.get(
          `medrec/patients/?page=${page}`,
          { signal }
        );
        this.patients = response.data.results;
        this.count = response.data.count;
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled");
        } else {
          console.error("Error fetching patients:", error);
          this.patients = [];
          this.count = 0;
        }
      }
    },
    async fetchAllPatients() {
      try {
        const response = await axiosInstance.get(`medrec/patients/overview/`);
        this.patientsOverview = response.data;
        return response.data;
      } catch (error) {
        console.error("Error fetching all patients:", error);
        this.patientsOverview = [];
      }
    },
    async fetchPatientsPaginated(query) {
      try {
        let page = 1;
        let allPatients = [];
        let hasMore = true;

        while (hasMore) {
          const response = await axiosInstance.get(
            `medrec/patients/?page=${page}&search=${query}`
          );
          allPatients = allPatients.concat(response.data.results);
          page += 1;
          hasMore = response.data.next !== null;
        }

        this.patients = allPatients;
        this.count = allPatients.length;
        return allPatients;
      } catch (error) {
        console.error("Error fetching paginated patients:", error);
        this.patients = [];
        this.count = 0;
      }
    },
    async searchPatient(page = 1, query) {
      try {
        const response = await axiosInstance.get(
          `medrec/patients/?page=${page}&search=${query}`
        );
        this.patients = response.data.results;
        this.count = response.data.count;
      } catch (error) {
        console.error("Error searching patients:", error);
        this.patients = [];
        this.count = 0;
      }
    },
    async createPatient(data) {
      try {
        const response = await axiosInstance.post("medrec/patients/", data);
        return response;
      } catch (error) {
        console.error("Error creating patient:", error);
        return null;
      }
    },
    async updatePatient(cardNumber, data) {
      try {
        const response = await axiosInstance.put(
          `medrec/patients/${cardNumber}/`,
          data
        );
        return response;
      } catch (error) {
        console.error("Error updating patient:", error);
        return null;
      }
    },
  },
});
