<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
});
</script>

<template>
  <div>{{ label }}</div>
</template>

<style scoped>
div {
  margin: 1em auto;
  padding: auto;
  font-size: 0.85em;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  width: 8em;
  padding: 0.5em;
  display: inherit;
  flex-wrap: inherit;
  justify-content: center;
  align-content: center;
  text-align: center;
  border: 1px solid #beabab;
  border-radius: 1em;
  cursor: pointer;
  box-shadow: 0 0 0.8em 0 rgba(0, 0, 0, 0.2);
}
</style>
