<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card body-class="">
          <template v-slot:headerTitle>
            <h4 class="card-title">Data Pasien</h4>
          </template>
          <template v-slot:headerAction>
            <div class="iq-card-header-toolbar d-flex align-items-center">
              <div class="iq-search-bar">
                <div action="#" class="searchbox">
                  <input
                    type="search"
                    class="text search-input"
                    placeholder="Ketik di sini untuk mencari..."
                    v-model="searchFilter"
                  />
                  <a class="search-link" href="#"
                    ><i class="ri-search-line"></i
                  ></a>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:body>
            <div class="table-responsive">
              <table id="patients-table" class="table mb-0 table-borderless">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Nomor Kartu</th>
                    <th scope="col">Pasien</th>
                    <th scope="col">Umur</th>
                    <th scope="col">Gol. Darah</th>
                    <th scope="col">Nomor Hp</th>
                    <th scope="col">Jenis Kelamin</th>
                    <th scope="col">Kota</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="patients.length > 0">
                    <tr v-for="(patient, index) in patients" :key="patient.id">
                      <td>
                        {{
                          (pagination.currentPage - 1) * pagination.pageSize +
                          index +
                          1
                        }}
                      </td>
                      <td>{{ patient.card_number }}</td>
                      <td>{{ patient.fullname }}</td>
                      <td>{{ patient.age }}</td>
                      <td>{{ patient.blood_type }}</td>
                      <td>{{ patient.phone }}</td>
                      <td>{{ patient.gender }}</td>
                      <td>{{ patient.city }}</td>
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
                            <b-dropdown-item
                              @click="editPatient(patient.card_number)"
                            >
                              <i class="ri-pencil-fill me-2"></i>
                              Edit
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="8">Tidak ada data</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <b-pagination
              v-if="pagination.count > pagination.pageSize"
              :total-rows="pagination.count"
              :per-page="pagination.pageSize"
              v-model="pagination.currentPage"
              aria-controls="patients-table"
              class="mb-3"
              @change="handlePageChange"
            />
          </template>
        </iq-card>
        <b-modal
          id="modal-4"
          size="lg"
          v-model="modalLarge"
          centered
          title="Edit Data Pasien"
          ok-title="Simpan"
          cancel-title="Cancel"
          @ok="onSubmit"
        >
          <form ref="form" @submit.prevent="onSubmit">
            <div class="row">
              <div class="mb-3 col-md-12">
                <label for="doctor" class="form-label">No. Kartu</label>
                <input
                  type="text"
                  class="form-control"
                  id="cardNumber"
                  v-model="selectedPatient.cardNumber"
                  placeholder="No. Kartu"
                  disabled
                />
              </div>
              <div class="mb-3 col-md-12">
                <label for="fullname" class="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  class="form-control"
                  id="fullname"
                  v-model="selectedPatient.fullname"
                  placeholder="Nama Lengkap"
                  required
                />
              </div>
              <div class="mb-3 col-md-12">
                <label for="birthDate" class="form-label">Tanggal Lahir:</label>
                <input
                  type="date"
                  class="form-control"
                  id="birthDate"
                  v-model="selectedPatient.birthDate"
                  required
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="gender" class="form-label">Jenis Kelamin:</label>
                <select
                  class="form-select"
                  id="gender"
                  aria-label="Blood Type"
                  v-model="selectedPatient.gender"
                  required
                >
                  <option disabled value="">Pilih gender</option>
                  <option value="Male">Laki-laki</option>
                  <option value="Female">Perempuan</option>
                </select>
              </div>
              <div class="mb-3 col-md-6">
                <label for="bloodType" class="form-label">Gol. Darah</label>
                <select
                  class="form-select"
                  id="bloodType"
                  aria-label="Blood Type"
                  v-model="selectedPatient.bloodType"
                  required
                >
                  <option disabled value="">Pilih tipe</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
              <div class="mb-3 col-md-6">
                <label for="email" class="form-label">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="selectedPatient.email"
                  placeholder="Alamat email"
                  required
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="phoneNumber" class="form-label">Nomor Hp:</label>
                <input
                  type="text"
                  class="form-control"
                  id="phoneNumber"
                  v-model="selectedPatient.phoneNumber"
                  placeholder="Nomor Hp/Wa"
                  required
                  inputmode="numeric"
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="address" class="form-label">Alamat:</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="selectedPatient.address"
                  placeholder="Alamat Lengkap"
                  required
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="city" class="form-label">Kota:</label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  v-model="selectedPatient.city"
                  placeholder="Kota Tempat Tinggal"
                  required
                />
              </div>
            </div>
          </form>
        </b-modal>
        <CLoader type="big" v-if="loading" />
        <SingleNotification
          v-if="Notification.show"
          :title="Notification.title"
          :duration="3000"
          :iconColor="Notification.iconColor"
          @removed="Notification.show = false"
          >{{ Notification.message }}
        </SingleNotification>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { xray } from "@/config/pluginInit";
