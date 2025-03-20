<template>
  <div class="py-4 container-fluid">
    <router-link to="/users/create" class="btn btn-primary mb-2">
      Novo usuário
    </router-link>
    <button @click="downloadReport" class="btn btn-secondary mb-2">
      Baixar relatório
    </button>
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
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    downloadReport() {
      // Create a new window for the report
      const reportWindow = window.open('', '_blank');
      
      // Generate the report content with print-friendly styling
      const reportContent = `
        <html>
          <head>
            <title>Relatório de Usuários</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                color: #000;
              }
              h1 {
                text-align: center;
                margin-bottom: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
              @media print {
                body {
                  padding: 0;
                  margin: 0;
                }
                button.no-print {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <h1>Relatório de Usuários</h1>
            <p>Data de geração: ${new Date().toLocaleDateString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Função</th>
                </tr>
              </thead>
              <tbody>
                ${this.users.map(user => `
                  <tr>
                    <td>${user.name || ''}</td>
                    <td>${user.email || ''}</td>
                    <td>${user.category || ''}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div style="margin-top: 20px; text-align: center;">
              <button class="no-print" onclick="window.print(); window.close();">Imprimir Relatório</button>
            </div>
          </body>
        </html>
      `;
      
      // Write the content to the new window
      reportWindow.document.open();
      reportWindow.document.write(reportContent);
      reportWindow.document.close();
      
      // Auto print when content is loaded
      reportWindow.onload = function() {
        setTimeout(() => {
          reportWindow.print();
        }, 500);
      };
    }
  },
  async mounted() {
    await this.fetchUsers();
  },
};
</script>
