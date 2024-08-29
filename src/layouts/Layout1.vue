<template>
  <div>
    <div id="show-overlay"></div>
    <Loader />
    <div class="wrapper" v-if="user">
      <!-- Sidebar  -->
      <SideBarStyle1
        :items="verticalMenu"
        :horizontal="horizontal"
        :logo="logo"
        @toggle="sidebarMini"
      />
      <div
        id="content-page"
        class="content-page"
        :class="horizontal ? 'ml-0' : ''"
      >
        <!-- TOP Nav Bar -->
        <NavBarStyle1
          title="Dashboard"
          :homeURL="{ name: 'dashboard.home-1' }"
          @toggle="sidebarMini"
          :logo="logo"
          :horizontal="horizontal"
          :items="horizontalMenu"
        >
          <template v-slot:responsiveRight>
            <ul class="navbar-nav ms-auto navbar-list align-items-center">
              <!-- <li class="nav-item">
                <a class="search-toggle iq-waves-effect language-title" href="#"
                  ><img
                    :src="selectedLang.image"
                    alt="img-flaf"
                    class="img-fluid me-1"
                    style="height: 16px; width: 16px" />
                  {{ selectedLang.title }} <i class="ri-arrow-down-s-line"></i
                ></a>
                <div class="iq-sub-dropdown">
                  <a
                    class="iq-sub-card"
                    href="javascript:void(0)"
                    v-for="(lang, i) in langsOptions"
                    :key="`Lang${i}`"
                    @click="langChange(lang)"
                  >
                    <img
                      :src="lang.image"
                      alt="img-flaf"
                      class="img-fluid me-2"
                    />{{ lang.title }}
                  </a>
                </div>
              </li> -->
              <!-- <li class="nav-item">
                <a href="javascript:void(0)" class="rtl-switch-toogle">
                  <span class="form-check form-switch">
                    <input
                      class="form-check-input rtl-switch"
                      type="checkbox"
                      role="switch"
                      id="rtl-switch"
                      @click="store.switchDirection(false)"
                    />
                    <span class="rtl-toggle-tooltip ltr-tooltip">Ltr</span>
                    <span class="rtl-toggle-tooltip rtl-tooltip">Rtl</span>
                  </span>
                </a>
              </li> -->
              <li class="nav-item iq-full-screen">
                <a href="#" class="iq-waves-effect" id="btnFullscreen"
                  ><i class="ri-fullscreen-line"></i
                ></a>
              </li>
            </ul>
          </template>
          <template v-slot:right>
            <ul class="navbar-list">
              <li>
                <a
                  class="search-toggle iq-waves-effect d-flex align-items-center"
                  style="cursor: pointer"
                >
                  <img
                    :src="user.detail.profile_pic"
                    class="img-fluid rounded me-1"
                    alt="user"
                  />
                  <div class="caption">
                    <h6 class="mb-0 line-height">
                      {{ user.detail.fullname }}
                    </h6>
                    <span class="font-size-12">{{
                      $t("nav.user.available")
                    }}</span>
                  </div>
                </a>
                <div class="iq-sub-dropdown iq-dropdown">
                  <div class="iq-card shadow-none m-0">
                    <div class="iq-card-body p-0">
                      <div class="bg-primary p-3">
                        <h5 class="mb-0 text-white line-height">
                          Hello {{ user.detail.fullname }}
                        </h5>
                        <span class="text-white font-size-12">{{
                          $t("nav.user.available")
                        }}</span>
                      </div>
                      <a href="#" class="iq-sub-card iq-bg-primary-hover">
                        <div class="media align-items-center">
                          <div class="rounded iq-card-icon iq-bg-primary">
                            <i class="ri-profile-line"></i>
                          </div>
                          <div class="media-body ms-3">
                            <h6 class="mb-0">
                              {{ $t("nav.user.profileTitle") }}
                            </h6>
                            <p class="mb-0 font-size-12">
                              {{ $t("nav.user.profileSub") }}
                            </p>
                          </div>
                        </div>
                      </a>
                      <div class="d-inline-block w-100 text-center p-3">
                        <button
                          class="iq-bg-danger iq-sign-btn"
                          @click="logout"
                        >
                          {{ $t("nav.user.signout")
                          }}<i class="ri-login-box-line ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </template>
        </NavBarStyle1>
        <!-- TOP Nav Bar END -->
        <router-view />
        <FooterStyle1>
          <template v-slot:left>
            <li class="list-inline-item">
              Klinik Spesialis Kulit dan Kelamin dr. Etnawati MPH.,Sp.KK(K)
            </li>
            <!-- <li class="list-inline-item ms-1"><a href="#">Terms of Use</a></li> -->
          </template>
          <template v-slot:right>
            Copyright 1981-{{ getYear() }} <a href="#">Klinik Etnawati</a>
            All Rights Reserved.
          </template>
        </FooterStyle1>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/xray/loader/Loader";
