<template>
  <b-container fluid>
    <Form @submit="onSubmit()" :validation-schema="schema" v-slot="{ errors }">
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
        <b-col lg="3">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Tambah Dokter</h4>
            </template>
            <template v-slot:body>
              <b-form-group>
                <div class="add-img-user profile-img-edit">
                  <b-img
                    class="profile-pic height-150 width-150"
                    fluid
                    :src="user.pic_profile"
                    alt="profile-pic"
                  />
                  <input type="hidden" v-model="user.pic_profile" />
                  <div class="p-image">
                    <b-button
                      variant="none"
                      class="upload-button iq-bg-primary position-relative"
                      style="cursor: pointer"
                    >
                      <input
                        type="file"
                        @change="previewImage"
                        class="h-100 position-absolute"
                        accept="image/*"
                        style="opacity: 0"
                      />
                      File Upload
                    </b-button>
                  </div>
                </div>
                <div class="img-extension mt-3">
                  <div class="d-inline-block align-items-center">
                    <span>Only</span>
                    <b-link href="javascript:void();">.jpg</b-link>
                    <b-link href="javascript:void();">.png</b-link>
                    <b-link href="javascript:void();">.jpeg</b-link>
                    <span>allowed</span>
                  </div>
                </div>
              </b-form-group>
              <b-form-group
                class="col-md-12"
                label="Nomor HP/Whatsapp:"
                label-for="mobno"
              >
                <Field
                  class="form-control mb-2"
                  v-model="user.mobile_no"
                  type="text"
                  placeholder="Nomor HP/Whatsapp"
                  name="MobileNo"
                  :rules="isRequire"
                  :class="{ 'is-invalid': errors.MobileNo }"
                ></Field>
                <div class="invalid-feedback">
                  <span>{{ errors.MobileNo }}</span>
                </div>
              </b-form-group>
              <b-form-group class="col-md-12" label="Email:" label-for="email">
                <Field
                  class="form-control mb-2"
                  v-model="user.email"
                  type="text"
                  placeholder="Email"
                  name="Email"
                  :rules="isRequire"
                  :class="{ 'is-invalid': errors.Email }"
                ></Field>
                <div class="invalid-feedback">
                  <span>{{ errors.Email }}</span>
                </div>
              </b-form-group>
            </template>
          </iq-card>
        </b-col>
        <b-col lg="9">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Informasi Dokter</h4>
            </template>
            <template v-slot:body>
              <div class="new-user-info">
                <b-row>
                  <b-form-group
                    class="col-md-6"
                    label="Nama Depan:"
                    label-for="fname"
                  >
                    <Field
                      v-model="user.fname"
                      type="text"
                      placeholder="Nama Depan"
                      class="form-control mb-2"
                      name="FirstName"
                      :rules="isRequire"
                      :class="{ 'is-invalid': errors.FirstName }"
                    />
                    <div class="invalid-feedback">
                      <span>{{ errors.FirstName }}</span>
                    </div>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6"
                    label="Nama Belakang (Gelar Optional):"
                    label-for="lname"
                  >
                    <Field
                      v-model="user.lname"
                      type="text"
                      class="form-control mb-2"
                      placeholder="Nama Belakang"
                      :rules="isRequire"
                      name="LastName"
                      :class="{ 'is-invalid': errors.LastName }"
                    />

                    <div class="invalid-feedback">
                      <span>{{ errors.LastName }}</span>
                    </div>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6"
                    label="Tanggal Lahir:"
                    label-for="birthDate"
                  >
                    <Field
                      class="form-control mb-2"
                      v-model="user.birth_date"
                      type="date"
                      name="birthDate"
                      id="birthDate"
                      :rules="isRequire"
                      :class="{ 'is-invalid': errors.birthDate }"
                    ></Field>
                    <div class="invalid-feedback">
                      <span>{{ errors.birthDate }}</span>
                    </div>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6"
                    label="Jenis Kelamin:"
                    label-for="Gender"
                  >
                    <b-form-select
                      v-model="user.gender"
                      id="Gender"
                      class="form-control mb-2"
                    >
                      <option disabled value="">Pilih Jenis Kelamin</option>
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </b-form-select>
                  </b-form-group>
                  <b-form-group
                    class="col-md-12"
                    label="Alamat Tinggal:"
                    label-for="add1"
                  >
                    <Field
                      class="form-control mb-2"
                      v-model="user.address1"
                      type="text"
                      name="Address1"
                      id="add1"
                      placeholder="Alamat Tinggal"
                      :class="{ 'is-invalid': errors.Address1 }"
                    />
                    <div class="invalid-feedback">
                      <span>{{ errors.Address1 }}</span>
                    </div>
                  </b-form-group>
                </b-row>
                <hr />
                <h5 class="mb-3">Buat Akun</h5>
                <b-row>
                  <b-form-group
                    class="col-md-12"
                    label="Username:"
                    label-for="uname"
                  >
                    <Field
                      class="form-control mb-2"
                      v-model="user.username"
                      type="text"
                      placeholder="Username"
                      name="UserName"
                      :rules="isRequire"
                      :class="{ 'is-invalid': errors.UserName }"
                    ></Field>
                    <div class="invalid-feedback">
                      <span>{{ errors.UserName }}</span>
                    </div>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6"
                    label="Password:"
                    label-for="pass"
                  >
                    <Field
                      class="form-control mb-2"
                      v-model="user.password"
                      type="password"
                      placeholder="Password"
                      name="password"
                      :rules="isRequire"
                      :class="{ 'is-invalid': errors.password }"
                    ></Field>

                    <div class="invalid-feedback">
                      <span>{{ errors.password }}</span>
                    </div>
                  </b-form-group>
                  <b-form-group
                    class="col-md-6"
                    label="Ulangi Password:"
                    label-for="rpass"
                  >
                    <Field
                      class="form-control mb-2"
                      v-model="user.repeat_password"
                      type="password"
                      placeholder="Ulangi Password"
                      name="repassword"
                      :rules="isRequire"
                      :class="{ 'is-invalid': errors.repassword }"
                    ></Field>

                    <div class="invalid-feedback">
                      <span>{{ errors.repassword }}</span>
                    </div>
                  </b-form-group>
                </b-row>
                <div class="d-flex justify-content-end">
                  <b-button variant="primary" type="submit">Simpan</b-button>
                </div>
              </div>
            </template>
            <CLoader type="big" v-if="loading" />
          </iq-card>
        </b-col>
      </b-row>
    </Form>
  </b-container>
