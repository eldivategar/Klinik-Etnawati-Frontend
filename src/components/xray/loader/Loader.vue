<template>
  <!-- loader Start -->
  <div id="loading" :style="style">
    <div id="loading-center"></div>
  </div>
  <!-- loader END -->
</template>
<script>
import lightLogo from "../../../assets/images/loader.gif";
import darkLogo from "../../../assets/images/darkMode/dark-loader.gif";
export default {
  name: "LoaderPage",
  props: {
    dark: { type: Boolean, default: false },
  },
  mounted() {
    if (this.$route.meta.dark) {
      this.style = `background: #1d203f url(${this.darkLogo}) display: none;`;
    } else {
      this.style = `background: #fff url(${this.logo}) display: none;`;
    }
  },
  data() {
    return {
      logo: lightLogo,
      darkLogo: darkLogo,
      style: `background: #fff url(${lightLogo}) display: none;`,
    };
  },
};
</script>
