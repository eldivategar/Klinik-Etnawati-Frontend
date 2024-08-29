import { createRouter, createWebHistory } from "vue-router";
/* Layouts */
import Layout1 from "../layouts/Layout1.vue";
import AuthLayout1 from "../layouts/AuthLayouts/AuthLayout1";

/* Authentic View */
import SignIn1 from "../views/AuthPages/Default/SignIn1";
import BlankPage from "../views/Pages/BlankPage";
import Invoice from "../views/Pages/Invoice";
/* User View */
import Profile from "../views/User/Profile";
import ProfileEdit from "../views/User/ProfileEdit";
// import AddUser from "../views/User/AddUser";`
import UserList from "../views/User/UserList";

/* Store */
import { useAuthStore } from "../store/pinia/Auth";

/* Dashboard Views */
import Dashboard from "../views/Dashboards/Dashboard";

/* Medical Record Views */
import ListMedicalRecord from "../views/MedicalRecord/ListMedicalRecord";
import AddMedicalRecord from "../views/MedicalRecord/AddMedicalRecord";

/* Doctors Views */
import Schedule from "../views/Managements/Doctors/Schedule";
import DoctorList from "../views/Managements/Doctors/DoctorList";
import AddDoctor from "../views/Managements/Doctors/AddDoctor";
import DoctorProfile from "../views/Managements/Doctors/DoctorProfile";

/* Patients Views */
import PatientList from "../views/Managements/Patients/PatientList";
import PatientRegistration from "../views/Managements/Patients/PatientRegistration";

const childRoutes = (prop, mode) => [
  {
    path: "",
    name: prop + ".home-1",
    meta: { dark: mode, auth: true, name: "Home 1" },
    component: Dashboard,
  },
];
const medrecChildRoute = (prop, mode) => [
  {
    path: "",
    name: prop + ".record",
    meta: { dark: mode, auth: true, name: "Medical Record" },
    component: ListMedicalRecord,
  },
  {
    path: "add",
    name: prop + ".record.add",
    meta: { dark: mode, auth: true, name: "Add Medical Record" },
    component: AddMedicalRecord,
  },
];
const transactionChildRoute = (prop, mode) => [
  {
    path: "payment",
    name: prop + ".payment",
    meta: { dark: mode, auth: true, name: "Payment" },
    component: Invoice,
  },
];
const letterChildRoute = (prop, mode) => [
  {
    path: "caption",
    name: prop + ".caption",
    meta: { dark: mode, auth: true, name: "Caption" },
    component: BlankPage,
  },
  {
    path: "referral",
    name: prop + ".referral",
    meta: { dark: mode, auth: true, name: "Referral" },
    component: BlankPage,
  },
  {
    path: "action-approval",
    name: prop + ".actionApproval",
    meta: { dark: mode, auth: true, name: "Action Approval" },
    component: BlankPage,
  },
  {
    path: "laboratory",
    name: prop + ".laboratory",
    meta: { dark: mode, auth: true, name: "Laboratory" },
    component: BlankPage,
  },
];
const authChildRoutes = (prop, mode = false) => [
  {
    path: "login",
    name: prop + ".login",
    meta: { dark: mode, auth: false },
    component: SignIn1,
  },
];
const userChildRoute = (prop, mode = false) => [
  {
    path: "profile",
    name: prop + ".profile",
    meta: { dark: mode, auth: true, name: "Profile" },
    component: Profile,
  },
  {
    path: "profile-edit",
    name: prop + ".edit",
    meta: { dark: mode, auth: true, name: "Edit Profile" },
    component: ProfileEdit,
  },
  {
    path: "user-list",
    name: prop + ".list",
    meta: { dark: mode, auth: true, name: "User List" },
    component: UserList,
  },
  {
    path: "doctor",
    children: [
      {
        path: "",
        name: prop + ".doctor",
        meta: { dark: mode, auth: true, name: "Doctor List" },
        component: DoctorList,
      },
      {
        path: "add",
        name: prop + ".doctor.add",
        meta: { dark: mode, auth: true, name: "Add Doctor" },
        component: AddDoctor,
      },
      {
        path: "schedule",
        name: prop + ".doctor.schedule",
        meta: { dark: mode, auth: true, name: "Doctor Schedule" },
        component: Schedule,
      },
      {
        path: ":user_id/:date_joined",
        name: prop + ".doctor.profile",
        meta: { dark: mode, auth: true, name: "Doctor Profile" },
        component: DoctorProfile,
      },
    ],
  },
  {
    path: "patient",
    children: [
      {
        path: "",
        name: prop + ".patient",
        meta: { dark: mode, auth: true, name: "Patient List" },
        component: PatientList,
      },
      {
        path: "registration",
        name: prop + ".patient.registration",
        meta: { dark: mode, auth: true, name: "Patient Registration" },
        component: PatientRegistration,
      },
    ],
  },
];

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Layout1,
    meta: { auth: true },
    children: childRoutes("dashboard"),
  },
  {
    path: "/medical-record",
    name: "medrec",
    component: Layout1,
    meta: { auth: true },
    children: medrecChildRoute("medrec"),
  },
  {
    path: "/transaction",
    name: "transaction",
    component: Layout1,
    meta: { auth: true },
    children: transactionChildRoute("transaction"),
  },
  {
    path: "/letter",
    name: "letter",
    component: Layout1,
    meta: { auth: true },
    children: letterChildRoute("letter"),
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthLayout1,
    meta: { auth: false },
    children: authChildRoutes("auth"),
  },
  {
    path: "/user",
    name: "user",
    component: Layout1,
    meta: { auth: true },
    children: userChildRoute("user"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.auth && !isAuthenticated) {
    next("/auth/login");
  } else if (!to.meta.auth && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
