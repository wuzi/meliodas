<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Lista de usuários</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Usuário
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Tipo
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Status
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Cadastro
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <soft-avatar
                      :img="img1"
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                    <p class="text-xs text-secondary mb-0">
                      {{ user.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ user.profile }}</p>
                <p class="text-xs text-secondary mb-0">{{ user.category }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <soft-badge :color="user.status === 'ACTIVE' ? 'success' : 'danger'" variant="gradient" size="sm">
                  {{ user.status === 'ACTIVE' ? 'Ativo' : 'Inativo' }}
                </soft-badge>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >{{ user.createdAt }}</span
                >
              </td>
              <td class="align-middle">
                <router-link
                  :to="{ name: 'Editar Usuário', params: { id: user.id } }"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Editar usuário"
                >
                  Editar
                </router-link>
                <span @click="confirmDelete(user.id)" class="text-danger font-weight-bold text-xs ms-2" style="cursor: pointer;">
                  Excluir
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import { mapActions } from 'vuex';
import Swal from "sweetalert2";
import img1 from "../../../assets/img/blank-profile.png";

export default {
  name: "users-table",
  data() {
    return {
      img1,
    };
  },
  components: {
    SoftAvatar,
    SoftBadge,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(['deleteUser']),
    confirmDelete(id) {
      Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.deleteUser({ id });
          Swal.fire(
            'Excluído!',
            'O usuário foi excluído.',
            'success'
          );
        }
      });
    }
  }
};
</script>
