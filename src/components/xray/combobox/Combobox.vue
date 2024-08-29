<template>
  <div class="position-relative">
    <input
      type="text"
      class="form-control"
      v-model="searchTerm"
      @input="filterOptions"
      @focus="isOpen = true"
      @blur="closeDropdown"
      @keydown.enter.prevent="handleEnter"
      :placeholder="placeholder"
    />
    <ul
      v-if="isOpen && filteredOptions.length"
      class="dropdown-menu w-100 show"
    >
      <li
        v-for="option in filteredOptions"
        :key="option.value"
        @mousedown.prevent="selectOption(option)"
        class="dropdown-item"
      >
        {{ option.value }} - {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ComboBox",
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchTerm: "",
      isOpen: false,
    };
  },
  computed: {
    filteredOptions() {
      if (!this.searchTerm) {
        return this.options;
      }
      const search = this.searchTerm.toLowerCase();
      return this.options.filter(
        (option) =>
          option.value.toLowerCase().includes(search) ||
          option.label.toLowerCase().includes(search)
      );
    },
  },
  methods: {
    filterOptions() {
      this.$emit("search", this.searchTerm);
    },
    selectOption(option) {
      this.searchTerm = `${option.value} - ${option.label}`;
      this.$emit("update:modelValue", option.value);
      this.isOpen = false;
    },
    closeDropdown() {
      setTimeout(() => {
        this.isOpen = false;
      }, 200);
    },
    handleEnter() {
      // Optional: Perform any action when Enter is pressed, if needed
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.dropdown-menu.show {
  display: block;
}
</style>
