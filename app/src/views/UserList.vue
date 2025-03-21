<template>
  <div class="py-4 container-fluid">
    <div class="d-flex flex-wrap align-items-center mb-3">
      <router-link to="/users/create" class="btn btn-primary mb-2 me-2">
        Novo usuário
      </router-link>
      <router-link 
        :to="{ 
          path: '/users/report', 
          query: { 
            profile: filters.profile,
            category: filters.category 
          }
        }" 
        target="_blank" 
        class="btn btn-secondary mb-2 me-3">
        Baixar relatório
      </router-link>
      
      <div class="d-flex flex-wrap align-items-center filter-container">
        <div class="filter-item me-2 mb-2">
          <label for="profileFilter" class="me-1">Perfil:</label>
          <select id="profileFilter" v-model="filters.profile" class="form-select form-select-sm" @change="applyFilters">
            <option value="">Todos</option>
            <option value="ADMIN">Administrador</option>
            <option value="RESEARCH_COORDINATOR">Coordenador de Pesquisa</option>
            <option value="EXTENSION_COORDINATOR">Coordenador de Extensão</option>
            <option value="USER">Usuário</option>
          </select>
        </div>
        
        <div class="filter-item me-2 mb-2">
          <label for="categoryFilter" class="me-1">Categoria:</label>
          <select id="categoryFilter" v-model="filters.category" class="form-select form-select-sm" @change="applyFilters">
            <option value="">Todos</option>
            <option value="STUDENT">Estudante</option>
            <option value="COLLABORATOR">Colaborador</option>
            <option value="PROFESSOR">Professor</option>
            <option value="OTHER">Outros</option>
          </select>
        </div>
        
        <button @click="clearFilters" class="btn btn-sm btn-outline-secondary mb-2">
          Limpar filtros
        </button>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <users-table :users="users" />
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from "./components/UsersTable";
import { mapActions } from "vuex";

export default {
  name: "UserList",
  components: {
    UsersTable,
  },
  data() {
    return {
      filters: {
        profile: "",
        category: ""
      }
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    
    applyFilters() {
      this.fetchUsersWithFilters();
    },
    
    clearFilters() {
      this.filters.profile = "";
      this.filters.category = "";
      this.fetchUsersWithFilters();
    },
    
    fetchUsersWithFilters() {
      const params = {};
      if (this.filters.profile) params.profile = this.filters.profile;
      if (this.filters.category) params.category = this.filters.category;
      
      this.fetchUsers({ params });
    }
  },
  async mounted() {
    await this.fetchUsersWithFilters();
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
