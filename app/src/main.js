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

router.beforeEach(async (to, from, next) => {
  if (from.name == undefined) {
    try {
      await store.$http.get("auth/user");
    } catch (err) {
      store.commit("logout");
    }
  }

  const toName = to.name.toLowerCase();
  if (toName !== "sign in" && !store.state.auth.accessToken) {
    next({name: "Sign In"});
  } else {
    next();
  }
});


const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
