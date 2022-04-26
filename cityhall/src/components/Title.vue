<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
});
</script>

<template>
  <h2>{{ title }}</h2>
</template>

<style scoped>
h2 {
  width: 80%;
  font-size: 1.4em;
  margin: 1em auto;
  text-align: center;
}
</style>
