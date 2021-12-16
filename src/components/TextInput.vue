<template>
  <div>
    <p>{{ label }}</p>
    <input
      :placeholder="placeholder"
      :id="name"
      v-model="value"
      @input="validate"
    />
    <p class="error" v-if="error.length">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: ["placeholder", "label", "name", "validators"],
  data() {
    return {
      value: "",
      error: [],
    };
  },
  methods: {
    validate() {
      this.error = [];
      if (!this.validators || !this.validators.length) {
        this.error = [];
        return;
      }
      this.validators.forEach((validator) => {
        validator(this.value) ? this.error.push(validator(this.value)) : "";
      });
    },
  },
};
</script>