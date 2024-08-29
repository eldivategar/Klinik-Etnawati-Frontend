<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
        <iq-card>
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Jadwal Dokter Praktek</h4>
            </template>
            <template v-slot:headerAction>
              <b-button
                @click="
                  modalVertical = true;
                  resetForm();
                "
                variant="outline-primary"
                class="mt-1 me-1"
                ><i class="ri-add-fill"></i> Jadwal Baru</b-button
              >
              <b-modal
                id="modal-7"
                v-model="modalVertical"
                centered
                title="Tambah Jadwal Dokter"
                ok-title="Simpan"
                cancel-title="Cancel"
                @ok="onSubmit"
                @hidden="loading = false"
                :ok-disabled="loading"
              >
                <form ref="form" @submit.prevent="onSubmit">
                  <div class="mb-3">
                    <label for="doctor" class="form-label">Dokter</label>
                    <select
                      class="form-select"
                      id="doctor"
                      aria-label="Default select example"
                      v-model="selectedDoctor"
                      required
                    >
                      <option disabled value="">Pilih Dokter</option>
                      <option
                        v-for="doctor in doctors"
                        :key="doctor.detail.id"
                        :value="doctor.detail.id"
                      >
                        {{ doctor.detail.fullname }} - {{ doctor.detail.id }}
                      </option>
                    </select>
                    <div v-if="errors.doctor" class="text-danger">
                      {{ errors.doctor }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="day" class="form-label">Hari</label>
                    <select
                      class="form-select"
                      id="day"
                      aria-label="Default select example"
                      v-model="selectedDay"
                      required
                    >
                      <option disabled value="">Pilih Hari</option>
                      <option value="monday">Senin</option>
                      <option value="tuesday">Selasa</option>
                      <option value="wednesday">Rabu</option>
                      <option value="thursday">Kamis</option>
                      <option value="friday">Jumat</option>
                      <option value="saturday">Sabtu</option>
                      <option value="sunday">Minggu</option>
                    </select>
                    <div v-if="errors.day" class="text-danger">
                      {{ errors.day }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="start_time" class="form-label">Jam Masuk</label>
                    <input
                      type="time"
                      class="form-control"
                      id="start_time"
                      v-model="startTime"
                      placeholder="Jam Masuk"
                      required
                    />
                    <div v-if="errors.startTime" class="text-danger">
                      {{ errors.startTime }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="end_time" class="form-label">Jam Selesai</label>
                    <input
                      type="time"
                      class="form-control"
                      id="end_time"
                      v-model="endTime"
                      placeholder="Jam Selesai"
                      required
                    />
                    <div v-if="errors.endTime" class="text-danger">
                      {{ errors.endTime }}
                    </div>
                  </div>
                </form>
              </b-modal>
              <CLoader type="big" v-if="loading" />
            </template>
            <template v-slot:body>
              <div class="table-responsive">
                <table class="table mb-0 table-borderless">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Dokter</th>
                      <th scope="col">Hari</th>
                      <th scope="col">Masuk</th>
                      <th scope="col">Selesai</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="schedule in doctorSchedules" :key="schedule.id">
                      <td>
                        <img
                          :src="schedule.profile_pic"
                          alt="image"
                          class="rounded-circle avatar-50"
                        />
                      </td>
                      <td>{{ schedule.fullname }}</td>
                      <td>{{ schedule.day }}</td>
                      <td>{{ schedule.start_time }}</td>
                      <td>{{ schedule.end_time }}</td>
                      <td>
                        <div
                          class="iq-card-header-toolbar d-flex align-items-center"
                        >
                          <b-dropdown
                            size="lg p-0"
                            variant="link"
                            toggle-class="text-decoration-none"
                            no-caret
                          >
                            <template v-slot:button-content>
                              <span
                                class="dropdown-toggle p-0"
                                id="dropdownMenuButton5"
                                data-toggle="dropdown"
                              >
                                <i class="ri-more-2-line"></i>
                              </span>
                            </template>
                            <b-dropdown-item @click="editSchedule(schedule.id)"
                              ><i class="ri-pencil-fill me-2"></i
                              >Edit</b-dropdown-item
                            >
                            <b-dropdown-item
                              @click="deleteSchedule(schedule.id)"
                              ><i class="ri-delete-bin-6-fill me-2"></i
                              >Hapus</b-dropdown-item
                            >
                          </b-dropdown>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </iq-card>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { xray } from "@/config/pluginInit";
import iqCard from "@/components/xray/cards/iq-card";
import axiosInstance from "@/axios";
import { getAllDoctors, getScheduleById } from "@/FackApi/api/Doctor";
import { useScheduleStore } from "@/store/pinia/Schedule";
import { onMounted, nextTick } from "vue";
import { computed } from "vue";
import CLoader from "@/components/xray/loader/CLoader";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Schedule",
  components: { iqCard, CLoader },
  data() {
    return {
      modalVertical: false,
      doctors: [],
      selectedDoctor: "",
      selectedDay: "",
      startTime: "",
      endTime: "",
      loading: false,
      errors: {},
      isEdit: false,
      scheduleId: null,
    };
  },
  setup() {
    const scheduleStore = useScheduleStore();
    const doctorSchedules = computed(() => scheduleStore.schedules);

    onMounted(async () => {
      if (scheduleStore.schedules.length === 0) {
        await scheduleStore.fetchSchedules();
      }
    });

    return { doctorSchedules };
  },
  mounted() {
    xray.index();
    this.fetchDoctors();
  },
  watch: {
    selectedDoctor(value) {
      if (value) this.errors.doctor = "";
    },
    selectedDay(value) {
      if (value) this.errors.day = "";
    },
    startTime(value) {
      if (value) this.errors.startTime = "";
    },
    endTime(value) {
      if (value) this.errors.endTime = "";
    },
  },
  methods: {
    async fetchDoctors() {
      const data = await getAllDoctors();
      this.doctors = data.filter((doctor) => doctor.is_active);
    },
    validateForm() {
      this.errors = {};

      if (!this.selectedDoctor) {
        this.errors.doctor = "Dokter harus dipilih.";
      }
      if (!this.selectedDay) {
        this.errors.day = "Hari harus dipilih.";
      }
      if (!this.startTime) {
        this.errors.startTime = "Jam masuk harus diisi.";
      }
      if (!this.endTime) {
        this.errors.endTime = "Jam selesai harus diisi.";
      }

      return Object.keys(this.errors).length === 0;
    },
    async onSubmit() {
      if (!this.validateForm()) {
        this.modalVertical = true; // keep modal open if validation fails
        return;
      }
      this.loading = true;
      try {
        if (this.isEdit) {
          await axiosInstance.put(`medrec/schedule/${this.scheduleId}`, {
            doctor_id: this.selectedDoctor,
            day: this.selectedDay,
            start_time: this.startTime,
            end_time: this.endTime,
          });
        } else {
          await axiosInstance.post("medrec/schedule/", {
            doctor_id: this.selectedDoctor,
            day: this.selectedDay,
            start_time: this.startTime,
            end_time: this.endTime,
          });
        }

        // Refresh doctor schedules
        const scheduleStore = useScheduleStore();
        await scheduleStore.fetchSchedules();
        this.modalVertical = false;
        this.resetForm();
      } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan jadwal:", error);
      } finally {
        this.loading = false;
      }
    },
    async editSchedule(id) {
      this.loading = true;
      try {
        const response = await getScheduleById(id);
        this.selectedDoctor = response.doctor_id;
        this.selectedDay = response.day;
        this.startTime = response.start_time;
        this.endTime = response.end_time;
        this.scheduleId = id;
        this.isEdit = true;

        await nextTick();
        this.modalVertical = true;
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil jadwal:", error);
      } finally {
        this.loading = false;
      }
    },
    async deleteSchedule(id) {
      try {
        const result = await this.$swal.fire({
          title: "Apakah Anda yakin?",
          text: "Jadwal akan dihapus secara permanen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
          confirmButtonColor: "#dc3545",
          cancelButtonColor: "#6c757d",
        });
        if (result.isConfirmed) {
          this.loading = true;
          await axiosInstance.delete(`medrec/schedule/${id}`);

          // Refresh doctor schedules
          const scheduleStore = useScheduleStore();
          await scheduleStore.fetchSchedules();
          this.$swal.fire("Berhasil!", "Jadwal telah dihapus.", "success");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat menghapus jadwal:", error);
        this.$swal.fire(
          "Error",
          "Terjadi kesalahan saat menghapus jadwal.",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.selectedDoctor = "";
      this.selectedDay = "";
      this.startTime = "";
      this.endTime = "";
      this.errors = {};
      this.isEdit = false;
      this.scheduleId = null;
    },
  },
};
</script>
