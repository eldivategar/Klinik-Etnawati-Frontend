<template>
  <b-container fluid>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <b-button variant="outline-primary" @click="() => this.$router.back()">
          <i class="ri-arrow-left-line"></i> Kembali
        </b-button>
      </div>
      <b-row :class="`${currentindex == 1 ? 'show' : 'd-none'}`">
        <!-- Current Date -->
        <b-col lg="4">
          <iq-card body-class="smaill-calender-home">
            <template v-slot:headerTitle>
              <h4 class="card-title mt-2">Hari/Tanggal:</h4>
              <span style="font-size: 0.8rem">
                {{
                  new Date(records.todaysDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </span>
            </template>
            <template v-slot:body>
              <div class="iq-card-body smaill-calender-home py-0">
                <flat-picker
                  :config="config"
                  v-model="records.todaysDate"
                  class="d-none"
                />
              </div>
            </template>
          </iq-card>
        </b-col>
        <!-- Basic Information -->
        <b-col lg="8">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Informasi Dasar</h4>
            </template>
            <template v-slot:body>
              <b-form-group
                class="col-md-12"
                label="Pilih Dokter:"
                label-for="doctor"
              >
                <b-form-select
                  id="doctor"
                  class="form-control mb-2"
                  v-model="records.selectedDoctor"
                  :class="{ 'is-invalid': errors.selectedDoctor }"
                  @blur="validateField('selectedDoctor')"
                >
                  <option disabled value="">Pilih Dokter</option>
                  <option
                    v-for="doctor in doctors"
                    :key="doctor.detail.id"
                    :value="doctor.detail.id"
                  >
                    {{ doctor.detail.fullname }}
                  </option>
                </b-form-select>
                <div class="invalid-feedback">
                  <span>{{ errors.selectedDoctor }}</span>
                </div>
              </b-form-group>
              <b-form-group
                class="col-md-12"
                label="Pilih Pasien:"
                label-for="patient"
              >
                <Combobox
                  v-model="records.selectedPatient"
                  :options="patientOptions"
                  @search="handleSearch"
                  @keyup.enter.stop.prevent="handleSearch"
                  placeholder="Pilih Pasien"
                  :class="{ 'is-invalid': errors.selectedPatient }"
                  @blur="validateField('selectedPatient')"
                />
                <div class="invalid-feedback">
                  <span>{{ errors.selectedPatient }}</span>
                </div>
              </b-form-group>
              <b-form-group class="col-md-12" label="Catatan:" label-for="note">
                <b-form-textarea
                  id="note"
                  v-model="records.note"
                  placeholder="Catatan..."
                ></b-form-textarea>
              </b-form-group>
            </template>
          </iq-card>
        </b-col>
        <!-- Anamnesis -->
        <b-col lg="12">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Anamnesis</h4>
            </template>
            <template v-slot:body>
              <b-row>
                <b-form-group
                  class="col-md-6"
                  label="Keluhan Utama:"
                  label-for="main-complaint"
                >
                  <b-form-textarea
                    id="main-complaint"
                    v-model="records.mainComplaint"
                    placeholder="Keluhan Utama..."
                    rows="6"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group
                  label="Lama Sakit:"
                  label-for="long-time-sick"
                  class="col-md-6"
                >
                  <div class="d-flex">
                    <b-col cols="4" class="me-2">
                      <b-form-input
                        id="long-time-sick"
                        v-model="records.longTimeSick"
                        placeholder="Lama Sakit"
                        type="number"
                      ></b-form-input>
                    </b-col>
                    <b-col>
                      <b-form-select v-model="records.sickUnit">
                        <option value="hari" selected>Hari</option>
                        <option value="minggu">Minggu</option>
                        <option value="bulan">Bulan</option>
                        <option value="tahun">Tahun</option>
                      </b-form-select>
                    </b-col>
                  </div>
                </b-form-group>
                <b-form-group label="Atopi:" label-for="atopy" class="col-md-6">
                  <b-form-select
                    id="atopy"
                    class="form-control mb-2"
                    v-model="records.atopy"
                  >
                    <option value="" selected disabled>Pilih opsi</option>
                    <option value="1">Ya</option>
                    <option value="0">Tidak</option>
                  </b-form-select>
                </b-form-group>
                <b-form-group
                  label="Pemakaian Kosmetik:"
                  label-for="cosmetic"
                  class="col-md-6"
                >
                  <b-form-textarea
                    id="cosmetic"
                    v-model="records.cosmetic"
                    placeholder="Pemakaian Kosmetik..."
                    rows="3"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group
                  label="Faktor Resiko:"
                  label-for="risk-factor"
                  class="col-md-6"
                >
                  <b-form-textarea
                    id="risk-factor"
                    v-model="records.riskFactor"
                    placeholder="Faktor Resiko..."
                    rows="3"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group
                  label="Coitus Suspektus:"
                  label-for="coitus-suspektus"
                  class="col-md-6"
                >
                  <b-form-select
                    id="coitus-suspektus"
                    class="form-control mb-2"
                    v-model="records.coitusSuspektus"
                  >
                    <option value="" selected disabled>Pilih opsi</option>
                    <option value="1">Ya</option>
                    <option value="0">Tidak</option>
                  </b-form-select>
                </b-form-group>
                <b-form-group
                  label="Riwayat Pengobatan:"
                  label-for="medication-history"
                  class="col-md-6"
                >
                  <b-form-textarea
                    id="medication-history"
                    v-model="records.medicationHistory"
                    placeholder="Riwayat Pengobatan..."
                    rows="3"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group
                  label="Umum:"
                  label-for="general"
                  class="col-md-6"
                >
                  <b-form-textarea
                    v-model="records.general"
                    placeholder="Ketik sesuatu..."
                    rows="3"
                  ></b-form-textarea>
                </b-form-group>
              </b-row>
            </template>
          </iq-card>
        </b-col>
        <!-- Dermatologist -->
        <b-col lg="6">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Dermatologis</h4>
            </template>
            <template v-slot:body>
              <b-form-group
                label="Lokasi:"
                label-for="location"
                class="col-md-12"
              >
                <b-form-textarea
                  v-model="records.location"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="UKK:" label-for="ukk" class="col-md-12">
                <b-form-textarea
                  v-model="records.ukk"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                label="Distribusi:"
                label-for="distribution"
                class="col-md-12"
              >
                <b-form-textarea
                  v-model="records.distribution"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                label="Laboratorium:"
                label-for="laboratory"
                class="col-md-12"
              >
                <b-form-textarea
                  v-model="records.laboratory"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                label="Patch Test:"
                label-for="patch-test"
                class="col-md-12"
              >
                <b-form-textarea
                  v-model="records.patchTest"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                label="Photopatch Test:"
                label-for="photopatch-test"
                class="col-md-12"
              >
                <b-form-textarea
                  v-model="records.photopatchTest"
                  placeholder="Ketik sesuatu..."
                  rows="8"
                ></b-form-textarea>
              </b-form-group>
            </template>
          </iq-card>
        </b-col>
        <!-- Diagnosis & Therapy -->
        <b-col lg="6">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Diagnosis</h4>
            </template>
            <template v-slot:body>
              <b-form-group
                label="Diagnosis:"
                label-for="diagnosis"
                class="col-md-12"
              >
                <b-form-textarea
                  id="diagnosis"
                  v-model="records.diagnosis"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                label="Diagnosis Banding:"
                label-for="differential-diagnosis"
                class="col-md-12"
              >
                <b-form-textarea
                  id="differential-diagnosis"
                  v-model="records.differentialDiagnosis"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
            </template>
          </iq-card>
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Terapi</h4>
            </template>
            <template v-slot:body>
              <b-form-group label="Oral:" label-for="oral" class="col-md-12">
                <b-form-textarea
                  id="oral"
                  v-model="records.oral"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                label="Topikal:"
                label-for="topical"
                class="col-md-12"
              >
                <b-form-textarea
                  id="topical"
                  v-model="records.topical"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                label="Racikan:"
                label-for="mixture"
                class="col-md-12"
              >
                <b-form-textarea
                  id="mixture"
                  v-model="records.mixture"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                label="Bahan Mentah:"
                label-for="raw-material"
                class="col-md-12"
              >
                <b-form-textarea
                  id="raw-material"
                  v-model="records.rawMaterial"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
            </template>
          </iq-card>
        </b-col>
        <!-- Actions -->
        <b-col lg="6">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Tindakan</h4>
            </template>
            <template v-slot:body>
              <b-form-group
                label="Tindakan:"
                label-for="action"
                class="col-md-12"
              >
                <b-form-textarea
                  id="action"
                  v-model="records.action"
                  placeholder="Ketik sesuatu..."
                ></b-form-textarea>
              </b-form-group>
            </template>
          </iq-card>
        </b-col>
        <div class="d-flex justify-content-end mb-3">
          <b-button variant="primary" @click="changeTab(2)"> Lanjut </b-button>
        </div>
      </b-row>
      <b-row :class="`${currentindex == 2 ? 'show' : 'd-none'}`">
        <!-- Progress and General -->
        <b-col lg="12">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Perkembangan</h4>
            </template>
            <template v-slot:body>
              <b-form-group
                label="Pemeriksaan Fisik:"
                label-for="physical-examination"
                class="col-md-12"
              >
                <input
                  type="file"
                  class="form-control"
                  id="physical-examination"
                  multiple
                  accept="image/*"
                  @change="handelFileInput"
                />
                <p class="text-center">----- atau -----</p>
                <div class="d-flex justify-content-center">
                  <b-button
                    variant="primary"
                    type="button"
                    @click="toggleCamera"
                    :class="{ 'btn-danger': isCameraOpen }"
                  >
                    <span v-if="isCameraOpen">
                      <i class="ri-camera-off-line"></i>
                      Tutup Kamera
                    </span>
                    <span v-else>
                      <i class="ri-camera-line"></i>
                      Buka Kamera
                    </span>
                  </b-button>
                </div>
                <div
                  v-if="isCameraOpen"
                  v-show="!isLoading"
                  class="camera-box mt-3 d-flex justify-content-center position-relative rounded"
                  :class="{ flash: isShotPhoto }"
                >
                  <div
                    class="camera-shutter d-flex justify-content-center"
                    :class="{ flash: isShotPhoto }"
                  ></div>

                  <video
                    v-show="!isPhotoTaken"
                    ref="camera"
                    :width="450"
                    :height="337.5"
                    autoplay
                  ></video>

                  <canvas
                    v-show="isPhotoTaken"
                    id="photoTaken"
                    ref="canvas"
                    :width="450"
                    :height="337.5"
                  ></canvas>
                </div>
                <div
                  v-if="isCameraOpen && !isLoading"
                  class="camera-shoot d-flex justify-content-center position-relative"
                >
                  <button
                    type="button"
                    class="button-shutter mt-2 me-4"
                    @click="takePhoto"
                  >
                    <i
                      v-if="!isPhotoTaken"
                      class="ri-camera-lens-fill fs-1"
                    ></i>
                    <i v-else class="ri-reset-left-line fs-2"></i>
                  </button>
                  <b-button
                    v-if="isPhotoTaken"
                    variant="primary"
                    size="sm"
                    class="mt-2"
                    @click="saveImage"
                  >
                    Simpan Gambar
                  </b-button>
                </div>
                <b-container
                  fluid
                  v-if="records.physicalExaminationUrl.length > 0"
                  class="mt-2"
                >
                  <label for="result">Hasil:</label>
                  <b-row>
                    <b-col
                      lg="3"
                      v-for="(
                        imageUrl, index
                      ) in records.physicalExaminationUrl"
                      :key="index"
                    >
                      <div class="result-container">
                        <img
                          :src="imageUrl"
                          class="img-thumbnail img-fluid bg-dark mb-1"
                          alt="img-before"
                        />
                        <div class="overlay">
                          <b-button
                            variant="danger"
                            class="delete-button"
                            @click="deleteImage(index)"
                          >
                            Delete
                          </b-button>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
              </b-form-group>
              <!-- <div class="d-flex justify-content-center">
                <hr style="width: 90%" />
              </div> -->
              <!-- <b-form-group
                label="Status Perkembangan:"
                label-for="progress-status"
                class="col-md-12"
              >
                <b-form-select
                  id="progress-status"
                  class="form-control mb-2"
                  v-model="records.progressStatus"
                >
                  <option value="" selected disabled>Pilih opsi</option>
                  <option value="statis">Statis</option>
                  <option value="better">Membaik</option>
                  <option value="worse">Memburuk</option>
                </b-form-select>
              </b-form-group> -->
            </template>
          </iq-card>
        </b-col>
        <div class="d-flex justify-content-end mb-3">
          <b-button
            variant="dark"
            type="button"
            class="me-2"
            @click="changeTab(1)"
          >
            Kembali
          </b-button>
          <button class="btn btn-primary" type="submit">Simpan</button>
        </div>
      </b-row>
    </form>
  </b-container>
</template>

<script>
import { xray } from "@/config/pluginInit";
import iqCard from "@/components/xray/cards/iq-card";
import Combobox from "@/components/xray/combobox/Combobox.vue";
import { useDoctorStore } from "@/store/pinia/Doctor";
import { usePatientStore } from "@/store/pinia/Patient";
import FlatPicker from "vue-flatpickr-component";
import * as yup from "yup";
import { computed, onMounted } from "vue";
import { debounce } from "lodash";

export default {
  name: "AddMedicalRecord",
  components: { iqCard, FlatPicker, Combobox },
  mounted() {
    xray.index();
  },
  data() {
    return {
      records: {
        todaysDate: new Date(),
        selectedDoctor: "",
        selectedPatient: null,
        note: "",
        mainComplaint: "",
        longTimeSick: "",
        sickUnit: "hari",
        atopy: "",
        cosmetic: "",
        riskFactor: "",
        coitusSuspektus: "",
        medicationHistory: "",
        physicalExamination: [],
        physicalExaminationUrl: [],
        progressStatus: "",
        general: "",
        location: "",
        ukk: "",
        distribution: "",
        laboratory: "",
        patchTest: "",
        photopatchTest: "",
        diagnosis: "",
        differentialDiagnosis: "",
        oral: "",
        topical: "",
        mixture: "",
        rawMaterial: "",
        action: "",
      },
      config: {
        dateFormat: "Y-m-d",
        inline: true,
      },
      errors: {},
      isCameraOpen: false,
      isLoading: false,
      isShotPhoto: false,
      isPhotoTaken: false,
      currentindex: 1,
    };
  },
  setup() {
    const doctorStore = useDoctorStore();
    const doctors = computed(() => doctorStore.doctors);

    const patientStore = usePatientStore();
    const patientOptions = computed(() =>
      patientStore.patients.map((patient) => ({
        value: patient.card_number,
        label: patient.fullname,
      }))
    );

    const handleSearch = debounce(async (query) => {
      if (query) {
        await patientStore.fetchPatientsPaginated(query);
      }
    }, 200);

    onMounted(async () => {
      await doctorStore.fetchDoctors();
    });

    return {
      doctors,
      patientOptions,
      handleSearch,
    };
  },
  watch: {
    // Watcher untuk reset error ketika nilai berubah
    "records.selectedDoctor": function () {
      if (this.errors.selectedDoctor) {
        this.validateField("selectedDoctor");
      }
    },
    "records.selectedPatient": function (newValue) {
      if (newValue === null || newValue === "") {
        this.errors.selectedPatient = "Pilih Pasien";
      } else {
        this.validateField("selectedPatient");
      }
    },
  },
  methods: {
    async validateField(field) {
      const schema = yup.object().shape({
        [field]: yup.string().required(`Pilih ${field}`),
      });

      try {
        await schema.validateAt(field, this.records);
        this.errors[field] = "";
      } catch (error) {
        this.errors[field] = error.message;
      }
    },

    async onSubmit() {
      const schema = yup.object().shape({
        selectedDoctor: yup.string().required("Pilih Dokter"),
        selectedPatient: yup.string().required("Pilih Pasien"),
      });

      try {
        await schema.validate(this.records, { abortEarly: false });
        console.log(this.records);
      } catch (error) {
        this.errors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
      }
    },
    async startCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.$refs.videoElement.srcObject = this.stream;
      }
    },
    stopCamera() {
      if (this.stream) {
        const tracks = this.stream.getTracks();
        tracks.forEach((track) => track.stop());
        this.stream = null;
      }
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },
    createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false;
          this.$refs.camera.srcObject = stream;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
          if (error.name === "NotAllowedError") {
            alert("Anda harus mengizinkan akses kamera terlebih dahulu.");
          } else {
            alert(error.message);
          }
          this.isCameraOpen = false;
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }

      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    },
    saveImage() {
      if (this.isPhotoTaken) {
        // const canvas = this.$refs.canvas;
        const input = document.getElementById("physical-examination");
        if (input.files.length > 0) {
          input.value = "";
        }
        const dataUrl = this.$refs.canvas.toDataURL("image/png");
        this.records.physicalExamination.push(
          new File(
            [dataUrl],
            `photo-before-${this.records.selectedPatient}.png`,
            {
              type: "image/png",
            }
          )
        );
        this.records.physicalExaminationUrl.push(dataUrl);
      }
      this.isCameraOpen = false;
      this.isPhotoTaken = false;
      this.stopCameraStream();
    },
    handelFileInput(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.records.physicalExamination.push(file);
          this.records.physicalExaminationUrl.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    deleteImage(index) {
      this.records.physicalExamination.splice(index, 1);
      this.records.physicalExaminationUrl.splice(index, 1);
    },
    changeTab(index) {
      this.currentindex = index;
    },
  },
};
</script>

<style scoped>
.camera-box {
  .camera-shutter {
    opacity: 0;
    width: 450px;
    height: 337.5px;
    background-color: #fff;
    position: absolute;

    &.flash {
      opacity: 1;
    }
  }
}

.button-shutter {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}

.result-container {
  position: relative;
  .img-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.img-thumbnail {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 1%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  box-sizing: border-box;
}

.delete-button {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.result-container:hover .overlay {
  opacity: 1;
}

.result-container:hover .delete-button {
  opacity: 1;
}
</style>
