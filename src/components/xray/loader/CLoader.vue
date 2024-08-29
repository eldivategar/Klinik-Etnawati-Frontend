<template>
  <div
    :class="[
      { 'loader-overlay': isBig },
      'd-flex justify-content-center align-items-center',
    ]"
  >
    <l-cardio size="50" stroke="4" speed="2" color="black"></l-cardio>
  </div>
</template>

<script>
import { cardio } from "ldrs";

cardio.register();

export default {
  name: "CLoader",
  props: {
    type: {
      type: String,
      default: "small", // Defaultnya adalah "small"
      validator: (value) => ["small", "big"].includes(value),
    },
  },
  computed: {
    isBig() {
      return this.type === "big";
    },
  },
};
</script>
