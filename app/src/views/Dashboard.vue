<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-6 col-sm-6 mb-xl-0 mb-6">
        <mini-statistics-card
          title="Usuários Cadastrados"
          :value="count.users"
          :icon="{
            component: 'ni ni-money-coins',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-6 col-sm-6 mb-xl-0 mb-6">
        <mini-statistics-card
          title="Materiais Cadastrados"
          :value="count.materials"
          :icon="{
            component: 'ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>
    
    <!-- Low Stock Materials Table -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Materiais com Estoque Baixo</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Estoque Atual</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Estoque Mínimo</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Descrição</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="material in lowStockMaterials" :key="material.id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ material.name }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0" :class="{'text-danger': material.quantity < material.minimum_quantity}">
                        {{ material.quantity }}
                      </p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ material.minimum_quantity }}</p>
                    </td>
                    <td>
                      <p class="text-xs text-secondary mb-0">{{ material.description }}</p>
                    </td>
                    <td>
                      <router-link :to="`/materials/edit/${material.id}`" class="btn btn-sm btn-info">
                        Detalhes
                      </router-link>
                    </td>
                  </tr>
                  <tr v-if="lowStockMaterials.length === 0">
                    <td colspan="5" class="text-center py-4">
                      Nenhum material com estoque baixo encontrado.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";

export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-success",
    };
  },
  components: {
    MiniStatisticsCard,
  },
  computed: {
    count() {
      return this.$store.getters.count;
    },
    lowStockMaterials() {
      return this.$store.getters.lowStockMaterials;
    },
  },
  methods: {
    ...mapActions(["fetchCounts", "fetchLowStockMaterials"]),
  },
  async mounted() {
    await Promise.all([
      this.fetchCounts(),
      this.fetchLowStockMaterials(),
    ]);
  },
};
</script>
