<template>
  <div class="py-4 container-fluid">
    <div class="d-flex flex-wrap align-items-center mb-3">
      <router-link to="/materials/create" class="btn btn-primary mb-2 me-2">
        Novo material
      </router-link>
      <router-link 
        :to="{ 
          path: '/materials/report', 
          query: { 
            type: filters.type 
          }
        }" 
        target="_blank" 
        class="btn btn-secondary mb-2 me-3">
        Baixar relatório
      </router-link>
      
      <div class="d-flex flex-wrap align-items-center filter-container">
        <div class="filter-item me-2 mb-2">
          <label for="typeFilter" class="me-1">Tipo:</label>
          <select id="typeFilter" v-model="filters.type" class="form-select form-select-sm" @change="applyFilters">
            <option value="">Todos</option>
            <option value="PERMANENT">Permanente</option>
            <option value="CONSUMABLE">Consumível</option>
          </select>
        </div>
        
        <button @click="clearFilters" class="btn btn-sm btn-outline-secondary mb-2">
          Limpar filtros
        </button>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <materials-table :materials="materials" />
      </div>
    </div>
  </div>
</template>

<script>
import MaterialsTable from "./components/MaterialsTable";
import { mapActions } from "vuex";

export default {
  name: "MaterialList",
  components: {
    MaterialsTable,
  },
  data() {
    return {
      filters: {
        type: ""
      }
    };
  },
  computed: {
    materials() {
      return this.$store.getters.materials;
    },
  },
  methods: {
    ...mapActions(["fetchMaterials"]),
    
    applyFilters() {
      this.fetchMaterialsWithFilters();
    },
    
    clearFilters() {
      this.filters.type = "";
      this.fetchMaterialsWithFilters();
    },
    
    fetchMaterialsWithFilters() {
      const params = {};
      if (this.filters.type) params.type = this.filters.type;
      
      this.fetchMaterials({ params });
    }
  },
  async mounted() {
    await this.fetchMaterialsWithFilters();
  },
};
</script>

<style scoped>
.filter-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.filter-item {
  display: flex;
  align-items: center;
}

.filter-item .form-select {
  width: auto;
}

@media (max-width: 768px) {
  .filter-container {
    margin-top: 10px;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-item {
    width: 100%;
    margin-right: 0 !important;
  }
  
  .filter-item .form-select {
    width: 100%;
  }
}
</style>
