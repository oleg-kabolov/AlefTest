import { createRouter, createWebHistory } from "vue-router";
import home from "../src/pages/home.vue";
import preview from "../src/pages/preview.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", name: "home", component: home },
    { path: "/preview", name: "preview", component: preview },
  ],
});

export default router;
