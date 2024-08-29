<template>
  <div
    style="position: absolute; top: 0; right: 0; z-index: 999"
    class="mt-3 me-2"
  >
    <transition name="fade" @after-leave="$emit('removed')">
      <div
        v-if="isVisible"
        class="toast fade mb-3 show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <svg
            class="rounded bd-placeholder-img me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" :fill="iconColor"></rect>
          </svg>
          <strong class="me-auto">{{ title }}</strong>
          <button
            @click="hide"
            type="button"
            class="btn-close ms-2"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SingleNotification",
  props: {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    iconColor: {
      type: String,
      default: "#007aff",
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      setTimeout(() => {
        this.hide();
      }, this.duration);
    },
    hide() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
