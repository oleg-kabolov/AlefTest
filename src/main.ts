import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "../routes/index";
import "./assets/styles/main.css";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
