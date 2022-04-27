<script lang="ts">
import { defineComponent } from 'vue';
import Card from '../components/Card.vue';
import Title from '../components/Title.vue';
import { Region } from '../types/region';
import { useStore } from '../stores/store';
import { getRegions } from '../services/geo';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    Card,
    Title,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    return { store, router };
  },
  data() {
    return {
      regions: Array<Region>(),
    };
  },
  mounted() {
    if (this.store.regions.length === 0) {
      getRegions().then((response) => {
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
    onClickGoToRegion(code: string): void {
      this.router.push({ name: 'Region', params: { code: code } });
    },
  },
});
</script>

<template>
  <div class="home">
    <Title title="Choisissez une région" />
    >
    <Card
      :label="region.nom"
      v-for="region of regions"
      :key="region.code"
      @click="onClickGoToRegion(region.code)"
    />
  </div>
</template>

<style></style>
