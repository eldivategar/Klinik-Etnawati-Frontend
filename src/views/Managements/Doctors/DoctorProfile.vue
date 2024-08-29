<template>
  <b-container fluid>
    <b-row>
      <b-container class="mb-3">
        <b-button
          variant="outline-primary"
          class="mt-1 me-1"
          @click="() => this.$router.back()"
        >
          <i class="ri-arrow-left-line"></i> Kembali
        </b-button>
      </b-container>
      <b-col lg="4" v-if="user">
        <iq-card
          className="iq-user-profile-block iq-card-block1 iq-card-height1"
        >
          <template v-slot:body>
            <div class="user-details-block">
              <div class="user-profile text-center">
                <img
                  :src="user.detail.profile_pic"
                  alt="profile-img"
                  class="profile-custom img-fluid"
                />
              </div>
              <div class="text-center mt-3">
                <h4>
                  <b>{{ user.detail.fullname }}</b>
                </h4>
                <p class="capitalize">{{ user.role }}</p>
              </div>
              <hr />
              <ul
                class="doctoe-sedual d-flex align-items-center justify-content-between p-0"
              >
                <li class="text-center">
                  <h3 class="mb-0 line-height">
                    <img
                      v-if="user.is_active"
                      src="@/assets/images/svg/checklist.svg"
                      alt="checklist"
                      class="img-fluid avatar-40"
                    />
                    <img
                      v-else
                      src="@/assets/images/svg/wrong.svg"
                      alt="wrong"
                      class="img-fluid"
                    />
                    <span
                      class="edit-status ms-4"
                      v-if="isAdmin"
                      @click="
                        editStatus(
                          user.user_id,
                          user.date_joined,
                          user.is_active
                        )
                      "
                    >
                      <i class="ri-exchange-line"></i>
                    </span>
                  </h3>
                  <span
                    >Status:
                    {{ user.is_active ? "Aktif" : "Tidak Aktif" }}</span
                  >
                  <br />
                </li>
                <li class="text-center">
                  <h3>
                    <p class="last_login fw-normal line-height mb-2 capitalize">
                      {{ user.last_login }}
                    </p>
                  </h3>
                  <span>Terakhir Login</span>
                </li>
              </ul>
            </div>
          </template>
        </iq-card>
        <iq-card body-class="iq-card-body">
          <template v-slot:headerTitle>
            <div class="iq-card-header d-flex justify-content-between">
              <div class="iq-header-title">
                <h4 class="card-title">Informasi Personal</h4>
              </div>
            </div>
            <div class="iq-card-body">
              <div class="about-info m-0 p-0">
                <div class="row">
                  <div class="col-5">Nama Lengkap:</div>
                  <div class="col-6">{{ user.detail.fullname }}</div>
                  <div class="col-5">Umur:</div>
                  <div class="col-6">{{ user.detail.age }} tahun</div>
                  <div class="col-5">Email:</div>
                  <div class="col-7">
                    <a
                      :href="
                        'https://mail.google.com/mail/?view=cm&to=' +
                        user.detail.email
                      "
                      target="_blank"
                    >
                      {{ user.detail.email }}
                    </a>
                  </div>
                  <div class="col-5">Nomor Hp/Wa:</div>
                  <div class="col-7">
                    <a class="fw-normal">{{ user.detail.phone_number }}</a>
                  </div>
                  <div class="col-5">Jenis Kelamin:</div>
                  <div class="col-7">{{ user.detail.gender }}</div>
                  <div class="col-5">Alamat:</div>
                  <div class="col-7">
                    {{ user.detail.address ? user.detail.address : "-" }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="8" v-if="user">
        <b-row>
          <b-col md="12">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">New Appointments</h4>
              </template>
              <template v-slot:headerAction>
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
                      <i class="ri-more-fill"></i>
                    </span>
                  </template>
                  <b-dropdown-item href="#"
                    ><i class="ri-eye-fill me-2"></i>View</b-dropdown-item
                  >
                  <b-dropdown-item href="#"
                    ><i class="ri-delete-bin-6-fill me-2"></i
                    >Delete</b-dropdown-item
                  >
                  <b-dropdown-item href="#"
                    ><i class="ri-pencil-fill me-2"></i>Edit</b-dropdown-item
                  >
                  <b-dropdown-item href="#"
                    ><i class="ri-printer-fill me-2"></i>Print</b-dropdown-item
                  >
                  <b-dropdown-item href="#"
                    ><i class="ri-file-download-fill me-2"></i
                    >Download</b-dropdown-item
                  >
                </b-dropdown>
              </template>
              <template v-slot:body>
                <div class="table-responsive">
                  <table class="table mb-0 table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Date</th>
                        <th scope="col">Timing</th>
                        <th scope="col">Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center" colspan="5">Tidak ada data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </iq-card>
          </b-col>
          <b-col md="6">
            <iq-card>
              <template v-slot:headerTitle>
                <h4 class="card-title">Jadwal Praktek</h4>
              </template>
              <template v-slot:body>
                <ul class="list-inline m-0 p-0" v-if="schedules.length > 0">
                  <li v-for="schedule in schedules" :key="schedule.id">
                    <h6 class="float-start mb-1">{{ schedule.fullname }}</h6>
                    <small class="float-end mt-1">{{ schedule.day }}</small>
                    <div class="d-inline-block w-100">
                      <p class="badge badge-primary">
                        {{ schedule.start_time }} - {{ schedule.end_time }}
                      </p>
                    </div>
                  </li>
                  <!-- <li>
                    <h6 class="float-start mb-1">Anna Mull (Fever)</h6>
                    <small class="float-end mt-1">Today</small>
                    <div class="d-inline-block w-100">
                      <p class="badge badge-danger">09:15 AM</p>
                    </div>
                  </li>
                  <li>
                    <h6 class="float-start mb-1">Petey Cruiser (X-ray)</h6>
                    <small class="float-end mt-1">Today</small>
                    <div class="d-inline-block w-100">
                      <p class="badge badge-warning">10:00 AM</p>
                    </div>
                  </li>
                  <li>
                    <h6 class="float-start mb-1">
                      Anna Sthesia (Full body Check up)
                    </h6>
                    <small class="float-end mt-1">Today</small>
                    <div class="d-inline-block w-100">
                      <p class="badge badge-info">01:00 PM</p>
                    </div>
                  </li>
                  <li>
                    <h6 class="float-start mb-1">Paul Molive (Operation)</h6>
                    <small class="float-end mt-1">Tomorrow</small>
                    <div class="d-inline-block w-100">
                      <p class="badge badge-success">09:00 AM</p>
                    </div>
                  </li> -->
                </ul>

                <div v-else>
                  <p class="text-center">Tidak ada jadwal praktek</p>
                </div>
              </template>
            </iq-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { useRoute } from "vue-router";
import iqCard from "@/components/xray/cards/iq-card";
import { xray } from "@/config/pluginInit";
import { useScheduleStore } from "@/store/pinia/Schedule";
import moment from "moment";
import { computed, onMounted, ref } from "vue";
import { useDoctorStore } from "@/store/pinia/Doctor";
import { useAuthStore } from "@/store/pinia/Auth";
import axiosInstance from "@/axios";

export default {
  name: "ProfilePage",
  components: { iqCard },
  mounted() {
    xray.index();
    moment.updateLocale("en", {
      relativeTime: {
        future: "dalam %s",
        past: "%s yang lalu",
        s: "beberapa detik",
        ss: "%d detik",
        m: "semenit",
        mm: "%d menit",
        h: "sejam",
        hh: "%d jam",
        d: "sehari",
        dd: "%d hari",
        w: "seminggu",
        ww: "%d minggu",
        M: "sebulan",
        MM: "%d bulan",
        y: "setahun",
        yy: "%d tahun",
      },
    });
  },
  setup() {
    const userStore = useAuthStore();
    const isAdmin = ref(userStore.isAdmin);

    const route = useRoute();
    const user_id = route.params.user_id;
    const date_joined = route.params.date_joined;
    const doctorStore = useDoctorStore();
    const user = computed(() => doctorStore.doctor);

    const fetchDoctor = async () => {
      const response = await doctorStore.fetchDoctorById(user_id, date_joined);
      user.value.last_login = moment(response.last_login).fromNow();
      const birthDate = moment(response.detail.birth_date, "YYYY-MM-DD");
      user.value.detail.age = moment().diff(birthDate, "years");
      const Gender = {
        male: "Laki-laki",
        female: "Perempuan",
      };
      user.value.detail.gender = Gender[response.detail.gender];
    };

    const scheduleStore = useScheduleStore();
    const schedules = ref([]);

    const fetchSchedule = async () => {
      await scheduleStore.fetchSchedules();
      schedules.value = scheduleStore.schedules.filter(
        (schedule) => schedule.doctor_id === user.value.detail.id
      );
    };

    onMounted(async () => {
      await fetchDoctor();
      await fetchSchedule();
    });

    return { user, schedules, isAdmin, fetchDoctor, fetchSchedule };
  },
  methods: {
    async editStatus(user_id, date_joined, status) {
      const result = await this.$swal.fire({
        title: "Apakah anda yakin?",
        text: `Status akan diubah menjadi ${status ? "Tidak Aktif" : "Aktif"}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Ubah!",
      });
      if (result.isConfirmed) {
        const response = await axiosInstance.put(
          `account/users/doctor/${user_id}/${date_joined}`,
          {
            is_active: !status,
          }
        );
        if (response.status === 200) {
          this.$swal.fire("Berhasil!", "Status berhasil diubah", "success");
          await this.fetchDoctor();
          await this.fetchSchedule();
        }
      }
    },
  },
};
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}

.last_login {
  font-size: 1rem;
}

.profile-custom {
  width: 45%;
  background-color: #eef6f7;
  border-radius: 50%;
}

.edit-status {
  cursor: pointer;
  font-size: large;
  position: absolute;
}
</style>
