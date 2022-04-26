<script lang="ts">
import { defineComponent } from "vue";
import Card from "../components/Card.vue";
import Title from "../components/Title.vue";
import fetchDataFromApi from "../services/client";
import { Region } from "../types/region";
import { useStore } from "../stores/store";

export default defineComponent({
  components: {
    Card,
    Title,
  },
  setup() {
    const store = useStore();

    return { store };
  },
  data() {
    return {
      regions: Array<Region>(),
    };
  },
  mounted() {
    if (this.store.regions.length === 0) {
      fetchDataFromApi().then((response) => {
        this.regions = response;
        this.store.$patch({
          regions: response,
        });
      });
    } else {
      this.regions = this.store.regions;
    }
  },
  methods: {
    onClick(code: string): void {
      console.log(this.store.regions);
    },
  },
});
</script>

<template>
  <div class="home">
    <Title title="Choisissez une région" />
    <Card
      :label="region.nom"
      v-for="region of regions"
      :key="region.code"
      @click="onClick(region.code)"
    />
  </div>
</template>

<style></style>
