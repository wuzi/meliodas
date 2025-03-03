import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/v2/Dashboard.vue";
import UserList from "@/views/v2/UserList.vue";
import SignIn from "@/views/v2/SignIn.vue";
import EditUserForm from "@/views/v2/components/EditUserForm.vue";
import MaterialList from "@/views/v2/MaterialList.vue";
import EditMaterialForm from "@/views/v2/components/EditMaterialForm.vue";

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
        component: () => import("@/views/v2/CreateMaterial.vue"),
      },
      {
        path: "edit/:id",
        name: "Editar Material",
        component: EditMaterialForm,
      },
    ]
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
