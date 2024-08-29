<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4>Data Dokter</h4>
          </template>
          <template v-slot:headerAction>
            <router-link :to="{ name: 'user.doctor.add' }">
              <b-button variant="outline-primary" class="mt-1 me-1">
                <i class="ri-add-fill"></i> Dokter Baru
              </b-button>
            </router-link>
          </template>
        </iq-card>
      </b-col>
      <b-col sm="12" md="3" v-for="doctor in doctors" :key="doctor.detail.id">
        <iq-card body-class="text-center">
          <template v-slot:body>
            <div class="doc-profile">
              <img
                class="rounded-circle img-fluid avatar-80"
                :src="doctor.detail.profile_pic"
                alt="profile"
              />
            </div>
            <div class="iq-doc-info mt-3">
              <h4>{{ doctor.detail.fullname }}</h4>
              <a href="javascript:void(0);">{{ doctor.detail.email }}</a>
              <p class="mb-0">
                {{ doctor.is_active ? "Aktif" : "Tidak Aktif" }}
              </p>
            </div>
            <div class="container">
              <div class="row mt-3 mb-3 justify-content-center">
                <div class="col-auto d-flex align-items-center">
                  <div class="iq-doc-social-info me-2">
                    <ul class="m-0 p-0 list-inline">
                      <li>
                        <b-button
                          v-b-tooltip.top
                          :title="
                            'Salin nomor <br />' + doctor.detail.phone_number
                          "
                          variant="none"
                          class="iq-bg-primary"
                          @click="copyToClipboard(doctor.detail.phone_number)"
                        >
                          <i class="ri-phone-fill ps-1"></i>
                        </b-button>
                      </li>
                    </ul>
                  </div>
                  <button
                    class="btn btn-primary"
                    @click="viewProfile(doctor.user_id, doctor.date_joined)"
                  >
                    Lihat Profile
                  </button>
                </div>
              </div>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { xray } from "@/config/pluginInit";
import iqCard from "@/components/xray/cards/iq-card";
import { useDoctorStore } from "@/store/pinia/Doctor";
import { computed, onMounted } from "vue";

export default {
  name: "DoctorList",
  components: { iqCard },
  setup() {
    const doctorStore = useDoctorStore();
    const doctors = computed(() => doctorStore.doctors);

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
    };

    const addNewDoctor = () => {
      window.location.href = "/doctor/add";
    };

    onMounted(async () => {
      xray.index();

      if (doctorStore.doctors.length === 0) {
        await doctorStore.fetchDoctors();
      }
    });

    return { doctors, copyToClipboard, addNewDoctor };
  },
  methods: {
    viewProfile(user_id, date_joined) {
      this.$router.push({
        name: "user.doctor.profile",
        params: { user_id, date_joined },
      });
    },
  },
};
</script>
