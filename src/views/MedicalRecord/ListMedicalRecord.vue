<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card body-class="">
          <template v-slot:headerTitle>
            <h4 class="card-title">Data Rekam Medis</h4>
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
            <router-link :to="{ name: 'medrec.record.add' }">
              <b-button variant="primary" class="mt-1 me-1">
                <i class="ri-add-fill"></i>
              </b-button>
            </router-link>
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
                  <tr>
                    <td colspan="9" class="text-center">Tidak ada data</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <!-- <b-pagination
                v-if="pagination.count > pagination.pageSize"
                :total-rows="pagination.count"
                :per-page="pagination.pageSize"
                v-model="pagination.currentPage"
                aria-controls="patients-table"
                class="mb-3"
                @change="handlePageChange"
              /> -->
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
                  required
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="gender" class="form-label">Jenis Kelamin:</label>
                <select
                  class="form-select"
                  id="gender"
                  aria-label="Blood Type"
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
                  placeholder="Kota Tempat Tinggal"
                  required
                />
              </div>
            </div>
          </form>
        </b-modal>
        <CLoader type="big" v-if="loading" />
        <!-- <SingleNotification
            v-if="Notification.show"
            :title="Notification.title"
            :duration="3000"
            :iconColor="Notification.iconColor"
            @removed="Notification.show = false"
            >{{ Notification.message }}
          </SingleNotification> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { xray } from "@/config/pluginInit";
import iqCard from "@/components/xray/cards/iq-card";
// import { usePatientStore } from "@/store/pinia/Patient";
// import { onMounted, ref, watch } from "vue";
// import { computed } from "vue";
// import moment from "moment";
// import { debounce } from "lodash";
import CLoader from "@/components/xray/loader/CLoader";
// import SingleNotification from "@/components/xray/notifications/SingleNotification";

export default {
  components: {
    iqCard,
    CLoader,
    // SingleNotification,
  },
  mounted() {
    xray.index();
  },
};
</script>
