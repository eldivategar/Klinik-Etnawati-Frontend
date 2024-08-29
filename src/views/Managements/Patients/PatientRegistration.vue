<template>
  <div class="container-fluid">
    <b-row>
      <b-col sm="12" lg="12">
        <iq-card class="iq-card">
          <template v-slot:headerTitle>
            <b-card-title>Registrasi Pasien</b-card-title>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="3">
                <ul id="top-tabbar-vertical" class="p-0">
                  <li
                    id="personal"
                    :class="`${currentindex == 1 ? 'active' : ''} ${
                      currentindex > 1 ? 'done active' : ''
                    } `"
                  >
                    <a href="#">
                      <i class="ri-lock-unlock-line text-primary"></i
                      ><span>Personal</span>
                    </a>
                  </li>
                  <li
                    id="contact"
                    :class="`${currentindex == 2 ? 'active' : ''} ${
                      currentindex > 2 ? 'done active' : ''
                    }`"
                  >
                    <a href="#">
                      <i class="ri-user-fill text-danger"></i
                      ><span>Kontak</span>
                    </a>
                  </li>
                </ul>
              </b-col>
              <b-col md="9">
                <b-form
                  @submit.prevent="onSubmit"
                  id="form-wizard3"
                  class="text-center"
                >
                  <!-- fieldsets -->
                  <div :class="`${currentindex == 1 ? 'show' : 'd-none'}`">
                    <fieldset>
                      <div class="form-card text-start">
                        <b-row>
                          <b-col>
                            <h3 class="mb-4">Informasi:</h3>
                          </b-col>
                        </b-row>
                        <b-row>
                          <div class="col-md-12">
                            <div
                              :class="{
                                'form-group': true,
                                'has-error': errors.fullname,
                              }"
                            >
                              <label for="fullname" class="mb-2"
                                >Nama Lengkap: *</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="fullname"
                                v-model="patient.fullname"
                                name="fullname"
                                placeholder="Nama Lengkap"
                              />
                              <b-form-invalid-feedback v-if="errors.fullname">
                                {{ errors.fullname }}
                              </b-form-invalid-feedback>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div
                              :class="{
                                'form-group': true,
                                'has-error': errors.birth_date,
                              }"
                            >
                              <label for="birth_date" class="mb-2"
                                >Tanggal Lahir: *</label
                              >
                              <input
                                type="date"
                                class="form-control"
                                id="birth_date"
                                v-model="patient.birth_date"
                                name="birth_date"
                              />
                              <b-form-invalid-feedback v-if="errors.birth_date">
                                {{ errors.birth_date }}
                              </b-form-invalid-feedback>
                            </div>
                          </div>
                          <div class="col-md-3 col-sm-5">
                            <div
                              :class="{
                                'form-group': true,
                                'has-error': errors.gender,
                              }"
                            >
                              <label class="my-2">Jenis Kelamin: *</label>
                              <div class="form-check d-block ps-0">
                                <div
                                  class="custom-control custom-radio custom-control-inline me-4"
                                >
                                  <input
                                    type="radio"
                                    id="customRadio1"
                                    v-model="patient.gender"
                                    name="gender"
                                    class="custom-control-input"
                                    value="Male"
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="customRadio1"
                                  >
                                    Laki-laki</label
                                  >
                                </div>
                                <div
                                  class="custom-control custom-radio custom-control-inline"
                                >
                                  <input
                                    type="radio"
                                    id="customRadio2"
                                    v-model="patient.gender"
                                    name="gender"
                                    class="custom-control-input"
                                    value="Female"
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="customRadio2"
                                  >
                                    Perempuan</label
                                  >
                                </div>
                              </div>
                              <b-form-invalid-feedback v-if="errors.gender">
                                {{ errors.gender }}
                              </b-form-invalid-feedback>
                            </div>
                          </div>
                          <div class="col-md-9 col-sm-7">
                            <div
                              :class="{
                                'form-group': true,
                                'has-error': errors.blood_type,
                              }"
                            >
                              <label class="my-2">Golongan Darah: *</label>
                              <div class="form-check d-flex ps-0">
                                <div class="d-block">
                                  <div
                                    class="custom-control custom-radio custom-control-inline me-4"
                                  >
                                    <input
                                      type="radio"
                                      id="type_A"
                                      v-model="patient.blood_type"
                                      name="blood_type"
                                      class="custom-control-input"
                                      value="A"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="type_A"
                                    >
                                      A</label
                                    >
                                  </div>
                                  <div
                                    class="custom-control custom-radio custom-control-inline me-4"
                                  >
                                    <input
                                      type="radio"
                                      id="type_B"
                                      v-model="patient.blood_type"
                                      name="blood_type"
                                      class="custom-control-input"
                                      value="B"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="type_B"
                                    >
                                      B</label
                                    >
                                  </div>
                                </div>
                                <div class="d-block ms-4">
                                  <div
                                    class="custom-control custom-radio custom-control-inline me-4"
                                  >
                                    <input
                                      type="radio"
                                      id="type_AB"
                                      v-model="patient.blood_type"
                                      name="blood_type"
                                      class="custom-control-input"
                                      value="AB"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="type_AB"
                                    >
                                      AB</label
                                    >
                                  </div>
                                  <div
                                    class="custom-control custom-radio custom-control-inline me-4"
                                  >
                                    <input
                                      type="radio"
                                      id="type_O"
                                      v-model="patient.blood_type"
                                      name="blood_type"
                                      class="custom-control-input"
                                      value="O"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="type_O"
                                    >
                                      O</label
                                    >
                                  </div>
                                </div>
                              </div>
                              <b-form-invalid-feedback v-if="errors.blood_type">
                                {{ errors.blood_type }}
                              </b-form-invalid-feedback>
                            </div>
                          </div>
                        </b-row>
                      </div>
                      <a
                        class="btn btn-primary next action-button float-end"
                        @click="validateStep(1)"
                        value="Next"
                        >Lanjut</a
                      >
                    </fieldset>
                  </div>
                  <div :class="`${currentindex == 2 ? 'show' : 'd-none'}`">
                    <fieldset>
                      <div class="form-card text-left">
                        <b-row>
                          <b-col>
                            <h3 class="mb-4">Informasi Kontak:</h3>
                          </b-col>
                        </b-row>
                        <b-row>
                          <div class="col-md-12">
                            <div
                              :class="{
                                'form-group': true,
                                'has-error': errors.email,
                              }"
                            >
                              <label for="email">Email Address:</label>
                              <input
                                type="email"
                                class="form-control"
                                id="email"
                                v-model="patient.email"
                                name="email"
                                placeholder="Email Address"
                              />
                            </div>
                            <b-form-invalid-feedback v-if="errors.email">
                              {{ errors.email }}
                            </b-form-invalid-feedback>
                          </div>
                          <div class="col-md-12">
                            <div
                              :class="{
                                'form-group': true,
                                'has-error': errors.phone,
                              }"
                            >
                              <label for="phone">Nomor Hp/Whatsapp: *</label>
                              <input
                                type="text"
                                class="form-control"
                                id="phone"
                                v-model="patient.phone"
                                name="phone"
                                placeholder="Nomor Hp/Whatsapp"
                                inputmode="numeric"
                              />
                              <b-form-invalid-feedback v-if="errors.phone">
                                {{ errors.phone }}
                              </b-form-invalid-feedback>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div
                              :class="{
                                'form-group': true,
                                'has-error': errors.city,
                              }"
                            >
                              <label for="city">Kota: *</label>
                              <input
                                type="text"
                                class="form-control"
                                id="city"
                                v-model="patient.city"
                                name="city"
                                placeholder="City."
                              />
                              <b-form-invalid-feedback v-if="errors.city">
                                {{ errors.city }}
                              </b-form-invalid-feedback>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div
                              :class="{
                                'form-group': true,
                                'has-error': errors.address,
                              }"
                            >
                              <label for="address">Alamat: *</label>
                              <input
                                type="text"
                                class="form-control"
                                id="address"
                                v-model="patient.address"
                                name="address"
                                placeholder="Alamat."
                              />
                              <b-form-invalid-feedback v-if="errors.address">
                                {{ errors.address }}
                              </b-form-invalid-feedback>
                            </div>
                          </div>
                        </b-row>
                      </div>
                      <a
                        class="btn btn-primary next action-button float-end"
                        @click="validateStep(2)"
                        value="Next"
                        >Simpan</a
                      >
                      <a
                        @click="changeTab(1)"
                        class="btn btn-dark previous action-button-previous float-end me-1"
                        value="Previous"
                        >Kembali</a
                      >
                    </fieldset>
                  </div>
                </b-form>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import iqCard from "@/components/xray/cards/iq-card";
import * as yup from "yup";
import { xray } from "@/config/pluginInit";
import { usePatientStore } from "@/store/pinia/Patient";

export default {
  name: "PatientRegistration",
  components: { iqCard },
  mounted() {
    xray.index();
  },
  data() {
    const schema = yup.object({
      fullname: yup.string().required("Nama Lengkap wajib diisi."),
      birth_date: yup.string().required("Tanggal Lahir wajib diisi."),
      gender: yup.string().required("Jenis Kelamin wajib diisi."),
      blood_type: yup.string().nullable(),
      email: yup.string().email("Format email salah"),
      phone: yup.string().required("Nomor Hp/Whatsapp wajib diisi."),
      city: yup.string().required("Kota wajib diisi."),
      address: yup.string().required("Alamat wajib diisi."),
    });
    return {
      patient: {
        fullname: "",
        gender: "",
        birth_date: "",
        blood_type: "",
        email: "",
        phone: "",
        city: "",
        address: "",
      },
      currentindex: 1,
      errors: {},
      schema,
    };
  },
  methods: {
    changeTab(val) {
      this.currentindex = val;
    },
    validateStep(step) {
      const formKeys = Object.keys(this.patient);
      const stepKeys = step === 1 ? formKeys.slice(0, 4) : formKeys.slice(4);
      this.errors = {};

      stepKeys.forEach((key) => {
        const value = this.patient[key];
        try {
          this.schema.validateSyncAt(key, { [key]: value });
        } catch (err) {
          this.errors[key] = err.message;
        }
      });

      if (Object.keys(this.errors).length === 0) {
        if (step === 2) {
          // dialog confirm form
          this.$swal
            .fire({
              title: "Apakah data sudah benar?",
              text: "Data dapat diubah di menu pasien.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ya, Simpan!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.onSubmit();
              }
            });
        } else {
          this.changeTab(step + 1);
        }
      }
    },
    async onSubmit(event) {
      if (event) {
        event.preventDefault();
      }
      const response = await usePatientStore().createPatient(this.patient);
      if (response.status === 201) {
        this.$swal.fire({
          title: "Berhasil!",
          text: "Data pasien berhasil disimpan.",
          icon: "success",
        });
        this.$router.replace({ name: "user.patient" });
      }
    },
  },
};
</script>
