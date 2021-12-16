<template>
  <div>
    <p>{{ label }}</p>
    <input type="checkbox" />
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: ["placeholder", "label", "name"],
  data() {
    return {
      value: "",
      error: "",
    };
  },
  methods: {
    validate() {
      this.error = "";
      if (this.value.length < 3) {
        this.error = "error";
      } else {
        this.error = "";
      }
    },
  },
};
</script>