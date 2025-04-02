<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Lista de materiais</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Material
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
            <tr v-for="material in materials" :key="material.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <soft-avatar
                      :img="getPictureUrl(material.images ? material.images[0]?.filename : null)"
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ material.name }}</h6>
                    <p class="text-xs text-secondary mb-0">
                      {{ material.patrimonyNumber }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ material.type }}</p>
                <p class="text-xs text-secondary mb-0">{{ material.description.substring(0, 30) }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <soft-badge :color="material.status.toLowerCase() === 'ativo' ? 'success' : 'danger'" variant="gradient" size="sm">
                  {{ material.status }}
                </soft-badge>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  :title="formatDate(material.createdAt)">{{ getRelativeTime(material.createdAt) }}</span
                >
              </td>
              <td class="align-middle">
                <router-link
                  :to="{ name: 'Editar Material', params: { id: material.id } }"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Editar material"
                  title="Editar"
                >
                  <i class="fas fa-edit me-1"></i>
                </router-link>
                <span @click="confirmDelete(material.id)" class="text-danger font-weight-bold text-xs ms-2" style="cursor: pointer;" title="Excluir">
                  <i class="fas fa-trash-alt me-1"></i>
                </span>
                <span 
                  v-if="material.type.toLowerCase() === 'consumível' && material.quantity > 0" 
                  @click="confirmDecrement({ id: material.id, quantity: material.quantity })" 
                  class="text-warning font-weight-bold text-xs ms-2" 
                  style="cursor: pointer;" 
                  title="Decrementar quantidade"
                >
                  <i class="fas fa-minus-circle me-1"></i>
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
import img1 from "../../assets/img/blank-material.png";
import { mapActions } from 'vuex';
import Swal from "sweetalert2";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export default {
  name: "materials-table",
  components: {
    SoftAvatar,
    SoftBadge,
  },
  props: {
    materials: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(['deleteMaterial', 'editMaterial']),
    getPictureUrl(picture) {
      return picture ? `http://localhost:3000/uploads/material-images/${picture}` : img1;
    },
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY HH:mm');
    },
    getRelativeTime(date) {
      return dayjs(date).fromNow();
    },
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
          await this.deleteMaterial({ id });
          Swal.fire(
            'Excluído!',
            'O material foi excluído.',
            'success'
          );
        }
      });
    },
    confirmDecrement({ id, quantity }) {
      Swal.fire({
        title: 'Confirmar uso',
        text: "Deseja decrementar a quantidade deste material em 1 unidade?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, confirmar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.editMaterial({ id, material: { quantity: quantity - 1 } });
            Swal.fire(
              'Concluído!',
              'Quantidade do material atualizada.',
              'success'
            );
          } catch (error) {
            Swal.fire(
              'Erro!',
              'Não foi possível decrementar a quantidade.',
              'error'
            );
          }
        }
      });
    }
  }
};
</script>
