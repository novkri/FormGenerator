<template>
  <div class="login">
    <button @click="setSchema('user', ['job', 'name', 'email'])">
      user (revert)
    </button>
    <button @click="setSchema('company', [])">company</button>
    <button @click="setSchema('company', ['address', 'email'])">
      company (address + email)
    </button>
    <Card>
      <template #body>
        from login
        <component
          v-for="(field, index) in schema"
          :key="`${field.name}-${index}-${new Date()}`"
          :is="field.fieldType"
          v-bind="field"
        >
        </component>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "./Card";
import TextInput from "./TextInput";
import CheckBox from "./CheckBox";
import { EmployeeForm, CompanyForm } from "../classes/Form.ts";

export default {
  name: "Login",
  components: { Card, TextInput, CheckBox },
  mounted() {
    console.log(new EmployeeForm().getSchema());
  },
  data() {
    return {
      schema: new EmployeeForm().getSchema(),
    };
  },
  methods: {
    setSchema(type, arr) {
      this.schema = [];
      if (type === "user") {
        this.schema = new EmployeeForm().getSchema(arr);
      } else {
        this.schema = new CompanyForm().getSchema(arr);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
