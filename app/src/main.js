import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";

store.$http = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    common: {
      authorization: `bearer ${store.state.auth.accessToken}`
    },
  },
});

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
