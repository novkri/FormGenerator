<template>
  <div class="register">
    <Card>
      <template #body> from register <input type="text" /> </template>
    </Card>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "Register",
  components: { Card },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
