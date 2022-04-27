<script lang="ts">
import { defineComponent } from 'vue';
import Card from '../components/Card.vue';
import Title from '../components/Title.vue';
import { useStore } from '../stores/store';
import { Departement } from '../types/departement';
import { getDepartementsFromRegion } from '../services/geo';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Region',
  components: {
    Card,
    Title,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    return { store, router, route };
  },
  data() {
    return {
      region: Array<Departement>(),
    };
  },
  mounted() {
    getDepartementsFromRegion(this.route.params.code.toString()).then(
      (response) => {
        this.region = response;
      }
    );
  },
  methods: {
    onClickGoToCommune(code: string): void {
      this.router.push({ name: 'Departement', params: { code: code } });
    },
  },
});
</script>

<template>
  <div class="home">
    <Title title="Choisissez un département" />
    <Card
      :label="departement.nom"
      v-for="departement of region"
      :key="departement.code"
      @click="onClickGoToCommune(departement.code)"
    />
  </div>
</template>

<style></style>
