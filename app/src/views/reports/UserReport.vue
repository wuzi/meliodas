<template>
  <div class="report-standalone-page">
    <div class="report-container">
      <div class="report-header">
        <h1>Relatório de Usuários</h1>
        <p>Data de geração: {{ currentDate }}</p>
        <button @click="printReport" class="print-button no-print">Imprimir Relatório</button>
        <router-link to="/users" class="back-button no-print">Voltar para lista</router-link>
      </div>
      
      <table class="report-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name || '' }}</td>
            <td>{{ user.email || '' }}</td>
            <td>{{ user.category || '' }}</td>
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
      currentDate: new Date().toLocaleDateString()
    };
  },
  computed: {
    ...mapGetters(['users'])
  },
  methods: {
    ...mapActions(['fetchUsers']),
    printReport() {
      window.print();
    }
  },
  async mounted() {
    // Hide app's navbar and sidebar when in report view
    document.body.classList.add('report-view');
    
    // Fetch users if needed
    if (!this.users || this.users.length === 0) {
      await this.fetchUsers();
    }
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
  padding: 20px;
  color: #000;
}

.report-header {
  text-align: center;
  margin-bottom: 20px;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
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

@media print {
  .no-print {
    display: none !important;
  }
  
  .report-container {
    padding: 0;
    margin: 0;
  }
}
</style>
