<template>
  <div class="report-standalone-page">
    <div class="report-container">
      <div class="report-header">
        <img src="@/assets/img/ufsc-logo.png" alt="UFSC Logo" class="report-logo">
        <h5>Universidade Federal de Santa Catarina - Câmpus Araranguá</h5>
        <p>Relatório de Usuários</p>
        <p>Data de geração: {{ currentDate }}</p>
                <button @click="printReport" class="print-button no-print">Imprimir Relatório</button>
        <router-link to="/users" class="back-button no-print">Voltar para lista</router-link>
      </div>
      
      <table class="report-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Curso</th>
            <th>Perfil</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name || 'N/D' }}</td>
            <td>{{ user.registrationNumber || 'N/D' }}</td>
            <td>{{ user.course || 'N/D' }}</td>
            <td>{{ user.profile || 'N/D' }}</td>
            <td>{{ user.status || 'N/D' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserReport',
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      filters: {
        profile: '',
        category: ''
      }
    };
  },
  computed: {
    ...mapGetters(['users']),
    hasFilters() {
      return this.filters.profile || this.filters.category;
    }
  },
  methods: {
    ...mapActions(['fetchUsers']),
    printReport() {
      window.print();
        }
  },
  async mounted() {
    document.title = 'relatorio_de_usuarios_' + new Date().toLocaleDateString();

    // Hide app's navbar and sidebar when in report view
    document.body.classList.add('report-view');
    
    // Get filters from URL query parameters
    this.filters.profile = this.$route.query.profile || '';
    this.filters.category = this.$route.query.category || '';
    
    // Fetch users with the same filters
    const params = {};
    if (this.filters.profile) params.profile = this.filters.profile;
    if (this.filters.category) params.category = this.filters.category;
    
    await this.fetchUsers({ params });

    // Print the report automatically
    this.printReport();
  },
  beforeUnmount() {
    // Remove the class when component is destroyed
    document.body.classList.remove('report-view');
  }
}
</script>

<style>
/* Global styles to hide app elements when in report view */
body.report-view #nav,
body.report-view .sidenav,
body.report-view header,
body.report-view footer,
body.report-view .navbar {
  display: none !important;
}

body.report-view {
  background-color: white;
}

body.report-view .main-content {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}

@media print {
  @page {
    margin: 0;
  }

  .no-print {
    display: none !important;
  }

  body * {
    visibility: hidden;
  }
  
  .report-standalone-page,
  .report-standalone-page * {
    visibility: visible;
  }
  
  .report-standalone-page {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>

<style scoped>
.report-standalone-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 9999;
  overflow: auto;
}

.report-container {
  font-family: Arial, sans-serif;
  padding: 100px;
  color: #000;
}

.report-header {
  text-align: center;
  margin-bottom: 20px;
}

.report-logo {
  width: 100px;
  margin-bottom: 10px;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.report-table th,
.report-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.report-table th {
  background-color: #f2f2f2;
}

.print-button, .back-button {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 5px;
  display: inline-block;
  text-decoration: none;
}

.print-button {
  background-color: #4CAF50;
}

.back-button {
  background-color: #2196F3;
}
</style>
