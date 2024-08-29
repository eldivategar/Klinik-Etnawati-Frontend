import { createApp } from "vue";
import { createPinia } from "pinia"; //Pinia
import App from "./App.vue";
import router from "./router";
import Raphael from "raphael/raphael";
import "./plugins";
import "./registerServiceWorker";
import i18n from "./i18n";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import VueECharts from "vue-echarts";
import "echarts";
import CanvasJSChart from "@canvasjs/vue-charts";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import VueSelect from "./plugins/vue-select";
import TabNav from "./components/bootstrap/tab-nav.vue";
import TabNavItems from "./components/bootstrap/tab-nav-items.vue";
import TabContent from "./components/bootstrap/tab-content.vue";
import TabContentItem from "./components/bootstrap/tab-content-item.vue";
import Swal from "sweetalert2";
// Optional: default styles
import "sweetalert2/dist/sweetalert2.min.css";

global.Raphael = Raphael;

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
  store.$swal = app.config.globalProperties.$swal;
});

app.config.globalProperties.$swal = Swal;
app.config.productionTip = false;
app.use(router).use(i18n).use(BootstrapVue3).use(pinia);
app.component("v-chart", VueECharts);
app.component("tab-nav", TabNav);
app.component("tab-nav-items", TabNavItems);
app.component("tab-content", TabContent);
app.component("tab-content-item", TabContentItem);
app.use(VueSelect);
app.use(CanvasJSChart);
// app.use(VuejsDatatableFactory)

app.mount("#app");
export default app;
