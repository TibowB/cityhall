import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Region from '../views/Region.vue';
import Departement from '../views/Departement.vue';

const routes: RouteRecordRaw[] = [
  { path: '', component: Home },
  {
    path: '/regions/:code',
    name: 'Region',
    props: true,
    component: Region,
  },
  {
    path: '/departements/:code',
    name: 'Departement',
    props: true,
    component: Departement,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
