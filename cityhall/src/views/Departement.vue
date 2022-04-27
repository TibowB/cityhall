<script lang="ts">
import { defineComponent } from 'vue';
import Card from '../components/Card.vue';
import Title from '../components/Title.vue';
import { useStore } from '../stores/store';
import { getCommunesFromDepartement } from '../services/geo';
import { useRoute } from 'vue-router';
import { Commune } from '../types/commune';

export default defineComponent({
  name: 'Departement',
  components: {
    Card,
    Title,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    return { store, route };
  },
  data() {
    return {
      departement: Array<Commune>(),
    };
  },
  mounted() {
    getCommunesFromDepartement(this.route.params.code.toString()).then(
      (response) => {
        this.departement = response;
        console.log(this.departement);
      }
    );
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
    <Title title="Choisissez une commune" />
    <Card
      :label="commune.nom"
      v-for="commune of departement"
      :key="commune.code"
      @click="onClick(commune.code)"
    />
  </div>
</template>

<style></style>