import SideBarStyle1 from "@/components/xray/sidebars/SideBarStyle1";
import NavBarStyle1 from "@/components/xray/navbars/NavBarStyle1";
import FooterStyle1 from "@/components/xray/footer/FooterStyle1";
import SideBarItems from "@/FackApi/json/SideBar";
import HorizontalItems from "@/FackApi/json/HorizontalMenu";
import profile from "@/assets/images/user/1.jpg";
import loader from "@/assets/images/logo.png";
import { xray } from "@/config/pluginInit";
import { Users } from "@/FackApi/api/chat";
// import {  mapActions } from "vuex";
import { useStore } from "@/store/pinia/index";
import { useAuthStore } from "@/store/pinia/Auth";
import { useUserStore } from "@/store/pinia/User";

import { mapActions, mapState } from "pinia";
import { computed, ref, onMounted } from "vue";
// import { computed } from "vue";
export default {
  name: "LayoutOne",
  components: {
    Loader,
    SideBarStyle1,
    NavBarStyle1,
    FooterStyle1,
  },
  setup() {
    const customizer = useStore();
    const store = useStore();
    const appName = computed(() => customizer.appName);
    const isActive = ref(false);

    const userStore = useUserStore();
    const user = computed(() => userStore.user);

    onMounted(async () => {
      if (!userStore.user) {
        await userStore.fetchUserData();
      }
    });

    return { appName, store, isActive, user };
  },
  mounted() {
    this.updateRadio();
  },
  computed: {
    ...mapState(useStore, {
      // selectedLang: "Setting/langState",
      selectedLang: "lang",
      langsOptions: "langOption",
      colors: "colors",
    }),
  },
  // setup() {
  //   const settingStore = useStore();

  //   // Define computed properties to map getters
  //   const selectedLang = computed(() => settingStore.langState);
  //   const langsOptions = computed(() => settingStore.langOption);
  //   const colors = computed(() => settingStore.colorState);
  //   console.log(langsOptions.value.title);
  //   return {
  //     selectedLang,
  //     langsOptions,
  //     colors,
  //   };
  // },
  watch: {},
  // sidebarTicket
  data() {
    return {
      horizontal: false,
      mini: false,
      darkMode: false,
      animated: { enter: "zoomIn", exit: "zoomOut" },
      animateClass: [
        { value: { enter: "zoomIn", exit: "zoomOut" }, text: "Zoom" },
        { value: { enter: "fadeInUp", exit: "fadeOutDown" }, text: "Fade" },
        {
          value: { enter: "slideInLeft", exit: "slideOutRight" },
          text: "Slide",
        },
        {
          value: { enter: "rotateInDownLeft", exit: "rotateOutDownLeft" },
          text: "Roll",
        },
      ],
      horizontalMenu: HorizontalItems,
      verticalMenu: SideBarItems,
      userProfile: profile,
      logo: loader,
      usersList: Users,
      rtl: false,
      message: [],
      notification: [],
    };
  },
  methods: {
    getYear() {
      return new Date().getFullYear();
    },
    updateRadio() {
      const store = useStore(); // Get the store instance
      this.horizontal = store.horizontalMenu;
      this.mini = store.miniSidebarMenu;
      // this.horizontal = this.$useStore.horizontalMenu["horizontalMenuState"];
      // this.mini = this.$useStore.miniSidebarMenu["miniSidebarState"];
    },
    sidebarHorizontal() {
      this.$useStore.dispatch("horizontalMenuAction");
      this.updateRadio();
    },
    sidebarMini() {
      xray.triggerSet();
      const store = useStore();
      // this.$useStore.dispatch("miniSidebarAction");
      store.miniSidebarMenu;
      this.updateRadio();
    },
    rtlChange() {
      if (this.rtl) {
        this.rtlRemove();
      } else {
        this.rtlAdd();
      }
    },
    changeColor(code) {
      document.documentElement.style.setProperty("--iq-primary", code.primary);
      document.documentElement.style.setProperty(
        "--iq-primary-light",
        code.primaryLight
      );
      if (this.darkMode) {
        document.documentElement.style.setProperty(
          "--iq-bg-dark-color",
          code.bodyBgDark
        );
      } else {
        document.documentElement.style.setProperty(
          "--iq-bg-light-color",
          code.bodyBgLight
        );
      }
    },
    reset() {
      this.changeColor({
        primary: "#827af3",
        primaryLight: "#b47af3",
        bodyBgLight: "#efeefd",
        bodyBgDark: "#1d203f",
      });
      this.animated = { enter: "zoomIn", exit: "zoomOut" };
      this.light();
    },
    async logout() {
      const authStore = useAuthStore();
      await authStore.logout();
      this.$router.push({ name: "auth.login" });
    },
    langChange(lang) {
      this.langChangeState(lang);
      this.$i18n.locale = lang.value;
      document.getElementsByClassName("iq-show")[0].classList.remove("iq-show");
      if (lang.value === "ar") {
        this.rtlAdd(lang);
      } else {
        this.rtlRemove(lang);
      }
    },
    ...mapActions(useStore, {
      langChangeState: "setLangAction",
      rtlAdd: "setRtlAction",
      rtlRemove: "removeRtlAction",
    }),
  },
};
</script>
