<template>
  <b-container fluid>
    <b-row>
      <!-- <b-col lg="8">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Jadwal Pasien Hari Ini</h4>
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
                <thead class="text-center">
                  <tr>
                    <th scope="col">No. Kartu</th>
                    <th scope="col">Pasien</th>
                    <th scope="col">Dokter</th>
                    <th scope="col">Waktu</th>
                    <th scope="col">Kontak Pasien</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <template v-if="schedulePatients">
                    <tr
                      v-for="schedule in schedulePatients"
                      :key="schedule.card_number"
                    >
                      <td>{{ schedule.card_number }}</td>
                      <td>{{ schedule.fullname }}</td>
                      <td>{{ schedule.doctor }}</td>
                      <td>{{ schedule.time }}</td>
                      <td>{{ schedule.contact }}</td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="5">Tidak ada data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </iq-card>
      </b-col> -->
      <b-col lg="4">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Jadwal Dokter Hari Ini</h4>
          </template>
          <template v-slot:body>
            <div
              v-if="doctorSchedulesToday.length === 0"
              class="text-center text-align-center"
            >
              Tidak ada jadwal hari ini
            </div>
            <ul class="doctors-lists m-0 p-0">
              <li
                class="d-flex mb-4 align-items-center"
                v-for="doctorSchedule in doctorSchedulesToday"
                :key="doctorSchedule.email"
              >
                <div class="user-img img-fluid">
                  <img
                    :src="doctorSchedule.profile_pic"
                    alt="story-img"
                    class="rounded-circle avatar-40"
                  />
                </div>
                <div class="media-support-info ms-3">
                  <h6>{{ doctorSchedule.fullname }}</h6>
                  <p class="mb-0 font-size-12">
                    {{ doctorSchedule.day }}
                  </p>
                  <p class="mb-0 font-size-12">
                    {{ doctorSchedule.start_time }} -
                    {{ doctorSchedule.end_time }}
                  </p>
                </div>
              </li>
            </ul>
          </template>
        </iq-card>
      </b-col>
      <b-col lg="8">
        <iq-card body-class="pl-0 pr-0">
          <template v-slot:headerTitle>
            <h4 class="card-title">Overview Pasien</h4>
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
                  class="dropdown-toggle p-0 d-flex align-items-center"
                  id="dropdownMenuButton5"
                  data-toggle="dropdown"
                >
                  <i class="ri-filter-3-line"></i>
                  <span class="text-black">
                    {{ typeData === "city" ? "Kota" : "Umur" }}
                  </span>
                </span>
              </template>
              <b-dropdown-item disabled>Pilih data</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="handleDataOverview('city')">
                Kota
              </b-dropdown-item>
              <b-dropdown-item @click="handleDataOverview('age')">
                Umur
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-slot:body v-if="!loading">
            <AmChart
              element="home-chart-03"
              :type="radialChat.type"
              :option="radialChat.data"
              :height="radialChat.height"
            />
          </template>
          <template v-slot:body v-else>
            <div class="d-flex justify-content-center align-items-center">
              <CLoader type="small" />
              <h5 class="ms-4">Mengambil data...</h5>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { onMounted, computed, ref, nextTick, onBeforeUnmount } from "vue";
import { xray } from "../../config/pluginInit";
import iqCard from "../../components/xray/cards/iq-card";
import { useScheduleStore } from "../../store/pinia/Schedule";
import AmChart from "../../components/xray/charts/AmChart";
import { usePatientStore } from "../../store/pinia/Patient";
import CLoader from "@/components/xray/loader/CLoader";
import { debounce } from "lodash";
import moment from "moment";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: { iqCard, AmChart, CLoader },
  data() {
    return {
      schedulePatients: [
        {
          card_number: "P001",
          fullname: "John Doe",
          doctor: "Dr. Alex",
          time: "10:00 AM",
          contact: "08123456789",
        },
        {
          card_number: "P002",
          fullname: "Jane Doe",
          doctor: "Dr. Alex",
          time: "11:00 AM",
          contact: "08123456789",
        },
        {
          card_number: "P003",
          fullname: "John Doe",
          doctor: "Dr. Alex",
          time: "12:00 AM",
          contact: "08123456789",
        },
        {
          card_number: "P004",
          fullname: "Jane Doe",
          doctor: "Dr. Alex",
          time: "01:00 PM",
          contact: "08123456789",
        },
        {
          card_number: "P005",
          fullname: "Jane Doe",
          doctor: "Dr. Alex",
          time: "05:00 PM",
          contact: "08123456789",
        },
        {
          card_number: "P006",
          fullname: "Jane Doe",
          doctor: "Dr. Alex",
          time: "03:00 PM",
          contact: "08123456789",
        },
      ],
    };
  },
  setup() {
    let loading = ref(false);
    let typeData = ref("city");

    const radialChat = ref({
      type: "radial-pie",
      height: 280,
      data: [],
    });

    const scheduleStore = useScheduleStore();
    const doctorSchedulesToday = computed(() => scheduleStore.todaySchedules);

    const patientStore = usePatientStore();

    const handleDataOverview = (type) => {
      typeData.value = type;
      updateRadialChartData();
    };

    const updateRadialChartData = () => {
      const dataCountMap = {};

      patientStore.patientsOverview.forEach((patient) => {
        const key = typeData.value === "city" ? patient.city : patient.age;
        if (dataCountMap[key]) {
          dataCountMap[key]++;
        } else {
          dataCountMap[key] = 1;
        }
      });

      const sortedData = Object.keys(dataCountMap)
        .map((key) => ({
          category: key,
          value: dataCountMap[key],
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 4);

      radialChat.value.data = sortedData;
    };

    const fetchAllPatients = debounce(async () => {
      loading.value = true;
      await patientStore.fetchAllPatients();
      patientStore.patientsOverview.forEach((patient) => {
        patient.age = moment().diff(patient.birth_date, "years");
      });
      updateRadialChartData();
      loading.value = false;
    }, 500);

    onBeforeUnmount(() => {
      if (patientStore.controller) {
        patientStore.controller.abort();
      }
    });

    onMounted(async () => {
      xray.index();
      await scheduleStore.fetchTodaySchedules();
      fetchAllPatients();
      await nextTick();
    });

    return {
      doctorSchedulesToday,
      radialChat,
      loading,
      handleDataOverview,
      typeData,
    };
  },
};
</script>