</template>
<script>
import { xray } from "@/config/pluginInit";
import iqCard from "@/components/xray/cards/iq-card";
import CLoader from "@/components/xray/loader/CLoader";
import { useDoctorStore } from "@/store/pinia/Doctor";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import axiosInstance from "@/axios";

export default {
  name: "AddDoctor",
  components: { iqCard, Form, Field, CLoader },
  mounted() {
    xray.index();
  },
  data() {
    const schema = yup.object({
      MobileNo: yup.string().required(),
      Email: yup.string().required().email(),
      FirstName: yup.string().required(),
      LastName: yup.string().required(),
      birthDate: yup.date().required(),
      Gender: yup.string().required(),
      Address1: yup.string(),
      UserName: yup.string().required(),
      password: yup.string().required().min(6, "Password minimal 6 karakter"),
      repassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Passwords harus sama"),
    });
    return {
      user: {
        pic_profile: require("@/assets/images/user/11.png"),
        mobile_no: "",
        email: "",
        fname: "",
        lname: "",
        fullname: "",
        birth_date: "",
        gender: "",
        address1: "",
        username: "",
        password: "",
        repeat_password: "",
      },
      users: [],
      schema,
      loading: false,
      selectedFile: null, // Variable to store image file
    };
  },
  setup() {
    const isRequire = yup.string().required();
    return { isRequire };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      this.user.fullname = this.user.fname + " " + this.user.lname;

      const formData = new FormData();
      formData.append("fullname", this.user.fullname);
      formData.append("birth_date", this.user.birth_date);
      formData.append("gender", this.user.gender);
      formData.append("email", this.user.email);
      formData.append("address", this.user.address1);
      formData.append("phone_number", this.user.mobile_no);
      formData.append("username", this.user.username);
      formData.append("password", this.user.password);

      if (this.selectedFile) {
        formData.append("pic_profile", this.selectedFile);
      }

      try {
        const response = await axiosInstance.post(
          "account/auth/doctor/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          xray.showSnackbar("success", "User has been updated successfully.");
          const doctorStore = useDoctorStore();
          await doctorStore.fetchDoctors();
          this.$router.replace({ name: "user.doctor" });
        } else {
          console.log("Response: ", response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    previewImage: function (event) {
      const input = event.target;

      if (input.files && input.files[0]) {
        this.selectedFile = input.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.user.pic_profile = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>