import iqCard from "@/components/xray/cards/iq-card";
import { usePatientStore } from "@/store/pinia/Patient";
import { onMounted, ref, watch } from "vue";
import { computed } from "vue";
import moment from "moment";
import { debounce } from "lodash";
import CLoader from "@/components/xray/loader/CLoader";
import SingleNotification from "@/components/xray/notifications/SingleNotification";

export default {
  name: "PatientList",
  components: { iqCard, CLoader, SingleNotification },
  mounted() {
    xray.index();
  },
  setup() {
    const searchFilter = ref("");
    let loading = ref(false);
    let Notification = ref({
      show: false,
      title: "",
      message: "",
      iconColor: "#28a745",
    });

    const patientStore = usePatientStore();
    const patients = computed(() => patientStore.patients);
    const pagination = ref({
      count: patientStore.count,
      pageSize: 10,
      currentPage: 1,
    });
    let modalLarge = ref(false);

    const selectedPatient = ref({
      cardNumber: "",
      fullname: "",
      birthDate: "",
      gender: "",
      bloodType: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
    });

    const fetchPatients = async () => {
      if (searchFilter.value) {
        // Panggil search dengan filter
        await patientStore.searchPatient(
          pagination.value.currentPage,
          searchFilter.value
        );
      } else {
        // Panggil fetch tanpa filter
        await patientStore.fetchPatients(pagination.value.currentPage);
      }

      pagination.value.count = patientStore.count;

      const Gender = {
        Male: "Laki-laki",
        Female: "Perempuan",
      };

      patients.value.forEach((patient) => {
        patient.gender = Gender[patient.gender];
        patient.age = moment().diff(patient.birth_date, "years");
      });
    };

    const handlePageChange = (page) => {
      pagination.value.currentPage = page;
      fetchPatients(); // Fetch data ketika halaman berubah
    };

    const debouncedSearch = debounce(() => {
      pagination.value.currentPage = 1; // Reset page ke 1 setiap kali ada perubahan search filter
      fetchPatients();
    }, 200); // Delay 300ms

    const editPatient = (cardNumber) => {
      const data = patients.value.find(
        (data) => data.card_number === cardNumber
      );

      selectedPatient.value = {
        cardNumber: data.card_number,
        fullname: data.fullname,
        birthDate: data.birth_date,
        gender: data.gender === "Laki-laki" ? "Male" : "Female",
        bloodType: data.blood_type,
        email: data.email,
        phoneNumber: data.phone,
        address: data.address,
        city: data.city,
      };

      modalLarge.value = true;
    };

    const onSubmit = async () => {
      loading.value = true;
      const patient = {
        card_number: selectedPatient.value.cardNumber,
        fullname: selectedPatient.value.fullname,
        birth_date: selectedPatient.value.birthDate,
        gender: selectedPatient.value.gender,
        blood_type: selectedPatient.value.bloodType,
        email: selectedPatient.value.email,
        phone: selectedPatient.value.phoneNumber,
        address: selectedPatient.value.address,
        city: selectedPatient.value.city,
      };
      try {
        const response = await patientStore.updatePatient(
          patient.card_number,
          patient
        );
        if (response.status === 200) {
          modalLarge.value = false;
          await fetchPatients();
          Notification.value.show = true;
          Notification.value.title = "Berhasil";
          Notification.value.message = "Data pasien berhasil diubah";
        } else {
          Notification.value.show = true;
          Notification.value.title = "Gagal";
          Notification.value.message = "Terjadi kesalahan saat mengubah data";
          Notification.value.iconColor = "#dc3545";
        }
      } catch (error) {
        console.log(error);
      } finally {
        modalLarge.value = false;
        loading.value = false;
      }
    };

    watch(
      () => searchFilter.value,
      () => {
        debouncedSearch();
      }
    );

    watch(
      () => pagination.value.currentPage,
      () => {
        fetchPatients();
      }
    );

    onMounted(() => {
      fetchPatients();
    });

    return {
      patients,
      pagination,
      handlePageChange,
      searchFilter,
      editPatient,
      modalLarge,
      selectedPatient,
      onSubmit,
      loading,
      Notification,
    };
  },
};
</script>
