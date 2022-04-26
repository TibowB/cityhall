<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/Card.vue";
import Title from "../components/Title.vue";
import fetchDataFromApi from "../services/client";
import { Region } from '../types/region';

export default defineComponent({
  components: {
    Card,
    Title,
  },
  data() {
      return {
          regions: Array<Region>()
      }
  },
  mounted() {
      fetchDataFromApi().then(response => this.regions = response)
  },
});
</script>

<template>
  <div class="home">
    <Title title="Choisissez une région" />
    <Card :label="region.nom" v-for="region of regions" :key="region.code"/>
  </div>
</template>

<style></style>
