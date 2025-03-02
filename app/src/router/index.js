import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/v2/Dashboard.vue";
import UserList from "@/views/v2/UserList.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/v2/SignIn.vue";
import SignUp from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/users",
    children: [
      {
        path: "",
        name: "Usuários",
        component: UserList,
      },
      {
        path: "create",
        name: "Criar Usuário",
        component: () => import("@/views/v2/CreateUser.vue"),
      },
    ],
  },
  {
    path: "/materials",
    children: [
      {
        path: "",
        name: "Materiais",
        component: () => import("@/views/v2/MaterialList.vue"),
      },
      {
        path: "create",
        name: "Criar Material",
        component: () => import("@/views/v2/CreateMaterial.vue"),
      },
    ]
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
