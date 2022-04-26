import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Regions from "../views/Regions.vue";

const routes: RouteRecordRaw[] = [{ path: "", component: Regions }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
