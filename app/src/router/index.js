import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import UserList from "@/views/UserList.vue";
import SignIn from "@/views/SignIn.vue";
import EditUserForm from "@/views/components/EditUserForm.vue";
import MaterialList from "@/views/MaterialList.vue";
import EditMaterialForm from "@/views/components/EditMaterialForm.vue";

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
        component: () => import("@/views/CreateUser.vue"),
      },
      {
        path: "edit/:id",
        name: "Editar Usuário",
        component: EditUserForm,
      },
    ],
  },
  {
    path: "/materials",
    children: [
      {
        path: "",
        name: "Materiais",
        component: MaterialList,
      },
      {
        path: "create",
        name: "Criar Material",
        component: () => import("@/views/CreateMaterial.vue"),
      },
      {
        path: "edit/:id",
        name: "Editar Material",
        component: EditMaterialForm,
      },
    ]
  },
  {
    path: "/statments",
    name: "Declarações",
    component: () => import("@/views/StatmentList.vue"),
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
